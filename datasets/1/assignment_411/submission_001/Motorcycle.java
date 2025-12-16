// Motorcycle.java
// Child class Motorcycle

// Declare the Motorcycle class which extends the Vehicle class
public class Motorcycle extends Vehicle {
    
    // Private instance variable for the engine displacement of the motorcycle
    private double engineDisplacement;

    // Constructor for the Motorcycle class, taking make, model, year, fuel type, and fuel efficiency as parameters
    public Motorcycle(String make, String model, int year, String fuelType, double fuelEfficiency) {
        // Call the constructor of the superclass (Vehicle) with make, model, year, fuel type, and fuel efficiency
        super(make, model, year, fuelType, fuelEfficiency);
        // Initialize the engineDisplacement instance variable (currently commented out)
        // this.engineDisplacement = engineDisplacement;
    }

    // Public method to get the engine displacement of the motorcycle
    public double getEngineDisplacement() {
        return engineDisplacement;
    }

    // Override the calculateFuelEfficiency method from the superclass (Vehicle)
    @Override
    public double calculateFuelEfficiency() {
        // Implementation for fuel efficiency calculation for motorcycles
        return getFuelEfficiency() * (1.0 / (1.0 + (getEngineDisplacement() / 1000.0)));
    }

    // Override the calculateDistanceTraveled method from the superclass (Vehicle)
    @Override
    public double calculateDistanceTraveled() {
        // Implementation for distance traveled calculation for motorcycles
        return calculateFuelEfficiency() * getFuelEfficiency();
    }

    // Override the getMaxSpeed method from the superclass (Vehicle)
    @Override
    public double getMaxSpeed() {
        // Implementation for maximum speed calculation for motorcycles
        return 80.0;
    }
} 
