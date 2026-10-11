import 'dart:js_interop';

@JS('acai')
extension type Acai(JSObject _) implements JSObject {
  external Acai createInstance();
  external JSPromise init(String apiKey, JSObject? configuration);
  external void add(JSObject plugin);
  external void track(JSObject event);
  external JSString? getUserId();
  external void setUserId(JSString? userId);
  external JSString? getDeviceId();
  external void setDeviceId(JSString? devideId);
  external JSNumber? getSessionId();
  external void setOptOut(JSBoolean enabled);
  external void reset();
  external void flush();
}
