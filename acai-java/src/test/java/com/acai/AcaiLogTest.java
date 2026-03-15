package com.acai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.params.provider.Arguments.arguments;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.List;
import java.util.stream.Stream;

import com.acai.util.EventsGenerator;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

public class AcaiLogTest {
  private ByteArrayOutputStream outContent;
  private ByteArrayOutputStream errContent;
  private final PrintStream originalOut = System.out;
  private final PrintStream originalErr = System.err;
  private final AcaiLog amplitudeLog = new AcaiLog();

  @BeforeEach
  public void setUpStreams() {
    outContent = new ByteArrayOutputStream();
    errContent = new ByteArrayOutputStream();
    System.setOut(new PrintStream(outContent));
    System.setErr(new PrintStream(errContent));
  }

  @AfterEach
  public void restoreStreams() throws IOException {
    outContent.close();
    errContent.close();
    System.setOut(originalOut);
    System.setErr(originalErr);
  }

  @Test
  public void testLogMode() {
    AcaiLog.LogMode logMode = AcaiLog.LogMode.DEBUG;
    amplitudeLog.setLogMode(logMode);
    assertEquals(amplitudeLog.getLogMode(),logMode);
    assertEquals(amplitudeLog.getLogMode().getLogLevel(),1);
  }

  @ParameterizedTest
  @MethodSource("logArguments")
  public void testLog(
      AcaiLog.LogMode logMode,
      String expectedErrorLog,
      String expectedWarnLog,
      String expectedDebugLog) {
    amplitudeLog.setLogMode(logMode);
    amplitudeLog.error("Test", "error message");
    assertEquals(expectedErrorLog, errContent.toString().trim());
    amplitudeLog.warn("Test", "warn message");
    assertEquals(expectedWarnLog, outContent.toString().trim());
    amplitudeLog.debug("Test", "debug message");
    assertEquals(expectedDebugLog, outContent.toString().trim());
  }

  static Stream<Arguments> logArguments() {
    return Stream.of(
        arguments(AcaiLog.LogMode.ERROR, "Test: error message", "", ""),
        arguments(
            AcaiLog.LogMode.WARN,
            "Test: error message",
            "Test: warn message",
            "Test: warn message"),
        arguments(
            AcaiLog.LogMode.DEBUG,
            "Test: error message",
            "Test: warn message",
            "Test: warn message\nTest: debug message"),
        arguments(AcaiLog.LogMode.OFF, "", "", ""));
  }
}
