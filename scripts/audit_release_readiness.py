#!/usr/bin/env python3
"""Generate a reproducible editorial and graph-readiness queue for the next release."""

from __future__ import annotations

import json
from collections import Counter
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "content" / "data"
OUTPUT = ROOT / "content" / "reviews" / "release-readiness-audit.md"
CLAIM_FIELDS = (
    "key_points",
    "limits_or_debates",
    "positions",
    "propositions",
    "limitations",
    "internal_differences",
)
STRONG_ACCESS = {"full_text", "excerpt"}


def read(name: str):
    return json.loads((DATA / name).read_text(encoding="utf-8"))


def claims(node: dict) -> list[dict]:
    return [claim for field in CLAIM_FIELDS for claim in node.get(field, [])]


def names(items: list[dict]) -> str:
    return "、".join(item["name_zh"] for item in items) or "无"


def main() -> None:
    nodes = read("nodes.json")
    sources = read("sources.json")
    relations = read("public-relations.json")
    source_by_id = {source["id"]: source for source in sources}

    pending_nodes = []
    weak_claim_nodes = []
    evolving_missing = []
    for node in nodes:
        pending = [claim for claim in claims(node) if claim.get("evidence_status") == "pending"]
        if pending:
            pending_nodes.append((node, len(pending)))

        weak_direct = []
        for claim in claims(node):
            if claim.get("evidence_status") != "direct" or not claim.get("evidence"):
                continue
            cited = [source_by_id.get(item["source_id"]) for item in claim["evidence"]]
            access = {source.get("access_status") for source in cited if source}
            if access and access.isdisjoint(STRONG_ACCESS):
                weak_direct.append(claim)
        if weak_direct:
            weak_claim_nodes.append((node, len(weak_direct)))

        if node.get("temporal_profile") == "evolving" and not node.get("current_evidence_state"):
            evolving_missing.append(node)

    direct_relations = [relation for relation in relations if relation["evidence_status"] == "direct"]
    direct_degree = Counter()
    for relation in direct_relations:
        direct_degree[relation["source_id"]] += 1
        direct_degree[relation["target_id"]] += 1
    zero_direct = [node for node in nodes if direct_degree[node["id"]] == 0]
    one_direct = [node for node in nodes if direct_degree[node["id"]] == 1]

    people = [node for node in nodes if node["type"] == "person"]
    no_portrait = [node for node in people if not node.get("portrait")]
    no_education = [node for node in people if not node.get("education_records")]

    lines = [
        "# COMMPASS 发布准备度审计",
        "",
        f"> 生成日期：{date.today().isoformat()}。这是编辑排队工具，不是对知识价值的评分，也不代表专家审核结论。",
        "",
        "## 总览",
        "",
        f"- 节点：{len(nodes)}；已审核：{sum(node['review_status'] in {'reviewed', 'published'} for node in nodes)}。",
        f"- 待核表述：{sum(count for _, count in pending_nodes)} 条，分布于 {len(pending_nodes)} 个节点。",
        f"- 直接关系：{len(direct_relations)}；零条直接关系节点：{len(zero_direct)}；仅一条：{len(one_direct)}。",
        f"- 仅由摘要／元数据等较弱访问层支持的直接表述：{sum(count for _, count in weak_claim_nodes)} 条，分布于 {len(weak_claim_nodes)} 个节点。",
        f"- 演变中节点缺少“当前证据状态”：{len(evolving_missing)}。",
        f"- 人物：{len(people)}；缺少肖像：{len(no_portrait)}；缺少教育经历：{len(no_education)}。",
        "",
        "## P0：待核表述",
        "",
        "| 节点 | 待核条数 |",
        "|---|---:|",
    ]
    lines.extend(f"| {node['name_zh']} (`{node['id']}`) | {count} |" for node, count in pending_nodes)
    lines.extend(
        [
            "",
            "## P1：演变中节点缺少当前证据状态",
            "",
            names(evolving_missing),
            "",
            "## P1：直接证据关系覆盖",
            "",
            f"零条直接关系：{names(zero_direct)}",
            "",
            f"仅一条直接关系：{names(one_direct)}",
            "",
            "## P1：需要提升访问证据强度的节点",
            "",
            "| 节点 | 表述条数 |",
            "|---|---:|",
        ]
    )
    lines.extend(f"| {node['name_zh']} (`{node['id']}`) | {count} |" for node, count in weak_claim_nodes)
    lines.extend(
        [
            "",
            "## P2：人物资料覆盖",
            "",
            f"缺少肖像：{names(no_portrait)}",
            "",
            f"缺少教育经历：{names(no_education)}",
            "",
            "## 使用说明",
            "",
            "- 直接关系为 `public-relations.json` 中 `evidence_status=direct` 的关系；教学整理关系不计入此覆盖指标。",
            "- “较弱访问层”只表示当前登记未包含全文或可定位摘录，不能据此判定表述错误。",
            "- 肖像与教育经历的缺失只进入资料队列；补充时仍须核对来源、授权和传播学相关性。",
        ]
    )
    OUTPUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {OUTPUT}")


if __name__ == "__main__":
    main()
