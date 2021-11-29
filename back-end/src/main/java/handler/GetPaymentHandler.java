package handler;

import com.google.gson.Gson;
import dao.TransactionDao;
import dto.BaseTransactionDto;
import request.ParsedRequest;

public class GetPaymentHandler implements BaseHandler {

  private static final Gson gson = new Gson();

  @Override
  public String handleRequest(ParsedRequest request) {
    BaseTransactionDto payment = TransactionDao.getInstance().get(request.getQueryParam("id"));
    payment.setUniqueId(request.getQueryParam("id"));
    return gson.toJson(payment);
  }
}
