#!/usr/bin/env python3
"""Create a node-by-node depth audit without confusing schema completeness with expert review."""

from __future__ import annotations

import json
import argparse
from collections import Counter
from datetime import date, datetime
from pathlib import Path
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]
NODES = ROOT / "content" / "data" / "nodes.json"
OUTPUT = ROOT / "content" / "reviews" / "content-depth-audit.md"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--as-of", type=date.fromisoformat,
        default=datetime.now(ZoneInfo("Asia/Shanghai")).date(),
        help="审计快照日期 YYYY-MM-DD，默认使用当前北京时间；不修改来源访问日期。",
    )
    args = parser.parse_args()
    nodes = json.loads(NODES.read_text(encoding="utf-8"))
    relation_path = ROOT / "content" / "data" / "public-relations.json"
    public_relations = json.loads(relation_path.read_text(encoding="utf-8")) if relation_path.exists() else []
    rows = []
    for node in nodes:
        claims = [
            claim
            for field in (
                "key_points",
                "limits_or_debates",
                "positions",
                "propositions",
                "limitations",
                "internal_differences",
            )
            for claim in node.get(field, [])
        ]
        resources = len(node.get("learning_resources", []))
        links = len(node.get("learning_links", []))
        direct = sum(claim.get("evidence_status") == "direct" for claim in claims)
        pending = sum(claim.get("evidence_status") == "pending" for claim in claims)
        relations = sum(
            item["source_id"] == node["id"] or item["target_id"] == node["id"]
            for item in public_relations
        )
        gaps = []
        if resources < 2:
            gaps.append("学习资源记录不足 2 项")
        if links < 3:
            gaps.append("不足 3 条可解释学习路径")
        if direct < 2:
            gaps.append("直接证据命题不足 2 条")
        if relations == 0:
            gaps.append("无已复核文献关系")
        if pending:
            gaps.append(f"含 {pending} 条待核主张")
        level = "A" if not gaps else "B" if len(gaps) <= 2 and not pending else "C"
        rows.append((level, node, resources, links, direct, relations, pending, gaps))

    counts = Counter(row[0] for row in rows)
    maturity = Counter(node["review_status"] for node in nodes)
    record_levels = Counter(node["record_level"] for node in nodes)
    lines = [
        "# 传播指南针内容深度审计",
        "",
        f"> 生成日期：{args.as_of.isoformat()}（Asia/Shanghai）。本报告区分字段齐全、编辑状态与可程序观察的内容缺口；A/B/C 是编辑排队，不是学术价值或审核等级。",
        "",
        "## 口径",
        "",
        "- A：至少 2 项学习资源记录、3 条学习链接、2 条标记为 direct 的主张、1 条已复核文献关系，且无 pending 主张。",
        "- B：上述口径中尚缺 1—2 项，可按专题批次补足。",
        "- C：存在 3 项以上缺口，或仍含待核主张，应优先复核。",
        "- 以上只核数量和登记状态，不自动验证资源分层、链接理由质量或来源是否真正支持主张；A 也不等于已审核。零关系可以是合理编辑决定，不为升级 A 而补边。",
        "",
        "## 数据成熟度",
        "",
        f"- 节点 {len(nodes)}；字段齐全（complete）{record_levels['complete']}；候选（candidate）{record_levels['candidate']}。",
        f"- 已审核（reviewed）{maturity['reviewed']}；已发布（published）{maturity['published']}；待审核（ready_for_review）{maturity['ready_for_review']}；草稿（draft）{maturity['draft']}；需修订（needs_revision）{maturity['needs_revision']}。",
        f"- pending 主张 {sum(row[6] for row in rows)} 项，分布于 {sum(bool(row[6]) for row in rows)} 个节点；公开关系 {len(public_relations)} 条。",
        "",
        f"## 总览：A {counts['A']} 个 / B {counts['B']} 个 / C {counts['C']} 个",
        "",
        "| 优先级 | 节点 | 类型 | 学习资源 | 路径 | 直接证据命题 | 文献关系 | 待核 | 下一步 |",
        "|---|---|---:|---:|---:|---:|---:|---:|---|",
    ]
    for level, node, resources, links, direct, relations, pending, gaps in sorted(
        rows, key=lambda row: ({"C": 0, "B": 1, "A": 2}[row[0]], row[1]["type"], row[1]["name_zh"])
    ):
        next_step = "；".join(gaps) if gaps else ("保持复核；继续抽查教学深度" if node["review_status"] in {"reviewed", "published"} else "提交独立内容审核；数量达标不代表定稿")
        lines.append(
            f"| {level} | {node['name_zh']} (`{node['id']}`) | {node['type']} | "
            f"{resources} | {links} | {direct} | {relations} | {pending} | {next_step} |"
        )
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {OUTPUT}: A={counts['A']} B={counts['B']} C={counts['C']}")


if __name__ == "__main__":
    main()
