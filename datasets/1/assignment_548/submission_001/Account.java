// Account.java
// Define the Account class
public class Account {
    // Declare a private variable to store the name of the account holder
    private String name;
    // Declare a private variable to store the account number
    private String accountNumber;
    // Declare a private variable to store the balance of the account
    private double balance;

    // Constructor for the Account class that initializes the name, account number, and balance variables
    public Account(String name, String accountNumber, double balance) {
        // Set the name variable to the provided name parameter
        this.name = name;
        // Set the accountNumber variable to the provided accountNumber parameter
        this.accountNumber = accountNumber;
        // Set the balance variable to the provided balance parameter
        this.balance = balance;
    }

    // Method to retrieve the name of the account holder
    public String getName() {
        // Return the value of the name variable
        return name;
    }

    // Method to set the name of the account holder
    public void setName(String name) {
        // Set the name variable to the provided name parameter
        this.name = name;
    }

    // Method to retrieve the account number
    public String getAccountNumber() {
        // Return the value of the accountNumber variable
        return accountNumber;
    }

    // Method to set the account number
    public void setAccountNumber(String accountNumber) {
        // Set the accountNumber variable to the provided accountNumber parameter
        this.accountNumber = accountNumber;
    }

    // Method to retrieve the balance of the account
    public double getBalance() {
        // Return the value of the balance variable
        return balance;
    }

    // Method to set the balance of the account
    public void setBalance(double balance) {
        // Set the balance variable to the provided balance parameter
        this.balance = balance;
    }

    // Method to deposit a specified amount into the account
    public void deposit(double amount) {
        // Increase the balance by the specified amount
        balance += amount;
    }

    // Method to withdraw a specified amount from the account
    public void withdraw(double amount) {
        // Decrease the balance by the specified amount
        balance -= amount;
    }

    // Method to retrieve the account information
    public String getAccountInfo() {
        // Return a string containing the name, account number, and balance
        return "Name: " + name + ", Account Number: " + accountNumber + ", Balance: " + balance;
    }
}
