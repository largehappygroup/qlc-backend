// Flight.java
// Define the Flight class
public class Flight {
    // Declare an integer variable to store the flight number
    private int flightNumber;
    // Declare a string variable to store the passenger name
    private String passengerName;
    // Declare a string variable to store the origin of the flight
    private String origin;
    // Declare a string variable to store the destination of the flight
    private String destination;
    // Declare a string variable to store the date of the flight
    private String date;
    // Declare an integer variable to store the number of passengers
    private int numPassengers;
    // Declare a double variable to store the price of the flight
    private double price;
    // Declare an integer variable to store the confirmation number
    private int confirmationNumber;

    // Constructor to initialize the Flight object with provided details
    public Flight(int flightNumber, String passengerName, String origin, String destination, String date, int numPassengers, double price) {
        // Initialize the flight number
        this.flightNumber = flightNumber;
        // Initialize the passenger name
        this.passengerName = passengerName;
        // Initialize the origin of the flight
        this.origin = origin;
        // Initialize the destination of the flight
        this.destination = destination;
        // Initialize the date of the flight
        this.date = date;
        // Initialize the number of passengers
        this.numPassengers = numPassengers;
        // Initialize the price of the flight
        this.price = price;
    }

    // Method to get the flight number
    public int getFlightNumber() {
        return flightNumber;
    }

    // Method to get the passenger name
    public String getPassengerName() {
        return passengerName;
    }

    // Method to get the origin of the flight
    public String getOrigin() {
        return origin;
    }

    // Method to get the destination of the flight
    public String getDestination() {
        return destination;
    }

    // Method to get the date of the flight
    public String getDate() {
        return date;
    }

    // Method to get the number of passengers
    public int getNumPassengers() {
        return numPassengers;
    }

    // Method to get the price of the flight
    public double getPrice() {
        return price;
    }

    // Method to get the confirmation number
    public int getConfirmationNumber() {
        return confirmationNumber;
    }

    // Method to set the confirmation number
    public void setConfirmationNumber(int confirmationNumber) {
        this.confirmationNumber = confirmationNumber;
    }
} 
