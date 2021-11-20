package handler;

import com.google.gson.Gson;
import dao.TransactionDao;
import dto.CreditCardTransaction;
import request.ParsedRequest;

public class CreditCardPaymentHandler  implements BaseHandler{

  private static final Gson gson = new Gson();

  // Only Post
  @Override
  public String handleRequest(ParsedRequest request) {
    if(!request.getMethod().equals("POST")) return "404 Not Found";
    CreditCardTransaction creditPayment = gson.fromJson(request.getBody(), CreditCardTransaction.class);
    TransactionDao.getInstance().put(creditPayment);
    return "200 OK";
  }

}
