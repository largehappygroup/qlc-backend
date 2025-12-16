// Main.java
// Define the Main class
public class Main {
  // Main method, program entry point
  public static void main(String[] args) {
    // Create a Vehicle reference to a Car object
    Vehicle car = new Car();
    // Create a Vehicle reference to a Motorcycle object
    Vehicle motorcycle = new Motorcycle();

    // Start and stop the engine for the car
    startAndStopEngine(car);
    // Start and stop the engine for the motorcycle
    startAndStopEngine(motorcycle);
  }

  // Method to start and stop the engine of a given vehicle
  public static void startAndStopEngine(Vehicle vehicle) {
    // Start the engine of the vehicle
    vehicle.startEngine();
    // Stop the engine of the vehicle
    vehicle.stopEngine();
  }
} 
