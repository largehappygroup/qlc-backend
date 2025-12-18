// Truck.java
// Child class Truck

// Declare the Truck class which extends the Vehicle class
public class Truck extends Vehicle {
    
    // Private instance variable for the cargo capacity of the truck
    private double cargoCapacity;

    // Constructor for the Truck class, taking make, model, year, fuel type, fuel efficiency, and cargo capacity as parameters
    public Truck(String make, String model, int year, String fuelType, double fuelEfficiency, double cargoCapacity) {
        // Call the constructor of the superclass (Vehicle) with make, model, year, fuel type, and fuel efficiency
        super(make, model, year, fuelType, fuelEfficiency);
        // Initialize the cargoCapacity instance variable
        this.cargoCapacity = cargoCapacity;
    }
   
    // Public method to get the cargo capacity of the truck
    public double getCargoCapacity() {
        return cargoCapacity;
    }

    // Override the calculateFuelEfficiency method from the superclass (Vehicle)
    @Override
    public double calculateFuelEfficiency() {
        // Implementation for fuel efficiency calculation for trucks
        return getFuelEfficiency() * (1.0 / (1.0 + (getCargoCapacity() / 1000.0)));
    }

    // Override the calculateDistanceTraveled method from the superclass (Vehicle)
    @Override
    public double calculateDistanceTraveled() {
        // Implementation for distance traveled calculation for trucks
        return calculateFuelEfficiency() * getFuelEfficiency();
    }

    // Override the getMaxSpeed method from the superclass (Vehicle)
    @Override
    public double getMaxSpeed() {
        // Implementation for maximum speed calculation for trucks
        return 80.0;
    }
}
