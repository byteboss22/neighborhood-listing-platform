# Lab 3 generation and verification decisions

The source facts are five Codex-authored fictional listings and three fictional
sponsors in `data/fixtures/listings.synthetic.json`. They use reserved example
domains and existing original Lab 2 illustrations. They are not real rentals,
client records, geographic matching evidence or business claims.

Eric used AI Studio and supplied its report, followed by the actual JSON response
as a separate chat message. The reported model is `models/gemini-3.8-flash` and
the exact generation prompt is preserved in the [supplied report](evidence/lab3/ai-studio-generation-and-review.md).
Model/runtime settings and the reported external timestamp are attributed to that
text; no direct Studio account inspection occurred. The separate Gemini critique
uses the unchanged prepared normalization prompt as confirmed by Eric. Its model
was not supplied.

The pasted JSON was saved as `data/generated/ai-studio-attempt-01.json`, without
changing its values. It matches the source facts exactly, as requested by the
prompt. That equality does not make the original source fixture an external
generation; the two artifacts retain separate attribution and roles.

## Errors and regeneration

The first received generation is valid: five properties, three sponsors and six
derived relationships. No model failure, edited repair or regeneration is claimed.
The four required invalid examples and other boundary tests were authored as
negative fixtures, not captured model errors. Their original nonzero validation
logs remain available. If a future output is invalid, retain its raw text/errors
and use a separately recorded repair prompt/attempt instead of silently editing it.

The earlier Studio report said validate:data established Zod/Ajv success; the CLI
actually runs Zod plus cross-record checks. Codex subsequently ran the received
dataset through that CLI and independently through Ajv in a new test. That test
also checks exact source-fact preservation and successful view mapping. The page
now imports the generated JSON and validates it before rendering Lab 2 components.

## Review decisions

Codex's [Gemini evaluation](evidence/lab3/gemini/disposition.md) corrects unsupported
subsidy/habitability assertions and overly broad guarantees about normalization,
floating-point precision and schema drift. Eric confirmed retaining current
nonnegative rules and deferring stricter bathroom minima, unspecified string
limits and exported array uniqueness as future improvements. Duplicate values
and foreign-key membership remain enforced by the mandatory full validator.

The [independent verification report](evidence/lab3/generated-data-verification.json)
links actual command output: 16 tests, lint, build, TypeScript, schema export
consistency and generated-data validation all passed. No browser session,
deployment, instructor approval or completed partner work is inferred.

Eric subsequently supplied an AI Studio screenshot showing the retrieval prompt,
model label and JSON response beginning; [visual observation](evidence/lab3/ai-studio-screenshot-observation.md)
records exactly what is visible. The actual image is now saved as
[ai-studio-retrieval.png](evidence/lab3/ai-studio-retrieval.png), inspected and
hashed without image edits. Eric subsequently reported that the local page works
with no issues; [his exact statement and limits](evidence/lab3/student-review.json)
are recorded. Publication/PR and applicable demo URL remain pending. No screenshot is fabricated
from the text reports.
