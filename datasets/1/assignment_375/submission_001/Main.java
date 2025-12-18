public class Main {
      // Main method to test the Product class
    public static void main(String[] args) {
        // Create a new Product object
        Product product = new Product();

        // Set the product name, code, and initial price
        product.setProductName("Laptop");
        product.setProductCode("LT01233");
        product.setPrice(1100.00);

        // Apply a 8% discount to the product
        product.applyDiscount(8);

        // Print the details of the product
        System.out.println("Product Name: " + product.getProductName());
        System.out.println("Product Code: " + product.getProductCode());
        System.out.println("Price after discount: $" + product.getPrice());
    }
 }
