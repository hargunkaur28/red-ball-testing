#!/bin/bash
# MongoDB Atlas Backup Script for Alchemy 360 Sports Arena (Mac/Linux).
# Dumps all collections from the Atlas cluster using mongodump and compresses the output.

DB_NAME=${1:-"red-ball"}

# 1. Check if mongodump is installed
if ! command -v mongodump &> /dev/null; then
    echo -e "\033[0;31m❌ Error: 'mongodump' is not installed or not in your system PATH.\033[0m"
    echo ""
    echo -e "\033[0;33mTo install MongoDB Database Tools:\033[0m"
    echo "- On macOS (via Homebrew):  brew install mongodb-database-tools"
    echo "- On Ubuntu/Debian:         sudo apt-get install mongodb-database-tools"
    echo "- On CentOS/RHEL/Fedora:    sudo yum install mongodb-database-tools"
    echo "For other systems, visit: https://www.mongodb.com/try/download/database-tools"
    exit 1
fi

# 2. Resolve MONGODB_URI
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/server/.env"
MONGO_URI=$MONGODB_URI

if [ -f "$ENV_FILE" ]; then
    echo -e "\033[0;36m🔍 Found server/.env file, extracting connection details...\033[0m"
    # Extract MONGODB_URI value
    ENV_URI=$(grep -E "^MONGODB_URI=" "$ENV_FILE" | head -n 1 | cut -d'=' -f2-)
    # Trim quotes and potential trailing comments
    ENV_URI=$(echo "$ENV_URI" | cut -d'#' -f1 | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' -e 's/^["'\''\\]*//' -e 's/["'\''\\]*$//')
    if [ ! -z "$ENV_URI" ]; then
        MONGO_URI=$ENV_URI
    fi
fi

if [ -z "$MONGO_URI" ]; then
    echo -e "\033[0;31m❌ Error: MONGODB_URI environment variable not found in system or server/.env file.\033[0m"
    exit 1
fi

# 3. Setup paths
TODAY=$(date +"%Y-%m-%d")
BACKUP_DIR_NAME="backup-$DB_NAME-$TODAY"
BACKUPS_PARENT_DIR="$SCRIPT_DIR/backups"
TARGET_BACKUP_DIR="$BACKUPS_PARENT_DIR/$BACKUP_DIR_NAME"
TAR_FILE="$BACKUPS_PARENT_DIR/$BACKUP_DIR_NAME.tar.gz"

# Ensure backups directory exists
mkdir -p "$BACKUPS_PARENT_DIR"

# Clean up existing backup of same name if any
rm -rf "$TARGET_BACKUP_DIR"
rm -f "$TAR_FILE"

echo -e "\033[0;32m🚀 Starting database backup for database: '$DB_NAME'...\033[0m"
echo -e "\033[0;36m📂 Output directory: $TARGET_BACKUP_DIR\033[0m"

# 4. Run mongodump
MASKED_URI=$(echo "$MONGO_URI" | sed -E 's/:([^/@]+)@/:******@/')
echo -e "\033[0;90m🔗 Connecting to: $MASKED_URI\033[0m"

mongodump --uri="$MONGO_URI" --db="$DB_NAME" --out="$TARGET_BACKUP_DIR"
if [ $? -ne 0 ]; then
    echo -e "\033[0;31m❌ Error: Failed to dump database.\033[0m"
    exit 1
fi

# 5. Compress the output
echo -e "\033[0;36m🗜️ Compressing backup folder...\033[0m"
tar -czf "$TAR_FILE" -C "$BACKUPS_PARENT_DIR" "$BACKUP_DIR_NAME"
if [ $? -ne 0 ]; then
    echo -e "\033[0;31m❌ Error: Failed to compress backup.\033[0m"
    exit 1
fi
echo -e "\033[0;32m✅ Compression complete.\033[0m"

# 6. Clean up temporary uncompressed folder
echo -e "\033[0;36m🧹 Cleaning up temporary files...\033[0m"
rm -rf "$TARGET_BACKUP_DIR"

# 7. Print success
echo ""
echo -e "\033[0;32m🎉 Database backup completed successfully!\033[0m"
echo -e "\033[0;36m📦 Archive Path: $TAR_FILE\033[0m"
echo -e "\033[0;90m📅 Date: $(date)\033[0m"
