#!/usr/bin/env python3
"""Rebuild in a temporary directory, validate, then compare every output field.

This never rewrites the working content/data files. Academic approval continues
to come exclusively from the existing review inputs, not this mechanical check.
"""

from __future__ import annotations

import json
from pathlib import Path
from tempfile import TemporaryDirectory

try:
    from . import assemble_content, normalize_research_data, validate_content
except ImportError:
    import assemble_content
    import normalize_research_data
    import validate_content

ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = ("sources.json", "candidate-nodes.json", "nodes.json", "relations.json", "public-relations.json")


def bibliographic_references(value):
    """Call on node records or relation evidence (not relation endpoints)."""
    if isinstance(value, dict):
        for key, item in value.items():
            if key == "source_id":
                yield item
            elif key == "source_leads":
                yield from item
            else:
                yield from bibliographic_references(item)
    elif isinstance(value, list):
        for item in value:
            yield from bibliographic_references(item)


def build_and_validate(output_dir: Path) -> None:
    normalize_research_data.write_outputs(output_dir)
    assemble_content.main(output_dir)
    previous_data = validate_content.DATA
    try:
        validate_content.DATA = output_dir
        if validate_content.main() != 0:
            raise ValueError("isolated content validation failed")
    finally:
        validate_content.DATA = previous_data
    def read(name):
        return json.loads((output_dir / name).read_text(encoding="utf-8"))

    source_ids = {source["id"] for source in read("sources.json")}
    references = set(bibliographic_references(read("nodes.json")))
    references.update(bibliographic_references(read("candidate-nodes.json")))
    for relation in read("relations.json"):
        references.update(bibliographic_references(relation.get("evidence", [])))
    if missing := references - source_ids:
        raise ValueError(f"unresolved bibliographic references: {sorted(missing)}")


def output_differences(actual_dir: Path, expected_dir: Path) -> list[str]:
    differences = []
    for name in OUTPUTS:
        actual = json.loads((actual_dir / name).read_text(encoding="utf-8"))
        path = expected_dir / name
        if not path.exists():
            differences.append(f"{name}: registered output missing")
            continue
        expected = json.loads(path.read_text(encoding="utf-8"))
        if actual == expected:
            continue
        a = {item["id"]: item for item in actual}
        e = {item["id"]: item for item in expected}
        for item_id in sorted(a.keys() | e.keys()):
            if item_id not in e:
                differences.append(f"{name}: new ID {item_id}")
            elif item_id not in a:
                differences.append(f"{name}: lost ID {item_id}")
            else:
                fields = sorted(key for key in a[item_id].keys() | e[item_id].keys()
                                if a[item_id].get(key) != e[item_id].get(key)
                                or (key in a[item_id]) != (key in e[item_id]))
                if fields:
                    differences.append(f"{name}: {item_id} changed fields {fields}")
        if not any(line.startswith(f"{name}:") for line in differences):
            differences.append(f"{name}: record ordering or duplicate records differ")
    return differences


def main() -> int:
    with TemporaryDirectory(prefix="commpass-rebuild-") as temporary:
        output_dir = Path(temporary)
        build_and_validate(output_dir)
        differences = output_differences(output_dir, ROOT / "content/data")
        if differences:
            print("FAIL: isolated rebuild differs; no registered outputs were changed:")
            print("\n".join(differences))
            return 1
    print("PASS: all 5 generated JSON outputs match field-for-field; references and review rules preserved")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
