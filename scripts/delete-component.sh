#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-http://localhost:8001}"

KEY="${1:?Usage: delete-component.sh <key>}"

RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X DELETE "$API_URL/components/$KEY")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

case "$HTTP_CODE" in
  204) echo "Component '$KEY' deleted successfully." ;;
  404) echo "Component '$KEY' not found."; exit 1 ;;
  *)   echo "Failed ($HTTP_CODE): $BODY"; exit 1 ;;
esac
