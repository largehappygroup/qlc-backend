// Car.java
// Child class Car

// Declare the Car class which extends the Vehicle class
public class Car extends Vehicle {
    
    // Private instance variable for the number of seats in the car
    private int numSeats;

    // Constructor for the Car class, taking make, model, year, fuel type, fuel efficiency, and number of seats as parameters
    public Car(String make, String model, int year, String fuelType, double fuelEfficiency, int numSeats) {
        // Call the constructor of the superclass (Vehicle) with make, model, year, fuel type, and fuel efficiency
        super(make, model, year, fuelType, fuelEfficiency);
        // Initialize the numSeats instance variable
        this.numSeats = numSeats;
    }

    // Public method to get the number of seats in the car
    public int getNumSeats() {
        return numSeats;
    }

    // Override the calculateFuelEfficiency method from the superclass (Vehicle)
    @Override
    public double calculateFuelEfficiency() {
        // Implementation for fuel efficiency calculation for cars
        return getFuelEfficiency() * (1.0 / (1.0 + (getNumSeats() / 5.0)));
    }

    // Override the calculateDistanceTraveled method from the superclass (Vehicle)
    @Override
    public double calculateDistanceTraveled() {
        // Implementation for distance traveled calculation for cars
        return calculateFuelEfficiency() * getFuelEfficiency();
    }

    // Override the getMaxSpeed method from the superclass (Vehicle)
    @Override
    public double getMaxSpeed() {
        // Implementation for maximum speed calculation for cars
        return 120.0;
    }
} 
