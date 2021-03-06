package dao;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;
import dto.BaseTransactionDto;
import dto.BaseUserDto;
import dto.BasicUser;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.exists;

public class UserDao implements BaseDao<BaseUserDto> {

    private static UserDao instance;
    public MongoCollection<Document> collection;

    private UserDao(MongoCollection<Document> collection) {
        this.collection = collection;
    }

    public static UserDao getInstance() {
        if (instance == null) {
            instance = new UserDao(MongoConnection.getCollection("Users"));
        }
        return instance;
    }

    public static UserDao getInstance(MongoCollection<Document> collection) {
        instance = new UserDao(collection);
        return instance;
    }

    @Override
    public void put(BaseUserDto baseUserDto) {
        collection.insertOne(baseUserDto.toDocument());
    }

    @Override
    public BaseUserDto get(String id) {
        Document doc = collection.find(eq("_id",id)).first();
        return BaseUserDto.toDto(doc);
    }

    public BasicUser getUser(String username) {
        Document doc = collection.find(eq("username",username)).first();
        return BasicUser.fromDocument(doc);
    }

    @Override
    public List getAll() {
        List<BasicUser> all = new ArrayList<>();
        List<Document> docs = collection.find().into(new ArrayList<>());

        for(Document doc:docs) {
            BasicUser user = BasicUser.fromDocument(doc);
            all.add(user);
        }
        return all;
    }

    public void addFunds(String user, Double amount) {
        System.out.println("Add funds");
        Document oldUser = getUser(user).toDocument();
        Bson updates = Updates.combine(
                Updates.set("funds", (Double) oldUser.get("funds") + amount)
        );
        try {
            UpdateResult result = collection.updateOne(oldUser, updates);
            System.out.println("Modified document count: " + result.getModifiedCount());
        } catch (MongoException me) {
            System.err.println("Unable to update due to an error: " + me);
        }
    }

    public void subtractFunds(String user, Double amount) {
        System.out.println("Subtracted funds");
        Document oldUser = getUser(user).toDocument();
        Bson updates = Updates.combine(
                Updates.set("funds", (Double) oldUser.get("funds") - amount)
        );
        try {
            UpdateResult result = collection.updateOne(oldUser, updates);
            System.out.println("Modified document count: " + result.getModifiedCount());
        } catch (MongoException me) {
            System.err.println("Unable to update due to an error: " + me);
        }
//        BasicUser updatedUser = getUser(user);
//        updatedUser.subtractFunds(amount);
//        collection.updateOne(eq("username",user),updatedUser.toDocument());
    }
}
