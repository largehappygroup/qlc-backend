// Define the Vehicle class
public class Vehicle {

    // Attribute for make of the vehicle
    private String make;
    
    // Attribute for model of the vehicle
    private String model;
    
    // Attribute for year of the vehicle
    private int year;

    // Constructor to initialize Vehicle object
    public Vehicle(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    // Method to display vehicle details
    public void displayDetails() {
        System.out.println("Vehicle Details:");
        System.out.println("Make: " + make);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
    }

    // Getter method for make
    public String getMake() {
        return make;
    }

    // Getter method for model
    public String getModel() {
        return model;
    }

    // Getter method for year
    public int getYear() {
        return year;
    }
}
