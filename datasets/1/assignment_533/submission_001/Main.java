// Main class to test the BankAccount and SavingsAccount classes
public class Main {
    public static void main(String[] args) {
        // Create a BankAccount object
        BankAccount account = new BankAccount("123456789", "Henri Lionel", 1000.0);
		System.out.println("Current balance: " + account.checkBalance()); // Check balance
        account.deposit(4000.0); // Deposit money
        account.withdraw(3000.0); // Withdraw money
        System.out.println("Current balance: " + account.checkBalance()); // Check balance

        // Create a SavingsAccount object
        SavingsAccount savings = new SavingsAccount("888888888", "Amphitrite Jun", 2000.0, 5.0);
        savings.applyInterest(); // Apply interest
        System.out.println("Savings account balance: " + savings.checkBalance()); // Check balance
    }
}
