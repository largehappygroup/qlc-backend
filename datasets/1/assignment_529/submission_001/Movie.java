// Movie.java

// Import the ArrayList class from the Java utility package
import java.util.ArrayList;

// Define the Movie class
public class Movie {

    // Private fields to store the title, director, actors, and reviews of the movie
    private String title;
    private String director;
    private ArrayList<String> actors;
    private ArrayList<Review> reviews;

    // Constructor to initialize the title, director, and actors of the movie
    public Movie(String title, String director, ArrayList<String> actors) {
        this.title = title; // Set the title field to the provided title
        this.director = director; // Set the director field to the provided director
        this.actors = actors; // Set the actors field to the provided list of actors
        this.reviews = new ArrayList<Review>(); // Initialize the reviews list as an empty ArrayList
    }

    // Method to add a review to the movie
    public void addReview(Review review) {
        this.reviews.add(review); // Add the provided review to the reviews list
    }

    // Method to get the list of all reviews for the movie
    public ArrayList<Review> getReviews() {
        return this.reviews; // Return the list of reviews
    }

    // Method to get the title of the movie
    public String getTitle() {
        return this.title; // Return the value of the title field
    }

    // Method to get the director of the movie
    public String getDirector() {
        return this.director; // Return the value of the director field
    }

    // Method to get the list of actors in the movie
    public ArrayList<String> getActors() {
        return this.actors; // Return the list of actors
    }
}
