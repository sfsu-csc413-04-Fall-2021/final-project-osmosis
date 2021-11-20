package dto;

import org.bson.Document;

public class RequestTransaction extends BaseTransactionDto {

    private String recipientId;
    private String senderId;
    private static String type = "request";
    private static String privacy = "private";

    public RequestTransaction(Double amount, String to, String from, String note, String time) {
        super();
        this.amount = amount;
        recipientId = to;
        senderId = from;
        this.note = note;
        timeStamp = time;
    }

    @Override
    public Document toDocument() {
        Document doc = new Document();
        doc.append("amount", amount)
                .append("type", type)
                .append("fk_recipient", recipientId)
                .append("fk_sender", senderId)
                .append("note", note)
                .append("sent", timeStamp)
                .append("_id", getUniqueId());
        return doc;
    }

    public static RequestTransaction fromDocument(Document document){
        return new RequestTransaction((Double)document.get("amount"),
                (String) document.get("recipient"),
                (String) document.get("sender"),
                (String) document.get("note"),
                (String) document.get("sent"));
    }

    public String getRecipient() {
        return recipientId;
    }

    public String getSender() {
        return senderId;
    }

    public static String getType() {
        return type;
    }

}
