package dto;

import com.google.gson.Gson;
import org.bson.Document;

public abstract class BaseTransactionDto implements BaseDto {

    private String uniqueId;
    public Double amount;
    public String note;
    public String timeStamp;

    public BaseTransactionDto() {}

    public BaseTransactionDto(String id) {
        uniqueId = id;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public BaseTransactionDto setUniqueId(String id) {
        uniqueId = id;
        return this;
    }

    public BaseTransactionDto setAmount(Double amount) {
        this.amount = amount;
        return this;
    }

    public abstract Document toDocument();
    private static final Gson gson = new Gson();

    public static BaseTransactionDto toDto(Document document) {
        String doc = gson.toJson(document);
        return gson.fromJson(doc, BaseTransactionDto.class);
    }
}
