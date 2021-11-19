package handler;

import com.google.gson.Gson;
import dao.PaymentDao;
import dto.CreditCardPayment;
import request.ParsedRequest;

public class CreditCardPaymentHandler  implements BaseHandler{

  private static final Gson gson = new Gson();

  // Only Post
  @Override
  public String handleRequest(ParsedRequest request) {
    if(!request.getMethod().equals("POST")) return "404 Not Found";
    CreditCardPayment creditPayment = gson.fromJson(request.getBody(),CreditCardPayment.class);
    PaymentDao.getInstance().put(creditPayment);
    return "200 OK";
  }

}
