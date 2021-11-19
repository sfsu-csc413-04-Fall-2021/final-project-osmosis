package dto;

import org.bson.Document;

public class CreditCardPayment extends BasePaymentDto {

  private String number;
  private String securityCode;
  private static String type = "credit";

  public CreditCardPayment(Double amount, String number, String securityCode) {
    super();
    this.amount = amount;
    this.number = number;
    this.securityCode = securityCode;
  }

  @Override
  public Document toDocument() {
    Document doc = new Document();
    doc.append("amount", amount)
            .append("type", type)
            .append("number", number)
            .append("securityCode", securityCode);
    return doc;
  }

  public static CreditCardPayment fromDocument(Document document){
    return new CreditCardPayment((Double)document.get("amount"),
            (String) document.get("number"),
            (String) document.get("securityCode"));
  }

  public String getNumber() {
    return number;
  }

  public String getSecurityCode() {
    return securityCode;
  }

  public String getType() {
    return type;
  }
}
