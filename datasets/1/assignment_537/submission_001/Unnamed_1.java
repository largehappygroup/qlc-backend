// Define the WashingMachine subclass that extends ElectronicsProduct
class WashingMachine extends ElectronicsProduct {
    // Additional attribute for the warranty period
    private int warrantyPeriod; // in months

    // Constructor to initialize the WashingMachine object
    public WashingMachine(String productId, String name, double price, int warrantyPeriod) {
        // Call the superclass constructor to initialize common attributes
        super(productId, name, price);
        this.warrantyPeriod = warrantyPeriod;
    }

    // Method to extend the warranty period
    public void extendWarranty(int additionalMonths) {
        // Add the additional months to the current warranty period
        warrantyPeriod += additionalMonths;
    }

    // Getter for warranty period
    public int getWarrantyPeriod() {
        return warrantyPeriod;
    }

    // Override the display method to include warranty period
    @Override
    public void applyDiscount(double discountPercentage) {
        // Call the superclass method to apply the discount
        super.applyDiscount(discountPercentage);
        // Display a message indicating the discount was applied
        System.out.println("Discount applied to Washing Machine: " + getName());
    }
}
