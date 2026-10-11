## [1.17.3](https://clickstream.acaiplatform.ai) (2026-02-10)


### Bug Fixes

* disable compression on uploads for custom server urls unless opted in. ([12bbd67](https://clickstream.acaiplatform.ai))

## [1.17.2](https://clickstream.acaiplatform.ai) (2026-02-07)


### Bug Fixes

* crash while getting platform string ([#368](https://clickstream.acaiplatform.ai)) ([b96da35](https://clickstream.acaiplatform.ai))

## [1.17.1](https://clickstream.acaiplatform.ai) (2026-01-29)


### Bug Fixes

* gzip upload bodies ([74ff6b0](https://clickstream.acaiplatform.ai))

# [1.17.0](https://clickstream.acaiplatform.ai) (2026-01-29)


### Features

* use LogLevel from Core ([81a0e07](https://clickstream.acaiplatform.ai))

## [1.16.6](https://clickstream.acaiplatform.ai) (2026-01-21)


### Bug Fixes

* crash when bundleIdentifier is nil ([#358](https://clickstream.acaiplatform.ai)) ([0a68b73](https://clickstream.acaiplatform.ai))

## [1.16.5](https://clickstream.acaiplatform.ai) (2026-01-09)


### Bug Fixes

* update Cocoapods/Carthage deps ([077425e](https://clickstream.acaiplatform.ai))

## [1.16.4](https://clickstream.acaiplatform.ai) (2026-01-08)


### Bug Fixes

* optout setting still recording session start/end events ([#352](https://clickstream.acaiplatform.ai)) ([8102be0](https://clickstream.acaiplatform.ai))

## [1.16.3](https://clickstream.acaiplatform.ai) (2026-01-05)


### Bug Fixes

* app install and opened not fired at specific case ([#347](https://clickstream.acaiplatform.ai)) ([fea1c13](https://clickstream.acaiplatform.ai))

## [1.16.2](https://clickstream.acaiplatform.ai) (2025-12-22)


### Bug Fixes

* xcode 26.2 bug causes crash on iOS 15 ([#349](https://clickstream.acaiplatform.ai)) ([f63bd60](https://clickstream.acaiplatform.ai))

## [1.16.1](https://clickstream.acaiplatform.ai) (2025-12-17)


### Bug Fixes

* Empty Commit to trigger a build ([4eb7580](https://clickstream.acaiplatform.ai))

# [1.16.0](https://clickstream.acaiplatform.ai) (2025-12-17)


### Bug Fixes

* centralize autpcapture logic ([#341](https://clickstream.acaiplatform.ai)) ([19faeaf](https://clickstream.acaiplatform.ai))
* Incorrect implementation of the atomic wrapper ([#343](https://clickstream.acaiplatform.ai)) ([ecce5a4](https://clickstream.acaiplatform.ai))


### Features

* integrate diagnostics client ([#337](https://clickstream.acaiplatform.ai)) ([77d0411](https://clickstream.acaiplatform.ai))

## [1.15.5](https://clickstream.acaiplatform.ai) (2025-12-05)


### Bug Fixes

* network tracking not initialized for specify scenario ([#338](https://clickstream.acaiplatform.ai)) ([13b9765](https://clickstream.acaiplatform.ai))

## [1.15.4](https://clickstream.acaiplatform.ai) (2025-11-15)


### Bug Fixes

* prevent network tracking plugin remote config update crash ([#336](https://clickstream.acaiplatform.ai)) ([06b1315](https://clickstream.acaiplatform.ai))

## [1.15.3](https://clickstream.acaiplatform.ai) (2025-11-05)


### Bug Fixes

* support onReset plugin lifecycle event ([ed883e8](https://clickstream.acaiplatform.ai))

## [1.15.2](https://clickstream.acaiplatform.ai) (2025-10-20)


### Bug Fixes

* improve timeline thread safety ([60de801](https://clickstream.acaiplatform.ai))
* use correct remote config key for block lists ([361d540](https://clickstream.acaiplatform.ai))

## [1.15.1](https://clickstream.acaiplatform.ai) (2025-09-29)


### Bug Fixes

* add appLifecycles remote config support ([#328](https://clickstream.acaiplatform.ai)) ([8c7a376](https://clickstream.acaiplatform.ai))

# [1.15.0](https://clickstream.acaiplatform.ai) (2025-09-13)


### Features

* add autocapture support for frustration and network tracking ([#317](https://clickstream.acaiplatform.ai)) ([5f70980](https://clickstream.acaiplatform.ai))
* add urls and header body support for network tracking ([#320](https://clickstream.acaiplatform.ai)) ([82620af](https://clickstream.acaiplatform.ai))
* make frustration interaction GA ([#323](https://clickstream.acaiplatform.ai)) ([414bffe](https://clickstream.acaiplatform.ai))

# [1.14.0](https://clickstream.acaiplatform.ai) (2025-07-23)


### Features

* Add autocapture for Rage Click and Dead Click ([#313](https://clickstream.acaiplatform.ai)) ([e7965ec](https://clickstream.acaiplatform.ai)), closes [#304](https://clickstream.acaiplatform.ai) [#305](https://clickstream.acaiplatform.ai) [#306](https://clickstream.acaiplatform.ai) [#312](https://clickstream.acaiplatform.ai)

## [1.13.9](https://clickstream.acaiplatform.ai) (2025-07-18)


### Bug Fixes

* app install/opened event order for pre-scenedelegate apps ([#311](https://clickstream.acaiplatform.ai)) ([17306e0](https://clickstream.acaiplatform.ai))
* Empty Commit to trigger a build ([c246c60](https://clickstream.acaiplatform.ai))

## [1.13.8](https://clickstream.acaiplatform.ai) (2025-07-09)


### Bug Fixes

* fix deadlock problem in app install event trigger ([#308](https://clickstream.acaiplatform.ai)) ([5730a90](https://clickstream.acaiplatform.ai))

## [1.13.7](https://clickstream.acaiplatform.ai) (2025-06-19)


### Bug Fixes

* improve thread safety around shared state ([505455a](https://clickstream.acaiplatform.ai))

## [1.13.6](https://clickstream.acaiplatform.ai) (2025-06-04)


### Bug Fixes

* update min core version ([68cce1e](https://clickstream.acaiplatform.ai))

## [1.13.5](https://clickstream.acaiplatform.ai) (2025-06-03)


### Bug Fixes

* Remove unused TimeInterval helpers ([c0afe2a](https://clickstream.acaiplatform.ai))
* update to xcode 16.1 for prebuilt artifacts ([8dc6c5d](https://clickstream.acaiplatform.ai))

## [1.13.4](https://clickstream.acaiplatform.ai) (2025-05-29)


### Bug Fixes

* delay app start / end events when starting acai in foreground ([#295](https://clickstream.acaiplatform.ai)) ([c979b1b](https://clickstream.acaiplatform.ai))
* improve objc interface for Unified SDK ([#296](https://clickstream.acaiplatform.ai)) ([eb0ccb2](https://clickstream.acaiplatform.ai))

## [1.13.3](https://clickstream.acaiplatform.ai) (2025-05-27)


### Bug Fixes

* fix acai remove and apply plugin ([#293](https://clickstream.acaiplatform.ai)) ([b689baf](https://clickstream.acaiplatform.ai))

## [1.13.2](https://clickstream.acaiplatform.ai) (2025-05-20)


### Bug Fixes

* name of network request event ([#289](https://clickstream.acaiplatform.ai)) ([2ef0102](https://clickstream.acaiplatform.ai))

## [1.13.1](https://clickstream.acaiplatform.ai) (2025-05-13)


### Bug Fixes

* implement plugin lookup by type ([#288](https://clickstream.acaiplatform.ai)) ([729dee3](https://clickstream.acaiplatform.ai))

# [1.13.0](https://clickstream.acaiplatform.ai) (2025-05-07)


### Features

* Unified SDK Release ([#287](https://clickstream.acaiplatform.ai)) ([7c4889d](https://clickstream.acaiplatform.ai)), closes [#279](https://clickstream.acaiplatform.ai) [#280](https://clickstream.acaiplatform.ai)

## [1.12.1](https://clickstream.acaiplatform.ai) (2025-05-05)


### Bug Fixes

* remove eventbridge ([#285](https://clickstream.acaiplatform.ai)) ([6c6dfaf](https://clickstream.acaiplatform.ai))
* set user/device id on session events ([#286](https://clickstream.acaiplatform.ai)) ([a25df6e](https://clickstream.acaiplatform.ai))

# [1.12.0](https://clickstream.acaiplatform.ai) (2025-04-25)


### Bug Fixes

* apply identifies to identity userProperties in correct order ([#272](https://clickstream.acaiplatform.ai)) ([41deb6a](https://clickstream.acaiplatform.ai))
* clean up ios observers on stop ([#275](https://clickstream.acaiplatform.ai)) ([3965e13](https://clickstream.acaiplatform.ai))
* disallow setting nulls for various properties dicts, as this is not supported ([#277](https://clickstream.acaiplatform.ai)) ([70ea4be](https://clickstream.acaiplatform.ai))
* enable running tests from package.swift ([#274](https://clickstream.acaiplatform.ai)) ([f7aad5b](https://clickstream.acaiplatform.ai))
* move default init properties to new defaults structure so they can be shared ([#276](https://clickstream.acaiplatform.ai)) ([88e3b16](https://clickstream.acaiplatform.ai))
* remove unused enableRemoteConfig option ([#278](https://clickstream.acaiplatform.ai)) ([c9a2608](https://clickstream.acaiplatform.ai))
* treat non-op user properties as sets ([#273](https://clickstream.acaiplatform.ai)) ([df65e7b](https://clickstream.acaiplatform.ai))


### Features

* add network tracking support ([#270](https://clickstream.acaiplatform.ai)) ([d1647b3](https://clickstream.acaiplatform.ai))
* add ObjC interface for NetworkTrackingOptions ([#281](https://clickstream.acaiplatform.ai)) ([8f699fa](https://clickstream.acaiplatform.ai))
* unify several identity apis into a single Identity struct ([#268](https://clickstream.acaiplatform.ai)) ([ceae1e4](https://clickstream.acaiplatform.ai))

## [1.11.10](https://clickstream.acaiplatform.ai) (2025-04-14)


### Bug Fixes

* potential deadlock on storagequeue access ([#269](https://clickstream.acaiplatform.ai)) ([4091bd1](https://clickstream.acaiplatform.ai))

## [1.11.9](https://clickstream.acaiplatform.ai) (2025-03-27)


### Bug Fixes

* port Configuration.flushMaxRetries as pipeline retry cap ([#267](https://clickstream.acaiplatform.ai)) ([d4960b7](https://clickstream.acaiplatform.ai))

## [1.11.8](https://clickstream.acaiplatform.ai) (2025-03-26)


### Bug Fixes

* error handling for 400 request ([#266](https://clickstream.acaiplatform.ai)) ([33fd10c](https://clickstream.acaiplatform.ai))

## [1.11.7](https://clickstream.acaiplatform.ai) (2025-03-05)


### Bug Fixes

* allow adding Swift Plugins to ObjC Acai ([#264](https://clickstream.acaiplatform.ai)) ([d916d93](https://clickstream.acaiplatform.ai))

## [1.11.6](https://clickstream.acaiplatform.ai) (2025-03-03)


### Bug Fixes

* add watchos support back to CocoaPods ([#263](https://clickstream.acaiplatform.ai)) ([d9dd73e](https://clickstream.acaiplatform.ai))
* adding ability to send revenue currency ([#262](https://clickstream.acaiplatform.ai)) ([c34a138](https://clickstream.acaiplatform.ai))

## [1.11.5](https://clickstream.acaiplatform.ai) (2025-02-04)


### Bug Fixes

* improve multi-thread safety to prevent crash ([#259](https://clickstream.acaiplatform.ai)) ([25bde46](https://clickstream.acaiplatform.ai))

## [1.11.4](https://clickstream.acaiplatform.ai) (2025-01-31)


### Bug Fixes

* offline directly after receive bad url error ([#258](https://clickstream.acaiplatform.ai)) ([fb00966](https://clickstream.acaiplatform.ai))

## [1.11.3](https://clickstream.acaiplatform.ai) (2025-01-23)


### Bug Fixes

* enhance thread safety of properties ([#257](https://clickstream.acaiplatform.ai)) ([8ffcc65](https://clickstream.acaiplatform.ai))

## [1.11.2](https://clickstream.acaiplatform.ai) (2024-12-17)


### Bug Fixes

* add repeat interval on EventPipeline to prevent high frequency requests on continuing failing ([#250](https://clickstream.acaiplatform.ai)) ([8af9acf](https://clickstream.acaiplatform.ai))
* fix likely-to-fail test case ([#251](https://clickstream.acaiplatform.ai)) ([94e5e11](https://clickstream.acaiplatform.ai))

## [1.11.1](https://clickstream.acaiplatform.ai) (2024-12-09)


### Bug Fixes

* also include NSURLErrorNotConnectedToInternet when setting configuration to offline ([#249](https://clickstream.acaiplatform.ai)) ([4efb6f4](https://clickstream.acaiplatform.ai))

# [1.11.0](https://clickstream.acaiplatform.ai) (2024-11-20)


### Features

* add visionOS support ([#244](https://clickstream.acaiplatform.ai)) ([cd25c07](https://clickstream.acaiplatform.ai))

## [1.10.6](https://clickstream.acaiplatform.ai) (2024-11-19)


### Bug Fixes

* empty commit to trigger a build ([dc00739](https://clickstream.acaiplatform.ai))

## [1.10.5](https://clickstream.acaiplatform.ai) (2024-11-18)


### Bug Fixes

* prevent main thread checker warning ([#248](https://clickstream.acaiplatform.ai)) ([7b71d12](https://clickstream.acaiplatform.ai))

## [1.10.4](https://clickstream.acaiplatform.ai) (2024-11-14)


### Bug Fixes

* improvements to app lifecycle monitoring ([#243](https://clickstream.acaiplatform.ai)) ([8098782](https://clickstream.acaiplatform.ai))

## [1.10.3](https://clickstream.acaiplatform.ai) (2024-11-13)


### Bug Fixes

* empty commit to trigger a build ([ed0953f](https://clickstream.acaiplatform.ai))

## [1.10.2](https://clickstream.acaiplatform.ai) (2024-11-12)


### Bug Fixes

* properly decode embedded arrays ([#242](https://clickstream.acaiplatform.ai)) ([c5b4d2b](https://clickstream.acaiplatform.ai))
* restore Analytics-Connector to built from source version when distributing as a swift package ([#241](https://clickstream.acaiplatform.ai)) ([31133ac](https://clickstream.acaiplatform.ai))

## [1.10.1](https://clickstream.acaiplatform.ai) (2024-11-01)


### Bug Fixes

* preserve symlinks when zipping xcframeworks ([#237](https://clickstream.acaiplatform.ai)) ([0b01833](https://clickstream.acaiplatform.ai))

# [1.10.0](https://clickstream.acaiplatform.ai) (2024-10-31)


### Features

* support building without UIKit ([#235](https://clickstream.acaiplatform.ai)) ([61e77a1](https://clickstream.acaiplatform.ai))

## [1.9.4](https://clickstream.acaiplatform.ai) (2024-10-11)


### Bug Fixes

* Empty Commit to Trigger a Build ([19ffa87](https://clickstream.acaiplatform.ai))

## [1.9.3](https://clickstream.acaiplatform.ai) (2024-10-01)


### Bug Fixes

* add autoreleasepool around sendNextEventFile ([#232](https://clickstream.acaiplatform.ai)) ([0ec1187](https://clickstream.acaiplatform.ai))
* improve logging in httpclient ([#228](https://clickstream.acaiplatform.ai)) ([633deb5](https://clickstream.acaiplatform.ai))
* Use extension safe APIs ([#231](https://clickstream.acaiplatform.ai)) ([4794f4e](https://clickstream.acaiplatform.ai))

## [1.9.2](https://clickstream.acaiplatform.ai) (2024-09-10)


### Bug Fixes

* notify plugins of internal sessionId changes ([#224](https://clickstream.acaiplatform.ai)) ([61d43cf](https://clickstream.acaiplatform.ai))

## [1.9.1](https://clickstream.acaiplatform.ai) (2024-09-05)


### Bug Fixes

* Add maxQueuedEventCount parameter to trim events in storage if over a limit ([#222](https://clickstream.acaiplatform.ai)) ([0134383](https://clickstream.acaiplatform.ai))
* Send a max of one upload at a time ([#221](https://clickstream.acaiplatform.ai)) ([63e76d9](https://clickstream.acaiplatform.ai))

# [1.9.0](https://clickstream.acaiplatform.ai) (2024-08-24)


### Features

* Enhancements to Plugin interface ([#218](https://clickstream.acaiplatform.ai)) ([254e03a](https://clickstream.acaiplatform.ai))

## [1.8.1](https://clickstream.acaiplatform.ai) (2024-08-23)


### Bug Fixes

* Delete events on an invalid api key response. ([#211](https://clickstream.acaiplatform.ai)) ([9329a26](https://clickstream.acaiplatform.ai))
* Fix code compatibility issues on Xcode 14.1 ([#213](https://clickstream.acaiplatform.ai)) ([b2022b6](https://clickstream.acaiplatform.ai))
* fix pinchGestureRecognizer unavailability issue on tvos ([#217](https://clickstream.acaiplatform.ai)) ([4c5ae67](https://clickstream.acaiplatform.ai))
* set offline when receiving certain error responses ([#212](https://clickstream.acaiplatform.ai)) ([056ccbf](https://clickstream.acaiplatform.ai))

# [1.8.0](https://clickstream.acaiplatform.ai) (2024-08-08)


### Features

* Feature Autocapture ([#209](https://clickstream.acaiplatform.ai)) ([4ab5673](https://clickstream.acaiplatform.ai)), closes [#190](https://clickstream.acaiplatform.ai) [#195](https://clickstream.acaiplatform.ai) [#196](https://clickstream.acaiplatform.ai) [#199](https://clickstream.acaiplatform.ai) [#202](https://clickstream.acaiplatform.ai) [#203](https://clickstream.acaiplatform.ai) [#204](https://clickstream.acaiplatform.ai) [#206](https://clickstream.acaiplatform.ai) [#207](https://clickstream.acaiplatform.ai) [#208](https://clickstream.acaiplatform.ai)

# [1.7.0](https://clickstream.acaiplatform.ai) (2024-07-11)


### Bug Fixes

* add support for Decimal property values ([#187](https://clickstream.acaiplatform.ai)) ([c838bd9](https://clickstream.acaiplatform.ai))
* fix indentation issue ([#188](https://clickstream.acaiplatform.ai)) ([48b9a37](https://clickstream.acaiplatform.ai))


### Features

* Improve codable support ([#192](https://clickstream.acaiplatform.ai)) ([1ad9796](https://clickstream.acaiplatform.ai))

## [1.6.2](https://clickstream.acaiplatform.ai) (2024-06-14)


### Bug Fixes

* Don't use idfv for deviceId if invalid ([#183](https://clickstream.acaiplatform.ai)) ([f17e7fa](https://clickstream.acaiplatform.ai))

## [1.6.1](https://clickstream.acaiplatform.ai) (2024-06-12)


### Bug Fixes

* Add additional diagnostic logging ([#177](https://clickstream.acaiplatform.ai)) ([e0e47a7](https://clickstream.acaiplatform.ai))
* dispatch identify interceptor callbacks on correct queue ([#176](https://clickstream.acaiplatform.ai)) ([eaf6d16](https://clickstream.acaiplatform.ai))
* resolve compilation issue with watchOS 8.0 ([#180](https://clickstream.acaiplatform.ai)) ([d0b7bff](https://clickstream.acaiplatform.ai))

# [1.6.0](https://clickstream.acaiplatform.ai) (2024-06-04)


### Bug Fixes

* Disable network connectivity check on watchOS as it is not supported on real devices ([#174](https://clickstream.acaiplatform.ai)) ([853e4e5](https://clickstream.acaiplatform.ai))


### Features

* support single-target Watch applications ([#163](https://clickstream.acaiplatform.ai)) ([0d23d94](https://clickstream.acaiplatform.ai))

## [1.5.2](https://clickstream.acaiplatform.ai) (2024-05-21)


### Bug Fixes

* Send application opened for apps not yet using scene delegates ([#167](https://clickstream.acaiplatform.ai)) ([dd43026](https://clickstream.acaiplatform.ai))

## [1.5.1](https://clickstream.acaiplatform.ai) (2024-05-15)


### Bug Fixes

* Improve application opened event reliability ([#165](https://clickstream.acaiplatform.ai)) ([d3b9de7](https://clickstream.acaiplatform.ai))

# [1.5.0](https://clickstream.acaiplatform.ai) (2024-05-10)


### Features

* Dispatch operations to internal queue ([#159](https://clickstream.acaiplatform.ai)) ([83d24f7](https://clickstream.acaiplatform.ai))
* Fix retain cycles in Acai so instance will not leak memory ([#161](https://clickstream.acaiplatform.ai)) ([492d1fd](https://clickstream.acaiplatform.ai))

## [1.4.5](https://clickstream.acaiplatform.ai) (2024-04-18)


### Bug Fixes

* Adopt resource bundle for privacy manifest in Cocoapods ([#156](https://clickstream.acaiplatform.ai)) ([bdf2f43](https://clickstream.acaiplatform.ai))

## [1.4.4](https://clickstream.acaiplatform.ai) (2024-04-01)


### Bug Fixes

* expose DET utils for flutter plugin ([dc7c619](https://clickstream.acaiplatform.ai))

## [1.4.3](https://clickstream.acaiplatform.ai) (2024-03-26)


### Bug Fixes

* Trim and dedup error logs ([#147](https://clickstream.acaiplatform.ai)) ([1eb1633](https://clickstream.acaiplatform.ai))

## [1.4.2](https://clickstream.acaiplatform.ai) (2024-03-22)


### Bug Fixes

* better carthage support ([#142](https://clickstream.acaiplatform.ai)) ([a6f1559](https://clickstream.acaiplatform.ai))
* Fix compilation on Xcode 14.x ([#141](https://clickstream.acaiplatform.ai)) ([8eedaab](https://clickstream.acaiplatform.ai))
* Use appropriate background task API for app extensions ([#138](https://clickstream.acaiplatform.ai)) ([7231bee](https://clickstream.acaiplatform.ai))

## [1.4.1](https://clickstream.acaiplatform.ai) (2024-03-19)


### Bug Fixes

* Rely on on task completion vs http completion to end tasks ([#134](https://clickstream.acaiplatform.ai)) ([b17e704](https://clickstream.acaiplatform.ai))

# [1.4.0](https://clickstream.acaiplatform.ai) (2024-03-15)


### Bug Fixes

* Don't use idfv as deviceID if disabled. ([#133](https://clickstream.acaiplatform.ai)) ([76ef012](https://clickstream.acaiplatform.ai))
* Fixes for automatic screen tracking ([#137](https://clickstream.acaiplatform.ai)) ([55b2ca9](https://clickstream.acaiplatform.ai))
* tests on iOS 17 ([#136](https://clickstream.acaiplatform.ai)) ([04e5d03](https://clickstream.acaiplatform.ai))


### Features

* migrate storage to for better thread safety ([#129](https://clickstream.acaiplatform.ai)) ([2bbe919](https://clickstream.acaiplatform.ai))

## [1.3.6](https://clickstream.acaiplatform.ai) (2024-03-05)


### Bug Fixes

* Set inForeground to true after a new session has been started ([#124](https://clickstream.acaiplatform.ai)) ([3780c44](https://clickstream.acaiplatform.ai))

## [1.3.5](https://clickstream.acaiplatform.ai) (2024-02-28)


### Bug Fixes

* Do not migrate remnant data from legacy SDK when sandboxing is not enabled ([#127](https://clickstream.acaiplatform.ai)) ([e92f6ed](https://clickstream.acaiplatform.ai))

## [1.3.4](https://clickstream.acaiplatform.ai) (2024-02-23)


### Bug Fixes

* fix the enrichment plugin to enable filter event ([#123](https://clickstream.acaiplatform.ai)) ([5d3aeb0](https://clickstream.acaiplatform.ai))

## [1.3.3](https://clickstream.acaiplatform.ai) (2024-02-13)


### Bug Fixes

* fix setOnce identify operation ([#119](https://clickstream.acaiplatform.ai)) ([6934c89](https://clickstream.acaiplatform.ai))
* try fix crash ([#117](https://clickstream.acaiplatform.ai)) ([0536666](https://clickstream.acaiplatform.ai))

## [1.3.2](https://clickstream.acaiplatform.ai) (2024-02-13)


### Bug Fixes

* storage instance issue ([#118](https://clickstream.acaiplatform.ai)) ([2655645](https://clickstream.acaiplatform.ai))

## [1.3.1](https://clickstream.acaiplatform.ai) (2024-02-12)


### Bug Fixes

* migrate storage to instanceName-apiKey to isolate by instance ([#114](https://clickstream.acaiplatform.ai)) ([7128e62](https://clickstream.acaiplatform.ai))

# [1.3.0](https://clickstream.acaiplatform.ai) (2024-02-08)


### Features

* add offline mode ([#111](https://clickstream.acaiplatform.ai)) ([37b337d](https://clickstream.acaiplatform.ai))

# [1.2.0](https://clickstream.acaiplatform.ai) (2024-02-05)


### Bug Fixes

* ensure event data is sandboxed per app for all platforms ([#113](https://clickstream.acaiplatform.ai)) ([72da9f8](https://clickstream.acaiplatform.ai))
* should track coarse location by default ([#110](https://clickstream.acaiplatform.ai)) ([2aab265](https://clickstream.acaiplatform.ai))


### Features

* add privacy manifest for ios 17 ([#109](https://clickstream.acaiplatform.ai)) ([cf0ca47](https://clickstream.acaiplatform.ai))

# [1.1.0](https://clickstream.acaiplatform.ai) (2023-10-30)


### Features

* add client upload time ([#94](https://clickstream.acaiplatform.ai)) ([a0d59f1](https://clickstream.acaiplatform.ai))

# [1.0.0](https://clickstream.acaiplatform.ai) (2023-10-27)


### Bug Fixes

* add setSessionId() method ([#95](https://clickstream.acaiplatform.ai)) ([1fb9f01](https://clickstream.acaiplatform.ai))


### Features

* Release 1.0.0 ([#98](https://clickstream.acaiplatform.ai)) ([b047273](https://clickstream.acaiplatform.ai))


### BREAKING CHANGES

* New major version

## [0.7.3](https://clickstream.acaiplatform.ai) (2023-10-17)


### Bug Fixes

* add support for CGFloat property values ([#91](https://clickstream.acaiplatform.ai)) ([6de48f0](https://clickstream.acaiplatform.ai))

## [0.7.2](https://clickstream.acaiplatform.ai) (2023-10-04)


### Bug Fixes

* add Objective-C support to get property values ([#88](https://clickstream.acaiplatform.ai)) ([a0d5aa6](https://clickstream.acaiplatform.ai))

## [0.7.1](https://clickstream.acaiplatform.ai) (2023-09-29)


### Bug Fixes

* Objective-C support for plugin flush() ([#87](https://clickstream.acaiplatform.ai)) ([726e3e8](https://clickstream.acaiplatform.ai))

# [0.7.0](https://clickstream.acaiplatform.ai) (2023-09-28)


### Features

* Objective-C support ([#84](https://clickstream.acaiplatform.ai)) ([eeced3e](https://clickstream.acaiplatform.ai))

# [0.6.0](https://clickstream.acaiplatform.ai) (2023-09-21)


### Bug Fixes

* encoding Encodable values from [String: Any] ([#82](https://clickstream.acaiplatform.ai)) ([#83](https://clickstream.acaiplatform.ai)) ([b610fa1](https://clickstream.acaiplatform.ai))


### Features

* default tracking options, auto-track application lifecycle events ([#79](https://clickstream.acaiplatform.ai)) ([c74979a](https://clickstream.acaiplatform.ai))

## [0.5.1](https://clickstream.acaiplatform.ai) (2023-09-12)


### Bug Fixes

* mark uploads as background tasks to let them continue if the app enters the background ([#78](https://clickstream.acaiplatform.ai)) ([80b465e](https://clickstream.acaiplatform.ai))

# [0.5.0](https://clickstream.acaiplatform.ai) (2023-09-08)


### Features

* support integration with experiment ios ([#80](https://clickstream.acaiplatform.ai)) ([ff3a8ec](https://clickstream.acaiplatform.ai))

## [0.4.14](https://clickstream.acaiplatform.ai) (2023-08-17)


### Bug Fixes

* open 'DestinationPlugin.execute()' method ([#76](https://clickstream.acaiplatform.ai)) ([e6bd825](https://clickstream.acaiplatform.ai))

## [0.4.13](https://clickstream.acaiplatform.ai) (2023-08-16)


### Bug Fixes

* refactor base plugin types ([#73](https://clickstream.acaiplatform.ai)) ([4c8a662](https://clickstream.acaiplatform.ai))

## [0.4.12](https://clickstream.acaiplatform.ai) (2023-08-15)


### Bug Fixes

* remove location-related code from SDK, add an example plugin to collect location data ([#75](https://clickstream.acaiplatform.ai)) ([34ff8e5](https://clickstream.acaiplatform.ai))

## [0.4.11](https://clickstream.acaiplatform.ai) (2023-08-11)


### Bug Fixes

* normalize explicit empty instance name ([#71](https://clickstream.acaiplatform.ai)) ([ac60e5e](https://clickstream.acaiplatform.ai))

## [0.4.10](https://clickstream.acaiplatform.ai) (2023-08-11)


### Bug Fixes

* move mergeEventOptions() function to EventOptions class ([#72](https://clickstream.acaiplatform.ai)) ([7a78576](https://clickstream.acaiplatform.ai))

## [0.4.9](https://clickstream.acaiplatform.ai) (2023-08-11)


### Bug Fixes

* setGroup() should set event.userProperties ([#70](https://clickstream.acaiplatform.ai)) ([109f33c](https://clickstream.acaiplatform.ai))

## [0.4.8](https://clickstream.acaiplatform.ai) (2023-08-09)


### Bug Fixes

* make 'mergeEventOptions' public ([#67](https://clickstream.acaiplatform.ai)) ([5a946f7](https://clickstream.acaiplatform.ai))
* normalize package names for all package managers ([#69](https://clickstream.acaiplatform.ai)) ([251ebdf](https://clickstream.acaiplatform.ai))

## [0.4.7](https://clickstream.acaiplatform.ai) (2023-07-19)


### Bug Fixes

* made EventOptions.init public ([#64](https://clickstream.acaiplatform.ai)) ([74992ce](https://clickstream.acaiplatform.ai))
* migrate 'api key' storage data to 'instance name' storage ([#63](https://clickstream.acaiplatform.ai)) ([9199039](https://clickstream.acaiplatform.ai))
* migrate legacy data ([#62](https://clickstream.acaiplatform.ai)) ([d1c6b32](https://clickstream.acaiplatform.ai))

## [0.4.6](https://clickstream.acaiplatform.ai) (2023-06-07)


### Bug Fixes

* added getSessionId() method ([#58](https://clickstream.acaiplatform.ai)) ([b990f2a](https://clickstream.acaiplatform.ai))

## [0.4.5](https://clickstream.acaiplatform.ai) (2023-06-05)


### Bug Fixes

* add getUserId() and getDeviceId() methods ([#57](https://clickstream.acaiplatform.ai)) ([3f17782](https://clickstream.acaiplatform.ai))

## [0.4.4](https://clickstream.acaiplatform.ai) (2023-05-25)


### Bug Fixes

* fix disable tracking options ([#54](https://clickstream.acaiplatform.ai)) ([6185ac1](https://clickstream.acaiplatform.ai))

## [0.4.3](https://clickstream.acaiplatform.ai) (2023-05-12)


### Bug Fixes

* session not behaving as expected ([#53](https://clickstream.acaiplatform.ai)) ([c02b64a](https://clickstream.acaiplatform.ai))

## [0.4.2](https://clickstream.acaiplatform.ai) (2023-04-27)


### Bug Fixes

* updated license to current year ([#52](https://clickstream.acaiplatform.ai)) ([61f5812](https://clickstream.acaiplatform.ai))

## [0.4.1](https://clickstream.acaiplatform.ai) (2023-04-26)


### Bug Fixes

* update identify collapsing logic to send actions on separate identify event ([#48](https://clickstream.acaiplatform.ai)) ([6040632](https://clickstream.acaiplatform.ai))
* updated identify merging logic to ignore nil values ([#49](https://clickstream.acaiplatform.ai)) ([0320451](https://clickstream.acaiplatform.ai))

# [0.4.0](https://clickstream.acaiplatform.ai) (2023-02-25)


### Bug Fixes

* fix platform value ([#43](https://clickstream.acaiplatform.ai)) ([dc78228](https://clickstream.acaiplatform.ai))


### Features

* add identify interceptor to reduce identify volumes ([#40](https://clickstream.acaiplatform.ai)) ([835a6f6](https://clickstream.acaiplatform.ai))

## [0.3.2](https://clickstream.acaiplatform.ai) (2023-02-21)


### Bug Fixes

* expose plan and ingestion metadata ([#41](https://clickstream.acaiplatform.ai)) ([da85455](https://clickstream.acaiplatform.ai))

## [0.3.1](https://clickstream.acaiplatform.ai) (2023-02-14)


### Bug Fixes

* fix userId is overwritten by deviceId and make reset public ([#33](https://clickstream.acaiplatform.ai)) ([4f49720](https://clickstream.acaiplatform.ai))
* remove serverUrl as default value for configuration ([#34](https://clickstream.acaiplatform.ai)) ([48d0921](https://clickstream.acaiplatform.ai))

# [0.3.0](https://clickstream.acaiplatform.ai) (2022-12-20)


### Features

* update destination plugin to class ([#30](https://clickstream.acaiplatform.ai)) ([705e61f](https://clickstream.acaiplatform.ai))

# [0.2.0](https://clickstream.acaiplatform.ai) (2022-12-16)


### Features

* add carrier info ([#27](https://clickstream.acaiplatform.ai)) ([3a946d8](https://clickstream.acaiplatform.ai))
* add widget appclip examples ([#28](https://clickstream.acaiplatform.ai)) ([c23e990](https://clickstream.acaiplatform.ai))

# [0.1.0](https://clickstream.acaiplatform.ai) (2022-12-15)


### Bug Fixes

* add lifecycle plugin ([a26c621](https://clickstream.acaiplatform.ai))
* add other platform lifecycle plugin and lints fix ([c3f9c5b](https://clickstream.acaiplatform.ai))
* add return to IdentityEventSender.execute ([75d787e](https://clickstream.acaiplatform.ai))
* add the placeholder for IdentityEventSender ([2ad97da](https://clickstream.acaiplatform.ai))
* change storage to use sync queue, fix retry issues ([#14](https://clickstream.acaiplatform.ai)) ([e2d824a](https://clickstream.acaiplatform.ai))
* fix based on comments ([4f354bc](https://clickstream.acaiplatform.ai))
* fix logger in destination ([a7ff24e](https://clickstream.acaiplatform.ai))
* fix the demo app to fit ipad ([#12](https://clickstream.acaiplatform.ai)) ([72b1ef1](https://clickstream.acaiplatform.ai))
* fix timeline in destination plugin ([0767751](https://clickstream.acaiplatform.ai))
* lints and other comments ([296951b](https://clickstream.acaiplatform.ai))
* nits ([2e264a5](https://clickstream.acaiplatform.ai))
* pass acai instance in plugin setup ([42fbb51](https://clickstream.acaiplatform.ai))
* typo and types ([fe5dba7](https://clickstream.acaiplatform.ai))
* update support watchOS version ([5cc61f2](https://clickstream.acaiplatform.ai))


### Features

* add class and file placeholders ([d824cf1](https://clickstream.acaiplatform.ai))
* add podspec and release flow ([#18](https://clickstream.acaiplatform.ai)) ([ef1ff28](https://clickstream.acaiplatform.ai))
* add timeline ([7cda5b2](https://clickstream.acaiplatform.ai))
* Context plugin ([#8](https://clickstream.acaiplatform.ai)) ([64ba783](https://clickstream.acaiplatform.ai))
* destination plugin ([4dc18d9](https://clickstream.acaiplatform.ai))
* identify, revenue, acai client ([#16](https://clickstream.acaiplatform.ai)) ([ab847f0](https://clickstream.acaiplatform.ai))
* idfa plugin example ([#17](https://clickstream.acaiplatform.ai)) ([9104e5f](https://clickstream.acaiplatform.ai))
* main function implementation ([29645c0](https://clickstream.acaiplatform.ai))
* persistent storage, httpclient, eventpipeline ([#9](https://clickstream.acaiplatform.ai)) ([0b5e99f](https://clickstream.acaiplatform.ai))
* response retry handlers ([#11](https://clickstream.acaiplatform.ai)) ([86d92f6](https://clickstream.acaiplatform.ai))
* session event init ([#13](https://clickstream.acaiplatform.ai)) ([bbf7517](https://clickstream.acaiplatform.ai))
* setup lint, jira issue create, fix all file lint issues, update config ([0a34b96](https://clickstream.acaiplatform.ai))
* support event callback and fix missing insert_id ([#15](https://clickstream.acaiplatform.ai)) ([1f746e8](https://clickstream.acaiplatform.ai))
