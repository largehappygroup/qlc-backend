// Define the Customer class
// Import necessary classes
import java.util.ArrayList;
import java.util.List;
public class Customer {
    // Attributes for the customer's name, email, and purchase history
    private String name;
    private String email;
    private List<Double> purchaseHistory;

    // Constructor to initialize the customer's name and email
    public Customer(String name, String email) {
        this.name = name;
        this.email = email;
        this.purchaseHistory = new ArrayList<>();  // Initialize purchase history as an empty list
    }

    // Method to add a purchase to the purchase history
    public void addPurchase(double amount) {
        purchaseHistory.add(amount);
    }

    // Method to calculate the total expenditure
    public double calculateTotalExpenditure() {
        double total = 0;
        // Loop through each purchase and sum up the amounts
        for (double purchase : purchaseHistory) {
            total += purchase;
        }
        return total;
    }

    // Getters for the name and email attributes
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    // Getter for the purchase history
    public List<Double> getPurchaseHistory() {
        return purchaseHistory;
    }
}

