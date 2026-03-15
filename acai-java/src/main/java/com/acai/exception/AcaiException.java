package com.acai.exception;

public abstract class AcaiException extends Exception {
  public AcaiException(String message) {
    super("Acai Exception: " + message);
  }
}
