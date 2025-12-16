// Main.java
// Main class

// Declare the Main class
public class Main {
    
    // Main method to execute the program
    public static void main(String[] args) {

        // Create an instance of the Truck class with make, model, year, fuel type, fuel efficiency, and cargo capacity
        Truck truck = new Truck("Tatra", "Tatra 810 4x4", 2020, "GASOLINE", 8.112, 4.5);

        // Create an instance of the Car class with make, model, year, fuel type, fuel efficiency, and number of seats
        Car car = new Car("Volkswagen", "Virtus", 2019, "HYBRID", 6.123, 8);

        // Create an instance of the Motorcycle class with make, model, year, fuel type, and fuel efficiency
        Motorcycle motorcycle = new Motorcycle("Massimo Motor", "Warrior200", 2018, "GASOLINE", 2.1);

        // Print the truck's model
        System.out.println("Truck Model: " + truck.getModel());
        // Print the truck's calculated fuel efficiency
        System.out.println("Fuel Efficiency: " + truck.calculateFuelEfficiency() + " mpg");
        // Print the truck's calculated distance traveled
        System.out.println("Distance Traveled: " + truck.calculateDistanceTraveled() + " miles");
        // Print the truck's maximum speed
        System.out.println("Max Speed: " + truck.getMaxSpeed() + " mph\n");

        // Print the car's model
        System.out.println("Car Model: " + car.getModel());
        // Print the car's calculated fuel efficiency
        System.out.println("Fuel Efficiency: " + car.calculateFuelEfficiency() + " mpg");
        // Print the car's calculated distance traveled
        System.out.println("Distance Traveled: " + car.calculateDistanceTraveled() + " miles");
        // Print the car's maximum speed
        System.out.println("Max Speed: " + car.getMaxSpeed() + " mph\n");

        // Print the motorcycle's model
        System.out.println("Motorcycle Model: " + motorcycle.getModel());
        // Print the motorcycle's calculated fuel efficiency
        System.out.println("Fuel Efficiency: " + motorcycle.calculateFuelEfficiency() + " mpg");
        // Print the motorcycle's calculated distance traveled
        System.out.println("Distance Traveled: " + motorcycle.calculateDistanceTraveled() + " miles");
        // Print the motorcycle's maximum speed
        System.out.println("Max Speed: " + motorcycle.getMaxSpeed() + " mph");
    }
}
