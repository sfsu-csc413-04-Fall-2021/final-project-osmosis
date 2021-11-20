package handler;

import request.ParsedRequest;

public class HandlerFactory {

  public static BaseHandler getHandler(ParsedRequest request) {
    switch(request.getPath()) {
      case "/transfer":
        return new CashPaymentHandler();
      case "/pay":
        return new CreditCardPaymentHandler();
      case "/sign-up":
        return new GetPaymentHandler();
      case "/getAllPayments":
        return new GetAllPaymentsHandler();
    }
    return new FallbackHandler();
  }

}
