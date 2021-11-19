package handler;

import request.ParsedRequest;

public class FallbackHandler implements BaseHandler {

  @Override
  public String handleRequest(ParsedRequest request) {
    return null;
  }
}
