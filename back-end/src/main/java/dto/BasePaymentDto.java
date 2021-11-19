package dto;

import com.google.gson.Gson;
import org.bson.Document;

public abstract class BasePaymentDto {

    private String uniqueId;
    public Double amount;

    public BasePaymentDto() {}

    public BasePaymentDto(String id) {
        uniqueId = id;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public BasePaymentDto setUniqueId(String id) {
        uniqueId = id;
        return this;
    }

    public BasePaymentDto setAmount(Double amount) {
        this.amount = amount;
        return this;
    }

    public abstract Document toDocument();
    private static final Gson gson = new Gson();

    public static BasePaymentDto toDto(Document document) {
        String doc = gson.toJson(document);
        return gson.fromJson(doc, BasePaymentDto.class);
    }
}
