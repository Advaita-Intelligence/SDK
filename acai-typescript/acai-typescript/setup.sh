#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# 🫐 Acai SDK — Setup Script
# Run this after cloning to prepare the monorepo for development
# ─────────────────────────────────────────────────────────────

set -e

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo -e "${CYAN}🫐  Acai TypeScript SDK — Setup${NC}"
echo "────────────────────────────────────────"

# Check Node
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Install it from https://nodejs.org/"
  exit 1
fi

# Check nvm and use right version
if command -v nvm &> /dev/null; then
  echo "→ Switching Node version via nvm..."
  nvm use
fi

# Check yarn
if ! command -v yarn &> /dev/null; then
  echo "→ Installing yarn..."
  npm install -g yarn
fi

echo -e "${GREEN}✓ Node: $(node -v)${NC}"
echo -e "${GREEN}✓ Yarn: $(yarn --version)${NC}"

echo ""
echo "→ Installing SDK dependencies..."
yarn install

echo ""
echo "→ Building all packages..."
yarn build

echo ""
echo "→ Setting up ingest server..."
cd ingest-server
cp .env.example .env
npm install
cd ..

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "────────────────────────────────────────"
echo -e "${YELLOW}Next steps:${NC}"
echo ""
echo "  1. Edit ingest-server/.env and set your ACAI_API_KEY"
echo ""
echo "  2. Start the ingest server:"
echo "       cd ingest-server && npm run dev"
echo ""
echo "  3. In your app, install the SDK:"
echo "       npm install @acai/analytics-browser"
echo ""
echo "  4. Initialize:"
echo '       import * as acai from "@acai/analytics-browser";'
echo '       acai.init("YOUR_ACAI_API_KEY", {'
echo '         serverUrl: "http://localhost:3000/2/httpapi"'
echo '       });'
echo '       acai.track("Hello World");'
echo ""
echo "  5. Publish your packages to npm:"
echo "       yarn deploy:publish"
echo ""
