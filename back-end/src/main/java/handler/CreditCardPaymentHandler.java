package handler;

import com.google.gson.Gson;
import dao.TransactionDao;
import dto.UserToUserTransaction;
import request.ParsedRequest;

public class CreditCardPaymentHandler  implements BaseHandler{

  private static final Gson gson = new Gson();

  // Only Post
  @Override
  public String handleRequest(ParsedRequest request) {
    if(!request.getMethod().equals("POST")) return "404 Not Found";
    UserToUserTransaction creditPayment = gson.fromJson(request.getBody(), UserToUserTransaction.class);
    TransactionDao.getInstance().put(creditPayment);
    return "200 OK";
  }

}
