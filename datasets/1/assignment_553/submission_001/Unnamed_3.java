// Motorcycle.java
// Define the Motorcycle class that extends Vehicle
class Motorcycle extends Vehicle {
  // Override the startEngine method
  @Override
  public void startEngine() {
    // Print that the motorcycle engine started with a kick-start
    System.out.println("Motorcycle engine started with a kick-start.");
  }

  // Override the stopEngine method
  @Override
  public void stopEngine() {
    // Print that the motorcycle engine stopped when ignition was turned off
    System.out.println("Motorcycle engine stopped when ignition was turned off.");
  }
} 
