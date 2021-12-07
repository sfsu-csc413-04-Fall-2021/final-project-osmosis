package dao;

import com.mongodb.client.MongoCollection;
import dto.BaseTransactionDto;
import java.util.ArrayList;
import java.util.List;

import dto.UserToUserTransaction;
import org.bson.Document;

import static com.mongodb.client.model.Filters.eq;

public class TransactionDao implements BaseDao<BaseTransactionDto> {

  private static TransactionDao instance;
  public MongoCollection<Document> collection;

  private TransactionDao(MongoCollection<Document> collection) {
    this.collection = collection;
  }

  public static TransactionDao getInstance() {
    if (instance == null) {
      System.out.println("her getInstance Transaction");
      instance = new TransactionDao(MongoConnection.getCollection("Transactions"));
      System.out.println("Passed");
    }
    return instance;
  }

  public static TransactionDao getInstance(MongoCollection<Document> collection) {
    instance = new TransactionDao(collection);
    return instance;
  }

  @Override
  public void put(BaseTransactionDto baseTransactionDto) {
    collection.insertOne(baseTransactionDto.toDocument());
  }

  public void delete(BaseTransactionDto baseTransactionDto) {
    collection.deleteOne(baseTransactionDto.toDocument());
  }

  @Override
  public BaseTransactionDto get(String id) {
    Document doc = collection.find(eq("_id",id)).first();
    return BaseTransactionDto.toDto(doc);
  }

  @Override
  public List getAll() {
    List<UserToUserTransaction> all = new ArrayList<>();
    List<Document> docs = collection.find().into(new ArrayList<>());

    for(Document doc:docs) {
      UserToUserTransaction payment = UserToUserTransaction.fromDocument(doc);
      all.add(payment);
    }
    return all;
  }
}
