#!/usr/bin/env bash
set -euo pipefail
SQL_FILE="$1"
DEST_JSON="${2:-/dev/stdout}"
SQL_UPPER="$(tr '[:lower:]' '[:upper:]' < "$SQL_FILE")"

if echo "$SQL_UPPER" | grep -Eq '\b(CREATE|DROP|ALTER|TRUNCATE|INSERT|UPDATE|DELETE|MERGE)\b'; then
  echo "⚠️  DDL/DML detectado en $SQL_FILE"
  echo "Escribe EXACTAMENTE: AUTORIZO EJECUTAR DDL/DML"
  read -r CONFIRM
  if [ "$CONFIRM" != "AUTORIZO EJECUTAR DDL/DML" ]; then
    echo "Abortado por política."
    exit 1
  fi
fi

bq query --nouse_legacy_sql --format=json < "$SQL_FILE" > "$DEST_JSON"
echo "✔ Done. Output -> $DEST_JSON"
