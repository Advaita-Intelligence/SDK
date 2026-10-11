import '../acai-snippet.min.js';

describe('Snippet', function () {
  it('acai object should exist', function () {
    assert.isObject(window.acai);
    assert.isFunction(window.acai.init);
    assert.isFunction(window.acai.logEvent);
  });

  it('acai object should proxy functions', function () {
    acai.init('API_KEY');
    acai.logEvent('Event', { prop: 1 });
    assert.lengthOf(acai._q, 2);
    assert.deepEqual(acai._q[0], ['init', 'API_KEY']);
  });

  it('acai object should proxy Identify object and calls', function () {
    var identify = new acai.Identify().set('key1', 'value1').unset('key2');
    identify.add('key3', 2).setOnce('key4', 'value2');

    assert.lengthOf(identify._q, 4);
    assert.deepEqual(identify._q[0], ['set', 'key1', 'value1']);
    assert.deepEqual(identify._q[1], ['unset', 'key2']);
    assert.deepEqual(identify._q[2], ['add', 'key3', 2]);
    assert.deepEqual(identify._q[3], ['setOnce', 'key4', 'value2']);
  });

  it('acai object should proxy Revenue object and calls', function () {
    var revenue = new acai.Revenue().setProductId('productIdentifier').setQuantity(5).setPrice(10.99);
    assert.lengthOf(revenue._q, 3);
    assert.deepEqual(revenue._q[0], ['setProductId', 'productIdentifier']);
    assert.deepEqual(revenue._q[1], ['setQuantity', 5]);
    assert.deepEqual(revenue._q[2], ['setPrice', 10.99]);
  });

  it('acai object should proxy instance functions', function () {
    acai.getInstance(null).init('API_KEY');
    acai.getInstance('$DEFAULT_instance').logEvent('Click');
    acai.getInstance('').clearUserProperties();
    acai.getInstance('INSTANCE1').init('API_KEY1');
    acai.getInstance('instanCE2').init('API_KEY2');
    acai.getInstance('instaNce2').logEvent('Event');

    assert.deepEqual(Object.keys(acai._iq), ['$default_instance', 'instance1', 'instance2']);
    assert.lengthOf(acai._iq['$default_instance']._q, 3);
    assert.deepEqual(acai._iq['$default_instance']._q[0], ['init', 'API_KEY']);
    assert.deepEqual(acai._iq['$default_instance']._q[1], ['logEvent', 'Click']);
    assert.deepEqual(acai._iq['$default_instance']._q[2], ['clearUserProperties']);
    assert.lengthOf(acai._iq['instance1']._q, 1);
    assert.deepEqual(acai._iq['instance1']._q[0], ['init', 'API_KEY1']);
    assert.lengthOf(acai._iq['instance2']._q, 2);
    assert.deepEqual(acai._iq['instance2']._q[0], ['init', 'API_KEY2']);
    assert.deepEqual(acai._iq['instance2']._q[1], ['logEvent', 'Event']);
  });

  it('acai object should proxy onInit', function () {
    const callback = () => {};
    acai.getInstance('onInit').onInit(callback);
    acai.getInstance('onInit').init('API_KEY');
    acai.getInstance('onInit').logEvent('Event', { prop: 1 });
    assert.lengthOf(acai._iq['oninit']._q, 3);
    assert.deepEqual(acai._iq['oninit']._q[0], ['onInit', callback]);
  });

  it('acai object should proxy resetSessionId', function () {
    acai.getInstance('reset_session_id_instance').init('API_KEY');
    acai.getInstance('reset_session_id_instance').resetSessionId();
    assert.deepEqual(acai._iq['reset_session_id_instance']._q[1], ['resetSessionId']);
  });
});
