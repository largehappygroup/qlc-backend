// Main.java
// Main class

// Declare the Main class
public class Main {
    // Main method which is the entry point of the program
    public static void main(String[] args) {
        // Create an instance of the Car class
        Car car = new Car();
        // Create an instance of the Motorcycle class
        Motorcycle motorcycle = new Motorcycle();

        // Print the initial speed of the car
        System.out.println("Car initial speed: " + car.getSpeed());
        // Print the initial speed of the motorcycle
        System.out.println("Motorcycle initial speed: " + motorcycle.getSpeed());

        // Speed up the car
        car.speedUp();
        // Speed up the motorcycle
        motorcycle.speedUp();

        // Print the speed of the car after speeding up
        System.out.println("\nCar speed after speeding up: " + car.getSpeed());
        // Print the speed of the motorcycle after speeding up
        System.out.println("Motorcycle speed after speeding up: " + motorcycle.getSpeed());
    }
} 
