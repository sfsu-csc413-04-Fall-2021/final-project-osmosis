package dto;

import org.bson.Document;

public class UserToUserTransaction extends BaseTransactionDto {

  private String recipientId;
  private String senderId;
  private static String type = "userToUser";
  private String privacy;

  public UserToUserTransaction(Double amount, String to, String from, String note, String time, String privacy) {
    super();
    this.amount = amount;
    recipientId = to;
    senderId = from;
    this.note = note;
    timeStamp = time;
    this.privacy = privacy;
  }

  @Override
  public Document toDocument() {
    Document doc = new Document();
    doc.append("amount", amount)
            .append("type", type)
            .append("fk_recipient", recipientId)
            .append("fk_sender", senderId)
            .append("note", note)
            .append("completed", timeStamp)
            .append("privacy", privacy)
            .append("_id", getUniqueId());
    return doc;
  }

  public static UserToUserTransaction fromDocument(Document document){
    return new UserToUserTransaction((Double)document.get("amount"),
            (String) document.get("recipient"),
            (String) document.get("sender"),
            (String) document.get("note"),
            (String) document.get("completed"),
            (String) document.get("privacy"));
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
