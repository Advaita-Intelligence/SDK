/**
 * @jest-environment jsdom
 */

/* eslint-disable @typescript-eslint/unbound-method */
import { enableBackgroundCapture } from '../../src/messenger/background-capture';
import type { BaseWindowMessenger, ActionHandler } from '../../src/messenger/base-window-messenger';
import { ACAI_BACKGROUND_CAPTURE_SCRIPT_URL } from '../../src/messenger/constants';

const BG_CAPTURE_BRAND = '__ACAI_BACKGROUND_CAPTURE__';

function createMockMessenger(overrides: Partial<BaseWindowMessenger> = {}): BaseWindowMessenger {
  return {
    endpoint: 'https://app.acai.yourdomain.com',
    logger: {
      debug: jest.fn(),
      warn: jest.fn(),
      log: jest.fn(),
      error: jest.fn(),
      enable: jest.fn(),
      disable: jest.fn(),
    },
    notify: jest.fn(),
    registerActionHandler: jest.fn(),
    loadScriptOnce: jest.fn().mockResolvedValue(undefined),
    ...overrides,
  } as unknown as BaseWindowMessenger;
}

describe('enableBackgroundCapture', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should register action handlers on first call', () => {
    const messenger = createMockMessenger();

    enableBackgroundCapture(messenger);

    expect(messenger.registerActionHandler).toHaveBeenCalledTimes(2);
    expect(messenger.registerActionHandler).toHaveBeenCalledWith('initialize-background-capture', expect.any(Function));
    expect(messenger.registerActionHandler).toHaveBeenCalledWith('close-background-capture', expect.any(Function));
  });

  test('should brand the messenger on first call', () => {
    const messenger = createMockMessenger();

    enableBackgroundCapture(messenger);

    expect((messenger as unknown as Record<string, unknown>)[BG_CAPTURE_BRAND]).toBe(true);
  });

  test('should be a no-op if already branded', () => {
    const messenger = createMockMessenger();
    (messenger as unknown as Record<string, unknown>)[BG_CAPTURE_BRAND] = true;

    enableBackgroundCapture(messenger);

    expect(messenger.registerActionHandler).not.toHaveBeenCalled();
  });

  describe('initialize-background-capture handler', () => {
    function getInitHandler(messenger: BaseWindowMessenger): ActionHandler {
      const calls = (messenger.registerActionHandler as jest.Mock).mock.calls;
      const match = calls.find(([action]: [string]) => action === 'initialize-background-capture');
      return match[1] as ActionHandler;
    }

    test('should load script from default URL and notify on success', async () => {
      const messenger = createMockMessenger();
      const mockClose = jest.fn();
      (window as any).acaiBackgroundCapture = jest.fn().mockReturnValue({ close: mockClose });

      enableBackgroundCapture(messenger);
      const handler = getInitHandler(messenger);

      handler({});
      await new Promise(process.nextTick);

      const expectedUrl = new URL(ACAI_BACKGROUND_CAPTURE_SCRIPT_URL, 'https://app.acai.yourdomain.com').toString();
      expect(messenger.loadScriptOnce).toHaveBeenCalledWith(expectedUrl);
      expect(messenger.logger?.debug).toHaveBeenCalledWith('Initializing background capture (external script)');
      expect(messenger.logger?.debug).toHaveBeenCalledWith('Background capture script loaded (external)');
      expect((window as any).acaiBackgroundCapture).toHaveBeenCalledWith({
        messenger,
        onBackgroundCapture: expect.any(Function),
      });
      expect(messenger.notify).toHaveBeenCalledWith({ action: 'background-capture-loaded' });

      delete (window as any).acaiBackgroundCapture;
    });

    test('should use custom scriptUrl when provided', async () => {
      const messenger = createMockMessenger();
      (window as any).acaiBackgroundCapture = jest.fn().mockReturnValue(null);

      enableBackgroundCapture(messenger, { scriptUrl: 'https://custom.cdn.com/bg.js' });
      const handler = getInitHandler(messenger);

      handler({});
      await new Promise(process.nextTick);

      const expectedUrl = new URL('https://custom.cdn.com/bg.js', 'https://app.acai.yourdomain.com').toString();
      expect(messenger.loadScriptOnce).toHaveBeenCalledWith(expectedUrl);

      delete (window as any).acaiBackgroundCapture;
    });

    test('should warn on script load failure', async () => {
      const messenger = createMockMessenger({
        loadScriptOnce: jest.fn().mockRejectedValue(new Error('network error')),
      } as any);

      enableBackgroundCapture(messenger);
      const handler = getInitHandler(messenger);

      handler({});
      await new Promise(process.nextTick);

      expect(messenger.logger?.warn).toHaveBeenCalledWith('Failed to initialize background capture');
      expect(messenger.notify).not.toHaveBeenCalledWith(
        expect.objectContaining({ action: 'background-capture-loaded' }),
      );
    });

    test('should handle missing acaiBackgroundCapture on window', async () => {
      const messenger = createMockMessenger();
      delete (window as any).acaiBackgroundCapture;

      enableBackgroundCapture(messenger);
      const handler = getInitHandler(messenger);

      handler({});
      await new Promise(process.nextTick);

      expect(messenger.notify).toHaveBeenCalledWith({ action: 'background-capture-loaded' });
    });
  });

  describe('close-background-capture handler', () => {
    function getCloseHandler(messenger: BaseWindowMessenger): ActionHandler {
      const calls = (messenger.registerActionHandler as jest.Mock).mock.calls;
      const match = calls.find(([action]: [string]) => action === 'close-background-capture');
      return match[1] as ActionHandler;
    }

    function getInitHandler(messenger: BaseWindowMessenger): ActionHandler {
      const calls = (messenger.registerActionHandler as jest.Mock).mock.calls;
      const match = calls.find(([action]: [string]) => action === 'initialize-background-capture');
      return match[1] as ActionHandler;
    }

    test('should call close on the background capture instance', async () => {
      const messenger = createMockMessenger();
      const mockClose = jest.fn();
      (window as any).acaiBackgroundCapture = jest.fn().mockReturnValue({ close: mockClose });

      enableBackgroundCapture(messenger);

      const initHandler = getInitHandler(messenger);
      initHandler({});
      await new Promise(process.nextTick);

      const closeHandler = getCloseHandler(messenger);
      closeHandler({});

      expect(mockClose).toHaveBeenCalledTimes(1);

      delete (window as any).acaiBackgroundCapture;
    });

    test('should be safe to call when no instance exists', () => {
      const messenger = createMockMessenger();

      enableBackgroundCapture(messenger);
      const closeHandler = getCloseHandler(messenger);

      expect(() => closeHandler({})).not.toThrow();
    });
  });

  describe('onBackgroundCapture callback', () => {
    function getInitHandler(messenger: BaseWindowMessenger): ActionHandler {
      const calls = (messenger.registerActionHandler as jest.Mock).mock.calls;
      const match = calls.find(([action]: [string]) => action === 'initialize-background-capture');
      return match[1] as ActionHandler;
    }

    test('should notify on background-capture-complete', async () => {
      const messenger = createMockMessenger();
      let capturedCallback: (type: string, data: any) => void = jest.fn();
      (window as any).acaiBackgroundCapture = jest.fn().mockImplementation(({ onBackgroundCapture }) => {
        capturedCallback = onBackgroundCapture;
        return { close: jest.fn() };
      });

      enableBackgroundCapture(messenger);
      const handler = getInitHandler(messenger);

      handler({});
      await new Promise(process.nextTick);

      const captureData = { key: 'value', count: 42 };
      capturedCallback('background-capture-complete', captureData);

      expect(messenger.logger?.debug).toHaveBeenCalledWith('Background capture complete');
      expect(messenger.notify).toHaveBeenCalledWith({
        action: 'background-capture-complete',
        data: captureData,
      });

      delete (window as any).acaiBackgroundCapture;
    });

    test('should not notify for other event types', async () => {
      const messenger = createMockMessenger();
      let capturedCallback: (type: string, data: any) => void = jest.fn();
      (window as any).acaiBackgroundCapture = jest.fn().mockImplementation(({ onBackgroundCapture }) => {
        capturedCallback = onBackgroundCapture;
        return { close: jest.fn() };
      });

      enableBackgroundCapture(messenger);
      const handler = getInitHandler(messenger);

      handler({});
      await new Promise(process.nextTick);

      (messenger.notify as jest.Mock).mockClear();
      (messenger.logger?.debug as jest.Mock).mockClear();

      capturedCallback('some-other-type', { key: 'value' });

      expect(messenger.notify).not.toHaveBeenCalled();

      delete (window as any).acaiBackgroundCapture;
    });
  });

  test('should work without logger', async () => {
    const messenger = createMockMessenger({ logger: undefined } as any);

    enableBackgroundCapture(messenger);

    const calls = (messenger.registerActionHandler as jest.Mock).mock.calls;
    const initHandler = calls.find(([a]: [string]) => a === 'initialize-background-capture')[1] as ActionHandler;

    (window as any).acaiBackgroundCapture = jest.fn().mockReturnValue({ close: jest.fn() });

    expect(() => initHandler({})).not.toThrow();
    await new Promise(process.nextTick);

    expect(messenger.notify).toHaveBeenCalledWith({ action: 'background-capture-loaded' });

    delete (window as any).acaiBackgroundCapture;
  });

  test('should work without logger on failure', async () => {
    const messenger = createMockMessenger({
      logger: undefined,
      loadScriptOnce: jest.fn().mockRejectedValue(new Error('fail')),
    } as any);

    enableBackgroundCapture(messenger);

    const calls = (messenger.registerActionHandler as jest.Mock).mock.calls;
    const initHandler = calls.find(([a]: [string]) => a === 'initialize-background-capture')[1] as ActionHandler;

    expect(() => initHandler({})).not.toThrow();
    await new Promise(process.nextTick);
  });

  test('should handle logger without debug method in onBackgroundCapture', async () => {
    const messenger = createMockMessenger({
      logger: { warn: jest.fn(), log: jest.fn(), error: jest.fn() } as any,
    });
    let capturedCallback: (type: string, data: any) => void = jest.fn();
    (window as any).acaiBackgroundCapture = jest.fn().mockImplementation(({ onBackgroundCapture }) => {
      capturedCallback = onBackgroundCapture;
      return { close: jest.fn() };
    });

    enableBackgroundCapture(messenger);

    const calls = (messenger.registerActionHandler as jest.Mock).mock.calls;
    const initHandler = calls.find(([a]: [string]) => a === 'initialize-background-capture')[1] as ActionHandler;

    initHandler({});
    await new Promise(process.nextTick);

    expect(() => capturedCallback('background-capture-complete', { key: 'val' })).not.toThrow();
    expect(messenger.notify).toHaveBeenCalledWith({
      action: 'background-capture-complete',
      data: { key: 'val' },
    });

    delete (window as any).acaiBackgroundCapture;
  });

  test('should handle onBackgroundCapture callback without logger', async () => {
    const messenger = createMockMessenger({ logger: undefined } as any);
    let capturedCallback: (type: string, data: any) => void = jest.fn();
    (window as any).acaiBackgroundCapture = jest.fn().mockImplementation(({ onBackgroundCapture }) => {
      capturedCallback = onBackgroundCapture;
      return { close: jest.fn() };
    });

    enableBackgroundCapture(messenger);

    const calls = (messenger.registerActionHandler as jest.Mock).mock.calls;
    const initHandler = calls.find(([a]: [string]) => a === 'initialize-background-capture')[1] as ActionHandler;

    initHandler({});
    await new Promise(process.nextTick);

    expect(() => capturedCallback('background-capture-complete', { key: 'val' })).not.toThrow();
    expect(messenger.notify).toHaveBeenCalledWith({
      action: 'background-capture-complete',
      data: { key: 'val' },
    });

    delete (window as any).acaiBackgroundCapture;
  });

  test('should handle acaiBackgroundCapture being non-callable', async () => {
    const messenger = createMockMessenger();
    (window as any).acaiBackgroundCapture = 'not-a-function';

    enableBackgroundCapture(messenger);

    const calls = (messenger.registerActionHandler as jest.Mock).mock.calls;
    const initHandler = calls.find(([a]: [string]) => a === 'initialize-background-capture')[1] as ActionHandler;

    initHandler({});
    await new Promise(process.nextTick);

    expect(messenger.logger?.warn).toHaveBeenCalledWith('Failed to initialize background capture');

    delete (window as any).acaiBackgroundCapture;
  });
});
