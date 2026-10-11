# Acai Clickstream SDKs

Client and server SDKs for sending clickstream events to the Acai analytics platform. Each folder is a standalone SDK with its own README, build setup and license.

## SDKs

### Mobile

| SDK | Platforms | Docs |
|---|---|---|
| Kotlin | Android | [acai-kotlin](./acai-kotlin/README.md) |
| Swift | iOS, tvOS, macOS, watchOS | [acai-swift](./acai-swift/README.md) |
| Flutter | Android, iOS, macOS, web | [acai-flutter](./acai-flutter/README.md) |
| React Native | iOS, Android | [acai-react-native](./acai-react-native/README.md) |

### Web

| SDK | Description | Docs |
|---|---|---|
| JavaScript | Browser SDK | [acai-js](./acai-js/README.md) |
| TypeScript | Browser, Node.js and React Native packages, plus plugins | [acai-typescript](./acai-typescript/README.md) |

### Server

| SDK | Language | Docs |
|---|---|---|
| Node.js | JavaScript / TypeScript | [acai-node](./acai-node/README.md) |
| Python | Python | [acai-python](./acai-python/README.md) |
| Java | Java | [acai-java](./acai-java/README.md) |
| Go | Go | [acai-analytics-go](./acai-analytics-go/README.md) |

## Repository layout

```
Clickstream/
├── acai-analytics-go/     Go SDK
├── acai-flutter/          Flutter SDK
├── acai-java/             Java SDK
├── acai-js/               JavaScript browser SDK
├── acai-kotlin/           Kotlin / Android SDK
├── acai-node/             Node.js SDK
├── acai-python/           Python SDK
├── acai-react-native/     React Native SDK
├── acai-swift/            Swift SDK
└── acai-typescript/       TypeScript monorepo (browser, Node.js, React Native, plugins)
```

## Getting started

1. Pick the SDK for your platform from the tables above.
2. Follow the installation and quick start steps in that SDK's README.
3. Point the SDK at your Acai ingest endpoint and set your API key.

## Contributing

Most SDKs include a `CONTRIBUTING.md`. Read the one in the SDK you are changing before opening a pull request.

## License

Licenses are per SDK. See the `LICENSE` file in each folder.
