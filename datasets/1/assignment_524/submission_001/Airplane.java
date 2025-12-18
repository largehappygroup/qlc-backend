// Airplane.java
// Import the LocalTime class from the java.time package
import java.time.LocalTime;

// Define the Airplane class
public class Airplane {
  // Private field to store the flight number
  private String flightNumber;
  // Private field to store the destination
  private String destination;
  // Private field to store the scheduled departure time
  private LocalTime scheduledDeparture;
  // Private field to store the delay time in minutes
  private int delayTime;

  // Constructor to initialize the flight number, destination, and scheduled departure time
  public Airplane(String flightNumber, String destination, LocalTime scheduledDeparture) {
    // Assign the flight number parameter to the flightNumber field
    this.flightNumber = flightNumber;
    // Assign the destination parameter to the destination field
    this.destination = destination;
    // Assign the scheduled departure time parameter to the scheduledDeparture field
    this.scheduledDeparture = scheduledDeparture;
    // Initialize the delay time to 0
    this.delayTime = 0;
  }

  // Getter method for the flight number
  public String getFlightNumber() {
    // Return the value of the flightNumber field
    return flightNumber;
  }

  // Setter method for the flight number
  public void setFlightNumber(String flightNumber) {
    // Assign the flight number parameter to the flightNumber field
    this.flightNumber = flightNumber;
  }

  // Getter method for the destination
  public String getDestination() {
    // Return the value of the destination field
    return destination;
  }

  // Setter method for the destination
  public void setDestination(String destination) {
    // Assign the destination parameter to the destination field
    this.destination = destination;
  }

  // Getter method for the scheduled departure time
  public LocalTime getScheduledDeparture() {
    // Return the value of the scheduledDeparture field
    return scheduledDeparture;
  }

  // Setter method for the scheduled departure time
  public void setScheduledDeparture(LocalTime scheduledDeparture) {
    // Assign the scheduled departure time parameter to the scheduledDeparture field
    this.scheduledDeparture = scheduledDeparture;
  }

  // Getter method for the delay time
  public int getDelayTime() {
    // Return the value of the delayTime field
    return delayTime;
  }

  // Method to set a delay and update the scheduled departure time
  public void delay(int minutes) {
    // Assign the delay time parameter to the delayTime field
    this.delayTime = minutes;
    // Update the scheduled departure time by adding the delay time
    this.scheduledDeparture = this.scheduledDeparture.plusMinutes(minutes);
  }

  // Method to check the status of the flight
  public void checkStatus() {
    // Check if there is no delay
    if (delayTime == 0) {
      // Print a message indicating the flight is on time
      System.out.println("Flight " + flightNumber + " is on time.");
    } else {
      // Print a message indicating the flight is delayed
      System.out.println("Flight " + flightNumber + " is delayed by " + delayTime + " minutes.");
    }
  }
} 
