package com.acai;

import com.acai.exception.AcaiInvalidAPIKeyException;
import com.acai.util.EventsGenerator;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.reflect.Field;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AcaiTest {

  private final String apiKey = "test-apiKey";

  @Test
  public void testGetInstance() {
    Acai a = Acai.getInstance();
    Acai b = Acai.getInstance("");
    Acai d = Acai.getInstance("app1");
    Acai e = Acai.getInstance("app2");

    assertSame(a, b);
    assertNotSame(d, e);
    assertNotSame(a, d);
  }

  @ParameterizedTest
  @ValueSource(booleans = {true, false})
  public void testLogEventSuccess(boolean useBatch)
      throws InterruptedException, NoSuchFieldException, IllegalAccessException,
          AcaiInvalidAPIKeyException {
    Acai acai = Acai.getInstance("testsuccess");
    acai.init(apiKey);
    acai.useBatchMode(useBatch);
    acai.setLogMode(AcaiLog.LogMode.OFF);
    acai.setEventUploadThreshold(5);
    List<Event> events = EventsGenerator.generateEvents(10, 5, 6);
    HttpCall httpCall = getMockHttpCall(acai, useBatch);
    Response response = ResponseUtil.getSuccessResponse();
    CountDownLatch latch = new CountDownLatch(2);
    when(httpCall.makeRequest(anyList()))
        .thenAnswer(
            invocation -> {
              latch.countDown();
              return response;
            });
    AcaiCallbacks callbacks =
        new AcaiCallbacks() {
          @Override
          public void onLogEventServerResponse(Event event, int status, String message) {
            assertEquals(200, status);
          }
        };
    acai.setCallbacks(callbacks);
    for (Event event : events) {
      acai.logEvent(event);
    }
    assertTrue(latch.await(1L, TimeUnit.SECONDS));
    verify(httpCall, times(2)).makeRequest(anyList());
  }

  @ParameterizedTest
  @ValueSource(booleans = {true, false})
  public void testLogEventWithInvalidKeyException(boolean useBatch)
      throws InterruptedException, NoSuchFieldException, IllegalAccessException,
          AcaiInvalidAPIKeyException {
    Acai acai = Acai.getInstance("test");
    acai.init(apiKey);
    acai.useBatchMode(useBatch);
    acai.setLogMode(AcaiLog.LogMode.OFF);
    List<Event> events = EventsGenerator.generateEvents(10, 5, 6);
    HttpCall httpCall = getMockHttpCall(acai, useBatch);
    CountDownLatch latch = new CountDownLatch(1);
    when(httpCall.makeRequest(anyList()))
        .thenAnswer(
            invocation -> {
              latch.countDown();
              throw new AcaiInvalidAPIKeyException();
            });
    for (Event event : events) {
      acai.logEvent(event);
    }
    assertTrue(latch.await(1L, TimeUnit.SECONDS));
    verify(httpCall, times(1)).makeRequest(anyList());
  }

  @ParameterizedTest
  @ValueSource(booleans = {true, false})
  public void testLogEventWithInvalidResponse(boolean useBatch)
      throws InterruptedException, NoSuchFieldException, IllegalAccessException,
          AcaiInvalidAPIKeyException {
    Acai acai = Acai.getInstance("test");
    acai.init(apiKey);
    acai.useBatchMode(useBatch);
    acai.setLogMode(AcaiLog.LogMode.OFF);
    List<Event> events = EventsGenerator.generateEvents(10, 5, 6);
    HttpCall httpCall = getMockHttpCall(acai, useBatch);
    Response response = new Response();
    response.code = 400;
    response.status = Status.INVALID;
    CountDownLatch latch = new CountDownLatch(1);
    when(httpCall.makeRequest(anyList()))
        .thenAnswer(
            invocation -> {
              latch.countDown();
              return response;
            });
    for (Event event : events) {
      acai.logEvent(event);
    }
    assertTrue(latch.await(1L, TimeUnit.SECONDS));
    verify(httpCall, atLeast(1)).makeRequest(anyList());
  }

  @ParameterizedTest
  @ValueSource(booleans = {true, false})
  public void testDefaultServerUrl(boolean useBatch)
      throws NoSuchFieldException, IllegalAccessException {
    Acai acai = Acai.getInstance("test");
    acai.init(apiKey);
    acai.useBatchMode(useBatch);

    Field httpCallField = acai.getClass().getDeclaredField("httpCall");
    httpCallField.setAccessible(true);
    HttpCall httpCall = (HttpCall) httpCallField.get(acai);
    assertEquals(httpCall.getApiUrl(), useBatch ? Constants.BATCH_API_URL : Constants.API_URL);
  }

  @Test
  public void testSetEventUploadThreshold() throws NoSuchFieldException, IllegalAccessException {
    Acai acai = Acai.getInstance("test");
    acai.init(apiKey);
    int updatedEventUploadThreshold = 5;
    acai.setEventUploadThreshold(updatedEventUploadThreshold);
    Field eventUploadThresholdField = acai.getClass().getDeclaredField("eventUploadThreshold");
    eventUploadThresholdField.setAccessible(true);
    int eventUploadThreshold = (Integer) eventUploadThresholdField.get(acai);
    assertEquals(eventUploadThreshold, updatedEventUploadThreshold);
  }

  @Test
  public void testSetEventUploadPeriodMillis() throws NoSuchFieldException, IllegalAccessException {
    Acai acai = Acai.getInstance("test");
    acai.init(apiKey);
    int updatedEventUploadPeriodMillis = 20000;
    acai.setEventUploadPeriodMillis(updatedEventUploadPeriodMillis);
    Field eventUploadPeriodMillisdField =
        acai.getClass().getDeclaredField("eventUploadPeriodMillis");
    eventUploadPeriodMillisdField.setAccessible(true);
    int eventUploadPeriodMillis = (Integer) eventUploadPeriodMillisdField.get(acai);
    assertEquals(eventUploadPeriodMillis, updatedEventUploadPeriodMillis);
  }

  @Test
  public void testEUBatchApiUrlPassedIntoHttpCallInstance()
      throws NoSuchFieldException, IllegalAccessException {
    String euBatchApiUrl = "https://api.eu.acai-server.com/batch";
    Acai acai = Acai.getInstance("testServerUrl");
    acai.init(apiKey);
    acai.useBatchMode(true);
    acai.setServerUrl(euBatchApiUrl);

    Field httpCallField = acai.getClass().getDeclaredField("httpCall");
    httpCallField.setAccessible(true);
    HttpCall httpCall = (HttpCall) httpCallField.get(acai);
    assertEquals(httpCall.getApiUrl(), euBatchApiUrl);
  }

  @Test
  public void testEUApiUrlPassedIntoHttpCallInstance()
      throws NoSuchFieldException, IllegalAccessException {
    String euApiUrl = "https://api.eu.acai-server.com/2/httpapi";
    Acai acai = Acai.getInstance("testServerUrl");
    acai.init(apiKey);
    acai.setServerUrl(euApiUrl);

    Field httpCallField = acai.getClass().getDeclaredField("httpCall");
    httpCallField.setAccessible(true);
    HttpCall httpCall = (HttpCall) httpCallField.get(acai);
    assertEquals(httpCall.getApiUrl(), euApiUrl);
  }

  @Test
  public void testSetCallback() throws NoSuchFieldException, IllegalAccessException {
    Acai acai = Acai.getInstance("testSetCallbacks");
    AcaiCallbacks callbacks =
        new AcaiCallbacks() {
          @Override
          public void onLogEventServerResponse(Event event, int status, String message) {}
        };
    acai.setCallbacks(callbacks);
    assertEquals(callbacks, getCallbacks(acai));
  }

  @Test
  public void testLogEventWithCallbacks()
      throws InterruptedException, NoSuchFieldException, IllegalAccessException,
          AcaiInvalidAPIKeyException {
    Acai acai = Acai.getInstance("test");
    acai.init(apiKey);
    List<Event> events = EventsGenerator.generateEvents(10, 5, 6);
    HttpCall httpCall = getMockHttpCall(acai, false);
    Response successResponse = ResponseUtil.getSuccessResponse();
    CountDownLatch latch = new CountDownLatch(1);
    CountDownLatch latch2 = new CountDownLatch(10);
    when(httpCall.makeRequest(anyList()))
        .thenAnswer(
            invocation -> {
              latch.countDown();
              return successResponse;
            });
    AtomicInteger callbackCount1 = new AtomicInteger(0);
    AtomicInteger callbackCount2 = new AtomicInteger(0);
    AcaiCallbacks callbacks1 =
        new AcaiCallbacks() {
          @Override
          public void onLogEventServerResponse(Event event, int status, String message) {
            assertEquals(200, status);
            callbackCount1.incrementAndGet();
            latch2.countDown();
          }
        };
    AcaiCallbacks callbacks2 =
        new AcaiCallbacks() {
          @Override
          public void onLogEventServerResponse(Event event, int status, String message) {
            assertEquals(200, status);
            callbackCount2.incrementAndGet();
            latch2.countDown();
          }
        };
    for (int i = 0; i < events.size(); i++) {
      AcaiCallbacks callbackForEvent = i % 2 == 0 ? callbacks1 : callbacks2;
      acai.logEvent(events.get(i), callbackForEvent);
    }
    assertTrue(latch.await(1L, TimeUnit.SECONDS));
    assertTrue(latch2.await(1L, TimeUnit.SECONDS));
    verify(httpCall, times(1)).makeRequest(anyList());
    assertEquals(5, callbackCount1.get());
    assertEquals(5, callbackCount2.get());
  }

  @Test
  public void testMiddlewareSupport()
      throws NoSuchFieldException, IllegalAccessException, AcaiInvalidAPIKeyException,
          InterruptedException {
    Acai acai = Acai.getInstance("testMiddlewareSupport");
    acai.init(apiKey);
    acai.useBatchMode(false);
    acai.setEventUploadThreshold(1);
    HttpCall httpCall = getMockHttpCall(acai, false);
    Response response = ResponseUtil.getSuccessResponse();
    CountDownLatch latch = new CountDownLatch(1);

    AtomicReference<List<Event>> sentEvents = new AtomicReference<>();
    when(httpCall.makeRequest(anyList()))
        .thenAnswer(
            invocation -> {
              sentEvents.set(invocation.getArgument(0));
              latch.countDown();
              return response;
            });

    Map<String, Object> extraMap = new HashMap<>();
    extraMap.put("description", "extra description");
    MiddlewareExtra extra = new MiddlewareExtra(extraMap);
    Middleware middleware =
        (payload, next) -> {
          if (payload.event.eventProperties == null) {
            payload.event.eventProperties = new JSONObject();
          }
          try {
            payload.event.eventProperties.put("description", payload.extra.get("description"));
          } catch (JSONException e) {
            e.printStackTrace();
          }

          next.run(payload);
        };
    acai.addEventMiddleware(middleware);
    acai.logEvent(new Event("middleware_event_type", "middleware_user"), extra);

    assertTrue(latch.await(1L, TimeUnit.SECONDS));
    assertEquals(1, sentEvents.get().size());

    Event sentEvent = sentEvents.get().get(0);
    assertEquals("middleware_event_type", sentEvent.eventType);
    assertEquals("middleware_user", sentEvent.userId);
    assertEquals("extra description", sentEvent.eventProperties.get("description"));
  }

  @Test
  public void testWithSwallowMiddleware()
      throws NoSuchFieldException, IllegalAccessException, AcaiInvalidAPIKeyException,
          InterruptedException {
    Acai acai = Acai.getInstance("testWithSwallowMiddleware");
    acai.init(apiKey);
    acai.useBatchMode(false);
    acai.setEventUploadThreshold(1);
    HttpCall httpCall = getMockHttpCall(acai, false);
    Response response = ResponseUtil.getSuccessResponse();
    CountDownLatch latch = new CountDownLatch(1);

    AtomicReference<List<Event>> sentEvents = new AtomicReference<>();
    when(httpCall.makeRequest(anyList()))
        .thenAnswer(
            invocation -> {
              sentEvents.set(invocation.getArgument(0));
              latch.countDown();
              return response;
            });

    Middleware middleware =
        (payload, next) -> {
          if (payload.event.userId.equals("middleware_user_2")) {
            next.run(payload);
          }
        };
    acai.addEventMiddleware(middleware);
    acai.logEvent(new Event("middleware_event_type", "middleware_user_1"));
    acai.logEvent(new Event("middleware_event_type", "middleware_user_2"));

    assertTrue(latch.await(1L, TimeUnit.SECONDS));
    assertEquals(1, sentEvents.get().size());

    Event sentEvent = sentEvents.get().get(0);
    assertEquals("middleware_event_type", sentEvent.eventType);
    assertEquals("middleware_user_2", sentEvent.userId);
  }

  @Test
  public void testShouldWait()
      throws NoSuchFieldException, IllegalAccessException, AcaiInvalidAPIKeyException,
          InterruptedException, BrokenBarrierException {
    Acai acai = Acai.getInstance();
    acai.init(apiKey);
    Event event = new Event("test event", "test-user-0");
    Event event2 = new Event("test event", "test-user-1");
    HttpCall httpCall = getMockHttpCall(acai, false);
    CyclicBarrier barrier = new CyclicBarrier(2);
    CountDownLatch latch = new CountDownLatch(1);
    Response response = new Response();
    response.status = Status.RATELIMIT;
    response.code = 429;
    response.rateLimitBody = new JSONObject();
    response.rateLimitBody.put("throttledUsers", new JSONObject());
    response.rateLimitBody.put("throttledDevices", new JSONObject());
    response.rateLimitBody.put("exceededDailyQuotaDevices", new JSONObject());
    response.rateLimitBody.put("exceededDailyQuotaUsers", new JSONObject());
    response.rateLimitBody.getJSONObject("throttledUsers").put("test-user-0", 15);
    response.rateLimitBody.put("throttledEvents", new int[] {0});
    when(httpCall.makeRequest(anyList()))
        .thenAnswer(
            invocation -> {
              return response;
            })
        .thenAnswer(
            invocation -> {
              barrier.await();
              return response;
            })
        .thenAnswer(
            invocation -> {
              latch.countDown();
              return response;
            });
    assertFalse(acai.shouldWait(event));
    acai.setRecordThrottledId(true);
    assertFalse(acai.shouldWait(event));
    acai.logEvent(event);
    acai.logEvent(event2);
    acai.flushEvents();
    assertTrue(shouldWaitResultWithTimeout(acai, event, 1L, TimeUnit.SECONDS));
    assertFalse(acai.shouldWait(event2));
    barrier.await();
    assertTrue(latch.await(1L, TimeUnit.SECONDS));
    assertTrue(shouldWaitResultWithTimeout(acai, event, 1L, TimeUnit.SECONDS));
  }

  @Test
  public void testSetPlan()
      throws NoSuchFieldException, IllegalAccessException, AcaiInvalidAPIKeyException,
          InterruptedException {
    Acai acai = Acai.getInstance("testSetPlan");
    acai.init(apiKey);

    String branch = "main";
    String source = "jre-java";
    String version = "1.0.0";
    String versionId = "9ec23ba0-275f-468f-80d1-66b88bff9529";

    Plan plan =
        new Plan().setBranch(branch).setSource(source).setVersion(version).setVersionId(versionId);
    acai.setPlan(plan);

    acai.useBatchMode(false);
    acai.setEventUploadThreshold(1);
    HttpCall httpCall = getMockHttpCall(acai, false);
    Response response = ResponseUtil.getSuccessResponse();
    CountDownLatch latch = new CountDownLatch(1);

    AtomicReference<List<Event>> sentEvents = new AtomicReference<>();
    when(httpCall.makeRequest(anyList()))
        .thenAnswer(
            invocation -> {
              sentEvents.set(invocation.getArgument(0));
              latch.countDown();
              return response;
            });

    acai.logEvent(new Event("test-event", "test-user"));

    assertTrue(latch.await(1L, TimeUnit.SECONDS));
    assertEquals(1, sentEvents.get().size());

    Event sentEvent = sentEvents.get().get(0);
    assertNotNull(sentEvent.plan);

    JSONObject result = sentEvent.plan.toJSONObject();
    assertEquals(branch, result.getString(Constants.AMP_PLAN_BRANCH));
    assertEquals(source, result.getString(Constants.AMP_PLAN_SOURCE));
    assertEquals(version, result.getString(Constants.AMP_PLAN_VERSION));
    assertEquals(versionId, result.getString(Constants.AMP_PLAN_VERSION_ID));
  }

  @Test
  public void testSetIngestionMetadata()
          throws NoSuchFieldException, IllegalAccessException, AcaiInvalidAPIKeyException,
          InterruptedException {
    Acai acai = Acai.getInstance("testSetIngestionMetadata");
    acai.init(apiKey);

    IngestionMetadata ingestionMetadata = new IngestionMetadata();
    String sourceName = "ampli";
    String sourceVersion = "1.0.0";
    ingestionMetadata.setSourceName(sourceName)
            .setSourceVersion(sourceVersion);

    acai.setIngestionMetadata(ingestionMetadata);

    acai.useBatchMode(false);
    acai.setEventUploadThreshold(1);
    HttpCall httpCall = getMockHttpCall(acai, false);
    Response response = ResponseUtil.getSuccessResponse();
    CountDownLatch latch = new CountDownLatch(1);

    AtomicReference<List<Event>> sentEvents = new AtomicReference<>();
    when(httpCall.makeRequest(anyList()))
            .thenAnswer(
                    invocation -> {
                      sentEvents.set(invocation.getArgument(0));
                      latch.countDown();
                      return response;
                    });

    acai.logEvent(new Event("test-event", "test-user"));

    assertTrue(latch.await(1L, TimeUnit.SECONDS));
    assertEquals(1, sentEvents.get().size());

    Event sentEvent = sentEvents.get().get(0);
    assertNotNull(sentEvent.ingestionMetadata);

    JSONObject result = sentEvent.ingestionMetadata.toJSONObject();
    assertEquals(sourceName, result.getString(Constants.AMP_INGESTION_METADATA_SOURCE_NAME));
    assertEquals(sourceVersion, result.getString(Constants.AMP_INGESTION_METADATA_SOURCE_VERSION));
  }

  private HttpCall getMockHttpCall(Acai acai, boolean useBatch)
      throws NoSuchFieldException, IllegalAccessException {
    HttpCall httpCall = mock(HttpCall.class);

    Field httpCallField = acai.getClass().getDeclaredField("httpCall");
    Field httpTransportField = acai.getClass().getDeclaredField("httpTransport");
    httpCallField.setAccessible(true);
    httpCallField.set(acai, httpCall);
    httpTransportField.setAccessible(true);
    HttpTransport httpTransport = (HttpTransport) httpTransportField.get(acai);
    httpTransport.setHttpCall(httpCall);
    return httpCall;
  }

  private AcaiCallbacks getCallbacks(Acai acai)
      throws NoSuchFieldException, IllegalAccessException {
    Field httpTransportField = acai.getClass().getDeclaredField("httpTransport");
    httpTransportField.setAccessible(true);
    HttpTransport httpTransport = (HttpTransport) httpTransportField.get(acai);
    Field callbackField = httpTransport.getClass().getDeclaredField("callbacks");
    callbackField.setAccessible(true);
    return (AcaiCallbacks) callbackField.get(httpTransport);
  }

  private boolean shouldWaitResultWithTimeout(Acai client, Event event, long time, TimeUnit unit) {
    CompletableFuture<Boolean> future = CompletableFuture.supplyAsync(() -> {
      while (!client.shouldWait(event)) {
        continue;
      }
      return true;
    });
    try {
      return future.get(time, unit);
    } catch (Exception e) {
      return false;
    }
  }
}
