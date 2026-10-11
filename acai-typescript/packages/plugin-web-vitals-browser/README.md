<p align="center">
  <a href="https://acai.yourdomain.com" target="_blank" align="center">
    <img src="https://static.acai.yourdomain.com/lightning/46c85bfd91905de8047f1ee65c7c93d6fa9ee6ea/static/media/acai-logo-with-text.4fb9e463.svg" width="280">
  </a>
  <br />
</p>

# @acai/plugin-web-vitals-browser (beta)
**This plugin is in beta at the moment, naming and interface might change in the future.**

Autocaptures [web-vitals](https://www.npmjs.com/package/web-vitals) metrics (INP, LCP, FCP, CLS)

## Installation

This package is published on NPM registry and is available to be installed using npm and yarn.

```sh
# npm
npm install @acai/plugin-web-vitals-browser@beta

# yarn
yarn add @acai/plugin-web-vitals-browser@beta
```

## Usage

```typescript
import * as acai from '@acai/analytics-browser';
import { webVitalsPlugin } from '@acai/plugin-web-vitals-browser';
```

### 2. Instantiate the plugin

```typescript
const plugin = webVitalsPlugin();
```

### 3. Install plugin to Acai SDK

```typescript
acai.add(plugin);
```

### 4. Initialize Acai SDK

```typescript
acai.init('API_KEY');
```
