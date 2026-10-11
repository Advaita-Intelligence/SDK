import { AcaiServerZone, getEventLogApi } from '../src/server-zone';
import Constants from '../src/constants';

describe('AcaiServerZone', function () {
  it('getEventLogApi should return correct event log url', function () {
    assert.equal(Constants.EVENT_LOG_URL, getEventLogApi(AcaiServerZone.US));
    assert.equal(Constants.EVENT_LOG_EU_URL, getEventLogApi(AcaiServerZone.EU));
    assert.equal(Constants.EVENT_LOG_URL, getEventLogApi(''));
  });
});
