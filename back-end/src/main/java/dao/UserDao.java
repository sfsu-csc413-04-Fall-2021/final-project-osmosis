package dao;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import dto.BaseUserDto;
import org.bson.Document;

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

    @Override
    public List getAll() {
        List<BaseUserDto> all = new ArrayList<>();
        List<Document> docs = new ArrayList<>();
        FindIterable<Document> iterable = collection.find(exists("_id"));
        System.out.println(collection.countDocuments());

        iterable.into(docs);
        System.out.println(docs);
        for(Document doc:docs) {
            all.add(BaseUserDto.toDto(doc));
            System.out.println(doc);
        }
        return all;
    }
}
