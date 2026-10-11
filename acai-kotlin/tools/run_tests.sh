#!/bin/bash
# ==============================================================================
# Acai SDK — Run all tests
# ==============================================================================
# Usage:
#   ./tools/run_tests.sh           # run all tests
#   ./tools/run_tests.sh --core    # run core module tests only
#   ./tools/run_tests.sh --lint    # run ktlint check only
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$ROOT_DIR"

case "$1" in
    --core)
        echo "▶  Running core module tests..."
        ./gradlew :core:test
        ;;
    --android)
        echo "▶  Running android module tests..."
        ./gradlew :android:test
        ;;
    --lint)
        echo "▶  Running ktlint..."
        ./gradlew ktlintCheck
        ;;
    *)
        echo "▶  Running all tests..."
        ./gradlew test
        echo ""
        echo "▶  Running ktlint..."
        ./gradlew ktlintCheck
        echo ""
        echo "✅  All checks passed!"
        ;;
esac
