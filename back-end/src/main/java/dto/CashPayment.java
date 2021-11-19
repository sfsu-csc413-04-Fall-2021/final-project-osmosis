package dto;

import org.bson.Document;

public class CashPayment extends BasePaymentDto {

  private String type = "cash";

  public CashPayment() {
  }

  public CashPayment(String uniqueId, Double amount) {
    super(uniqueId);
    this.amount = amount;
  }

  public CashPayment(Double amount) {
    super();
    this.amount = amount;
  }

  @Override
  public Document toDocument() {
    Document doc = new Document();
    doc.append("amount", amount)
            .append("type", type)
            .append("_id", getUniqueId());
    return doc;
  }

  public static CashPayment fromDocument(Document document) {
    return new CashPayment(document.get("_id").toString(),(Double) document.get("amount"));
  }
}
