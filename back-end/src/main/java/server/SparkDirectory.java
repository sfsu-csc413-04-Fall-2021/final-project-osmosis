package server;

import com.google.gson.Gson;
import dao.TransactionDao;
import dao.UserDao;
import dto.*;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import static spark.Spark.*;

class SignUpResultDto {
    Boolean isSuccess;
    String error = "";

    public SignUpResultDto(Boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public SignUpResultDto(Boolean isSuccess, String error) {
        this.isSuccess = isSuccess;
        this.error = error;
    }

    public void add(String error) {
        this.isSuccess = false;
        this.error += error + "; ";
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
            System.out.println(body);
            SignUpResultDto result = new SignUpResultDto(true);
            BasicUser user = gson.fromJson(body, BasicUser.class);
            System.out.println(user.getUsername()+", "+user.getPassword()+", "+user.getConfirm());
            if(!user.getPassword().equals(user.getConfirm())) {
                System.out.println("Passwords do not match");
                result.add("Passwords do not match");
                return result;
            }
            result = Validator.isValidUsername(result, user.getUsername());
//            result = Validator.isValidPassword(result, user.getPassword());
            result = Validator.isValidPasswordDebug();
            if(!result.isSuccess) {
                System.out.println(result.error);
                return result;
            }
            System.out.println("here");
            Predicate<BaseUserDto> userExists = existingUser -> existingUser.getUsername().equals("dill");
            boolean usernameIsTaken = UserDao.getInstance().getAll().stream()
                    .anyMatch(userExists);
            System.out.println("here 2");
            if(usernameIsTaken) {
                System.out.println("Username already exists");
                result.add("Username already exists");
                return gson.toJson(result);
            }
            UserDao.getInstance().put(user);
            System.out.println(body);
            System.out.println("Total users : "+UserDao.getInstance().getAll().size());
            return gson.toJson(result);
        });

        post("/api/log-in", (req,res) -> { //TODO
            var result = new SignUpResultDto(false, "Not implemented");
            return gson.toJson(result);
        });

        post("/api/log-out", (req,res) -> { //TODO
            var result = new SignUpResultDto(false, "Not implemented");
            return gson.toJson(result);
        });

        post("/api/pay", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true, null);
            UserToUserTransaction payment = gson.fromJson(body, UserToUserTransaction.class);

            BasicUser sender = (BasicUser) UserDao.getInstance().get(payment.getSender());
            BasicUser recipient = (BasicUser) UserDao.getInstance().get(payment.getRecipient());

            boolean senderExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(sender.getUsername()));
            boolean recipientExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(recipient.getUsername()));
            if(!(senderExists && recipientExists)) {
                System.out.println("At least one user not found");
                result.add("At least one user not found");
                return gson.toJson(result);
            }
            //Check if sender has enough funds
            if(sender.getFunds() < payment.amount) {
                //TODO if not enough funds, send user to "add funds screen"
            }
            //If everything is successful
            TransactionDao.getInstance().put(payment);

            return gson.toJson(result);
        });

        post("/api/request", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true, null);
            RequestTransaction payment = gson.fromJson(body, RequestTransaction.class);

            //check if valid sender, recipient
            BasicUser sender = (BasicUser) UserDao.getInstance().get(payment.getSender());
            BasicUser recipient = (BasicUser) UserDao.getInstance().get(payment.getRecipient());

            boolean senderExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(sender.getUsername()));
            boolean recipientExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(recipient.getUsername()));
            if(!(senderExists && recipientExists)) {
                System.out.println("At least one user not found");
                result.add("At least one user not found");
                return gson.toJson(result);
            }
            //TODO add to TransactionDao
            TransactionDao.getInstance().put(payment);

            return gson.toJson(result);
        });

        post("/api/accept", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true, null);
            RequestTransaction payment = gson.fromJson(body, RequestTransaction.class);

            //TODO check if request exists
            boolean transactionExists = TransactionDao.getInstance().getAll().stream()
                    .anyMatch(transaction -> ((BaseTransactionDto) transaction).getUniqueId().equals(payment.getUniqueId()));
            if(!transactionExists) {
                System.out.println("Transaction not found");
                result.add("Transaction not found");
                return gson.toJson(result);
            }
            //TODO check if valid sender, recipient
            BasicUser sender = (BasicUser) UserDao.getInstance().get(payment.getSender());
            BasicUser recipient = (BasicUser) UserDao.getInstance().get(payment.getRecipient());

            boolean senderExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(sender.getUsername()));
            boolean recipientExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(recipient.getUsername()));
            if(!(senderExists && recipientExists)) {
                System.out.println("At least one user not found");
                result.add("At least one user not found");
                return gson.toJson(result);
            }
            //TODO check if enough funds
            //TODO if not ask for bank
            //create new UserToUserTransaction
            UserToUserTransaction completePayment = payment.complete();
            //add to TransactionDao
            TransactionDao.getInstance().put(completePayment);
            //remove RequestTransaction from TransactionDao
            TransactionDao.getInstance().delete(payment);

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
            //TODO get current session user
            BaseUserDto user = gson.fromJson(body, BaseUserDto.class);

            boolean userExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(user.getUsername()));
            if(!userExists) {
                System.out.println("You have been logged out");
                result.add("You have been logged out");
                return gson.toJson(result);
            }



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
