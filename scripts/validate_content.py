#!/usr/bin/env python3
"""Validate schemas plus cross-record COMMPASS editorial invariants."""

from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

from jsonschema import Draft202012Validator, FormatChecker


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "content" / "data"
SCHEMA = ROOT / "content" / "schema"
REVIEWED_NODES = ROOT / "content" / "reviewed-nodes.json"
REVIEWED_RELATIONS = ROOT / "content" / "reviewed-relations.json"
COMPLETE_SELECTION = ROOT / "content" / "complete-node-selection.json"
CORE_FOREIGN_PEOPLE = ROOT / "content" / "core-foreign-person-selection.json"
CORE_CHINESE_PEOPLE = ROOT / "content" / "core-chinese-person-selection.json"

AREAS = {
    "communication", "meaning", "media_society", "effects", "institutions",
    "power_culture", "digital_ai", "research_application",
}
NODE_TYPES = {
    "tradition", "person", "theory_model", "concept", "research_topic",
    "method", "application",
}
ENDPOINT_RULES = {
    "proposed": ({"person"}, {"theory_model", "concept"}),
    "developed": ({"person"}, {"theory_model", "concept"}),
    "associated_with": ({"person"}, {"tradition"}),
    "criticizes": ({"person", "theory_model", "tradition"}, {"theory_model", "concept", "tradition"}),
    "has_concept": ({"theory_model", "tradition"}, {"concept"}),
    "addresses": ({"theory_model", "concept", "tradition"}, {"research_topic"}),
    "used_in": ({"method"}, {"research_topic", "application"}),
    "applied_to": ({"theory_model", "concept"}, {"application"}),
}


def read(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def duplicate_values(values):
    counts = Counter(values)
    return sorted(value for value, count in counts.items() if count > 1)


def schema_errors(items, schema_name: str, label: str) -> list[str]:
    validator = Draft202012Validator(read(SCHEMA / schema_name), format_checker=FormatChecker())
    errors = []
    for index, item in enumerate(items):
        for error in validator.iter_errors(item):
            where = ".".join(str(part) for part in error.path)
            errors.append(f"{label}[{index}] {where}: {error.message}")
    return errors


def all_claims(node):
    for key in ("key_points", "limits_or_debates", "positions", "propositions", "limitations", "internal_differences"):
        for claim in node.get(key, []):
            if isinstance(claim, dict):
                yield claim


def main() -> int:
    nodes = read(DATA / "nodes.json")
    relations = read(DATA / "relations.json")
    public_relations = read(DATA / "public-relations.json")
    sources = read(DATA / "sources.json")
    errors = []
    errors += schema_errors(nodes, "node.schema.json", "nodes")
    errors += schema_errors(relations, "relation.schema.json", "relations")
    errors += schema_errors(public_relations, "relation.schema.json", "public_relations")
    errors += schema_errors(sources, "source.schema.json", "sources")

    node_ids = {item["id"] for item in nodes}
    source_ids = {item["id"] for item in sources}
    node_by_id = {item["id"]: item for item in nodes}
    if len(nodes) < 80:
        errors.append(f"expected at least the original 80 nodes, got {len(nodes)}")
    selected_complete_ids = set(read(COMPLETE_SELECTION))
    actual_complete_ids = {item["id"] for item in nodes if item["record_level"] == "complete"}
    if actual_complete_ids != selected_complete_ids:
        errors.append(
            "complete-node selection mismatch: "
            f"expected {sorted(selected_complete_ids)}, got {sorted(actual_complete_ids)}"
        )

    core_foreign_people = read(CORE_FOREIGN_PEOPLE)
    if len(core_foreign_people) != 30:
        errors.append(f"foreign core-person roster must contain 30 ids, got {len(core_foreign_people)}")
    if dups := duplicate_values(core_foreign_people):
        errors.append(f"duplicate foreign core-person ids: {dups}")
    for person_id in core_foreign_people:
        if person_id not in node_by_id:
            errors.append(f"foreign core-person roster has missing node {person_id}")
        elif node_by_id[person_id]["type"] != "person":
            errors.append(f"foreign core-person roster contains non-person node {person_id}")

    core_chinese_people = read(CORE_CHINESE_PEOPLE)
    if dups := duplicate_values(core_chinese_people):
        errors.append(f"duplicate Chinese core-person ids: {dups}")
    overlap = sorted(set(core_foreign_people) & set(core_chinese_people))
    if overlap:
        errors.append(f"foreign and Chinese core-person rosters overlap: {overlap}")
    for person_id in core_chinese_people:
        if person_id not in node_by_id:
            errors.append(f"Chinese core-person roster has missing node {person_id}")
        elif node_by_id[person_id]["type"] != "person":
            errors.append(f"Chinese core-person roster contains non-person node {person_id}")
    if dups := duplicate_values(item["id"] for item in nodes):
        errors.append(f"duplicate node ids: {dups}")
    if dups := duplicate_values(item["slug"] for item in nodes):
        errors.append(f"duplicate node slugs: {dups}")
    if dups := duplicate_values(item["id"] for item in sources):
        errors.append(f"duplicate source ids: {dups}")
    if dups := duplicate_values(item["id"] for item in relations):
        errors.append(f"duplicate relation ids: {dups}")

    primary_areas = {
        membership["area_id"]
        for node in nodes
        for membership in node["area_memberships"]
        if membership["is_primary"]
    }
    represented_types = {item["type"] for item in nodes}
    complete_types = {item["type"] for item in nodes if item["record_level"] == "complete"}
    if primary_areas != AREAS:
        errors.append(f"primary-area coverage mismatch: {sorted(primary_areas)}")
    if represented_types != NODE_TYPES:
        errors.append(f"node-type coverage mismatch: {sorted(represented_types)}")
    if complete_types != NODE_TYPES:
        errors.append(f"complete-node type coverage mismatch: {sorted(complete_types)}")

    if REVIEWED_NODES.exists():
        selection = read(REVIEWED_NODES)
        expected = set(selection["reviewed_eligible"])
        reviewed_dates = selection.get("reviewed_at_by_id", {})
        actual = {item["id"] for item in nodes if item["review_status"] == "reviewed"}
        if actual != expected:
            errors.append(f"reviewed-node selection mismatch: expected {sorted(expected)}, got {sorted(actual)}")
        for item in nodes:
            expected_date = reviewed_dates.get(item["id"], selection["reviewed_at"])
            if item["id"] in expected and item.get("reviewed_at") != expected_date:
                errors.append(f"{item['id']} reviewed_at does not match reviewed-nodes.json")

    if REVIEWED_RELATIONS.exists():
        selection = read(REVIEWED_RELATIONS)
        approved_items = {item["id"]: item for item in selection["reviewed_eligible"]}
        approved_layers = {item_id: item["layer"] for item_id, item in approved_items.items()}
        expected = set(approved_layers)
        actual = {item["id"] for item in relations if item["review_status"] == "reviewed"}
        if actual != expected:
            errors.append(f"reviewed-relation selection mismatch: expected {sorted(expected)}, got {sorted(actual)}")
        for item in relations:
            expected_date = approved_items.get(item["id"], {}).get("reviewed_at", selection["reviewed_at"])
            if item["id"] in expected and item.get("reviewed_at") != expected_date:
                errors.append(f"{item['id']} reviewed_at does not match reviewed-relations.json")
            if item["id"] in expected:
                expected_status = "direct" if approved_layers[item["id"]] == "default" else "interpretive"
                if item["evidence_status"] != expected_status:
                    errors.append(
                        f"{item['id']} evidence layer differs from reviewed-relations.json: "
                        f"expected {expected_status}, got {item['evidence_status']}"
                    )
        public_ids = {item["id"] for item in public_relations}
        if public_ids != expected:
            errors.append(f"public relation selection mismatch: expected {sorted(expected)}, got {sorted(public_ids)}")
        if any(item["evidence_status"] == "pending" for item in public_relations):
            errors.append("public-relations.json contains a pending relation")
        relation_by_id = {item["id"]: item for item in relations}
        for item in public_relations:
            if item != relation_by_id.get(item["id"]):
                errors.append(f"public relation {item['id']} differs from its reviewed editorial record")

    for node in nodes:
        for source_id in node.get("source_leads", []):
            if source_id not in source_ids:
                errors.append(f"{node['id']} missing source lead {source_id}")
        for resource in node.get("learning_resources", []):
            if resource["source_id"] not in source_ids:
                errors.append(f"{node['id']} missing learning source {resource['source_id']}")
        for link in node.get("learning_links", []):
            if link["target_id"] not in node_ids:
                errors.append(f"{node['id']} missing learning target {link['target_id']}")
        for claim in all_claims(node):
            for evidence in claim.get("evidence", []):
                if evidence["source_id"] not in source_ids:
                    errors.append(f"{node['id']} claim {claim.get('id')} missing source {evidence['source_id']}")
            if node["review_status"] in {"reviewed", "published"} and claim.get("evidence_status") == "pending":
                errors.append(f"{node['id']} reviewed node contains pending claim {claim.get('id')}")

    symmetric_pairs = set()
    for relation in relations:
        source_id, target_id = relation["source_id"], relation["target_id"]
        if source_id not in node_ids or target_id not in node_ids:
            errors.append(f"{relation['id']} has missing endpoint {source_id}->{target_id}")
            continue
        source_type = node_by_id[source_id]["type"]
        target_type = node_by_id[target_id]["type"]
        relation_type = relation["relation_type"]
        if relation_type in ENDPOINT_RULES:
            allowed_source, allowed_target = ENDPOINT_RULES[relation_type]
            if source_type not in allowed_source or target_type not in allowed_target:
                errors.append(f"{relation['id']} invalid endpoint types: {source_type} {relation_type} {target_type}")
        if source_id == target_id:
            errors.append(f"{relation['id']} is a self relation")
        if relation_type == "contrasts_with":
            pair = tuple(sorted((source_id, target_id)))
            if pair in symmetric_pairs:
                errors.append(f"duplicate symmetric contrast: {pair}")
            symmetric_pairs.add(pair)
        for evidence in relation["evidence"]:
            if evidence["source_id"] not in source_ids:
                errors.append(f"{relation['id']} missing source {evidence['source_id']}")
        if relation["review_status"] in {"reviewed", "published"} and relation["evidence_status"] == "pending":
            errors.append(f"{relation['id']} reviewed relation is pending")

    if errors:
        print(f"FAILED: {len(errors)} content errors")
        for error in errors:
            print(f"- {error}")
        return 1
    print(
        f"PASS: {len(nodes)} nodes / {sum(n['record_level']=='complete' for n in nodes)} complete / "
        f"{len(relations)} relations / {len(sources)} sources / 8 areas / 7 types"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
