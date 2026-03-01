#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-http://localhost:8001}"

KEY="${1:?Usage: update-component.sh <key> [--name <name>] [--description <desc>] [--status <status>]}"
shift

# Parse optional flags
NAME=""
DESC=""
STATUS=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --name)       NAME="$2"; shift 2 ;;
    --description) DESC="$2"; shift 2 ;;
    --status)     STATUS="$2"; shift 2 ;;
    *) echo "Unknown flag: $1"; exit 2 ;;
  esac
done

# Build JSON payload with only provided fields
PAYLOAD="{"
COMMA=""
if [[ -n "$NAME" ]]; then
  PAYLOAD+="$(printf '"name":"%s"' "$NAME")"
  COMMA=","
fi
if [[ -n "$DESC" ]]; then
  PAYLOAD+="${COMMA}$(printf '"description":"%s"' "$DESC")"
  COMMA=","
fi
if [[ -n "$STATUS" ]]; then
  PAYLOAD+="${COMMA}$(printf '"status":"%s"' "$STATUS")"
fi
PAYLOAD+="}"

if [[ "$PAYLOAD" == "{}" ]]; then
  echo "Nothing to update. Provide at least one of --name, --description, --status."
  exit 2
fi

RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X PATCH "$API_URL/components/$KEY" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

case "$HTTP_CODE" in
  200) echo "Component '$KEY' updated successfully." ;;
  404) echo "Component '$KEY' not found."; exit 1 ;;
  *)   echo "Failed ($HTTP_CODE): $BODY"; exit 1 ;;
esac
