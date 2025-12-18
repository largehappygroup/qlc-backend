// Define the Account class
public class Account {
    // Private instance variables
    private String accountNumber;
    private String accountHolder;
    private double balance;

    // Public getter for the accountNumber variable
    public String getAccountNumber() {
        return accountNumber;
    }

    // Public setter for the accountNumber variable
    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    // Public getter for the accountHolder variable
    public String getAccountHolder() {
        return accountHolder;
    }

    // Public setter for the accountHolder variable
    public void setAccountHolder(String accountHolder) {
        this.accountHolder = accountHolder;
    }

    // Public getter for the balance variable
    public double getBalance() {
        return balance;
    }

    // Public setter for the balance variable
    public void setBalance(double balance) {
        this.balance = balance;
    }

    // Method to deposit an amount and increase the balance
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    // Method to withdraw an amount and decrease the balance
    public void withdraw(double amount) {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
        }
    }  
}
