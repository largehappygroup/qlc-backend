// Main.java
// Import the ArrayList and Arrays classes from the Java utility package
import java.util.ArrayList;
import java.util.Arrays;

// Define the Main class
public class Main {
  
  // The main method - the entry point of the Java application
  public static void main(String[] args) {
    
    // Create a movie object for "Titanic"
    Movie movie1 = new Movie("Titanic", "James Cameron",
      new ArrayList(Arrays.asList("Leonardo DiCaprio", "Kate Winslet")));

    // Create review objects
    Review review1 = new Review("Great movie!", "Irvine Rolf", 4.5);
    Review review2 = new Review("Highly recommended!", "Ashkii Karlheinz", 4.5);
    Review review3 = new Review("A classic that never gets old.", "Nele Athol", 4.0);
    Review review4 = new Review("Great movie!", "Cipactli Anselma", 4.0);
    Review review5 = new Review("Highly recommended!", "Martin Nadine", 4.0);

    // Add reviews to movie1
    movie1.addReview(review1);
    movie1.addReview(review2);
    movie1.addReview(review3);
    movie1.addReview(review4);

    // Create a movie object for "The Godfather"
    Movie movie2 = new Movie("The Godfather", "Francis Ford Coppola",
      new ArrayList(Arrays.asList("Marlon Brando", "Al Pacino", "James Caan")));

    // Display all the reviews for "Titanic"
    System.out.println("\nReviews for '" + movie1.getTitle() + "':");
    for (Review review : movie1.getReviews()) {
      System.out.println(review.getReviewText() + " by " + review.getReviewerName() + " - " + review.getRating());
    }

    // Add reviews to movie2
    movie2.addReview(review1);
    movie2.addReview(review4);
    movie2.addReview(review5);

    // Display all the reviews for "The Godfather"
    System.out.println("\nReviews for '" + movie2.getTitle() + "':");
    for (Review review : movie2.getReviews()) {
      System.out.println(review.getReviewText() + " by " + review.getReviewerName() + " - " + review.getRating());
    }
  }
}
