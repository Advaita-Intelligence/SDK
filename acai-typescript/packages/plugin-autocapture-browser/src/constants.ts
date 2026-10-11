export const PLUGIN_NAME = '@acai/plugin-autocapture-browser';
export const FRUSTRATION_PLUGIN_NAME = '@acai/plugin-frustration-browser';

export const ACAI_ELEMENT_CLICKED_EVENT = '[Acai] Element Clicked';
export const ACAI_ELEMENT_DEAD_CLICKED_EVENT = '[Acai] Dead Click';
export const ACAI_ELEMENT_RAGE_CLICKED_EVENT = '[Acai] Rage Click';
export const ACAI_ELEMENT_ERROR_CLICKED_EVENT = '[Acai] Error Click';
export const ACAI_ELEMENT_CHANGED_EVENT = '[Acai] Element Changed';
export const ACAI_THRASHED_CURSOR_EVENT = '[Acai] Thrashed Cursor';

export const ACAI_EVENT_PROP_ELEMENT_ID = '[Acai] Element ID';
export const ACAI_EVENT_PROP_ELEMENT_CLASS = '[Acai] Element Class';
export const ACAI_EVENT_PROP_ELEMENT_TAG = '[Acai] Element Tag';
export const ACAI_EVENT_PROP_ELEMENT_TEXT = '[Acai] Element Text';
export const ACAI_EVENT_PROP_ELEMENT_HIERARCHY = '[Acai] Element Hierarchy';
export const ACAI_EVENT_PROP_ELEMENT_HREF = '[Acai] Element Href';
export const ACAI_EVENT_PROP_ELEMENT_POSITION_LEFT = '[Acai] Element Position Left';
export const ACAI_EVENT_PROP_ELEMENT_POSITION_TOP = '[Acai] Element Position Top';
export const ACAI_EVENT_PROP_ELEMENT_ARIA_LABEL = '[Acai] Element Aria Label';
export const ACAI_EVENT_PROP_ELEMENT_ATTRIBUTES = '[Acai] Element Attributes';

export const ACAI_EVENT_PROP_ELEMENT_PARENT_LABEL = '[Acai] Element Parent Label';
export const ACAI_EVENT_PROP_PAGE_URL = '[Acai] Page URL';
export const ACAI_EVENT_PROP_PAGE_TITLE = '[Acai] Page Title';
export const ACAI_EVENT_PROP_VIEWPORT_HEIGHT = '[Acai] Viewport Height';
export const ACAI_EVENT_PROP_VIEWPORT_WIDTH = '[Acai] Viewport Width';

// Origin constants are now shared via analytics-core; re-export for backwards compatibility
export {
  ACAI_ORIGIN,
  ACAI_ORIGIN_EU,
  ACAI_ORIGIN_STAGING,
  ACAI_ORIGINS_MAP,
  ACAI_BACKGROUND_CAPTURE_SCRIPT_URL,
} from '@acai/analytics-core';

export const ACAI_VISUAL_TAGGING_SELECTOR_SCRIPT_URL =
  'https://cdn.acai.yourdomain.com/libs/visual-tagging-selector-1.0.0-alpha.js.gz';
// This is the class name used by the visual tagging selector to highlight the selected element.
// Should not use this class in the selector.
export const ACAI_VISUAL_TAGGING_HIGHLIGHT_CLASS = 'amp-visual-tagging-selector-highlight';

// Data attribute for specifying which attributes should be redacted from autocapture
export const DATA_AMP_MASK_ATTRIBUTES = 'data-amp-mask-attributes';

export const MAX_MASK_TEXT_PATTERNS = 25;
export const MAX_ATTRIBUTE_LENGTH = 128;
