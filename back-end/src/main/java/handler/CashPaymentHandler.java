package handler;

import com.google.gson.Gson;
import dao.PaymentDao;
import dto.CashPayment;
import request.ParsedRequest;

public class CashPaymentHandler  implements BaseHandler{

  private static final Gson gson = new Gson();

  // Only Post
  @Override
  public String handleRequest(ParsedRequest request) {
    if(!request.getMethod().equals("POST")) return "404 Not Found";
    CashPayment cashPayment = gson.fromJson(request.getBody(),CashPayment.class);
    PaymentDao.getInstance().put(cashPayment);
    return "200 OK";
  }
}
