import java.util.ArrayList;
import java.util.Date;
import java.util.List;

// Main class to test the Event, Seminar, and MusicalPerformance classes
public class Main {
    public static void main(String[] args) {
        
		// Create different dates to avoid conflict
		// Create a date for testing
        Date date = new Date();

        // Create an instance of Seminar
        Seminar seminar = new Seminar("Space Conference", date, "Convention Center", 5);

        // Create an instance of MusicalPerformance
        List performers = new ArrayList<>();
        performers.add("Band A");
        performers.add("Band B");
        MusicalPerformance concert = new MusicalPerformance("Winter Fest", date, "Convention Center", performers);

        // Display details of the seminar
        System.out.println("Seminar Details:");
        seminar.displayDetails();

        // Display details of the musical performance
        System.out.println("\nMusical Performance Details:");
        concert.displayDetails();

        // Check for scheduling conflict
        if (seminar.isConflict(concert)) {
            System.out.println("\nConflict detected: Both events are scheduled at the same time and location.");
        } else {
            System.out.println("\nNo conflict: Events are scheduled at different times or locations.");
        }
    }
}
