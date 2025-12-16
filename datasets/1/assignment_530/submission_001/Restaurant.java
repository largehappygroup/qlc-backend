// Restaurant.java
// Import the ArrayList class
import java.util.ArrayList;

// Define the Restaurant class
public class Restaurant {
  // Declare ArrayLists to store menu items, prices, ratings, and item counts
  private ArrayList menuItems;
  private ArrayList prices;
  private ArrayList ratings;
  private ArrayList itemCounts;

  // Constructor to initialize the ArrayLists
  public Restaurant() {
    // Initialize the menuItems ArrayList
    this.menuItems = new ArrayList();
    // Initialize the prices ArrayList
    this.prices = new ArrayList();
    // Initialize the ratings ArrayList
    this.ratings = new ArrayList();
    // Initialize the itemCounts ArrayList
    this.itemCounts = new ArrayList();
  }

  // Method to add an item to the menu
  public void addItem(String item, double price) {
    // Add the item to the menuItems ArrayList
    this.menuItems.add(item);
    // Add the price to the prices ArrayList
    this.prices.add(price);
    // Initialize the rating for the item to 0
    this.ratings.add(0);
    // Initialize the item count for the item to 0
    this.itemCounts.add(0);
  }

  // Method to remove an item from the menu
  public void removeItem(String item) {
    // Get the index of the item in the menuItems ArrayList
    int index = this.menuItems.indexOf(item);
    // If the item exists in the menu
    if (index >= 0) {
      // Remove the item from the menuItems ArrayList
      this.menuItems.remove(index);
      // Remove the corresponding price from the prices ArrayList
      this.prices.remove(index);
      // Remove the corresponding rating from the ratings ArrayList
      this.ratings.remove(index);
      // Remove the corresponding item count from the itemCounts ArrayList
      this.itemCounts.remove(index);
    }
  }

  // Method to add a rating to an item
  public void addRating(String item, int rating) {
    // Get the index of the item in the menuItems ArrayList
    int index = this.menuItems.indexOf(item);
    // If the item exists in the menu
    if (index >= 0) {
      // Get the current rating of the item
      int currentRating = this.ratings.get(index);
      // Get the current item count of the item
      int totalCount = this.itemCounts.get(index);
      // Update the rating of the item
      this.ratings.set(index, currentRating + rating);
      // Update the item count of the item
      this.itemCounts.set(index, totalCount + 1);
    }
  }

  // Method to get the average rating of an item
  public double getAverageRating(String item) {
    // Get the index of the item in the menuItems ArrayList
    int index = this.menuItems.indexOf(item);
    // If the item exists in the menu
    if (index >= 0) {
      // Get the total rating of the item
      int totalRating = this.ratings.get(index);
      // Get the item count of the item
      int itemCount = this.itemCounts.get(index);
      // Calculate and return the average rating of the item
      return itemCount > 0 ? (double) totalRating / itemCount : 0.0;
    } else {
      // Return 0.0 if the item does not exist in the menu
      return 0.0;
    }
  }

  // Method to display the menu
  public void displayMenu() {
    // Loop through the menuItems ArrayList
    for (int i = 0; i < menuItems.size(); i++) {
      // Print the item and its price
      System.out.println(menuItems.get(i) + ": $" + prices.get(i));
    }
  }

  // Method to calculate the average rating of all items
  public double calculateAverageRating() {
    // Initialize totalRating to 0
    double totalRating = 0;
    // Initialize numRatings to 0
    int numRatings = 0;
    // Loop through the ratings ArrayList
    for (int i = 0; i < ratings.size(); i++) {
      // Add the rating to totalRating
      totalRating += ratings.get(i);
      // Increment numRatings
      numRatings++;
    }
    // Calculate and return the average rating
    return numRatings > 0 ? totalRating / numRatings : 0.0;
  }
}
