// Main.java
// Define the Main class
public class Main {
  // Main method, the entry point of the application
  public static void main(String[] args) {
    // Create a new Restaurant object
    Restaurant restaurant = new Restaurant();
    // Add a Burger item with a price of $8.99 to the menu
    restaurant.addItem("Burger", 8.99);
    // Add a Pizza item with a price of $10.99 to the menu
    restaurant.addItem("Pizza", 10.99);
    // Add a Salad item with a price of $6.00 to the menu
    restaurant.addItem("Salad", 6.00);

    // Print the menu header
    System.out.println("Menu: Item & Price");
    // Display the menu items and their prices
    restaurant.displayMenu();

    // Add a rating of 4 to the Burger item
    restaurant.addRating("Burger", 4);
    // Add a rating of 5 to the Burger item
    restaurant.addRating("Burger", 5);
    // Add a rating of 3 to the Pizza item
    restaurant.addRating("Pizza", 3);
    // Add a rating of 4 to the Pizza item
    restaurant.addRating("Pizza", 4);
    // Add a rating of 2 to the Salad item
    restaurant.addRating("Salad", 2);

    // Get the average rating for the Burger item
    double averageRating = restaurant.getAverageRating("Burger");
    // Print the average rating for the Burger item
    System.out.println("\nAverage rating for Burger: " + averageRating);
    // Get the average rating for the Pizza item
    averageRating = restaurant.getAverageRating("Pizza");
    // Print the average rating for the Pizza item
    System.out.println("Average rating for Pizza: " + averageRating);
    // Get the average rating for the Salad item
    averageRating = restaurant.getAverageRating("Salad");
    // Print the average rating for the Salad item
    System.out.println("Average rating for Salad: " + averageRating);
    // Print the overall average rating for all items
    System.out.println("Average rating: " + restaurant.calculateAverageRating());

    // Print a message indicating that the Pizza item will be removed
    System.out.println("\nRemove 'Pizza' from the above menu.");
    // Remove the Pizza item from the menu
    restaurant.removeItem("Pizza");
    // Print the updated menu header
    System.out.println("\nUpdated menu:");
    // Display the updated menu items and their prices
    restaurant.displayMenu();
  }
}
