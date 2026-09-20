#!/usr/bin/env python3
"""Normalize audited research CSVs into schema-shaped JSON.

This is intentionally deterministic: it adds no academic claims and preserves
the original research CSVs as provenance records.
"""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path

from jsonschema import Draft202012Validator, FormatChecker


ROOT = Path(__file__).resolve().parents[1]
RESEARCH = ROOT / "research"
DATA = ROOT / "content" / "data"

SOURCE_TYPE_MAP = {
    "normative_framework": "official_record",
    "discipline_taxonomy": "official_record",
    "curriculum_current": "official_record",
    "handbook_background": "scholarly_synthesis",
    "discipline_history": "scholarly_synthesis",
}

# Conservative corrections identified by the independent content review. These
# narrow claims about what was actually read; they never upgrade access.
SOURCE_TYPE_OVERRIDES = {
    "G20": "scholarly_synthesis",
    "NB13": "scholarly_synthesis",
    "NB14": "scholarly_synthesis",
}
ACCESS_STATUS_OVERRIDES = {
    "G16": "full_text",
    "G17": "full_text",
    "G22": "excerpt",
    "G23": "full_text",
    "G24": "excerpt",
    "G25": "abstract",
    "C13": "excerpt",
    "C15": "excerpt",
    "C16": "excerpt",
    "C19": "excerpt",
    "NB01": "metadata",
    "NB02": "full_text",
    "NB03": "metadata",
    "NB04": "excerpt",
    "NB05": "abstract",
    "NB06": "abstract",
    "NB07": "full_text",
    "NB08": "abstract",
    "NB09": "metadata",
    "NB10": "full_text",
    "NB11": "full_text",
    "NB12": "metadata",
    "NB13": "abstract",
    "NB14": "abstract",
    "NB15": "excerpt",
    "NB16": "excerpt",
    "N-CN-09": "excerpt",
}

ACCESSED_AT_OVERRIDES = {
    "C13": "2026-09-11",
    "C15": "2026-09-11",
    "C16": "2026-09-11",
}

VERIFICATION_NOTES = {
    "G16": "2026-09-11 已核机构仓储 21 页 PDF；PDF 3-5 页为流程与代码不对称，17-19 页为四种理想型位置。",
    "G17": "2026-09-11 已核经原刊许可的重印全文 pp.105-117；对应原刊 pp.176-187。",
    "G22": "2026-09-11 已核 SAGE 搜索索引所示印刷页 145-146 原文片段；未取得稳定整篇下载。",
    "G23": "2026-09-11 已核日内瓦大学保存的全文 PDF，印刷页 49-55。",
    "G24": "2026-09-11 仅核机构 PDF 搜索索引片段，足以支持 p.57 的起点叙事限制；范式比较仍待全文。",
    "G25": "2026-09-11 已核正式摘要及作者维护的编码者间信度说明；未核原刊正文 PDF。",
    "NB02": "2026-09-11 已核哈佛大学保存的 55 页校正版重印 PDF，Introduction 与 Figure 1 位于 PDF 1-2 页。",
    "NB04": "2026-09-11 已核章节 PDF 的文内第 5 页片段；整章访问不稳定。",
    "NB07": "2026-09-11 已核可检索全文，Social Text 25/26 (1990), pp.56-80。",
    "NB10": "2026-09-11 已核国家互联网信息办公室正式全文。",
    "NB11": "2026-09-11 已核国家互联网信息办公室正式全文。",
    "NB13": "2026-09-11 已核 SAGE 官方摘要、目录与预览中的章节起页；未核完整正文。",
    "C13": "2026-09-11 已核页面所列 2020-2023 年课程说明片段；不代表全国高校课程常态。",
    "C15": "2026-09-11 官网显示出版时间 2021-08-26、ISBN 978-7-04-054419-0；已核图书简介与目录，非全书正文。",
    "C16": "2026-09-11 已核第四节首段与正文末段；它是后出学术史综述，不是 1982 年会议原件。",
    "C19": "2026-09-11 已核出版社图书简介与目录，非全书正文。",
    "C20": "2026-09-11 已核：页面为 2017 年刊载的 2009 年口述自述；履历位于‘早年工作经历及见闻’，著述说明位于改革开放后研究段落。",
    "N-CN-04": "2026-09-11 已核全文：通史阶段性成果说明在 pp.102-103，史料、第一手材料与个案研究在 p.104。",
    "N-CN-09": "2026-09-11 仅核综述片段，不作为独立实证验证。",
    "N-PR-04": "2026-09-11 已核 PRSA 页面中的专业价值与信息披露栏目。",
    "GA02": "2026-09-11 再核 Wiley 官方摘要，含 Medium theory 与泛称 media theory 的边界及媒介环境定义。",
    "GA03": "2026-09-11 再核 Cambridge Core 开篇摘录与 pp.457-476 书目信息。",
    "GA04": "2026-09-11 已核 MIT 站点所存第一章 18 页 PDF；PDF 1-2 页直接覆盖媒介改变 scale/pace/pattern，以及铁路与电灯例证。MIT Press 书目页用于版本信息。",
    "GA05": "2026-09-11 再核 Birmingham 档案目录及 Administrative History 全页面。",
    "GA06": "2026-09-11 再核 SAGE 官方摘要，含对一维接收框架的批评与六维模型概述。",
    "GA07": "2026-09-11 已核 Open Research Online 所存 5 页 accepted manuscript；文内 pp.1-4 覆盖霍尔的文化研究、表征、身份、种族及阶段性贡献。",
    "GA08": "2026-09-11 再核 Open University Digital Archive 人物页面。",
}


def rows(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def write_json(path: Path, value: object) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def load_id_map() -> dict[str, str]:
    return {r["temporary_id"]: r["canonical_id"] for r in rows(RESEARCH / "source-id-map.csv")}


def normalize_legacy_sources() -> list[dict[str, object]]:
    id_map = load_id_map()
    result = []
    for row in rows(RESEARCH / "source-register-node-drafts.csv"):
        source_id = id_map.get(row["id"], row["id"])
        names = [item.strip() for item in row["authors_or_organization"].split("|") if item.strip()]
        if not names:
            names = [row["publisher_or_venue"]]
        note = row["bibliographic_note"] or None
        if row["id"] == "NB01" and note:
            note = note.replace("获准重印版本合集", "重印版本合集")
        if row["id"] in VERIFICATION_NOTES:
            note = f"{note}；{VERIFICATION_NOTES[row['id']]}" if note else VERIFICATION_NOTES[row["id"]]
        item = {
            "id": source_id,
            "source_type": SOURCE_TYPE_OVERRIDES.get(
                row["id"], SOURCE_TYPE_MAP.get(row["source_type"], row["source_type"])
            ),
            "title": row["title"],
            "authors_or_organization": names,
            "year": int(row["year"]) if row["year"] else None,
            "publisher_or_venue": row["publisher_or_venue"],
            "doi": row["doi"] or None,
            "url": row["url"],
            "language": row["language"],
            "accessed_at": ACCESSED_AT_OVERRIDES.get(row["id"], row["accessed_at"]),
            "access_status": ACCESS_STATUS_OVERRIDES.get(row["id"], row["access_status"]),
            "bibliographic_note": note,
        }
        result.append(item)
    return result


def merge_source_records(base: list[dict], incoming: list[dict], replace_ids: list[str]) -> list[dict]:
    """No silent deduplication or last-writer-wins: replacements are explicit."""
    by_id = {item["id"]: item for item in base}
    incoming_ids = [item["id"] for item in incoming]
    if len(by_id) != len(base) or len(set(incoming_ids)) != len(incoming_ids):
        raise ValueError("duplicate source ID in source input")
    if len(set(replace_ids)) != len(replace_ids):
        raise ValueError("duplicate replacement ID in source manifest")
    overlap = set(incoming_ids) & by_id.keys()
    if overlap != set(replace_ids):
        raise ValueError(f"source replacement mismatch: overlap={sorted(overlap)}, approved={sorted(replace_ids)}")
    # Dict updates preserve the original position; genuine additions append.
    by_id.update({item["id"]: item for item in incoming})
    return list(by_id.values())


def normalize_sources() -> list[dict[str, object]]:
    """Rebuild only from declared research inputs, never from generated output."""
    result = normalize_legacy_sources()
    manifest = json.loads((RESEARCH / "source-inputs.json").read_text(encoding="utf-8"))
    seen_paths = set()
    for entry in manifest:
        path = (RESEARCH / entry["path"]).resolve()
        if not path.is_relative_to(RESEARCH.resolve()) or path in seen_paths:
            raise ValueError(f"invalid or duplicate source input: {entry['path']}")
        seen_paths.add(path)
        incoming = json.loads(path.read_text(encoding="utf-8"))
        result = merge_source_records(result, incoming, entry["replace_ids"])
    schema = json.loads((ROOT / "content/schema/source.schema.json").read_text(encoding="utf-8"))
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    for item in result:
        validator.validate(item)
    if len({item["id"] for item in result}) != len(result):
        raise ValueError("duplicate source ID in normalized sources")
    return result


def normalize_candidates() -> list[dict[str, object]]:
    result = []
    for row in rows(RESEARCH / "candidate-nodes.normalized.csv"):
        primary = row["primary_area"]
        secondary = [item for item in row["secondary_areas"].split("|") if item]
        areas = [{
            "area_id": primary,
            "is_primary": True,
            "rationale": row["editorial_note"],
        }]
        areas.extend({
            "area_id": area,
            "is_primary": False,
            "rationale": f"次级导航入口；具体归属理由将在完整节点审核时补充。",
        } for area in secondary)
        item = {
            "id": row["node_id"],
            "slug": row["node_id"],
            "record_level": "candidate",
            "type": row["type"],
            "subtype": row["subtype"] or None,
            "name_zh": row["name_zh"],
            "name_original": row["name_original"] or None,
            "candidate_note": row["editorial_note"],
            "candidate_evidence_status": row["evidence_status"],
            "source_leads": [item for item in row["source_leads"].split("|") if item],
            "aliases": [],
            "area_memberships": areas,
            "temporal_profile": row["temporal_profile"],
            "controversy_status": row["controversy_status"],
            "review_status": "draft",
            "created_at": "2026-09-11",
            "updated_at": "2026-09-11",
            "reviewed_at": None,
        }
        if row["temporal_profile"] == "evolving":
            item.update({
                # Candidate creation dates are not evidence checks. These remain
                # explicit nulls until a reviewer has checked the scoped content.
                "as_of": None,
                "last_evidence_check": None,
                "next_review_due": None,
            })
        result.append(item)
    return result


def write_outputs(output_dir: Path = DATA) -> None:
    sources = normalize_sources()
    candidates = normalize_candidates()
    previous_path = output_dir / "sources.json"
    if previous_path.exists():
        previous = json.loads(previous_path.read_text(encoding="utf-8"))
        removed = {item["id"] for item in previous} - {item["id"] for item in sources}
        if removed:
            raise ValueError(f"refusing to remove registered sources: {sorted(removed)}")
    # Calculate and validate both outputs before either is written.
    output_dir.mkdir(parents=True, exist_ok=True)
    write_json(output_dir / "sources.json", sources)
    write_json(output_dir / "candidate-nodes.json", candidates)
    print(f"normalized {len(sources)} sources and {len(candidates)} candidates")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", type=Path, default=DATA,
                        help="isolated output directory; defaults to content/data")
    args = parser.parse_args()
    write_outputs(args.output_dir)


if __name__ == "__main__":
    main()
