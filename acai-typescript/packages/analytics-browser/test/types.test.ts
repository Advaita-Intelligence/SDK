import * as acai from '../src/index';

describe('Type Exports', () => {
  test('IdentifyOperation should be an enum', () => {
    expect(acai.Types.IdentifyOperation.ADD).toBe('$add');
  });

  test('SpecialEventType should be an enum', () => {
    expect(acai.Types.SpecialEventType.IDENTIFY).toBe('$identify');
  });

  test('exported enums are proper enums', () => {
    const enumTypes = ['RevenueProperty', 'LogLevel', 'ServerZone'];
    enumTypes.forEach((enumType) => {
      expect((acai.Types as any)[enumType]).toBeDefined();
      expect(typeof (acai.Types as any)[enumType]).toBe('object');
      expect(Object.keys((acai.Types as any)[enumType]).length).toBeGreaterThan(0);
    });
  });

  test('exported null to be null', () => {
    expect(acai.Types.OfflineDisabled).toBe(null);
  });

  test('exported arrays are proper arrays', () => {
    const arrTypes = ['DEFAULT_CSS_SELECTOR_ALLOWLIST', 'DEFAULT_ACTION_CLICK_ALLOWLIST'];
    arrTypes.forEach((arrType) => {
      expect((acai.Types as any)[arrType]).toBeDefined();
      expect(Array.isArray((acai.Types as any)[arrType])).toBe(true);
      expect((acai.Types as any)[arrType].length).toBeGreaterThan(0);
    });
  });

  test('exported string is string', () => {
    expect(typeof acai.Types.DEFAULT_DATA_ATTRIBUTE_PREFIX).toBe('string');
  });
});
