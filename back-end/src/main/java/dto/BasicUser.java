package dto;

import org.bson.Document;

public class BasicUser extends BaseUserDto {

    private String realName;
    private Double funds;

    public BasicUser() {
    }

    public BasicUser(String uniqueId, String user, String pass, String name) {
        this(uniqueId, user, pass, name, 0.0);
    }

    public BasicUser(String uniqueId, String user, String pass, String name, Double amount) {
        super(uniqueId);
        username = user;
        password = pass;
        realName = name;
        funds = amount;
    }

    @Override
    public Document toDocument() {
        Document doc = new Document();
        doc.append("username", getUsername())
                .append("type", getPassword())
                .append("funds", funds)
                .append("_id", getUniqueId());
        return doc;
    }

    public static BasicUser fromDocument(Document document) {
        return new BasicUser(document.get("_id").toString(),
                document.get("username").toString(),
                document.get("password").toString(),
                document.get("realname").toString(),
                (Double) document.get("funds"));
    }

}
