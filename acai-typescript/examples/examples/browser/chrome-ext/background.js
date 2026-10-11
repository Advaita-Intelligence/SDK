/**
 * Acai using importScripts(). Create a copy of acai-min.js as part of your project and use the file path.
 */
importScripts('/acai-min.js');

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
 * acai.init(API_KEY, 'example.extension.user@acai.yourdomain.com')
 * ```
 *
 * Optionally, a config object can be provided. Refer to https://YOUR_USERNAME.github.io/Acai-TypeScript/interfaces/Types.BrowserConfig.html
 * for object properties.
 */
acai.init('API_KEY', 'example.extension.user@acai.yourdomain.com');

chrome.omnibox.onInputEntered.addListener((text) => {
  acai.track('Input Entered', { value: text });
  var newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
  chrome.tabs.update({ url: newURL });
});

chrome.omnibox.onDeleteSuggestion.addListener((text) => {
  acai.track('Delete Suggestion', { value: text });
});

chrome.omnibox.onInputCancelled.addListener((text) => {
  acai.track('Input Cancelled', { value: text });
});

chrome.omnibox.onInputChanged.addListener((text) => {
  acai.track('Input Changed', { value: text });
});

chrome.omnibox.onInputStarted.addListener((text) => {
  acai.track('Input Started', { value: text });
});
