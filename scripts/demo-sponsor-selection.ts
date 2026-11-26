import assert from "node:assert/strict";
import fixture from "../data/fixtures/lab6-sponsors.synthetic.json";
import { selectSponsor } from "../src/lib/selectSponsor";

assert.equal(fixture.synthetic, true);
for (const property of fixture.properties) {
  const decision = selectSponsor(property.context, fixture.candidates);
  assert.equal(decision.kind === "sponsor" ? decision.sponsor_id : null, property.expected_sponsor_id);
  console.log(JSON.stringify({ property_id: property.property_id, decision }));
}
