package dao;

import com.mongodb.client.MongoCollection;
import dto.BaseTransactionDto;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import dto.UserToUserTransaction;
import org.bson.Document;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

public class TransactionDao implements BaseDao<BaseTransactionDto> {

  private static TransactionDao instance;
  public MongoCollection<Document> collection;

  private TransactionDao(MongoCollection<Document> collection) {
    this.collection = collection;
  }

  public static TransactionDao getInstance() {
    if (instance == null) {
      instance = new TransactionDao(MongoConnection.getCollection("Transactions"));
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

  public void putTransaction(UserToUserTransaction transaction) {
    System.out.println("Put");
    collection.insertOne(transaction.toDocument());
  }

  public void delete(UserToUserTransaction transaction) {
    System.out.println("Delete");
    collection.deleteOne(eq("_id",transaction.getUniqueId()));
  }

  @Override
  public UserToUserTransaction get(String id) {
    Document doc = collection.find(eq("_id",id)).first();
    return UserToUserTransaction.fromDocument(doc);
  }

  @Override
  public List getAll() {
    List<UserToUserTransaction> all = new ArrayList<>();
    List<Document> requestDocs = collection.find(eq("complete",false)).into(new ArrayList<>());
    List<Document> completeDocs = collection.find(eq("complete",true)).into(new ArrayList<>());

    Collections.reverse(requestDocs);
    Collections.reverse(completeDocs);

    for(Document doc:requestDocs) {
      UserToUserTransaction payment = UserToUserTransaction.fromDocument(doc);
      all.add(payment);
    }
    for(Document doc:completeDocs) {
      UserToUserTransaction payment = UserToUserTransaction.fromDocument(doc);
      all.add(payment);
    }
    return all;
  }

  public List getAllRequests(String username) {
    List<UserToUserTransaction> all = new ArrayList<>();
    List<Document> requestDocs = collection.find(and(
            eq("complete",false),eq("sender",username)
    )).into(new ArrayList<>());

    Collections.reverse(requestDocs);

    for(Document doc:requestDocs) {
      UserToUserTransaction payment = UserToUserTransaction.fromDocument(doc);
      all.add(payment);
    }
    return all;
  }
}
