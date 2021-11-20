package dao;

import com.mongodb.client.MongoCollection;
import dto.*;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

public class CommentDao implements BaseDao<CommentDto> {

    private static CommentDao instance;
    public MongoCollection<Document> collection;

    private CommentDao(MongoCollection<Document> collection) {
        this.collection = collection;
    }

    public static CommentDao getInstance() {
        if (instance == null) {
            instance = new CommentDao(MongoConnection.getCollection("Comments"));
        }
        return instance;
    }

    public static CommentDao getInstance(MongoCollection<Document> collection) {
        instance = new CommentDao(collection);
        return instance;
    }

    @Override
    public void put(CommentDto commentDto) {
        collection.insertOne(commentDto.toDocument());
    }

    @Override
    public CommentDto get(String id) {
        Document doc = collection.find(eq("_id",id)).first();
        return CommentDto.toDto(doc);
    }

    @Override
    public List getAll() {
        List<CommentDto> all = new ArrayList<>();
        List<Document> docs = collection.find().into(new ArrayList<>());

        System.out.println(docs);
        for(Document doc:docs) {
            all.add(CommentDto.toDto(doc));
            System.out.println(doc);
        }
        return all;
    }
}
