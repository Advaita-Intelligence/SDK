package com.demo.acai;

import com.acai.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class DemoController {
  @RequestMapping("/")
  public String index() {
    Acai amplitude = Acai.getInstance("INSTANCE_NAME");
    amplitude.init("8e07b9d451a7d07bd33f6e9ba5870f21");
    amplitude.logEvent(new Event("Test Event", "test_user_id"));
    amplitude.setLogMode(AcaiLog.LogMode.DEBUG);
    AcaiCallbacks callbacks =
        new AcaiCallbacks() {
          @Override
          public void onLogEventServerResponse(Event event, int status, String message) {
            System.out.println(
                String.format(
                    "Event: %s sent. Status: %s, Message: %s", event.eventType, status, message));
          }
        };
    amplitude.setCallbacks(callbacks);
    // Set custom headers or minIdLength via Options
    amplitude.setOptions(new Options()
            .addHeader("Custom Header", "value")
            .setMinIdLength(5));
    amplitude.logEvent(new Event("Test Event", "test_user_id"));
    amplitude.logEvent(
        new Event("Test Event with Callback", "test_user_id"),
        new AcaiCallbacks() {
          @Override
          public void onLogEventServerResponse(Event event, int status, String message) {
            System.out.println(
                String.format("Event: %s sent with event callbacks", event.eventType));
          }
        });
    return "Acai Java SDK Demo: sending test event.";
  }
}
