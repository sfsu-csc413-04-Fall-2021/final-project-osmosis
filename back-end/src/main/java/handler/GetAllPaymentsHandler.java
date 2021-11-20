package handler;

import com.google.gson.Gson;
import dao.TransactionDao;
import dto.BaseTransactionDto;
import request.ParsedRequest;

import java.util.List;

public class GetAllPaymentsHandler implements BaseHandler {

  private static final Gson gson = new Gson();

  @Override
  public String handleRequest(ParsedRequest request) {
    List<BaseTransactionDto> payments = TransactionDao.getInstance().getAll();
    return gson.toJson(payments);
  }
}
