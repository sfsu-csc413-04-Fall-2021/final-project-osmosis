package dto;

import org.bson.Document;
import org.bson.types.ObjectId;

public class UserToUserTransaction extends BaseTransactionDto {

  private String recipient;
  private String sender;
  private Boolean complete;
  private String privacy;

  public UserToUserTransaction(String id, Double amount, String to, String from, Boolean complete, String note, String time, String privacy) {
    super();
    setUniqueId(id);
    this.amount = amount;
    recipient = to;
    sender = from;
    this.complete = complete;
    this.note = note;
    timeStamp = time;
    this.privacy = privacy;
  }

  public UserToUserTransaction(Double amount, String to, String from, Boolean complete, String note, String time, String privacy) {
    this(new ObjectId().toString(), amount, to, from, complete, note, time, privacy);
  }

  @Override
  public Document toDocument() {
    Document doc = new Document();
    doc.append("amount", amount)
            .append("complete", complete)
            .append("recipient", recipient)
            .append("sender", sender)
            .append("complete", complete)
            .append("note", note)
            .append("completed", timeStamp)
            .append("privacy", privacy)
            .append("_id", getUniqueId());
    return doc;
  }

  public static UserToUserTransaction fromDocument(Document document){
    return new UserToUserTransaction((String) document.get("_id"),
            (Double)document.get("amount"),
            (String) document.get("recipient"),
            (String) document.get("sender"),
            (Boolean) document.get("complete"),
            (String) document.get("note"),
            (String) document.get("completed"),
            (String) document.get("privacy"));
  }

  public static UserToUserTransaction toDto(Document doc) {
    return fromDocument(doc);
  }

  public String getRecipient() {
    return recipient;
  }

  public String getSender() {
    return sender;
  }

  public Double getAmount() {
    return amount;
  }

  public Boolean isComplete() {
    return complete;
  }

  public void setComplete(Boolean complete) {
    this.complete = complete;
  }

  public String toString() {
    return "Transaction "+getUniqueId()+": "+sender+(complete ? " sent ":" wants to send ")+amount+" to "+recipient;
  }

}
