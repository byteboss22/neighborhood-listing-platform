# Lab 2 image sources

All three files are original SVG illustrations authored as vector markup by
Codex for Eric Juarez's Lab 2 implementation on 2026-10-24. They use basic shapes
and system-font labels, with no downloaded photos, copied artwork, external
assets, or identifiable real properties. No third-party image permission is
needed for this original artwork. They are illustrations, not rental photographs.

| File under `public/images/` | Actual depicted content | Used by |
|---|---|---|
| `maple-court.svg` | Terracotta apartment building, blue windows, tree beside entrance | Maple Court Apartment |
| `cedar-studio.svg` | Cream studio building, wide blue window, green door, two planters | Cedar Window Studio |
| `willow-house.svg` | Blue house, dark pitched roof, front porch, yellow door | Willow Porch House |

Each SVG has an 800 × 500 viewBox and a visible fictional-property/original-
illustration label. The corresponding `imageAlt` in `src/data/properties.ts`
describes the actual artwork. PropertyCard uses intrinsic image dimensions and
`object-cover` to preserve proportions without stretching. All listings,
addresses, city names and prices are fictional demonstration data.
