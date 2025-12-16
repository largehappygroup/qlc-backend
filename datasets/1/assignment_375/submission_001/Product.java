// Define the Product class
public class Product {
    // Private instance variables
    private String productName;
    private String productCode;
    private double price;

    // Public getter for the productName variable
    public String getProductName() {
        return productName;
    }

    // Public setter for the productName variable
    public void setProductName(String productName) {
        this.productName = productName;
    }

    // Public getter for the productCode variable
    public String getProductCode() {
        return productCode;
    }

    // Public setter for the productCode variable
    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    // Public getter for the price variable
    public double getPrice() {
        return price;
    }

    // Public setter for the price variable
    public void setPrice(double price) {
        this.price = price;
    }

    // Method to apply a discount percentage to the price
    public void applyDiscount(double percentage) {
        if (percentage > 0 && percentage <= 100) {
            this.price -= this.price * (percentage / 100);
        }
    } 
}
