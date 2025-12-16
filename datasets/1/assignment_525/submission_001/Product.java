// Product.java
// Define the Product class
public class Product {
  // Private field to store the name of the product
  private String name;
  // Private field to store the quantity of the product
  private int quantity;

  // Constructor to initialize the name and quantity of the product
  public Product(String name, int quantity) {
    // Assign the name parameter to the name field
    this.name = name;
    // Assign the quantity parameter to the quantity field
    this.quantity = quantity;
  }

  // Getter method for the name field
  public String getName() {
    // Return the value of the name field
    return name;
  }

  // Setter method for the name field
  public void setName(String name) {
    // Assign the name parameter to the name field
    this.name = name;
  }

  // Getter method for the quantity field
  public int getQuantity() {
    // Return the value of the quantity field
    return quantity;
  }

  // Setter method for the quantity field
  public void setQuantity(int quantity) {
    // Assign the quantity parameter to the quantity field
    this.quantity = quantity;
  }
}
