// CheckingAccount.java
// Define a class named CheckingAccount that extends BankAccount
class CheckingAccount extends BankAccount {
  
  // Declare a private double variable overdraftFee
  private double overdraftFee;

  // Define a constructor that takes a double initialBalance and a double overdraftFee as parameters
  public CheckingAccount(double initialBalance, double overdraftFee) {
    // Call the constructor of the superclass BankAccount with initialBalance
    super(initialBalance);
    // Assign the parameter overdraftFee to the instance variable overdraftFee
    this.overdraftFee = overdraftFee;
  }

  // Override the withdraw method from the BankAccount class
  @Override
  public void withdraw(double amount) {
    // Check if the amount to be withdrawn is less than or equal to the current balance
    if (amount <= getBalance()) {
      // Call the withdraw method of the superclass BankAccount with amount
      super.withdraw(amount);
    } else {
      // Print "Overdraft fee applied." to the console if the amount exceeds the current balance
      System.out.println("Overdraft fee applied.");
      // Call the withdraw method of the superclass BankAccount with the amount plus the overdraft fee
      super.withdraw(amount + overdraftFee);
    }
  }
} 
