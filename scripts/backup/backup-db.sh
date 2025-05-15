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

echo "Backing up database $DB_NAME on $DB_HOST:$DB_PORT with user $DB_USER"

BACKUP_DIR="$PROJECT_ROOT/backups"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/kinasa_backup_$DATE.sql"
LOG_FILE="$BACKUP_DIR/backup_log.txt"
RETENTION_DAYS=30  

mkdir -p "$BACKUP_DIR"

echo "----------------------" >> "$LOG_FILE"
echo "Backup started: $(date)" >> "$LOG_FILE"

PGPASSWORD="$DB_PASSWORD" pg_dump \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -F p \
  -f "$BACKUP_FILE" \
  "$DB_NAME"

if [ $? -eq 0 ]; then
  echo "Backup successful: $BACKUP_FILE" >> "$LOG_FILE"
  
  gzip "$BACKUP_FILE"
  echo "File compressed: $BACKUP_FILE.gz" >> "$LOG_FILE"
  
  find "$BACKUP_DIR" -name "kinasa_backup_*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete
  echo "Cleanup of backups older than $RETENTION_DAYS days completed" >> "$LOG_FILE"
else
  echo "ERROR: Backup failed" >> "$LOG_FILE"
  exit 1
fi

echo "Backup completed: $(date)" >> "$LOG_FILE"
echo "----------------------" >> "$LOG_FILE"

echo "Database backup of '$DB_NAME' completed successfully!"
echo "File: $BACKUP_FILE.gz"
