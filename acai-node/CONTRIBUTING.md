# Contributing to acai-node

## Setup

```bash
git clone https://github.com/your-org/acai-node.git
cd acai-node
yarn install
yarn build
```

## Project Structure

This is a Yarn workspaces + Lerna monorepo. Packages must be built in dependency order:

```
@acai/types → @acai/utils → @acai/identify → @acai/identity → acai-node
```

## Commands

| Command | Description |
|---|---|
| `yarn build` | Build all packages |
| `yarn test` | Run all tests |
| `yarn lint` | Run linter |
| `yarn fix` | Auto-fix lint issues |
| `yarn clean` | Clean build outputs |

## Changing the Server URL

Edit `packages/node/src/constants.ts`:

```typescript
export const ACAI_SERVER_URL = 'https://your-actual-server.com/2/httpapi';
```

## Releasing a New Version

1. Update versions in all `package.json` files (or use `lerna version`)
2. Commit and push
3. Tag the release: `git tag v1.x.x && git push origin v1.x.x`
4. The GitHub Actions `publish.yml` workflow will automatically publish to npm

## Manual Publish (without CI)

```bash
yarn build
yarn test

# Set your npm token
export NODE_AUTH_TOKEN=your_npm_token

# Publish in order
cd packages/types && npm publish --access public && cd ../..
cd packages/utils && npm publish --access public && cd ../..
cd packages/identify && npm publish --access public && cd ../..
cd packages/identity && npm publish --access public && cd ../..
cd packages/node && npm publish --access public && cd ../..
```
