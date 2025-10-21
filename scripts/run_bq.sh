#!/usr/bin/env bash
set -euo pipefail
SQL_FILE="$1"
DEST_JSON="${2:-/dev/stdout}"

bq query --nouse_legacy_sql --format=json < "$SQL_FILE" > "$DEST_JSON"
echo "✔ Done. Output -> $DEST_JSON"
