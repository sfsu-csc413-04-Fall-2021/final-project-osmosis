package dto;

import org.bson.Document;

public class BasicUser extends BaseUserDto {

    private Double funds = 0.0;

    public BasicUser() {
    }

    public BasicUser(String uniqueId, String user, String pass) {
        this(uniqueId, user, pass, 0.0);
    }

    public BasicUser(String uniqueId, String user, String pass, Double amount) {
        super(uniqueId);
        username = user;
        password = pass;
        funds = amount;
        if(amount == null) funds = 0.0;
    }

    @Override
    public Document toDocument() {
        Document doc = new Document();
        doc.append("username", getUsername())
                .append("password", getPassword())
                .append("funds", funds)
                .append("_id", getUniqueId());
        return doc;
    }

    public static BasicUser fromDocument(Document document) {
        System.out.println("here fromDocument");
        System.out.println(document.get("_id").toString());
        System.out.println(document.get("username").toString());
        System.out.println(document.get("password").toString());
        System.out.println((Double) document.get("funds"));
        BasicUser user = new BasicUser(document.get("_id").toString(),
                document.get("username").toString(),
                document.get("password").toString(),
                (Double) document.get("funds"));
        System.out.println(user.getUsername());
        return user;
    }

    public Double getFunds() {
        return funds;
    }

}
