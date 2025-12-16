// Define the House class
public class House {
    // Private instance variables
    private String address;
    private int numberOfRooms;
    private double area; // area in square meters

    // Public getter for the address variable
    public String getAddress() {
        return address;
    }

    // Public setter for the address variable
    public void setAddress(String address) {
        this.address = address;
    }

    // Public getter for the numberOfRooms variable
    public int getNumberOfRooms() {
        return numberOfRooms;
    }

    // Public setter for the numberOfRooms variable
    public void setNumberOfRooms(int numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }

    // Public getter for the area variable
    public double getArea() {
        return area;
    }

    // Public setter for the area variable
    public void setArea(double area) {
        this.area = area;
    }

    // Method to calculate the price of the house based on area and price per square meter
    public double calculatePrice(double pricePerSquareMeter) {
        return this.area * pricePerSquareMeter;
    }
}
