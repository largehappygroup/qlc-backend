// Main.java
// Import the ArrayList class from the Java Collections Framework
import java.util.ArrayList;

// Define the Main class
public class Main {
  
  // Main method, the entry point of the Java application
  public static void main(String[] args) {
    
    // Create a new Bank object
    Bank bank = new Bank();

    // Create three new Account objects with initial details
    Account account1 = new Account("Peter Irmgard", "C0011", 5000);
    Account account2 = new Account("Katja Ruedi", "C0121", 4500);
    Account account3 = new Account("Marcella Gebhard", "C0222", 20000);

    // Add the three accounts to the bank
    bank.addAccount(account1);
    bank.addAccount(account2);
    bank.addAccount(account3);

    // Retrieve the list of accounts from the bank
    ArrayList<Account> accounts = bank.getAccounts();

    // Loop through each account in the accounts list
    for (Account account: accounts) {
      // Print the account information for each account
      System.out.println(account.getAccountInfo());
    }

    // Print a message indicating the start of a deposit transaction
    System.out.println("\nAfter depositing 1000 into account1:");
    // Deposit 1000 into account1
    bank.depositMoney(account1, 1000);
    // Print the updated account information for account1
    System.out.println(account1.getAccountInfo());

    // Print a message indicating no transaction for account2
    System.out.println("No transaction in account2:");
    // Print the account information for account2
    System.out.println(account2.getAccountInfo());

    // Print a message indicating the start of a withdrawal transaction
    System.out.println("After withdrawing 5000 from account3:");
    // Withdraw 5000 from account3
    bank.withdrawMoney(account3, 5000);
    // Print the updated account information for account3
    System.out.println(account3.getAccountInfo());
  }
} 
