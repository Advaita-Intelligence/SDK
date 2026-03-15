#!/bin/bash
# ==============================================================================
# Acai SDK — Publish to Maven Central (or local Maven)
# ==============================================================================
# Usage:
#   ./tools/publish.sh             # publish to local Maven (~/.m2)
#   ./tools/publish.sh --remote    # publish to Maven Central (requires credentials)
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$ROOT_DIR"

echo "▶  Building Acai SDK..."
./gradlew clean build -x test

if [[ "$1" == "--remote" ]]; then
    echo "▶  Publishing to Maven Central..."
    ./gradlew publish \
        -PMAVEN_USERNAME="${MAVEN_USERNAME:?Set MAVEN_USERNAME env var}" \
        -PMAVEN_PASSWORD="${MAVEN_PASSWORD:?Set MAVEN_PASSWORD env var}" \
        -PSIGNING_KEY="${SIGNING_KEY:?Set SIGNING_KEY env var}" \
        -PSIGNING_PASSWORD="${SIGNING_PASSWORD:?Set SIGNING_PASSWORD env var}"
    echo "✅  Published to Maven Central!"
else
    echo "▶  Publishing to local Maven (~/.m2)..."
    ./gradlew publishToMavenLocal
    echo "✅  Published to local Maven!"
    echo ""
    echo "    Add to your project:"
    echo "    implementation(\"com.acai:analytics-android:1.0.0\")"
fi
