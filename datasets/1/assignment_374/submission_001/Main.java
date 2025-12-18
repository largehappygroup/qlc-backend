public class Main {
    // Main method to test the Movie class
    public static void main(String[] args) {
        // Create a new Movie object
        Movie movie = new Movie();

        // Set the title, director, and duration of the movie
        movie.setTitle("Arrival");
        movie.setDirector("Christopher Nolan");
        movie.setDuration(146);

        // Print the details of the movie
        System.out.println(movie.getMovieDetails());
    }
 }
