package handler;

import com.google.gson.Gson;
import dao.PaymentDao;
import dto.BasePaymentDto;
import request.ParsedRequest;

import java.util.List;

public class GetAllPaymentsHandler implements BaseHandler {

  private static final Gson gson = new Gson();

  @Override
  public String handleRequest(ParsedRequest request) {
    List<BasePaymentDto> payments = PaymentDao.getInstance().getAll();
    return gson.toJson(payments);
  }
}
