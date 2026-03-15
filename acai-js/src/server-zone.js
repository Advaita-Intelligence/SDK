import Constants from './constants';

/**
 * AcaiServerZone is for Data Residency and handling server zone related properties.
 * The server zones now are US and EU.
 *
 * For usage like sending data to Amplitude's EU servers, you need to configure the serverZone during nitializing.
 */
const AcaiServerZone = {
  US: 'US',
  EU: 'EU',
};

const getEventLogApi = (serverZone) => {
  let eventLogUrl = Constants.EVENT_LOG_URL;
  switch (serverZone) {
    case AcaiServerZone.EU:
      eventLogUrl = Constants.EVENT_LOG_EU_URL;
      break;
    case AcaiServerZone.US:
      eventLogUrl = Constants.EVENT_LOG_URL;
      break;
    default:
      break;
  }
  return eventLogUrl;
};

const getDynamicConfigApi = (serverZone) => {
  let dynamicConfigUrl = Constants.DYNAMIC_CONFIG_URL;
  switch (serverZone) {
    case AcaiServerZone.EU:
      dynamicConfigUrl = Constants.DYNAMIC_CONFIG_EU_URL;
      break;
    case AcaiServerZone.US:
      dynamicConfigUrl = Constants.DYNAMIC_CONFIG_URL;
      break;
    default:
      break;
  }
  return dynamicConfigUrl;
};

export { AcaiServerZone, getEventLogApi, getDynamicConfigApi };
