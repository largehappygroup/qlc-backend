// Import necessary classes for date handling
import java.time.LocalDate;

// Define the Reservation class
public class Reservation {
    // Attributes for reservation ID, customer name, and date
    private String reservationId;
    private String customerName;
    private LocalDate date;

    // Constructor to initialize the Reservation object
    public Reservation(String reservationId, String customerName, LocalDate date) {
        this.reservationId = reservationId;
        this.customerName = customerName;
        this.date = date;
    }

    // Method to check reservation status
    public void checkReservationStatus() {
        System.out.println("Reservation ID: " + reservationId);
        System.out.println("Customer Name: " + customerName);
        System.out.println("Date: " + date);
        System.out.println("Status: Confirmed");
    }

    // Method to modify reservation details
    public void modifyReservation(String newCustomerName, LocalDate newDate) {
        this.customerName = newCustomerName;
        this.date = newDate;
        System.out.println("Reservation modified successfully.");
    }

    // Getters for the attributes
    public String getReservationId() {
        return reservationId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public LocalDate getDate() {
        return date;
    }
}
