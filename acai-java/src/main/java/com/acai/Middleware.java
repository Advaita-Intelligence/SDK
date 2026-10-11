package com.acai;

public interface Middleware {
  void run(MiddlewarePayload payload, MiddlewareNext next);
}