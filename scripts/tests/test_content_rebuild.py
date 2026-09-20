"""Regression checks for source migration and fail-closed deterministic rebuild."""

import hashlib
import json
from datetime import date
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

from scripts import assemble_content as assemble
from scripts import check_content_rebuild as rebuild
from scripts import normalize_research_data as normalize


class SourceRebuildTests(unittest.TestCase):
    def test_revised_node_overrides_are_explicit_and_fail_closed(self):
        base = ("base.nodes.json", {"id": "n1", "value": "base"})
        patch_record = ("patch.nodes.json", {"id": "n1", "value": "patch"})
        with self.assertRaisesRegex(SystemExit, "without explicit override"):
            assemble.resolve_revised_records([base, patch_record], {})
        resolved = assemble.resolve_revised_records(
            [base, patch_record], {"n1": "patch.nodes.json"}
        )
        self.assertEqual(resolved, [{"id": "n1", "value": "patch"}])
        with self.assertRaisesRegex(SystemExit, "has no duplicate base record"):
            assemble.resolve_revised_records([base], {"n1": "base.nodes.json"})

    def test_all_generated_fields_and_review_states_match(self):
        with TemporaryDirectory() as temporary:
            output = Path(temporary)
            rebuild.build_and_validate(output)
            self.assertEqual(rebuild.output_differences(output, normalize.DATA), [])

    def test_relation_review_dates_preserve_history_and_allow_new_batch_dates(self):
        with TemporaryDirectory() as temporary:
            output = Path(temporary)
            rebuild.build_and_validate(output)
            relations = {
                item["id"]: item
                for item in json.loads((output / "relations.json").read_text(encoding="utf-8"))
            }
            self.assertEqual(relations["rel-hall-proposed-encoding-decoding"]["reviewed_at"], "2026-09-11")
            for relation_id in (
                "rel-mcluhan-associated-medium-theory",
                "rel-decolonial-addresses-race-representation",
                "rel-political-economy-addresses-platform-governance",
            ):
                self.assertEqual(relations[relation_id]["reviewed_at"], "2026-09-14")
                self.assertEqual(relations[relation_id]["review_status"], "reviewed")
                self.assertEqual(relations[relation_id]["evidence_status"], "direct")

    def test_node_review_dates_preserve_history_and_require_explicit_whitelist(self):
        with TemporaryDirectory() as temporary:
            output = Path(temporary)
            rebuild.build_and_validate(output)
            nodes = {
                item["id"]: item
                for item in json.loads((output / "nodes.json").read_text(encoding="utf-8"))
            }
            self.assertEqual(nodes["r3-medium-theory"]["reviewed_at"], "2026-09-11")
            for node_id in ("r6-cultural-studies", "p-fang"):
                self.assertEqual(nodes[node_id]["reviewed_at"], "2026-09-14")
                self.assertEqual(nodes[node_id]["review_status"], "reviewed")
            self.assertEqual(nodes["r3-mediatization"]["review_status"], "ready_for_review")
            self.assertIsNone(nodes["r3-mediatization"]["reviewed_at"])

    def test_priority_c_nodes_have_minimum_teaching_depth(self):
        with TemporaryDirectory() as temporary:
            output = Path(temporary)
            rebuild.build_and_validate(output)
            nodes = {
                item["id"]: item
                for item in json.loads((output / "nodes.json").read_text(encoding="utf-8"))
            }
            targets = (
                "c-sensemaking",
                "c-parasocial-interaction",
                "c-attention-economy",
                "c-groupthink",
                "c-selective-exposure",
                "r6-china-global",
                "r6-chinese-minority",
                "r3-platformization",
                "r7-algorithm",
            )
            claim_fields = (
                "key_points",
                "limits_or_debates",
                "positions",
                "propositions",
                "limitations",
                "internal_differences",
            )
            for node_id in targets:
                node = nodes[node_id]
                direct_claims = sum(
                    claim.get("evidence_status") == "direct"
                    for field in claim_fields
                    for claim in node.get(field, [])
                )
                self.assertGreaterEqual(len(node.get("learning_resources", [])), 2, node_id)
                self.assertGreaterEqual(direct_claims, 2, node_id)

    def test_all_evolving_nodes_explain_current_state(self):
        with TemporaryDirectory() as temporary:
            output = Path(temporary)
            rebuild.build_and_validate(output)
            nodes = json.loads((output / "nodes.json").read_text(encoding="utf-8"))
            evolving = [node for node in nodes if node["temporal_profile"] == "evolving"]
            self.assertEqual(len(evolving), 24)
            for node in evolving:
                self.assertTrue(node.get("current_evidence_state"), node["id"])
                as_of = date.fromisoformat(node["as_of"])
                checked = date.fromisoformat(node["last_evidence_check"])
                due = date.fromisoformat(node["next_review_due"])
                self.assertLessEqual(checked, as_of, node["id"])
                self.assertGreater(due, checked, node["id"])

    def test_normalization_does_not_read_its_output(self):
        original_read = Path.read_text

        def guarded_read(path, *args, **kwargs):
            if path.resolve() == (normalize.DATA / "sources.json").resolve():
                self.fail("normalizer tried to use its output as a source input")
            return original_read(path, *args, **kwargs)

        with patch.object(Path, "read_text", guarded_read):
            sources = normalize.normalize_sources()
        self.assertEqual(len(sources), 268)
        self.assertEqual(len({item["id"] for item in sources}), 268)

    def test_scoped_full_text_upgrades_are_real_and_failed_slots_stay_empty(self):
        sources = {item["id"]: item for item in normalize.normalize_sources()}
        for source_id in (
            "Q341", "Q342", "Q343", "Q345", "Q347", "Q348", "Q349", "Q350"
        ):
            self.assertEqual(sources[source_id]["access_status"], "full_text", source_id)
        self.assertNotIn("Q344", sources)
        self.assertNotIn("Q346", sources)

        with TemporaryDirectory() as temporary:
            output = Path(temporary)
            rebuild.build_and_validate(output)
            nodes = {
                item["id"]: item
                for item in json.loads((output / "nodes.json").read_text(encoding="utf-8"))
            }
            expected = {
                "r4-two-step": "Q341",
                "r5-gatekeeping": "Q342",
                "r8-content-analysis": "Q343",
                "c-selective-exposure": "Q345",
                "c-sensemaking": "Q347",
                "r4-social-cognitive": "Q348",
                "r4-third-person-effect": "Q349",
                "r4-elaboration-likelihood": "Q350",
            }
            for node_id, source_id in expected.items():
                node = nodes[node_id]
                cited = {
                    evidence["source_id"]
                    for field in (
                        "key_points", "limits_or_debates", "positions",
                        "propositions", "limitations", "internal_differences",
                    )
                    for claim in node.get(field, [])
                    for evidence in claim.get("evidence", [])
                }
                self.assertIn(source_id, cited, node_id)
                self.assertEqual(node["review_status"], "ready_for_review", node_id)

    def test_non_home_pending_source_versions_and_authorship(self):
        sources = {item["id"]: item for item in normalize.normalize_sources()}
        updates = json.loads((normalize.RESEARCH / "non-home-pending-source-updates-2026-09-14.json").read_text())
        self.assertEqual({item["id"] for item in updates}, {"N01", "C17", "C20"})
        for record in updates:
            self.assertEqual(record, sources[record["id"]])
        self.assertEqual(sources["N01"]["year"], 1991)
        self.assertEqual(sources["N01"]["access_status"], "excerpt")
        self.assertEqual(sources["G24"]["year"], 1980)
        self.assertEqual(sources["G24"]["accessed_at"], "2026-09-11")
        self.assertEqual(sources["C17"]["authors_or_organization"], ["刘义昆", "雷雪晴"])

    def test_first_person_media_batch_preserves_status_and_rights_boundaries(self):
        with TemporaryDirectory() as temporary:
            output = Path(temporary)
            rebuild.build_and_validate(output)
            nodes = {
                item["id"]: item
                for item in json.loads((output / "nodes.json").read_text(encoding="utf-8"))
            }
            targets = (
                "p-shannon", "p-hall", "p-shaw", "p-george-herbert-mead",
                "p-noelle-neumann", "p-paul-lazarsfeld", "p-carl-hovland",
                "p-harold-innis", "p-everett-rogers", "p-wilbur-schramm",
                "p-kurt-lewin", "p-erving-goffman",
            )
            for node_id in targets:
                self.assertTrue(nodes[node_id].get("education_records"), node_id)
                self.assertIn(nodes[node_id]["review_status"], {"ready_for_review", "reviewed"})
            self.assertTrue(nodes["p-shannon"].get("portrait"))
            self.assertEqual(nodes["p-george-herbert-mead"]["portrait"]["url"], "/portraits/mead.jpg")
            self.assertTrue((normalize.ROOT / "public/portraits/mead.jpg").is_file())
            self.assertTrue(nodes["p-kurt-lewin"].get("portrait"))
            for node_id in ("p-hall", "p-shaw", "p-noelle-neumann", "p-carl-hovland"):
                self.assertNotIn("portrait", nodes[node_id], node_id)

    def test_migration_records_are_unchanged_not_reverified(self):
        records = json.loads((normalize.RESEARCH / "migrated-expansion-sources-2026-09-14.json").read_text())
        provenance = json.loads((normalize.RESEARCH / "source-migration-provenance-2026-09-14.json").read_text())
        self.assertEqual(len(records), 92)
        expected = {item["id"]: item for item in provenance["entries"]}
        self.assertEqual(set(expected), {"T001"} | {f"S{number:03}" for number in range(40, 131)})
        for record in records:
            canonical = json.dumps(record, sort_keys=True, ensure_ascii=False, separators=(",", ":"))
            self.assertEqual(hashlib.sha256(canonical.encode()).hexdigest(), expected[record["id"]]["record_sha256"])
            self.assertEqual(record["access_status"], expected[record["id"]]["access_status"])
            self.assertEqual(record["accessed_at"], expected[record["id"]]["accessed_at"])

    def test_twente_boundary_and_scoped_updates(self):
        sources = {item["id"]: item for item in normalize.normalize_sources()}
        twente = sources["T001"]
        self.assertIsNone(twente["year"])
        self.assertEqual(twente["source_type"], "teaching_resource")
        self.assertEqual(twente["accessed_at"], "2026-09-11")
        self.assertEqual(twente["access_status"], "full_text")
        self.assertIn("不替代其所引原始研究", twente["bibliographic_note"])
        updates = json.loads((normalize.RESEARCH / "home-start-source-updates-2026-09-14.json").read_text())
        for record in updates:
            self.assertEqual(record, sources[record["id"]])
        additions = json.loads((normalize.RESEARCH / "relation-source-additions-2026-09-14.json").read_text())
        self.assertEqual({record["id"] for record in additions}, {"P01", "P02", "P03"})
        for record in additions:
            self.assertEqual(record, sources[record["id"]])
            self.assertEqual(record["access_status"], "excerpt")

    def test_duplicate_and_unapproved_replacements_fail(self):
        with self.assertRaisesRegex(ValueError, "duplicate"):
            normalize.merge_source_records([], [{"id": "A01"}, {"id": "A01"}], [])
        with self.assertRaisesRegex(ValueError, "replacement mismatch"):
            normalize.merge_source_records([{"id": "A01"}], [{"id": "A01"}], [])
        with self.assertRaisesRegex(ValueError, "replacement mismatch"):
            normalize.merge_source_records([], [{"id": "A01"}], ["A01"])
        result = normalize.merge_source_records([{"id": "A01", "old": True}], [{"id": "A01", "new": True}], ["A01"])
        self.assertEqual(result, [{"id": "A01", "new": True}])

    def test_missing_input_and_output_path_input_fail(self):
        original_read = Path.read_text

        for name in ("missing-source-input.json", "../content/data/sources.json"):
            def read(path, *args, **kwargs):
                if path == normalize.RESEARCH / "source-inputs.json":
                    return json.dumps([{"path": name, "replace_ids": []}])
                return original_read(path, *args, **kwargs)
            with patch.object(Path, "read_text", read):
                with self.assertRaises((ValueError, FileNotFoundError)):
                    normalize.normalize_sources()

    def test_loss_guard_does_not_write_either_output(self):
        with TemporaryDirectory() as temporary:
            output = Path(temporary)
            normalize.write_json(output / "sources.json", [{"id": "Z999"}])
            normalize.write_json(output / "candidate-nodes.json", [{"id": "sentinel"}])
            before = {name: (output / name).read_bytes() for name in ("sources.json", "candidate-nodes.json")}
            with self.assertRaisesRegex(ValueError, "refusing to remove"):
                normalize.write_outputs(output)
            self.assertEqual(before, {name: (output / name).read_bytes() for name in before})


if __name__ == "__main__":
    unittest.main()
