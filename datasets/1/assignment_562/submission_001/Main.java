// Main.java
// Main class definition
public class Main {
  // Main method, program entry point
  public static void main(String[] args) {
    // Create a SavingsAccount object with a balance of 2000 and a limit of 650
    BankAccount savingsAccount = new SavingsAccount(2000, 650);
    // Create a CheckingAccount object with a balance of 1000 and a limit of 100
    BankAccount checkingAccount = new CheckingAccount(1000, 100);

    // Withdraw 300 from the savings account
    withdrawFromAccount(savingsAccount, 300);
    // Withdraw 250 from the checking account
    withdrawFromAccount(checkingAccount, 250);

    // Print the current balance of the savings account
    System.out.println("Savings Account Balance: " + savingsAccount.getBalance());
    // Print the current balance of the checking account
    System.out.println("Checking Account Balance: " + checkingAccount.getBalance());
  }

  // Method to withdraw a specified amount from a given bank account
  public static void withdrawFromAccount(BankAccount account, double amount) {
    // Call the withdraw method on the account with the specified amount
    account.withdraw(amount);
  }
} 
