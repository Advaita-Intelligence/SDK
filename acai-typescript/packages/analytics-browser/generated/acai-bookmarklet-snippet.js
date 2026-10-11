"use strict";

/**
 * Create a bookmark with this code snippet in the browser, update the apiKey, userId, and serverZone, and click the bookmark on any website to run.
 * Script will fail to load if the website has a Content Security Policy (CSP) that blocks third-party inline scripts.
 */
!function (window, document) {
  var acai = window.acai || {
    _q: [],
    _iq: {}
  };
  if (acai.invoked) window.console && console.error && console.error('Acai snippet has been loaded.');else {
    var proxy = function proxy(obj, fn) {
      obj.prototype[fn] = function () {
        this._q.push({
          name: fn,
          args: Array.prototype.slice.call(arguments, 0)
        });
        return this;
      };
    };
    var getPromiseResult = function getPromiseResult(instance, fn, args) {
      return function (resolve) {
        instance._q.push({
          name: fn,
          args: Array.prototype.slice.call(args, 0),
          resolve: resolve
        });
      };
    };
    var proxyMain = function proxyMain(instance, fn, isPromise) {
      instance[fn] = function () {
        if (isPromise) return {
          promise: new Promise(getPromiseResult(instance, fn, Array.prototype.slice.call(arguments)))
        };
      };
    };
    var setUpProxy = function setUpProxy(instance) {
      for (var k = 0; k < funcs.length; k++) {
        proxyMain(instance, funcs[k], false);
      }
      for (var l = 0; l < funcsWithPromise.length; l++) {
        proxyMain(instance, funcsWithPromise[l], true);
      }
    };
    acai.invoked = true;
    var s = document.getElementsByTagName('script')[0];
    var autoTrackingPluginScript = document.createElement('script');
    autoTrackingPluginScript.src = 'https://cdn.acai.yourdomain.com/libs/plugin-autocapture-browser-0.9.0-min.js.gz';
    autoTrackingPluginScript.async = false;
    s.parentNode.insertBefore(autoTrackingPluginScript, s);
    var as = document.createElement('script');
    as.type = 'text/javascript';
    as.integrity = 'sha384-/gIcpSt/yKdSfRPoGfCKnpfNWig4bNZ5j46pVohzIB1vg6DthuBlAl5VLPTT2Jfy';
    as.crossOrigin = 'anonymous';
    as.async = false;
    as.src = 'https://cdn.acai.yourdomain.com/libs/analytics-browser-2.35.4-min.js.gz';
    as.onload = function () {
      if (!window.acai.runQueuedFunctions) {
        console.log('[Acai] Error: could not load SDK');
      }
      window.acai.init('YOUR_API_KEY', 'YOUR_USER_ID', {
        instanceName: 'acai-bookmarklet',
        serverZone: 'YOUR_SERVER_ZONE',
        ingestionMetadata: {
          sourceName: 'browser-typescript-bookmarklet',
          sourceVersion: '1.0.0'
        },
        optOut: false
      });
      if (acaiAutocapturePlugin && acaiAutocapturePlugin.autocapturePlugin && typeof acaiAutocapturePlugin.autocapturePlugin === 'function') {
        window.acai.add(acaiAutocapturePlugin.autocapturePlugin());
      }
      alert('Acai is now tracking events!');
    };
    s.parentNode.insertBefore(as, s);
    var Identify = function Identify() {
      this._q = [];
      return this;
    };
    var identifyFuncs = ['add', 'append', 'clearAll', 'prepend', 'set', 'setOnce', 'unset', 'preInsert', 'postInsert', 'remove', 'getUserProperties'];
    for (var i = 0; i < identifyFuncs.length; i++) {
      proxy(Identify, identifyFuncs[i]);
    }
    acai.Identify = Identify;
    var Revenue = function Revenue() {
      this._q = [];
      return this;
    };
    var revenueFuncs = ['getEventProperties', 'setProductId', 'setQuantity', 'setPrice', 'setRevenue', 'setRevenueType', 'setReceipt', 'setReceiptSig', 'setCurrency', 'setEventProperties'];
    for (var j = 0; j < revenueFuncs.length; j++) {
      proxy(Revenue, revenueFuncs[j]);
    }
    acai.Revenue = Revenue;
    var funcs = ['getDeviceId', 'setDeviceId', 'getSessionId', 'setSessionId', 'getUserId', 'setUserId', 'setOptOut', 'setTransport', 'reset', 'extendSession'];
    var funcsWithPromise = ['init', 'add', 'remove', 'track', 'logEvent', 'identify', 'groupIdentify', 'setGroup', 'revenue', 'flush'];
    setUpProxy(acai);
    acai.createInstance = function (instanceName) {
      acai._iq[instanceName] = {
        _q: []
      };
      setUpProxy(acai._iq[instanceName]);
      return acai._iq[instanceName];
    };
    window.acai = acai;
  }
}(window, document);