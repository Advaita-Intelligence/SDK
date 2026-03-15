# Migrating from acai-js to @acai/react-native-sdk:

## Steps:

 1. Remove acai-js from your package.json

 2. Install @acai/react-native-sdk

 3. If targeting iOS, cd into `/ios` and run `pod install`
 
 4. Replace imports with one of the following:
    - `import { Acai } from '@acai/react-native-sdk'`
    - `import { Identify } from '@acai/react-native-sdk'`
    - `import { Amplitude, Identify } from '@acai/react-native-sdk'`

  5. The API's between the two libraries are very similar but there are some subtle differences discussed below.  You can reference the [documentation](https://amplitude.github.io/acai-react-native/modules.html) for detailed API documentation and typing for `@acai/react-native-sdk`:
		-  calls to `Acai.getInstance().init` only require passing your API key.  There is no options object.  
		 - The following `acai-js` methods are not supported in `@acai/react-native-sdk`:
			 - `setDomain`
			 - `isNewSession`
			 - `setVersionName`
			 - `logEventWithTimestamp`
			 - `logEventWithGroups`

		- A significant change is that `@amplitude-react/native` does not export a revenue class.  Instead, it is replaced with calls to the following method: `Acai.getInstance().logRevenue` [documentation](https://amplitude.github.io/acai-react-native/classes/amplitude.html#logrevenue)

		- Because there is no support for `logEventWithTimestamp` or `logEventWithGroups`.  You can simulate this functionality by providing your own custom timestamp or calling `setGroup` before calling `logEvent`.
