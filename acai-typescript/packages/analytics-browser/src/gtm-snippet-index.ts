import { getGlobalScope } from '@acai/analytics-core';
import * as acaiGTM from './index';
import { createInstance } from './browser-client-factory';
import { runQueuedFunctions } from './utils/snippet-helper';

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
    if (GlobalScope && GlobalScope.acaiGTM && GlobalScope.acaiGTM._iq && instanceName) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      GlobalScope.acaiGTM._iq[instanceName] = instance;
    }
    return instance;
  };

  GlobalScope.acaiGTM = Object.assign(GlobalScope.acaiGTM || {}, acaiGTM, {
    createInstance: createNamedInstance,
  });

  if (GlobalScope.acaiGTM.invoked) {
    const queue = GlobalScope.acaiGTM._q;
    GlobalScope.acaiGTM._q = [];
    runQueuedFunctions(acaiGTM, queue);

    const instanceNames = Object.keys(GlobalScope.acaiGTM._iq) || [];
    for (let i = 0; i < instanceNames.length; i++) {
      const instanceName = instanceNames[i];
      const instance = Object.assign(GlobalScope.acaiGTM._iq[instanceName], createNamedInstance(instanceName));
      const queue = instance._q;
      instance._q = [];
      runQueuedFunctions(instance, queue);
    }
  }
})();
