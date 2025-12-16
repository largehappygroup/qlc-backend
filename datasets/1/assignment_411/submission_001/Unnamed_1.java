// Vehicle.java
// Parent class Vehicle

// Declare the abstract class Vehicle
public abstract class Vehicle {
    
    // Private instance variable for the make of the vehicle
    private String make;
    
    // Private instance variable for the model of the vehicle
    private String model;
    
    // Private instance variable for the year of the vehicle
    private int year;
    
    // Private instance variable for the fuel type of the vehicle
    private String fuelType;
    
    // Private instance variable for the fuel efficiency of the vehicle
    private double fuelEfficiency;

    // Constructor for the Vehicle class, taking make, model, year, fuel type, and fuel efficiency as parameters
    public Vehicle(String make, String model, int year, String fuelType, double fuelEfficiency) {
        // Initialize the make instance variable
        this.make = make;
        // Initialize the model instance variable
        this.model = model;
        // Initialize the year instance variable
        this.year = year;
        // Initialize the fuelType instance variable
        this.fuelType = fuelType;
        // Initialize the fuelEfficiency instance variable
        this.fuelEfficiency = fuelEfficiency;
    }
    
    // Public method to get the make of the vehicle
    public String getMake() {
        return make;
    }

    // Public method to get the model of the vehicle
    public String getModel() {
        return model;
    }

    // Public method to get the year of the vehicle
    public int getYear() {
        return year;
    }

    // Public method to get the fuel type of the vehicle
    public String getFuelType() {
        return fuelType;
    }

    // Public method to get the fuel efficiency of the vehicle
    public double getFuelEfficiency() {
        return fuelEfficiency;
    }

    // Abstract method to calculate the fuel efficiency, to be implemented by subclasses
    public abstract double calculateFuelEfficiency();

    // Abstract method to calculate the distance traveled, to be implemented by subclasses
    public abstract double calculateDistanceTraveled();

    // Abstract method to get the maximum speed, to be implemented by subclasses
    public abstract double getMaxSpeed();
}
