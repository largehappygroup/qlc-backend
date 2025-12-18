public class Main {
    // Main method to test the Account class
    public static void main(String[] args) {
        // Create a new Account object
        Account account = new Account();

        // Set the account number, account holder, and initial balance
        account.setAccountNumber("123456789");
        account.setAccountHolder("Rodolfo Desiree");
        account.setBalance(1000.0);

        // Deposit an amount to the account
        account.deposit(500.0);

        // Withdraw an amount from the account
        account.withdraw(200.0);

        // Print the details of the account
        System.out.println("Account Number: " + account.getAccountNumber());
        System.out.println("Account Holder: " + account.getAccountHolder());
        System.out.println("Balance: $" + account.getBalance());
    }
 }
