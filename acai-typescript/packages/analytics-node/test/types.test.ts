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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect((acai.Types as any)[enumType]).toBeDefined();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(typeof (acai.Types as any)[enumType]).toBe('object');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      expect(Object.keys((acai.Types as any)[enumType]).length).toBeGreaterThan(0);
    });
  });

  test('exported null to be null', () => {
    expect(acai.Types.OfflineDisabled).toBe(null);
  });
});
