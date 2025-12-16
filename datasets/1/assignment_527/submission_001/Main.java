// Main.java
// Import the ArrayList class from the Java utility package
import java.util.ArrayList;

// Define the Main class
public class Main {

    // The main method - the entry point of the Java application
    public static void main(String[] args) {

        // Create a new instance of the MusicLibrary class
        MusicLibrary library = new MusicLibrary();

        // Add songs to the music library
        library.addSong(new Song("Midnight Train to Georgia", "Gladys Knight & the Pips"));
        library.addSong(new Song("Stairway to Heaven", "Led Zeppelin"));
        library.addSong(new Song("Imagine", "John Lennon"));
        library.addSong(new Song("All by Myself", "Eric Carmen"));
        library.addSong(new Song("What'd I Say", "Ray Charles"));
        library.addSong(new Song("Walking in Memphis", "Marc Cohn"));
        library.addSong(new Song("In the Air Tonight", "Phil Collins"));

        // Print all songs in the music library
        System.out.println("All songs:");

        // Iterate through each song in the library and print its title and artist
        for (Song song : library.getSongs()) {
            System.out.println(song.getTitle() + " by " + song.getArtist());
        }

        // Print a message indicating a random song will be played
        System.out.println("\n**Playing Random Song**");

        // Play and print a random song from the library three times
        library.playRandomSong();
        System.out.println();
        library.playRandomSong();
        System.out.println();
        library.playRandomSong();
    }
}
