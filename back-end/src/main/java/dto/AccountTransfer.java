package dto;

import org.bson.Document;

public class AccountTransfer extends BaseTransactionDto {

    private String userId;
    private String accountId;
    private static String type = "transfer";
    private static String privacy = "private";

    public AccountTransfer(Double amount, String to, String from, String note, String time) {
        super();
        this.amount = amount;
        accountId = to;
        userId = from;
        this.note = note;
        timeStamp = time;
    }

    @Override
    public Document toDocument() {
        Document doc = new Document();
        doc.append("amount", amount)
                .append("type", type)
                .append("fk_account", accountId)
                .append("fk_user", userId)
                .append("note", note)
                .append("completed", timeStamp)
                .append("_id", getUniqueId());
        return doc;
    }

    public static AccountTransfer fromDocument(Document document){
        return new AccountTransfer((Double)document.get("amount"),
                (String) document.get("recipient"),
                (String) document.get("sender"),
                (String) document.get("note"),
                (String) document.get("completed"));
    }

}
