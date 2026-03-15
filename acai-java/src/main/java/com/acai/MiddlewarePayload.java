package com.acai;

public class MiddlewarePayload {
  public Event event;
  public MiddlewareExtra extra;

  public MiddlewarePayload(Event event, MiddlewareExtra extra) {
    this.event = event;
    this.extra = extra;
  }

  public MiddlewarePayload(Event event) {
    this(event, null);
  }
}