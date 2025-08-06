#!/bin/bash

echo "Testing PostgreSQL connection..."

read -s -p "Enter PostgreSQL password for 'postgres' user: " DB_PASSWORD
echo ""

PGPASSWORD="$DB_PASSWORD" psql -h localhost -U postgres -c "SELECT 'Connection successful!' as status;"

if [ $? -eq 0 ]; then
  echo "Connection successful!"
  echo ""
  
  CONNECTION_URL="postgresql://postgres:${DB_PASSWORD}@localhost:5432/kinasa"
  
  echo "Your connection string is:"
  echo "$CONNECTION_URL"
  echo ""
  echo "Use this string in your .env.local file for DATABASE_URL"
fi
