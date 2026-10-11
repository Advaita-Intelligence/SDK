<p align="center">
  <a href="https://acai.yourdomain.com" target="_blank" align="center">
    <img src="https://static.acai.yourdomain.com/lightning/46c85bfd91905de8047f1ee65c7c93d6fa9ee6ea/static/media/acai-logo-with-text.4fb9e463.svg" width="280">
  </a>
  <br />
</p>

# @acai/plugin-global-user-properties

Official SDK plugin for adding global user properties to events

## Installation

This package is published on NPM registry and is available to be installed using npm and yarn.

```sh
# npm
npm install @acai/plugin-global-user-properties

# yarn
yarn add @acai/plugin-global-user-properties
```

## Usage

This plugin works on top of the Acai SDK and sends user properties as global user properties, a beta feature for that allows projects to share user properties (i.e. user properties can become "global" across multiple projects). 

To use this plugin, you need to install `@acai/plugin-global-user-properties `v1.0.0` or later.

### 1. Import Acai packages

* `@acai/plugin-global-user-properties`

```typescript
import * as Acai from '@acai/analytics-browser'
import { globalUserPropertiesPlugin } from '@acai/plugin-global-user-properties';
```

### 2. Instantiate page view plugin

The plugin accepts an optional parameter of type `Object` to configure the plugin based on your use case.

```typescript
const globalUserPropertiesPlugin = globalUserPropertiesPlugin({
  shouldKeepOriginalUserProperties: true,
});
```

#### Options

|Name|Type|Default|Description|
|-|-|-|-|
|`shouldKeepOriginalUserProperties`|`boolean`| `false` | Use this option if you want the user properties to be sent along with the global user properties. Since global user properties do not appear in Data yet, this would allow indirect governance (by observing the same properties as regular user properties). |

### 3. Install plugin to Acai SDK

```typescript
acai.add(globalUserPropertiesPlugin);
```

### 4. Initialize Acai SDK

```typescript
acai.init('API_KEY');
```

