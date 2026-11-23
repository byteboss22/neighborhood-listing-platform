# Lab 5 entity relationships

Existing profiles are reused without modifying the midterm migration.

```mermaid
erDiagram
    PROFILES ||--o{ PROPERTIES : owns
    PROFILES ||--o{ SPONSORS : owns
    PROFILES ||--o{ INQUIRIES : submits
    PROPERTIES ||--o{ PROPERTY_SPONSORS : has
    SPONSORS ||--o{ PROPERTY_SPONSORS : appears_in
    PROPERTIES ||--o{ INQUIRIES : receives
    PROFILES {
        uuid id PK
        text role
    }
    PROPERTIES {
        text property_id PK
        uuid owner_id FK
        text status
    }
    SPONSORS {
        text sponsor_id PK
        uuid owner_id FK
        text status
        boolean is_active
    }
    PROPERTY_SPONSORS {
        text property_id PK,FK
        text sponsor_id PK,FK
    }
    INQUIRIES {
        uuid id PK
        text property_id FK
        uuid requester_id FK
    }
```

Junction parents cascade DELETE; property and profile references for inquiries
restrict deletion. Owner-profile deletion is restricted while owned rows exist.
Approval reviewer references use SET NULL; approved_at is required for approved
rows, but a non-null retained reviewer is not guaranteed after profile deletion.
Full moderation audit is outside this slice. Text/address/scalar CHECK constraints
and grants are in the versioned migration, not represented fully by this diagram.
