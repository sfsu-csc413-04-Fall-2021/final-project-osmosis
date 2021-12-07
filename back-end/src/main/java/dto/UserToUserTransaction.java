package dto;

import org.bson.Document;

public class UserToUserTransaction extends BaseTransactionDto {

  private String recipient;
  private String sender;
  private Boolean complete;
  private String privacy;

  public UserToUserTransaction(Double amount, String to, String from, Boolean complete, String note, String time, String privacy) {
    super();
    this.amount = amount;
    recipient = to;
    sender = from;
    this.complete = complete;
    this.note = note;
    timeStamp = time;
    this.privacy = privacy;
  }

  @Override
  public Document toDocument() {
    Document doc = new Document();
    doc.append("amount", amount)
            .append("complete", complete)
            .append("recipient", recipient)
            .append("sender", sender)
            .append("note", note)
            .append("completed", timeStamp)
            .append("privacy", privacy)
            .append("_id", getUniqueId());
    System.out.println(doc);
    return doc;
  }

  public static UserToUserTransaction fromDocument(Document document){
    return new UserToUserTransaction((Double)document.get("amount"),
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

  public String toString() {
    return sender+" sent "+amount+" to "+recipient+" at "+timeStamp;
  }

}
