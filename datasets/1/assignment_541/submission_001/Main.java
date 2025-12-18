// Import necessary classes for date handling
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        // Create a ResortReservation object
        ResortReservation resortReservation = new ResortReservation("RSV001", "Celestino Aspasia", LocalDate.now(), 101);
        // Display the resort reservation details and status
        resortReservation.checkReservationStatus();
        System.out.println();
        
        // Modify the resort reservation details
        resortReservation.modifyReservation("Celestino Aspasia", LocalDate.of(2024, 6, 15), 102);
        resortReservation.checkReservationStatus();
        System.out.println();

        // Create a RailwayReservation object
        RailwayReservation railwayReservation = new RailwayReservation("RSV002", "John Paul Pythios", LocalDate.now(), 22);
        // Display the railway reservation details and status
        railwayReservation.checkReservationStatus();
        System.out.println();
        
        // Modify the railway reservation details
        railwayReservation.modifyReservation("Bob Smith", LocalDate.of(2024, 6, 20), 23);
        railwayReservation.checkReservationStatus();
    }
}
