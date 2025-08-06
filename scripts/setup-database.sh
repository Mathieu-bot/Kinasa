#!/bin/bash

DATABASE_URL="postgresql://postgres:adgjmptxw@localhost:5432/kinasa"

echo "Checking if database exists..."
if ! psql -h localhost -U postgres -lqt | cut -d \| -f 1 | grep -qw kinasa; then
  echo "Creating database 'kinasa'..."
  psql -h localhost -U postgres -c "CREATE DATABASE kinasa"
else
  echo "Database 'kinasa' already exists."
fi

export DATABASE_URL

echo "Generating Prisma client..."
npx prisma generate

echo "Pushing schema to database..."
npx prisma db push

echo "Done!"
