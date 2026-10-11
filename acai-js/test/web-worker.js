/* eslint-disable no-undef */
importScripts('/base/acai.js');
importScripts('/base/node_modules/sinon/pkg/sinon.js');
const { createSandbox } = sinon;
/* eslint-enable no-undef */

var isTrue = function (a) {
  if (!a) {
    throw new Error('Assertion failed: object is falsey.');
  }
};

describe('web worker', function () {
  let sbox;
  beforeEach(function () {
    sbox = createSandbox();
  });

  afterEach(function () {
    sbox.restore();
  });

  describe('init', () => {
    it('should init successfully', () => {
      const onSuccess = sbox.spy();
      const onError = sbox.spy();
      acai.init(
        'API_KEY',
        undefined,
        {
          onError: onError,
          eventUploadThreshold: 1,
        },
        onSuccess,
      );
      isTrue(acai.getInstance()._isInitialized);
      isTrue(acai.getInstance()._newSession);
      isTrue(onSuccess.calledOnce);
      isTrue(onError.notCalled);
    });
  });

  describe('logEvent', () => {
    it('should log event successfully', () => {
      const onError = sbox.spy();
      const sendEvents = sbox.stub(acai.getInstance(), 'sendEvents').returns(undefined);
      acai
        .getInstance()
        .logEvent('event', {}, undefined, undefined, undefined, undefined, undefined, undefined, onError);
      isTrue(sendEvents.calledOnce);
      isTrue(onError.notCalled);
    });
  });

  describe('logEventWithGroups', () => {
    it('should log event with groups successfully', () => {
      const callback = sbox.spy();
      const onError = sbox.spy();
      const outOfSession = false;
      const sendEvents = sbox.stub(acai.getInstance(), 'sendEvents').returns(undefined);
      acai.getInstance().logEventWithGroups('event', {}, undefined, callback, onError, outOfSession);
      isTrue(sendEvents.calledOnce);
      isTrue(onError.notCalled);
    });
  });

  describe('sendEvents', () => {
    it('should send event successfully', () => {
      const _unsentCount = sbox.stub(acai.getInstance(), '_unsentCount').returns(1);
      const _mergeEventsAndIdentifys = sbox.stub(acai.getInstance(), '_mergeEventsAndIdentifys').returns({
        eventsToSend: [{ event: {} }],
      });
      const _logErrorsOnEvents = sbox.stub(acai.getInstance(), '_logErrorsOnEvents').returns();
      acai.getInstance().sendEvents();
      isTrue(_unsentCount.callCount === 2);
      isTrue(_mergeEventsAndIdentifys.calledOnce);
      isTrue(_logErrorsOnEvents.notCalled);
    });
  });

  describe('identify', () => {
    it('should identify successfully', () => {
      const callback = sbox.spy();
      const errorCallback = sbox.spy();
      const outOfSession = false;
      const sendEvents = sbox.stub(acai.getInstance(), 'sendEvents').returns(undefined);
      const identity = new acai.Identify().set('colors', ['rose', 'gold']);
      acai.getInstance().identify(identity, callback, errorCallback, outOfSession);
      isTrue(sendEvents.calledOnce);
      isTrue(errorCallback.notCalled);
    });
  });

  describe('groupIdentify', () => {
    it('should group identify successfully', () => {
      const callback = sbox.spy();
      const errorCallback = sbox.spy();
      const outOfSession = false;
      const sendEvents = sbox.stub(acai.getInstance(), 'sendEvents').returns(undefined);
      const identity = new acai.Identify().set('colors', ['rose', 'gold']);
      acai.getInstance().groupIdentify('groupType', 'groupName', identity, callback, errorCallback, outOfSession);
      isTrue(sendEvents.calledOnce);
      isTrue(errorCallback.notCalled);
    });
  });

  describe('logRevenue', () => {
    it('should log revenue successfully', () => {
      const _logEvent = sbox.stub(acai.getInstance(), '_logEvent').returns(undefined);
      acai.logRevenue(1, 1, 'asdf');
      isTrue(_logEvent.calledOnce);
    });
  });

  describe('logRevenueV2', () => {
    it('should log revenue successfully', () => {
      const revenue = new acai.Revenue().setProductId('productIdentifier').setPrice(10.99);
      const sendEvents = sbox.stub(acai.getInstance(), 'sendEvents').returns(undefined);
      acai.logRevenueV2(revenue);
      isTrue(sendEvents.calledOnce);
    });
  });

  describe('setGroup', () => {
    it('should set group successfully', () => {
      const onError = sbox.spy();
      const sendEvents = sbox.stub(acai.getInstance(), 'sendEvents').returns(undefined);
      acai.getInstance().setGroup('groupType', 'groupName');
      isTrue(sendEvents.calledOnce);
      isTrue(onError.notCalled);
    });
  });

  describe('setUserProperties', () => {
    it('should set user properties successfully', () => {
      const identify = sbox.stub(acai.getInstance(), 'identify').returns(undefined);
      acai.getInstance().setUserProperties({ a: 1 });
      isTrue(identify.calledOnce);
    });
  });

  describe('setVersionName', () => {
    it('should set version name successfully', () => {
      acai.getInstance().setVersionName('1.1.1');
      isTrue(acai.getInstance().options.versionName === '1.1.1');
    });
  });

  describe('enableTracking', () => {
    it('should set domain successfully', () => {
      const runQueuedFunctions = sbox.stub(acai.getInstance(), 'runQueuedFunctions').returns(undefined);
      acai.getInstance().enableTracking();
      isTrue(runQueuedFunctions.calledOnce);
    });
  });

  describe('setGlobalUserProperties', () => {
    it('should set global user properties successfully', () => {
      const setUserProperties = sbox.stub(acai.getInstance(), 'setUserProperties').returns(undefined);
      acai.getInstance().setGlobalUserProperties();
      isTrue(setUserProperties.calledOnce);
    });
  });

  describe('clearUserProperties', () => {
    it('should call set user properties successfully', () => {
      const identify = sbox.stub(acai.getInstance(), 'identify').returns(undefined);
      acai.getInstance().clearUserProperties();
      isTrue(identify.calledOnce);
    });
  });

  describe('regenerateDeviceId', () => {
    it('should regenerate device id successfully', () => {
      const setDeviceId = sbox.stub(acai.getInstance(), 'setDeviceId').returns(undefined);
      acai.getInstance().regenerateDeviceId();
      isTrue(setDeviceId.calledOnce);
    });
  });

  describe('setSessionId', () => {
    it('should set new session id successfully', () => {
      acai.getInstance().setSessionId(123);
      isTrue(acai.getInstance().getSessionId() === 123);
    });
  });

  describe('resetSessionId', () => {
    it('should set new session id successfully', () => {
      acai.getInstance().resetSessionId();
      isTrue(acai.getInstance().getSessionId() !== 123);
    });
  });
});
