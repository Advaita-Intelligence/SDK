package com.acai;

public interface MiddlewareNext {
  void run(MiddlewarePayload curPayload);
}
