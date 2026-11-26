# Lab 6 local security review

Actual checks: [integration report](../evidence/lab6/integration/validation.json),
[database tests](../../tests/lab6-database.test.ts), [SDK/route tests](../../tests/lab6-routes.test.ts),
[browser tests](../../tests/lab6-placement.spec.ts). No live audit or instructor approval.

- Anonymous SELECT/RPC: approved/active/date/placement/geography eligible public
  candidates only. Actual SQL returns ZIP/radius/house outcomes; missing property
  and invalid placement return no rows. Internal notes denied.
- Ordinary authenticated owner/client/admin-label: no campaign editing or event
  reads; coordinate writes and internal-note reads denied. Admin profile alone
  never supplies the elevated credential.
- Trusted service role: may inspect stored event rows; duplicate UUID stores only
  one event. Schema has only event UUID, sponsor ID, placement, coarse page context
  and timestamp. Public direct reads/writes denied; narrow validated RPC only.
- Inactive/expired/geographically wrong placement: excluded by query and event
  capability; forged/nonwinning sponsor rejected again by HTTP handler.
- Public query is security-invoker; event insertion is a pinned, narrow definer
  capability. No service-role client in request handlers, no request-supplied
  destination/location/clock, no identity or sensitive targeting.
- Unsafe URL/currently ineligible sponsor never yields Location. Click destination
  is independently resolved from freshly validated stored record, no-referrer.
- Invalid/duplicate query keys, extra impression fields and unsupported timestamp
  precision fail safely. Oversized candidate result fails rather than truncating
  winner choice. Raw SQL/server errors are not returned.

Limits: anonymous event reports can be fabricated, so not billing/unique-viewer
metrics; direct RPC checks eligibility rather than winner rank. No hosted request
log/retention configuration or scheduled cleanup was changed. Tests prove local
behavior only. Use fictional data and dedicated development configuration.
