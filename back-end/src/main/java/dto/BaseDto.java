package dto;

import org.bson.Document;

public interface BaseDto {

    public BaseDto setUniqueId(String id);

    public String getUniqueId();

    public Document toDocument();
}
