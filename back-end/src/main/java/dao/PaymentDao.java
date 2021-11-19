package dao;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import dto.BasePaymentDto;
import java.util.ArrayList;
import java.util.List;

import dto.CashPayment;
import dto.CreditCardPayment;
import org.bson.Document;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.exists;

public class PaymentDao implements BaseDao<BasePaymentDto> {

  private static PaymentDao instance;
  public MongoCollection<Document> collection;

  private PaymentDao(MongoCollection<Document> collection) {
    this.collection = collection;
  }

  public static PaymentDao getInstance() {
    if (instance == null) {
      instance = new PaymentDao(MongoConnection.getCollection("Payments"));
    }
    return instance;
  }

  public static PaymentDao getInstance(MongoCollection<Document> collection) {
    instance = new PaymentDao(collection);
    return instance;
  }

  @Override
  public void put(BasePaymentDto basePaymentDto) {
    collection.insertOne(basePaymentDto.toDocument());
  }

  @Override
  public BasePaymentDto get(String id) {
    Document doc = collection.find(eq("_id",id)).first();
    return BasePaymentDto.toDto(doc);
  }

  @Override
  public List<BasePaymentDto> getAll() {
    List<BasePaymentDto> all = new ArrayList<>();
    List<Document> docs = new ArrayList<>();
    FindIterable<Document> iterable = collection.find(exists("_id"));
    System.out.println(collection.countDocuments());

    iterable.into(docs);
    System.out.println(docs);
    for(Document doc:docs) {
      all.add(BasePaymentDto.toDto(doc));
      System.out.println(doc);
    }
    return all;
  }
}
