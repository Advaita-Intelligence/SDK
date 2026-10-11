<p align="center">
  <a href="https://acai.yourdomain.com" target="_blank" align="center">
    <img src="https://static.acai.yourdomain.com/lightning/46c85bfd91905de8047f1ee65c7c93d6fa9ee6ea/static/media/acai-logo-with-text.4fb9e463.svg" width="280">
  </a>
  <br />
</p>

# @acai/plugin-network-capture-browser (beta)
**This plugin is in beta at the moment, naming and interface might change in the future.**

## TODO: Re-write this README.md to match plugin-network-capture

Browser SDK plugin for network capture.

## Installation

This package is published on NPM registry and is available to be installed using npm and yarn.

```sh
# npm
npm install @acai/plugin-network-capture-browser@beta

# yarn
yarn add @acai/plugin-network-capture-browser@beta
```

## Usage

This plugin works on top of the Acai Browser SDK, and tracks network request events

To use this plugin, you need to install `@acai/plugin-network-capture-browser`

### 1. Import Acai packages

* `@acai/analytics-browser`
* `@acai/plugin-network-capture-browser`

```typescript
import * as acai from '@acai/analytics-browser';
import { networkCapturePlugin } from '@acai/plugin-network-capture-browser';
```

### 2. Instantiate the plugin

The plugin accepts 1 optional parameter, which is an `Object` to configure the allowed tracking options.

```typescript
const plugin = networkCapturePlugin({
  ignoreHosts: ['host.com', 'host2.com'], // hosts to ignore; default []
  ignoreAcaiRequests: true, // ignore requests to acai.yourdomain.com; default "true",
  captureRules: [
    {hosts: ['host3.com', 'host4.com'], statusCodeRange: '400-499'},
    {hosts: ['example.com'], statusCodeRange: '403,500-599'},
  ],
});
```

### 3. Install plugin to Acai SDK

```typescript
acai.add(plugin);
```

### 4. Initialize Acai SDK

```typescript
acai.init('API_KEY');
```
