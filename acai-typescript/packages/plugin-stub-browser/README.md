<p align="center">
  <a href="https://acai.yourdomain.com" target="_blank" align="center">
    <img src="https://static.acai.yourdomain.com/lightning/46c85bfd91905de8047f1ee65c7c93d6fa9ee6ea/static/media/acai-logo-with-text.4fb9e463.svg" width="280">
  </a>
  <br />
</p>

# @acai/plugin-stub-browser (beta)
**This plugin is in beta at the moment, naming and interface might change in the future.**

A stub plugin. Copy and paste this and rename to make a new plugin.

And remove the "private: true" attribute from package.json

## Installation

This package is not published on NPM registry and is available to be installed using npm and yarn.

```sh
# npm
npm install @acai/plugin-stub-browser@beta

# yarn
yarn add @acai/plugin-stub-browser@beta
```

## Usage

```typescript
import * as acai from '@acai/analytics-browser';
import { stubPlugin } from '@acai/plugin-stub-browser';
```

### 2. Instantiate the plugin

```typescript
const plugin = stubPlugin();
```

### 3. Install plugin to Acai SDK

```typescript
acai.add(plugin);
```

### 4. Initialize Acai SDK

```typescript
acai.init('API_KEY');
```
