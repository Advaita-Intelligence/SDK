/**
 * Imported in client browser via <script> tag
 * Async capabilities: Interally creates stubbed window.acai object until real SDK loaded
 * Stubbed functions keep track of funciton calls and their arguments
 * These are sent once real SDK loaded through another <script> tag
 */
(function (window, document) {
  var acai = window.acai || { _q: [], _iq: {} };
  var as = document.createElement('script');
  as.type = 'text/javascript';
  // Don't edit as.integrity, it is tracked by semantic-release-bot during releases
  as.integrity = 'sha384-TYU/E4KRg+lBzhPKrmGJeQOu1Z+8s2VpbXpFFg8LbYBHTMFYpfzboPAbEPBUi1V2';
  as.crossOrigin = 'anonymous';
  as.async = true;
  // Don't edit as.src, it is tracked by semantic-release-bot during releases
  as.src = 'https://clickstream.acaiplatform.ai/libs/acai-8.21.10-min.gz.js';
  as.onload = function () {
    if (!window.acai.runQueuedFunctions) {
      console.log('[Acai] Error: could not load SDK');
    }
  };
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(as, s);
  function proxy(obj, fn) {
    obj.prototype[fn] = function () {
      this._q.push([fn].concat(Array.prototype.slice.call(arguments, 0)));
      return this;
    };
  }
  var Identify = function () {
    this._q = [];
    return this;
  };
  var identifyFuncs = [
    'add',
    'append',
    'clearAll',
    'prepend',
    'set',
    'setOnce',
    'unset',
    'preInsert',
    'postInsert',
    'remove',
  ];
  for (var i = 0; i < identifyFuncs.length; i++) {
    proxy(Identify, identifyFuncs[i]);
  }
  acai.Identify = Identify;
  var Revenue = function () {
    this._q = [];
    return this;
  };
  var revenueFuncs = ['setProductId', 'setQuantity', 'setPrice', 'setRevenueType', 'setEventProperties'];
  for (var j = 0; j < revenueFuncs.length; j++) {
    proxy(Revenue, revenueFuncs[j]);
  }
  acai.Revenue = Revenue;
  var funcs = [
    'init',
    'logEvent',
    'logRevenue',
    'setUserId',
    'setUserProperties',
    'setOptOut',
    'setVersionName',
    'setDomain',
    'setDeviceId',
    'enableTracking',
    'setGlobalUserProperties',
    'identify',
    'clearUserProperties',
    'setGroup',
    'logRevenueV2',
    'regenerateDeviceId',
    'groupIdentify',
    'onInit',
    'onNewSessionStart',
    'logEventWithTimestamp',
    'logEventWithGroups',
    'setSessionId',
    'resetSessionId',
    'getDeviceId',
    'getUserId',
    'setMinTimeBetweenSessionsMillis',
    'setEventUploadThreshold',
    'setServerZone',
    'setServerUrl',
    'sendEvents',
    'setLibrary',
    'setTransport',
  ];
  function setUpProxy(instance) {
    function proxyMain(fn) {
      instance[fn] = function () {
        instance._q.push([fn].concat(Array.prototype.slice.call(arguments, 0)));
      };
    }
    for (var k = 0; k < funcs.length; k++) {
      proxyMain(funcs[k]);
    }
  }
  setUpProxy(acai);
  acai.getInstance = function (instance) {
    instance = (!instance || instance.length === 0 ? '$default_instance' : instance).toLowerCase();
    if (!Object.prototype.hasOwnProperty.call(acai._iq, instance)) {
      acai._iq[instance] = { _q: [] };
      setUpProxy(acai._iq[instance]);
    }
    return acai._iq[instance];
  };
  window.acai = acai;
})(window, document);
