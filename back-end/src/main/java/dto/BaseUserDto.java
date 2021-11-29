package dto;

import com.google.gson.Gson;
import org.bson.Document;

public abstract class BaseUserDto implements BaseDto {

    private String uniqueId;
    protected String username;
    protected String password;

    public BaseUserDto() {}

    public BaseUserDto(String id) {
        uniqueId = id;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public BaseUserDto setUniqueId(String id) {
        uniqueId = id;
        return this;
    }

    public BaseUserDto setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public BaseUserDto setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public abstract Document toDocument();
    private static final Gson gson = new Gson();

    public static BaseUserDto toDto(Document document) {
        String doc = gson.toJson(document);
        return gson.fromJson(doc, BaseUserDto.class);
    }
}
