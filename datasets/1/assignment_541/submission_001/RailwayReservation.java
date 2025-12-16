// Import necessary classes for date handling
import java.time.LocalDate;
// Define the RailwayReservation subclass that extends Reservation
public class RailwayReservation extends Reservation {
    // Additional attribute for the seat number
    private int seatNumber;

    // Constructor to initialize the RailwayReservation object
    public RailwayReservation(String reservationId, String customerName, LocalDate date, int seatNumber) {
        super(reservationId, customerName, date); // Call the superclass constructor
        this.seatNumber = seatNumber;
    }

    // Method to check reservation status including seat number
    @Override
    public void checkReservationStatus() {
        super.checkReservationStatus(); // Call the superclass method
        System.out.println("Seat Number: " + seatNumber);
    }

    // Method to modify reservation details including seat number
    public void modifyReservation(String newCustomerName, LocalDate newDate, int newSeatNumber) {
        super.modifyReservation(newCustomerName, newDate); // Call the superclass method
        this.seatNumber = newSeatNumber;
        System.out.println("Seat Number updated successfully.");
    }

    // Getter for the seat number
    public int getSeatNumber() {
        return seatNumber;
    }
}
