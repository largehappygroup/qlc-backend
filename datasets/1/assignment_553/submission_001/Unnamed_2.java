// Car.java
// Define the Car class that extends Vehicle
class Car extends Vehicle {
  // Override the startEngine method
  @Override
  public void startEngine() {
    // Print that the car engine started with a key
    System.out.println("Car engine started with a key.");
  }

  // Override the stopEngine method
  @Override
  public void stopEngine() {
    // Print that the car engine stopped when the key was turned off
    System.out.println("Car engine stopped when the key was turned off.");
  }
} 
