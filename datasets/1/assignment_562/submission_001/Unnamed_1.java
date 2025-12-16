// BankAccount.java
// Define a class named BankAccount
class BankAccount {
  
  // Declare a private double variable balance
  private double balance;

  // Define a constructor that takes a double initialBalance as a parameter
  public BankAccount(double initialBalance) {
    // Assign the parameter initialBalance to the instance variable balance
    this.balance = initialBalance;
  }

  // Define a method to get the current balance
  public double getBalance() {
    // Return the current balance
    return balance;
  }

  // Define a method to deposit an amount to the balance
  public void deposit(double amount) {
    // Add the amount to the current balance
    balance += amount;
  }

  // Define a method to withdraw an amount from the balance
  public void withdraw(double amount) {
    // Check if the amount to be withdrawn is less than or equal to the current balance
    if (amount <= balance) {
      // Subtract the amount from the current balance
      balance -= amount;
    } else {
      // Print "Insufficient funds." to the console if the balance is insufficient
      System.out.println("Insufficient funds.");
    }
  }
} 
