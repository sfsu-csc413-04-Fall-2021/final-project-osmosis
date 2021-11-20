package dto;

import com.google.gson.Gson;
import dao.CommentDao;
import org.bson.Document;

import javax.xml.stream.events.Comment;

public class CommentDto implements BaseDto {

    private String uniqueId;
    public String comment;
    public String transactionId;
    public String userId;
    public String timeStamp;

    public CommentDto(String comment, String transaction, String by, String time) {
        this.comment = comment;
        transactionId = transaction;
        userId = by;
        timeStamp = time;
    }

    @Override
    public CommentDto setUniqueId(String id) {
        uniqueId = id;
        return this;
    }

    @Override
    public String getUniqueId() {
        return uniqueId;
    }

    @Override
    public Document toDocument() {
        Document doc = new Document();
        doc.append("comment", comment)
                .append("fk_transaction", transactionId)
                .append("fk_author", userId)
                .append("posted", timeStamp)
                .append("_id", getUniqueId());
        return doc;
    }

    private static final Gson gson = new Gson();

    public static CommentDto toDto(Document document) {
        String doc = gson.toJson(document);
        return gson.fromJson(doc, CommentDto.class);
    }
}
