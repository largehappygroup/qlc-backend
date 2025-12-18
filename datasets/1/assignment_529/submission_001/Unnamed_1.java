// Review.java

// Define the Review class
class Review {

    // Private fields to store the review text, reviewer name, and rating
    private String reviewText;
    private String reviewerName;
    private double rating;

    // Constructor to initialize the review text, reviewer name, and rating
    public Review(String reviewText, String reviewerName, double rating) {
        this.reviewText = reviewText; // Set the reviewText field to the provided review text
        this.reviewerName = reviewerName; // Set the reviewerName field to the provided reviewer name
        this.rating = rating; // Set the rating field to the provided rating
    }

    // Method to get the review text
    public String getReviewText() {
        return reviewText; // Return the value of the reviewText field
    }

    // Method to get the reviewer name
    public String getReviewerName() {
        return reviewerName; // Return the value of the reviewerName field
    }

    // Method to get the rating
    public double getRating() {
        return rating; // Return the value of the rating field
    }
} 
