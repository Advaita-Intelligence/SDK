package com.acai;

/** AcaiCallbacks Class */
public class AcaiCallbacks {
  /**
   * Triggered when event is sent or failed
   *
   * @param event Acai Event
   * @param status server response status code
   * @param message message for callback, success or error
   */
  public void onLogEventServerResponse(Event event, int status, String message) {}
}
