// Import the LocalTime class from the java.time package
import java.time.LocalTime;

// Define the Main class
public class Main {
  // Main method, entry point of the program
  public static void main(String[] args) {
    // Create a new Airplane object with flight number "CDE345", destination "London", and departure time 10:30
    Airplane flight1 = new Airplane("CDE345", "London", LocalTime.of(10, 30));
    // Create a new Airplane object with flight number "KUI765", destination "New York", and departure time 14:00
    Airplane flight2 = new Airplane("KUI765", "New York", LocalTime.of(14, 0));
    // Create a new Airplane object with flight number "JUY456", destination "Paris", and departure time 14:00
    Airplane flight3 = new Airplane("JUY456", "Paris", LocalTime.of(14, 0));
    // Print the initial flight status
    System.out.println("Flight Status:");
    // Check and print the status of flight1
    flight1.checkStatus();
    // Check and print the status of flight2
    flight2.checkStatus();
    // Check and print the status of flight3
    flight3.checkStatus();
    // Delay flight1 by 40 minutes
    flight1.delay(40);
    // Delay flight2 by 110 minutes
    flight2.delay(110);
    // Print the current flight status after delays
    System.out.println("\nCurrent Flight Status:");
    // Check and print the status of flight1
    flight1.checkStatus();
    // Check and print the status of flight2
    flight2.checkStatus();
    // Check and print the status of flight3
    flight3.checkStatus();
  }
}
