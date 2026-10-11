import { createApp } from 'vue';
import App from './App.vue';
import * as acai from '@acai/analytics-browser';

/**
 * Start by calling acai.init(). This must be done before any event tracking
 * preferrably in the root file of the project.
 *
 * Calling init() requires an API key
 * ```
 * acai.init(API_KEY)
 * ```
 *
 * Optionally, a user id can be provided when calling init()
 * ```
 * acai.init(API_KEY, 'example.vue.user@acai.yourdomain.com')
 * ```
 *
 * Optionally, a config object can be provided. Refer to https://YOUR_USERNAME.github.io/Acai-TypeScript/interfaces/Types.BrowserConfig.html
 * for object properties.
 */
acai.init('API_KEY', 'example.vue.user@acai.yourdomain.com');

createApp(App).mount('#app');
