<p align="center">
  <a href="https://acai.yourdomain.com" target="_blank" align="center">
    <img src="https://static.acai.yourdomain.com/lightning/46c85bfd91905de8047f1ee65c7c93d6fa9ee6ea/static/media/acai-logo-with-text.4fb9e463.svg" width="280">
  </a>
  <br />
</p>

# @acai/plugin-page-url-enrichment-browser

Official Browser SDK plugin for page url enrichment

## Installation

This package is published on NPM registry and is available to be installed using npm and yarn.

```sh
# npm
npm install @acai/plugin-page-url-enrichment-browser

# yarn
yarn add @acai/plugin-page-url-enrichment-browser
```

## Usage

This plugin works on top of Acai Browser SDK and adds page url enrichment properties to all events. To use this plugin, you need to install `@acai/analytics-browser` version `v2.0.0` or later.

### 1. Import Acai packages

* `@acai/plugin-page-url-enrichment-browser`

```typescript
import { pageUrlEnrichmentPlugin } from '@acai/plugin-page-url-enrichment-browser';
```

### 2. Instantiate page url enrichment plugin

The plugin accepts an optional parameter of type `Object` to configure the plugin based on your use case.

```typescript
const pageUrlEnrichment = pageUrlEnrichmentPlugin();
```

#### Options


### 3. Install plugin to Acai SDK

```typescript
acai.add(pageUrlEnrichment);
```

### 4. Initialize Acai SDK

```typescript
acai.init('API_KEY');
```

## Resulting Page URL properties

This plugin adds Page URL properties to all events based on your configuration

#### Event type
* No event type added

#### Event properties

| Property                               | Description                                                                                                                                                          |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'[Acai] Page Domain'`            | The website's hostname or `location.hostname`                                                                                                                        |
| `'[Acai] Page Location'`          | The website's full url or `location.href`                                                                                                                            |
| `'[Acai] Page Path'`              | The website's pathname or `location.pathname`                                                                                                                        |
| `'[Acai] Page Title'`             | The website's title or `document.title`                                                                                                                              |
| `'[Acai] Page URL'`               | The website's url excluding query parameters                                                                                                                         |
| `'[Acai] Previous Page Location'` | The URL of the previous page the user visited; document.referrer if coming from an external domain; and using the sessionStorage which tracks the last url otherwise |
| `'Acai] Previous Page Type'`      | A classification of the previous page (e.g., 'Internal', 'External', 'Direct'), typically derived from a custom function that analyzes the previous page's URL       |
