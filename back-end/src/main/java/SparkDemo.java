import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

import static spark.Spark.*;

class UserDto {
  public String username;
  public String password;
}

class SignUpResultDto {
  Boolean isSuccess;
  String error;

  public SignUpResultDto(Boolean isSuccess, String error) {
    this.isSuccess = isSuccess;
    this.error = error;
  }
}

public class SparkDemo {

  public static Gson gson = new Gson();
  public static List<UserDto> userCollection = new ArrayList<>();

  public static void main(String[] args) {
    port(1234);

    post("/api/sign-up", (req,res) -> {
      String body = req.body();
      UserDto userDto = gson.fromJson(body, UserDto.class);
      boolean usernameIsTaken = userCollection.stream()
              .anyMatch(existingUser -> existingUser.username.equals(userDto.username));
      if(usernameIsTaken) {
        System.out.println("Username duplicate found");
//        res.status(401);
        var result = new SignUpResultDto(false, "Username duplicate found");
        return gson.toJson(result);
      }
      userCollection.add(userDto);
      System.out.println(body);
      System.out.println("Total users : "+userCollection.size());
      var result = new SignUpResultDto(true, null);
      return gson.toJson(result);
    });
  }
}