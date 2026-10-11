import { getGlobalScope, BrowserStorage } from '@acai/analytics-core';

export class SessionStorage<T> extends BrowserStorage<T> {
  constructor() {
    super(getGlobalScope()?.sessionStorage);
  }
}
