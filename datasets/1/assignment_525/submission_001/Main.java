// Main.java
// Define the Main class
public class Main {
  // Main method, entry point of the program
  public static void main(String[] args) {
    // Create a new instance of the Inventory class
    Inventory inventory = new Inventory();
    
    // Create new Product objects with name and quantity
    Product product1 = new Product("LED TV", 200);
    Product product2 = new Product("Mobile", 80);
    Product product3 = new Product("Tablet", 50);
    
    // Print a message indicating products are being added to the inventory
    System.out.println("Add three products in inventory:");
    
    // Add the products to the inventory
    inventory.addProduct(product1);
    inventory.addProduct(product2);
    inventory.addProduct(product3);
    
    // Print a message indicating low inventory check
    System.out.println("\nCheck low inventory:");
    
    // Check and print products with low inventory
    inventory.checkLowInventory();
    
    // Print a message indicating a product is being removed from the inventory
    System.out.println("\nRemove Tablet from the inventory!");
    
    // Remove the Tablet product from the inventory
    inventory.removeProduct(product3);
    
    // Print a message indicating another low inventory check
    System.out.println("\nAgain check low inventory:");
    
    // Check and print products with low inventory again
    inventory.checkLowInventory();
  }
}
