// Import necessary packages
import java.util.ArrayList;
import java.util.List;

// Define the Building class
class Building {
    // Attributes for the Building class
    String address;
    int numberOfFloors;
    double totalArea;

    // Constructor for the Building class
    public Building(String address, int numberOfFloors, double totalArea) {
        this.address = address;
        this.numberOfFloors = numberOfFloors;
        this.totalArea = totalArea;
    }

    // Method to display basic information about the building
    public void displayInfo() {
        System.out.println("Address: " + address);
        System.out.println("Number of Floors: " + numberOfFloors);
        System.out.println("Total Area: " + totalArea + " sq meters");
    }
}
