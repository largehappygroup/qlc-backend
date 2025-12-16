// Song.java
// Define the Song class
public class Song {

    // Private fields to store the title and artist of the song
    private String title;
    private String artist;

    // Constructor to initialize the title and artist fields
    public Song(String title, String artist) {
        this.title = title;  // Set the title field to the provided title
        this.artist = artist;  // Set the artist field to the provided artist
    }

    // Getter method to retrieve the title of the song
    public String getTitle() {
        return title;  // Return the value of the title field
    }

    // Setter method to update the title of the song
    public void setTitle(String title) {
        this.title = title;  // Set the title field to the provided title
    }

    // Getter method to retrieve the artist of the song
    public String getArtist() {
        return artist;  // Return the value of the artist field
    }

    // Setter method to update the artist of the song
    public void setArtist(String artist) {
        this.artist = artist;  // Set the artist field to the provided artist
    }
}
