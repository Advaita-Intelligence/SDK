import { getGlobalScope, registerSdkLoaderMetadata } from '@acai/analytics-core';
import * as acai from './index';
import { createInstance } from './browser-client-factory';
import { runQueuedFunctions } from './utils/snippet-helper';

registerSdkLoaderMetadata({
  scriptUrl: resolveCurrentScriptUrl(),
});

function resolveCurrentScriptUrl(): string | undefined {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const currentScript = document.currentScript as HTMLScriptElement | null;
  if (currentScript?.src) {
    return currentScript.src;
  }

  return undefined;
}

// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(function () {
  const GlobalScope = getGlobalScope();

  if (!GlobalScope) {
    console.error('[Acai] Error: GlobalScope is not defined');
    return;
  }

  const createNamedInstance = (instanceName?: string) => {
    const instance = createInstance();
    const GlobalScope = getGlobalScope();
    if (GlobalScope && GlobalScope.acai && GlobalScope.acai._iq && instanceName) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      GlobalScope.acai._iq[instanceName] = instance;
    }
    return instance;
  };

  GlobalScope.acai = Object.assign(GlobalScope.acai || {}, acai, {
    createInstance: createNamedInstance,
  });

  if (GlobalScope.acai.invoked) {
    const queue = GlobalScope.acai._q;
    GlobalScope.acai._q = [];
    runQueuedFunctions(acai, queue);

    const instanceNames = Object.keys(GlobalScope.acai._iq) || [];
    for (let i = 0; i < instanceNames.length; i++) {
      const instanceName = instanceNames[i];
      const instance = Object.assign(GlobalScope.acai._iq[instanceName], createNamedInstance(instanceName));
      const queue = instance._q;
      instance._q = [];
      runQueuedFunctions(instance, queue);
    }
  }
})();
