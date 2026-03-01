# Quilt UI — Publish Flow Demo (60–90 seconds)

## Prerequisites

Make sure the stack is running:

```bash
docker-compose up -d
```

Seed the database if this is a fresh start:

```bash
docker-compose exec api python -m app.db.seed
```

---

## Step 1 — Register the new component

```bash
npm run add-component -- chip Chip "Small label for categorization and filtering" stable
```

Verify it shows up:

```bash
curl -s "http://localhost:8001/components" | python3 -m json.tool
```

---

## Step 2 — Create the release notes file

Create `release-notes/1.1.0.json`:

```json
{
  "version": "1.1.0",
  "notes": "Add Chip component with stitched variant",
  "items": [
    {
      "componentKey": "chip",
      "changeType": "minor",
      "note": "Initial Chip component with stitched variant"
    }
  ]
}
```

---

## Step 3 — Run the release script

```bash
npm run release -- 1.1.0
```

---

## Verify

```bash
curl -s "http://localhost:8001/releases" | python3 -m json.tool
curl -s "http://localhost:8001/components/chip/history" | python3 -m json.tool
```

Open `http://localhost:5173/components/chip` to see the detail page with examples and history.

---

## Repeat

For the next component or update:

1. `npm run add-component -- <key> <Name> "<description>"`
2. Create `release-notes/<version>.json`
3. `npm run release -- <version>`
