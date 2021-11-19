package handler;

import com.google.gson.Gson;
import dao.PaymentDao;
import dto.BasePaymentDto;
import request.ParsedRequest;

public class GetPaymentHandler implements BaseHandler {

  private static final Gson gson = new Gson();

  @Override
  public String handleRequest(ParsedRequest request) {
    BasePaymentDto payment = PaymentDao.getInstance().get(request.getQueryParam("id"));
    payment.setUniqueId(request.getQueryParam("id"));
    return gson.toJson(payment);
  }
}
