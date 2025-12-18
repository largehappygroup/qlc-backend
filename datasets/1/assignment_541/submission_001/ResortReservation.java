// Import necessary classes for date handling
import java.time.LocalDate;
// Define the ResortReservation subclass that extends Reservation
public class ResortReservation extends Reservation {
    // Additional attribute for the room number
    private int roomNumber;

    // Constructor to initialize the ResortReservation object
    public ResortReservation(String reservationId, String customerName, LocalDate date, int roomNumber) {
        super(reservationId, customerName, date); // Call the superclass constructor
        this.roomNumber = roomNumber;
    }

    // Method to check reservation status including room number
    @Override
    public void checkReservationStatus() {
        super.checkReservationStatus(); // Call the superclass method
        System.out.println("Room Number: " + roomNumber);
    }

    // Method to modify reservation details including room number
    public void modifyReservation(String newCustomerName, LocalDate newDate, int newRoomNumber) {
        super.modifyReservation(newCustomerName, newDate); // Call the superclass method
        this.roomNumber = newRoomNumber;
        System.out.println("Room Number updated successfully.");
    }

    // Getter for the room number
    public int getRoomNumber() {
        return roomNumber;
    }
}
