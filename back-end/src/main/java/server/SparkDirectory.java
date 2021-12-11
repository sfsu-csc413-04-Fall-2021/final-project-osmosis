package server;

import com.google.gson.Gson;
import dao.TransactionDao;
import dao.UserDao;
import dto.*;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.eclipse.jetty.server.Authentication;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import static spark.Spark.*;

class SignUpResultDto {
    Boolean isSuccess;
    String error = "";

    public SignUpResultDto(Boolean isSuccess) {
        this.isSuccess = isSuccess;
        error = "";
    }

    public SignUpResultDto(Boolean isSuccess, String error) {
        this.isSuccess = isSuccess;
        this.error = error;
    }

    public void add(String error) {
        this.isSuccess = false;
        if(error == null || error.length() == 0){
            this.error = error;
        }
        this.error += error + "; ";
    }
}

class Validator {
    public static SignUpResultDto isValidUsername(SignUpResultDto result, String username) {
        if(username.length() < 6) { //check length of username
            result.add("Username is not long enough");
        }
        if(username.matches(".[A-Z].")) { //if starts with a letter
            result.add("Username does not contain a capital letter");
        }
        return result;
    }
    public static SignUpResultDto isValidPassword(SignUpResultDto result, String password) {
        if(password.length() < 6) { //check length of password
            result.add("Password is not long enough");
        }
        if(password.matches(".\\d.")) { //if contains a number
            result.add("Password does not contain a number");
        }
        if(password.matches(".[A-Z].")) { //if contains a capital letter
            result.add("Password does not contain a capital letter");
        }
//        if(password.matches(".[a-z].")) { //if contains a lowercase letter
//            result.add("Password does not contain a lowercase letter");
//        }
        return result;
    }
    public static SignUpResultDto isValidPasswordDebug() {
        return new SignUpResultDto(true, null);
    }
}

class ViewAllResultsDto {
    List<Document> transactions;

    public ViewAllResultsDto() {
        transactions = new ArrayList<>();
    }

    public void add(Document doc) {
        transactions.add(doc);
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
            result = Validator.isValidPassword(result, user.getPassword());
            if(!result.isSuccess) {
                System.out.println(result.error);
                return result;
            }
            boolean usernameIsTaken = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(user.getUsername()));
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

        post("/api/log-in", (req,res) -> {
            String body = req.body();
            System.out.println(body);
            SignUpResultDto result = new SignUpResultDto(true);
            BasicUser user = gson.fromJson(body, BasicUser.class);
            System.out.println(user.getUsername()+", "+user.getPassword()+", "+user.getConfirm());
            boolean userExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(user.getUsername()));
            if(!userExists) {
                System.out.println("User not found");
                result.add("User not found");
                return gson.toJson(result);
            }
            if(!user.getPassword().equals(UserDao.getInstance().getUser(user.getUsername()).getPassword())) {
                System.out.println("Password incorrect");
                result.add("Password incorrect");
                return gson.toJson(result);
            }

            return gson.toJson(result);
        });

        post("/api/log-out", (req,res) -> { //TODO
            var result = new SignUpResultDto(false, "Not implemented");
            return gson.toJson(result);
        });

        post("/api/pay", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true);
            UserToUserTransaction payment = gson.fromJson(body, UserToUserTransaction.class);
            payment.setUniqueId(new ObjectId().toString());
            payment.setComplete(true);

            System.out.println(payment.getSender()+", "+payment.getRecipient());

            BasicUser sender = UserDao.getInstance().getUser(payment.getSender());
            BasicUser recipient = UserDao.getInstance().getUser(payment.getRecipient());

            boolean senderExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(sender.getUsername()));
            boolean recipientExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(recipient.getUsername()));
            if(!(senderExists && recipientExists)) {
                System.out.println("At least one user not found");
                result.add("At least one user not found");
                return gson.toJson(result);
            }

            if(sender.getUsername().equals(recipient.getUsername())) {
                System.out.println("Cannot send money to yourself");
                result.add("Cannot send money to yourself");
                return gson.toJson(result);
            }

            //Check if sender has enough funds
            if(UserDao.getInstance().getUser(sender.getUsername()).getFunds() < payment.amount) {
                System.out.println("Not enough funds");
                result.add("Not enough funds");
                return gson.toJson(result);
            }

            // Check if sender is sending a positive value
            if(payment.amount < 0){
                System.out.println("Cannot send a negative number");
                result.add("Cannot send a negative number");
                return gson.toJson(result);
            }
            //If everything is successful
            System.out.println(payment);
            System.out.println(payment.toDocument());
            TransactionDao.getInstance().putTransaction(payment);
            UserDao.getInstance().addFunds(recipient.getUsername(), payment.amount);
            UserDao.getInstance().subtractFunds(sender.getUsername(), payment.amount);

            return gson.toJson(result);
        });

        post("/api/request", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true);
            UserToUserTransaction payment = gson.fromJson(body, UserToUserTransaction.class);
            payment.setUniqueId(new ObjectId().toString());
            payment.setComplete(false);

            System.out.println(payment);

            //check if valid sender, recipient
            BasicUser sender = UserDao.getInstance().getUser(payment.getSender());
            BasicUser recipient = UserDao.getInstance().getUser(payment.getRecipient());

            boolean senderExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(sender.getUsername()));
            boolean recipientExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(recipient.getUsername()));
            if(!(senderExists && recipientExists)) {
                System.out.println("At least one user not found");
                result.add("At least one user not found");
                return gson.toJson(result);
            }

            if(sender.getUsername().equals(recipient.getUsername())) {
                System.out.println("Cannot request money from yourself");
                result.add("Cannot request money from yourself");
                return gson.toJson(result);
            }

            //If everything is successful
            System.out.println(payment);
            TransactionDao.getInstance().putTransaction(payment);

            return gson.toJson(result);
        });

        post("/api/accept", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true);
            UserToUserTransaction payment = gson.fromJson(body, UserToUserTransaction.class);

            //check if request exists
            boolean transactionExists = TransactionDao.getInstance().getAllRequests().stream()
                    .anyMatch(transaction -> ((BaseTransactionDto) transaction).getUniqueId().equals(payment.getUniqueId()));
            if(!transactionExists) {
                System.out.println("Transaction not found");
                result.add("Transaction not found");
                return gson.toJson(result);
            }
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
            //TODO check if enough funds
            //TODO if not ask for bank
            //create new UserToUserTransaction
            payment.setComplete(true);
            //remove RequestTransaction from TransactionDao
            TransactionDao.getInstance().delete(payment);
            //add to TransactionDao
            TransactionDao.getInstance().put(payment);

            return gson.toJson(result);
        });

        post("/api/decline", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true);
            RequestTransaction payment = gson.fromJson(body, RequestTransaction.class);

            //check if request exists
            boolean transactionExists = TransactionDao.getInstance().getAllRequests().stream()
                    .anyMatch(transaction -> ((BaseTransactionDto) transaction).getUniqueId().equals(payment.getUniqueId()));
            if(!transactionExists) {
                System.out.println("Transaction not found");
                result.add("Transaction not found");
                return gson.toJson(result);
            }
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
            //TODO check if enough funds
            //TODO if not ask for bank
            //remove RequestTransaction from TransactionDao
            TransactionDao.getInstance().delete(payment);

            return gson.toJson(result);
        });

        post("/api/comment", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true);
            CommentDto comment = gson.fromJson(body, CommentDto.class);

            //TODO check if comment is valid length
            //TODO add to CommentDao

            return gson.toJson(result);
        });

        post("/api/view-all", (req,res) -> { //TODO view all public transactions and logged-in user's private transactions
            System.out.println("View all");
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true);
            BasicUser user = gson.fromJson(body, BasicUser.class);

            boolean userExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(user.getUsername()));
            if(!userExists) {
                System.out.println("You have been logged out");
                result.add("You have been logged out");
                return gson.toJson(result);
            }

            //found user
            ViewAllResultsDto transResult = new ViewAllResultsDto();

            for(Object transaction:TransactionDao.getInstance().getAll()) {
                System.out.println(((UserToUserTransaction) transaction).toDocument());
                transResult.add(((UserToUserTransaction) transaction).toDocument());
            }

            return gson.toJson(transResult);
        });

        post("/api/view-requests", (req,res) -> { //TODO view all public transactions and logged-in user's private transactions
            System.out.println("View all");
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true);
            BasicUser user = gson.fromJson(body, BasicUser.class);

            boolean userExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(user.getUsername()));
            if(!userExists) {
                System.out.println("You have been logged out");
                result.add("You have been logged out");
                return gson.toJson(result);
            }

            //found user
            ViewAllResultsDto transResult = new ViewAllResultsDto();

            for(Object transaction:TransactionDao.getInstance().getAllRequests()) {
                System.out.println(((UserToUserTransaction) transaction).toDocument());
                transResult.add(((UserToUserTransaction) transaction).toDocument());
            }

            return gson.toJson(transResult);
        });

        post("/api/view-transaction", (req,res) -> { //TODO view particular transaction
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true);
            UserToUserTransaction transaction = gson.fromJson(body, UserToUserTransaction.class);

            boolean transactionExists = TransactionDao.getInstance().getAll().stream()
                    .anyMatch(existingTrans ->
                            ((UserToUserTransaction) existingTrans).getUniqueId().equals(transaction.getUniqueId()));
            if(!transactionExists) {
                System.out.println("Transaction not found");
                result.add("Transaction not found");
                return gson.toJson(result);
            }

            return gson.toJson(transaction.toDocument());
        });

        post("/api/set-privacy", (req,res) -> { //TODO set privacy of transaction, only for userToUser
            var result = new SignUpResultDto(true);
            return gson.toJson(result);
        });

        post("/api/delete-comment", (req,res) -> { //TODO
            var result = new SignUpResultDto(true);
            return gson.toJson(result);
        });

        post("/api/view-user", (req,res) -> {
            String body = req.body();
            SignUpResultDto result = new SignUpResultDto(true);
            BasicUser user = gson.fromJson(body, BasicUser.class);;

            boolean userExists = UserDao.getInstance().getAll().stream()
                    .anyMatch(existingUser -> ((BaseUserDto) existingUser).getUsername().equals(user.getUsername()));
            if(!userExists) {
                System.out.println("User not found");
                result.add("User not found");
                return gson.toJson(result);
            }

            return gson.toJson(UserDao.getInstance().getUser(user.getUsername()).getFunds());
        });

    }
}
