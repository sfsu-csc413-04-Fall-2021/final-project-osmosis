package server;

import com.google.gson.Gson;
import dao.UserDao;
import dto.BaseUserDto;
import dto.BasicUser;

import java.util.ArrayList;
import java.util.List;

import static spark.Spark.*;

class SignUpResultDto {
    Boolean isSuccess;
    String error;

    public SignUpResultDto(Boolean isSuccess, String error) {
        this.isSuccess = isSuccess;
        this.error = error;
    }
}

class Validator {
    public static boolean isValidUsername(String username) {
        if(username.length() < 3) { //check length of username
            return false;
        }
        if(!((username.charAt(0) >= 65 && username.charAt(0) <= 90)
                || (username.charAt(0) >= 97 && username.charAt(0) <= 122))) { //if starts with a letter
            return false;
        }
        return true;
    }
}

public class SparkDirectory {

    public static Gson gson = new Gson();

    public static void main(String[] args) {
        port(1234);

        post("/api/sign-up", (req,res) -> {
            String body = req.body();
            BasicUser user = gson.fromJson(body, BasicUser.class);
            boolean usernameIsTaken = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(user.getUsername()));
            if(usernameIsTaken) {
                System.out.println("Username duplicate found");
                var result = new SignUpResultDto(false, "Username duplicate found");
                return gson.toJson(result);
            }
            UserDao.getInstance().put(user);
            System.out.println(body);
            System.out.println("Total users : "+UserDao.getInstance().getAll().size());
            var result = new SignUpResultDto(true, null);
            return gson.toJson(result);
        });

        post("/api/log-in", (req,res) -> {
            return gson.toJson(res);
        });
    }
}
