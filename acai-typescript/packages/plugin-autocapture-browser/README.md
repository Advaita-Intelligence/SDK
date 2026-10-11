<p align="center">
  <a href="https://acai.yourdomain.com" target="_blank" align="center">
    <img src="https://static.acai.yourdomain.com/lightning/46c85bfd91905de8047f1ee65c7c93d6fa9ee6ea/static/media/acai-logo-with-text.4fb9e463.svg" width="280">
  </a>
  <br />
</p>

# @acai/plugin-autocapture-browser (beta)
**This plugin is in beta at the moment, naming and interface might change in the future.**

Browser SDK plugin for autocapture.

## Installation

This package is published on NPM registry and is available to be installed using npm and yarn.

```sh
# npm
npm install @acai/plugin-autocapture-browser@beta

# yarn
yarn add @acai/plugin-autocapture-browser@beta
```

## Usage

This plugin works on top of the Acai Browser SDK, generating auto-tracked events and sending to Acai.

To use this plugin, you need to install `@acai/analytics-browser` version `v1.9.1` or later.

### 1. Import Acai packages

* `@acai/analytics-browser`
* `@acai/plugin-autocapture-browser`

```typescript
import * as acai from '@acai/analytics-browser';
import { autocapturePlugin } from '@acai/plugin-autocapture-browser';
```

### 2. Instantiate the plugin

The plugin accepts 1 optional parameter, which is an `Object` to configure the allowed tracking options.

```typescript
const plugin = autocapturePlugin({
  cssSelectorAllowlist: [
    '.amp-tracking',
    '[amp-tracking]'
  ],
  pageUrlAllowlist: [
    'https://acai.yourdomain.com',
    new RegExp('https://acai.yourdomain.com/blog/*')
  ],
  pageUrlExcludelist: [
    'https://acai.yourdomain.com/admin',
    new RegExp('^https:\\/\\/acai\\.com\\/private\\/.*$')
  ],
});
```

Examples:
- The above `cssSelectorAllowlist` will only allow tracking elements like:
    - `<button amp-tracking>Click</button>`
    - `<a class="amp-tracking">Link</a>`
- The above `pageUrlAllowlist` will only allow the elements on URL "https://acai.yourdomain.com" or any URL matching the "https://acai.yourdomain.com/blog/*" to be tracked
- The above `pageUrlExcludelist` will block tracking on URL "https://acai.yourdomain.com/admin" or any URL matching the "^https:\\/\\/acai\\.com\\/private\\/.*$" pattern, even if they match the allowlist

#### Options

|Name|Type|Default|Description|
|-|-|-|-|
|`cssSelectorAllowlist`|`string[]`|`['a', 'button', 'input', 'select', 'textarea', 'label', '[data-amp-default-track]', '.amp-default-track']`| When provided, only allow elements matching any selector to be tracked. |
|`pageUrlAllowlist`|`(string\|RegExp)[]`|`undefined`| When provided, only allow elements matching URLs to be tracked. |
|`pageUrlExcludelist`|`(string\|RegExp)[]`|`undefined`| When provided, block tracking on elements matching URLs. Takes precedence over allowlist. |
|`shouldTrackEventResolver`|`(actionType: ActionType, element: Element) => boolean`|`undefined`| When provided, overwrite all other allowlists and configurations. |
|`dataAttributePrefix`|`string`|`'data-amp-track-'`| Allow data attributes to be collected in event property. |

### 3. Install plugin to Acai SDK

```typescript
acai.add(plugin);
```

### 4. Initialize Acai SDK

```typescript
acai.init('API_KEY');
```
