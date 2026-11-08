# Student-supplied AI Studio generation

`ai-studio-attempt-01.json` contains the JSON Eric pasted as AI Studio's original
first attempt. It was saved without altering values; the [verification report](../../docs/evidence/lab3/generated-data-verification.json)
records its SHA-256, independent local checks and equality to the fictional source
facts. Identical values are expected because the prompt requested preservation
of all source facts. The original `data/fixtures/listings.synthetic.json` remains
separately labeled Codex-authored source/test data.

Model, timestamp and external execution details are attributed to the
[student-supplied Studio report](../../docs/evidence/lab3/ai-studio-generation-and-review.md),
not independently observed Studio UI state. The dataset was not reconstructed
from that report or silently repaired. The received first attempt passed locally;
no failed generation or regeneration cycle is invented. Authored invalid fixtures
remain separate from the model output.

The page now imports this dataset through `listingView`. Zod and cross-record
checks run at the boundary; the test suite independently validates it with Ajv
and verifies source-fact preservation. Do not edit the stored response to hide a
future validation failure. Save future attempts separately if needed.

An AI Studio retrieval screenshot was subsequently supplied in chat; its
[observation record](../../docs/evidence/lab3/ai-studio-screenshot-observation.md)
records its scope and links the actual image, now saved and inspected. Never
commit account details, credentials or personal information with the evidence.
