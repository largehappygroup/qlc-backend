// Inventory.java
// Import the ArrayList class from the java.util package
import java.util.ArrayList;

// Define the Inventory class
public class Inventory {
  // Private field to store a list of Product objects
  private ArrayList<Product> products;

  // Constructor to initialize the products field
  public Inventory() {
    // Create a new ArrayList to hold Product objects
    products = new ArrayList<Product>();
  }

  // Method to add a Product to the products list
  public void addProduct(Product product) {
    // Add the specified product to the products list
    products.add(product);
  }

  // Method to remove a Product from the products list
  public void removeProduct(Product product) {
    // Remove the specified product from the products list
    products.remove(product);
  }

  // Method to check for low inventory products
  public void checkLowInventory() {
    // Iterate through the list of products
    for (Product product : products) {
      // Check if the product quantity is less than or equal to 100
      if (product.getQuantity() <= 100) {
        // Print a message indicating the product is running low on inventory
        System.out.println(product.getName() + " is running low on inventory. Current quantity: " + product.getQuantity());
      }
    }
  }
}
