// MusicLibrary.java
// Import the ArrayList class from the Java utility package
import java.util.ArrayList;
// Import the Random class from the Java utility package
import java.util.Random;

// Define the MusicLibrary class
public class MusicLibrary {

    // Declare a private field to store a list of Song objects
    private ArrayList<Song> songs;

    // Constructor to initialize the songs list
    public MusicLibrary() {
        // Create a new ArrayList to hold Song objects
        songs = new ArrayList<Song>();
    }

    // Method to add a song to the library
    public void addSong(Song song) {
        // Add the provided song to the songs list
        songs.add(song);
    }

    // Method to remove a song from the library
    public void removeSong(Song song) {
        // Remove the provided song from the songs list
        songs.remove(song);
    }

    // Method to get the list of all songs in the library
    public ArrayList<Song> getSongs() {
        // Return the list of songs
        return songs;
    }

    // Method to play a random song from the library
    public void playRandomSong() {
        // Get the number of songs in the library
        int size = songs.size();

        // Check if the library is empty
        if (size == 0) {
            // Print a message if there are no songs to play
            System.out.println("No songs in the library.");
            return; // Exit the method
        }

        // Create a new Random object to generate a random number
        Random rand = new Random();

        // Generate a random index within the range of the songs list
        int index = rand.nextInt(size);

        // Print the title and artist of the randomly selected song
        System.out.println("Now playing: " + songs.get(index).getTitle() + " by " + songs.get(index).getArtist());
    }
}
