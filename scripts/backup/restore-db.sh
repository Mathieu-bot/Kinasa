#!/bin/bash


DB_NAME=${DB_NAME:-""}
DB_USER=${DB_USER:-""}
DB_PASSWORD=${DB_PASSWORD:-""}
DB_HOST=${DB_HOST:-""}
DB_PORT=${DB_PORT:-""}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

if [ -z "$DB_NAME" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ] || [ -z "$DB_HOST" ]; then
  if [ -f "$PROJECT_ROOT/.env.production" ]; then
    ENV_FILE="$PROJECT_ROOT/.env.production"
    echo "Using $ENV_FILE for connection parameters"
  elif [ -f "$PROJECT_ROOT/.env.local" ]; then
    ENV_FILE="$PROJECT_ROOT/.env.local"
    echo "Using $ENV_FILE for connection parameters"
  elif [ -f "$PROJECT_ROOT/.env" ]; then
    ENV_FILE="$PROJECT_ROOT/.env"
    echo "Using $ENV_FILE for connection parameters"
  fi
  
  if [ ! -z "$ENV_FILE" ]; then
    if grep -q "^DATABASE_URL=" "$ENV_FILE"; then
      DB_URL=$(grep DATABASE_URL "$ENV_FILE" | sed -E 's/DATABASE_URL="(.*)"$/\1/')
      
      DB_USER=$(echo "$DB_URL" | sed -E 's/.*:\/\/([^:]*).*/\1/')
      DB_PASSWORD=$(echo "$DB_URL" | sed -E 's/.*:([^@]*)@.*/\1/')
      DB_HOST=$(echo "$DB_URL" | sed -E 's/.*@([^:]*).*/\1/')
      DB_PORT=$(echo "$DB_URL" | sed -E 's/.*:([0-9]*)\/[^?]*.*/\1/')
      DB_NAME=$(echo "$DB_URL" | sed -E 's/.*\/([^?]*)(\"|$).*/\1/')
    else
      [ -z "$DB_NAME" ] && DB_NAME=$(grep DB_NAME "$ENV_FILE" | sed -E 's/DB_NAME="?([^"]*)"?$/\1/')
      [ -z "$DB_USER" ] && DB_USER=$(grep DB_USER "$ENV_FILE" | sed -E 's/DB_USER="?([^"]*)"?$/\1/')
      [ -z "$DB_PASSWORD" ] && DB_PASSWORD=$(grep DB_PASSWORD "$ENV_FILE" | sed -E 's/DB_PASSWORD="?([^"]*)"?$/\1/')
      [ -z "$DB_HOST" ] && DB_HOST=$(grep DB_HOST "$ENV_FILE" | sed -E 's/DB_HOST="?([^"]*)"?$/\1/')
      [ -z "$DB_PORT" ] && DB_PORT=$(grep DB_PORT "$ENV_FILE" | sed -E 's/DB_PORT="?([^"]*)"?$/\1/')
    fi
  fi
fi

DB_NAME=${DB_NAME:-"kinasa"}
DB_USER=${DB_USER:-"postgres"}
DB_PASSWORD=${DB_PASSWORD:-"adgjmptxw"}
DB_HOST=${DB_HOST:-"localhost"}
DB_PORT=${DB_PORT:-"5432"}

echo "Restoring to database $DB_NAME on $DB_HOST:$DB_PORT with user $DB_USER"

BACKUP_DIR="$PROJECT_ROOT/backups"
LOG_FILE="$BACKUP_DIR/restore_log.txt"

if [ -z "$1" ]; then
  echo "Error: Please specify a backup file to restore."
  echo "Usage: $0 <backup_file.sql.gz>"
  
  echo "Available backups:"
  ls -lh "$BACKUP_DIR" | grep ".sql.gz"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
  if [ -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    BACKUP_FILE="$BACKUP_DIR/$BACKUP_FILE"
  else
    echo "Error: Backup file '$BACKUP_FILE' does not exist."
    exit 1
  fi
fi

echo "----------------------" >> "$LOG_FILE"
echo "Restore started: $(date)" >> "$LOG_FILE"
echo "File used: $BACKUP_FILE" >> "$LOG_FILE"

echo "Warning: This operation will overwrite the database '$DB_NAME'."
read -p "Do you want to continue? (y/n): " confirmation

if [ "$confirmation" != "y" ]; then
  echo "Restore cancelled."
  echo "Restore cancelled by user" >> "$LOG_FILE"
  exit 0
fi

if [[ "$BACKUP_FILE" == *.gz ]]; then
  echo "Decompressing backup file..."
  gunzip -c "$BACKUP_FILE" > "${BACKUP_FILE%.gz}"
  UNCOMPRESSED_FILE="${BACKUP_FILE%.gz}"
  echo "File decompressed: $UNCOMPRESSED_FILE" >> "$LOG_FILE"
else
  UNCOMPRESSED_FILE="$BACKUP_FILE"
fi

echo "Restoring database..."
PGPASSWORD="$DB_PASSWORD" psql \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

PGPASSWORD="$DB_PASSWORD" psql \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  -f "$UNCOMPRESSED_FILE"

if [ $? -eq 0 ]; then
  echo "Restore successful!" 
  echo "Restore successful!" >> "$LOG_FILE"
else
  echo "ERROR: Restore failed." 
  echo "ERROR: Restore failed" >> "$LOG_FILE"
  exit 1
fi

if [[ "$BACKUP_FILE" == *.gz ]] && [ -f "$UNCOMPRESSED_FILE" ]; then
  rm "$UNCOMPRESSED_FILE"
  echo "Temporary file cleaned up: $UNCOMPRESSED_FILE" >> "$LOG_FILE"
fi

echo "Restore completed: $(date)" >> "$LOG_FILE"
echo "----------------------" >> "$LOG_FILE"
