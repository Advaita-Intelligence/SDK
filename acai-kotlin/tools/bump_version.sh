#!/bin/bash
# ==============================================================================
# Acai SDK — Bump version across all files
# ==============================================================================
# Usage:
#   ./tools/bump_version.sh 1.0.1
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

NEW_VERSION="${1:?Usage: ./tools/bump_version.sh <new_version> (e.g. 1.2.0)}"

echo "▶  Bumping version to $NEW_VERSION..."

# gradle.properties
sed -i "s/^VERSION_NAME=.*/VERSION_NAME=$NEW_VERSION/" "$ROOT_DIR/gradle.properties"

# AcaiDestination.kt (SDK version constant)
sed -i "s/const val VERSION = \".*\"/const val VERSION = \"$NEW_VERSION\"/" \
    "$ROOT_DIR/core/src/main/java/com/acai/core/plugins/AcaiDestination.kt"

echo "✅  Version bumped to $NEW_VERSION"
echo ""
echo "    Files updated:"
echo "      - gradle.properties"
echo "      - core/.../AcaiDestination.kt"
echo ""
echo "    Next steps:"
echo "      git add -A && git commit -m \"chore: bump version to $NEW_VERSION\""
echo "      git tag v$NEW_VERSION && git push origin main --tags"
