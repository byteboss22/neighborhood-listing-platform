# GitHub planning — Project link recorded, item verification pending

Required columns: **Backlog, Ready, In Progress, Review, Done**. Product stories
US-01..US-10 are Backlog until the team confirms owners/criteria and dependencies.
The Lab 4 draft package itself can be Review after publication; writing stories
does not make their product implementation Done.

## Project setup

Create or identify a GitHub Project for this repository/course team; record its
actual URL here. Configure the five Status values and a board grouped by Status.
Add story items from [the backlog](backlog.md), preserving source IDs, estimates,
priority and proposed owner. A [CSV](board-items.csv) is a manual entry aid, not
evidence a live Project exists or a guarantee of a built-in import feature.

The current GitHub CLI token previously lacked read:project scope. Project writes
need suitable access (usually project scope). No login/scope change or board is
claimed here. The owner can use their signed-in GitHub UI, or explicitly authorize
the required CLI authentication update after reviewing the prepared content.

## Planning issue body — prepared for publication

Title: Lab 4 Team B planning — simulated discovery and requirements

Purpose: review the assisted draft on lab4/discovery-requirements and produce
genuine student contributions. All interviews are simulated. No real outreach,
participant consent, instructor approval or completed teammate work is claimed.

- [x] Grace contribution merged in PR #8; reviews/edits questions and consent; opens
      own PR into the shared Lab 4 branch with actual decisions.
- [x] Vanessa contribution merged in PR #9; reviews/edits personas and workflow; opens
      own PR into the shared Lab 4 branch with actual decisions.
- [x] Actual Studio output and assisted source comparison retained; Eric accepted
      review decisions. Exact submitted prompt remains unconfirmed.
- [ ] Team confirms proposed owners, role rotation, priorities and policy choices.
- [ ] Create/verify Project with the five required columns and real item URLs.
- [ ] Review traceability, simulation/assumption labels, approval boundaries,
      privacy and real individual contributions.
- [ ] Open/finalize Lab 4 PR and prepare Canvas links/evidence statement.

Workload is planned among Eric, Grace and Vanessa at Eric's request. The assignment
still lists Estevan; no formal roster change or instructor acceptance is claimed.
Use plaintext names rather than inventing assignees or tagging absent users.

## Actual publication records

- Project URL supplied by Eric: https://github.com/users/byteboss22/projects/2/views/1
- Team planning issue: https://github.com/byteboss22/neighborhood-listing-platform/issues/6
- Shared Lab 4 PR (draft): https://github.com/byteboss22/neighborhood-listing-platform/pull/7
- Grace: [PR #8](https://github.com/byteboss22/neighborhood-listing-platform/pull/8),
  merged into shared Lab 4 at `c48e31d`, authored commit `2b0283e`.
- Vanessa: [PR #9](https://github.com/byteboss22/neighborhood-listing-platform/pull/9), merged at `e0c7705`,
  authored commits `3424692` and `70f7678`.

## Current board access — November 23, 2026

`gh project list --owner byteboss22 --format json` failed because the CLI token
lacks `read:project`. No board has been created or verified. To finish in GitHub's
signed-in UI, create a Project for the repository, set Status options to Backlog,
Ready, In Progress, Review and Done, and add the ten story entries from the CSV.
Keep product stories in Backlog until readiness is actually confirmed. Copy the
Project URL here and into the planning issue. Do not mark implementation Done
merely because its story has been written.

## Board blocker and manual completion — November 25, 2026

The CLI again returned missing read:project scope. No connected GitHub Project
tool is available, and browser access reported no available browser. No board
was created or verified. The private Lab 4 finish packet contains concrete UI
steps and the ten-item entry aid; do not mark this requirement complete until
the real board URL, five statuses and items are verified. CLI authorization may
be expanded by the owner deliberately, but no scope change was performed here.

## Actual Project link supplied — November 25, 2026

Eric created CIS 3610 - Team B planning and supplied the Project 2 board-view URL
above. The initial screenshot showed an empty three-column board; Eric then
reported completing the five required statuses. These are student-reported
configuration results, not independently verified field/item API results.

Both CLI view/item-list commands failed for missing read:project scope, and web
access to the supplied URL was restricted. No access settings were changed.
The ten US-01–US-10 items, their descriptions/owners/estimates/criteria and actual
item URLs have not been verified. Ask for a board screenshot or owner-authorized
read access before marking the complete Project requirement done. Keep product
stories in Backlog and instructor/teammate access verification pending as needed.
Earlier notes saying no Project URL was supplied are historical, superseded here.
