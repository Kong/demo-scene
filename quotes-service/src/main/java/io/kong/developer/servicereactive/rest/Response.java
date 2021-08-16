package io.kong.developer.servicereactive.rest;

class Response {

  private final String message;

  Response(final String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }
}
