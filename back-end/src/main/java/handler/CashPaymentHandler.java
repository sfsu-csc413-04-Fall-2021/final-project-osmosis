package handler;

import com.google.gson.Gson;
import dao.TransactionDao;
import dto.CashTransaction;
import request.ParsedRequest;

public class CashPaymentHandler  implements BaseHandler{

  private static final Gson gson = new Gson();

  // Only Post
  @Override
  public String handleRequest(ParsedRequest request) {
    if(!request.getMethod().equals("POST")) return "404 Not Found";
    CashTransaction cashPayment = gson.fromJson(request.getBody(), CashTransaction.class);
    TransactionDao.getInstance().put(cashPayment);
    return "200 OK";
  }
}
