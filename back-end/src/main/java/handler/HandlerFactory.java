package handler;

import request.ParsedRequest;

public class HandlerFactory {

  public static BaseHandler getHandler(ParsedRequest request) {
    switch(request.getPath()) {
      case "/makeCashPayment":
        return new CashPaymentHandler();
      case "/makeCreditCardPayment":
        return new CreditCardPaymentHandler();
      case "/getPayment":
        return new GetPaymentHandler();
      case "/getAllPayments":
        return new GetAllPaymentsHandler();
    }
    return new FallbackHandler();
  }

}
