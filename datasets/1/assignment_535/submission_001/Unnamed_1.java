// Define the LoyalCustomer subclass that extends the Customer class
// Import necessary classes
import java.util.ArrayList;
import java.util.List;
class LoyalCustomer extends Customer {
    // Attribute for the discount rate
    private double discountRate;

    // Constructor to initialize the LoyalCustomer with name, email, and discount rate
    public LoyalCustomer(String name, String email, double discountRate) {
        super(name, email);  // Call the superclass constructor
        this.discountRate = discountRate;
    }

    // Method to apply the discount to a given amount
    public double applyDiscount(double amount) {
        return amount - (amount * discountRate / 100);
    }

    // Override the addPurchase method to apply the discount before adding the purchase
    @Override
    public void addPurchase(double amount) {
        double discountedAmount = applyDiscount(amount);
        super.addPurchase(discountedAmount);  // Call the superclass method to add the discounted amount
    }

    // Getter for the discount rate
    public double getDiscountRate() {
        return discountRate;
    }

    // Setter for the discount rate
    public void setDiscountRate(double discountRate) {
        this.discountRate = discountRate;
    }
}
