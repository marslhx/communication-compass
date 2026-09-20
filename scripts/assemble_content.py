#!/usr/bin/env python3
"""Merge the original skeleton with independently revised complete records."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "content" / "data"
REVISED = ROOT / "content" / "revised"
NODE_OVERRIDES = ROOT / "content" / "revised-node-overrides.json"


def read(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def write(path: Path, value: object) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def resolve_revised_records(entries: list[tuple[str, dict]], overrides: dict[str, str]) -> list[dict]:
    """Resolve deliberate full-record overlays while rejecting accidental duplicates."""
    grouped: dict[str, list[tuple[str, dict]]] = {}
    for filename, item in entries:
        grouped.setdefault(item["id"], []).append((filename, item))
    unknown = sorted(set(overrides) - set(grouped))
    if unknown:
        raise SystemExit(f"node override ids absent from revised data: {unknown}")
    resolved = []
    for node_id, candidates in grouped.items():
        if len(candidates) == 1:
            if node_id in overrides:
                raise SystemExit(f"node override {node_id} has no duplicate base record")
            resolved.append(candidates[0][1])
            continue
        expected_file = overrides.get(node_id)
        if not expected_file:
            raise SystemExit(f"duplicate complete-node id without explicit override: {node_id}")
        matches = [item for filename, item in candidates if filename == expected_file]
        if len(matches) != 1:
            files = sorted(filename for filename, _ in candidates)
            raise SystemExit(
                f"node override {node_id} expected exactly one record in {expected_file}; found {files}"
            )
        resolved.append(matches[0])
    return resolved


def main(data_dir: Path = DATA) -> None:
    candidates = read(data_dir / "candidate-nodes.json")
    selected_ids = set(read(ROOT / "content" / "complete-node-selection.json"))
    reviewed_node_path = ROOT / "content" / "reviewed-nodes.json"
    reviewed_relation_path = ROOT / "content" / "reviewed-relations.json"
    if not selected_ids:
        raise SystemExit("complete-node selection must not be empty")
    node_files = sorted(REVISED.glob("*.nodes.json"))
    relation_files = sorted(REVISED.glob("*.relations.json"))
    if not node_files or not relation_files:
        raise SystemExit("revised node/relation files are missing")

    overrides = read(NODE_OVERRIDES) if NODE_OVERRIDES.exists() else {}
    if not isinstance(overrides, dict) or not all(isinstance(key, str) and isinstance(value, str) for key, value in overrides.items()):
        raise SystemExit("revised-node-overrides.json must be an object of node id to filename")
    entries = [(path.name, item) for path in node_files for item in read(path)]
    all_revised = resolve_revised_records(entries, overrides)
    complete = [item for item in all_revised if item["id"] in selected_ids]
    if len(complete) != len(selected_ids):
        missing = sorted(selected_ids - {item["id"] for item in complete})
        raise SystemExit(
            f"expected {len(selected_ids)} selected complete nodes; "
            f"assembled {len(complete)}; missing {missing}"
        )
    replacement = {item["id"]: item for item in complete}

    candidate_ids = {item["id"] for item in candidates}
    nodes = [replacement.get(item["id"], item) for item in candidates]
    # Curated additions may extend the original skeleton. Keep the historical
    # order stable, then append new records in a deterministic teaching order.
    additions = [item for item in complete if item["id"] not in candidate_ids]
    nodes.extend(sorted(additions, key=lambda item: (item["type"], item["name_zh"])))
    relations = [item for path in relation_files for item in read(path)]

    if reviewed_node_path.exists():
        review = read(reviewed_node_path)
        reviewed_ids = set(review["reviewed_eligible"])
        reviewed_dates = review.get("reviewed_at_by_id", {})
        unknown_reviewed = sorted(reviewed_ids - {item["id"] for item in nodes})
        if unknown_reviewed:
            raise SystemExit(f"reviewed nodes absent from assembled data: {unknown_reviewed}")
        for item in nodes:
            if item["id"] in reviewed_ids:
                item["review_status"] = "reviewed"
                item["reviewed_at"] = reviewed_dates.get(item["id"], review["reviewed_at"])

    if reviewed_relation_path.exists():
        review = read(reviewed_relation_path)
        eligible = review["reviewed_eligible"]
        approved = {item["id"]: item for item in eligible}
        approved_layers = {item_id: item["layer"] for item_id, item in approved.items()}
        reviewed_ids = set(approved)
        if len(reviewed_ids) != len(eligible):
            raise SystemExit("duplicate relation id in reviewed-relations.json")
        unknown_reviewed = sorted(reviewed_ids - {item["id"] for item in relations})
        if unknown_reviewed:
            raise SystemExit(f"reviewed relations absent from assembled data: {unknown_reviewed}")
        for item in relations:
            if item["id"] in reviewed_ids:
                expected_status = "direct" if approved_layers[item["id"]] == "default" else "interpretive"
                if item["evidence_status"] != expected_status:
                    raise SystemExit(
                        f"{item['id']} changed evidence layer after review: "
                        f"expected {expected_status}, got {item['evidence_status']}"
                    )
                item["review_status"] = "reviewed"
                item["reviewed_at"] = approved[item["id"]].get("reviewed_at", review["reviewed_at"])
    write(data_dir / "nodes.json", nodes)
    write(data_dir / "relations.json", relations)
    public_relations = [
        item for item in relations
        if item["review_status"] in {"reviewed", "published"}
        and item["evidence_status"] != "pending"
    ]
    write(data_dir / "public-relations.json", public_relations)
    print(f"assembled {len(nodes)} nodes ({len(complete)} complete) and {len(relations)} relations")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data-dir", type=Path, default=DATA,
                        help="candidate input and assembled output directory")
    main(parser.parse_args().data_dir)
