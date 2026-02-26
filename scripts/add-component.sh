#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-http://localhost:8001}"

KEY="${1:?Usage: add-component.sh <key> <name> <description> [status]}"
NAME="${2:?Usage: add-component.sh <key> <name> <description> [status]}"
DESC="${3:?Usage: add-component.sh <key> <name> <description> [status]}"
STATUS="${4:-beta}"

PAYLOAD=$(printf '{"key":"%s","name":"%s","description":"%s","status":"%s"}' \
  "$KEY" "$NAME" "$DESC" "$STATUS")

RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST "$API_URL/components" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

case "$HTTP_CODE" in
  201) echo "Component '$KEY' added successfully." ;;
  409) echo "Component '$KEY' already exists."; exit 1 ;;
  *)   echo "Failed ($HTTP_CODE): $BODY"; exit 1 ;;
esac
