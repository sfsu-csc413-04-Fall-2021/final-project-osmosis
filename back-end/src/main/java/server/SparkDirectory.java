package server;

import com.google.gson.Gson;
import dao.UserDao;
import dto.*;

import java.util.ArrayList;
import java.util.List;

import static spark.Spark.*;

class SignUpResultDto {
    Boolean isSuccess;
    List<String> errors = new ArrayList<>();

    public SignUpResultDto(Boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public SignUpResultDto(Boolean isSuccess, String error) {
        this.isSuccess = isSuccess;
        this.errors.add(error);
    }

    public void add(String error) {
        this.isSuccess = false;
        this.errors.add(error);
    }
}

class Validator {
    public static SignUpResultDto isValidUsername(SignUpResultDto result, String username) {
        if(username.length() < 3) { //check length of username
            result.add("Username is not long enough");
        }
        if(username.length() > 20) {
            result.add("Username is too long");
        }
        if(username.matches("[a-zA-Z].")) { //if starts with a letter
            result.add("Username does not start with a letter");
        }
        return result;
    }
    public static SignUpResultDto isValidPassword(SignUpResultDto result, String password) {
        if(password.length() < 8) { //check length of password
            result.add("Password is not long enough");
        }
        if(password.matches(".\\d.")) { //if contains a number
            result.add("Password does not contain a number");
        }
        if(password.matches(".[A-Z].")) { //if contains a capital letter
            result.add("Password does not contain a capital letter");
        }
        if(password.matches(".[a-z].")) { //if contains a lowercase letter
            result.add("Password does not contain a lowercase letter");
        }
        return result;
    }
    public static SignUpResultDto isValidPasswordDebug() {
        return new SignUpResultDto(true, null);
    }
}



public class SparkDirectory {

    public static Gson gson = new Gson();

    public static void main(String[] args) {
        port(1234);

        post("/api/sign-up", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true);
            BasicUser user = gson.fromJson(body, BasicUser.class);
            result = Validator.isValidUsername(result, user.getUsername());
            result = Validator.isValidPassword(result, user.getPassword());
            if(!result.isSuccess) return result;
            boolean usernameIsTaken = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(user.getUsername()));
            if(usernameIsTaken) {
                System.out.println("Username duplicate found");
                result.add("Username duplicate found");
                return gson.toJson(result);
            }
            UserDao.getInstance().put(user);
            System.out.println(body);
            System.out.println("Total users : "+UserDao.getInstance().getAll().size());
            return gson.toJson(result);
        });

        post("/api/log-in", (req,res) -> { //TODO
            var result = new SignUpResultDto(true, null);
            return gson.toJson(result);
        });

        post("/api/log-out", (req,res) -> { //TODO
            var result = new SignUpResultDto(true, null);
            return gson.toJson(result);
        });

        post("/api/pay", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true, null);
            UserToUserTransaction payment = gson.fromJson(body, UserToUserTransaction.class);

            //TODO check if valid sender, recipient
            //TODO check if enough funds
            //TODO if not ask for bank
            //TODO add to TransactionDao

            return gson.toJson(result);
        });

        post("/api/request", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true, null);
            RequestTransaction payment = gson.fromJson(body, RequestTransaction.class);

            //TODO check if valid sender, recipient
            //TODO add to TransactionDao

            return gson.toJson(result);
        });

        post("/api/accept", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true, null);
            RequestTransaction payment = gson.fromJson(body, RequestTransaction.class);

            //TODO check if request exists
            //TODO create new UserToUserTransaction
            //TODO check if valid sender, recipient
            //TODO check if enough funds
            //TODO if not ask for bank
            //TODO add to TransactionDao
            //TODO remove RequestTransaction from TransactionDao

            return gson.toJson(result);
        });

        post("/api/comment", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true, null);
            CommentDto comment = gson.fromJson(body, CommentDto.class);

            //TODO check if comment is valid length
            //TODO add to CommentDao

            return gson.toJson(result);
        });

        get("/api/view-all", (req,res) -> { //TODO view all public transactions and logged-in user's private transactions
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true, null);
            CommentDto comment = gson.fromJson(body, CommentDto.class);

            return gson.toJson(result);
        });

        get("/api/view-transaction", (req,res) -> { //TODO view particular transaction
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true, null);
            CommentDto comment = gson.fromJson(body, CommentDto.class);

            //TODO check if public or logged-in user's private transaction
            //TODO display sender, recipient, amount (if user's), note, comments

            return gson.toJson(result);
        });

        post("/api/set-privacy", (req,res) -> { //TODO set privacy of transaction, only for userToUser
            var result = new SignUpResultDto(true, null);
            return gson.toJson(result);
        });

        post("/api/delete-comment", (req,res) -> { //TODO
            var result = new SignUpResultDto(true, null);
            return gson.toJson(result);
        });

        get("/api/view-user", (req,res) -> { //TODO view all user's public transactions, if logged-in user, show private
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true, null);
            CommentDto comment = gson.fromJson(body, CommentDto.class);

            return gson.toJson(result);
        });

    }
}
