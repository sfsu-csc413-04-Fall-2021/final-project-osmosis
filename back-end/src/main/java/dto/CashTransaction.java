package dto;

import org.bson.Document;

public class CashTransaction extends BaseTransactionDto {

  private String type = "cash";

  public CashTransaction() {
  }

  public CashTransaction(String uniqueId, Double amount) {
    super(uniqueId);
    this.amount = amount;
  }

  public CashTransaction(Double amount) {
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

  public static CashTransaction fromDocument(Document document) {
    return new CashTransaction(document.get("_id").toString(),(Double) document.get("amount"));
  }
}
