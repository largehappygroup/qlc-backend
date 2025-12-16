public class Main {
    // Public setter for the numberOfRooms variable
   public static void main(String[] args) {
        // Create a new House object
        House house = new House();

        // Set the address, number of rooms, and area of the house
        house.setAddress("ABC Main Rd.");
        house.setNumberOfRooms(5);
        house.setArea(130.5);

        // Calculate the price of the house with a given price per square meter
        double price = house.calculatePrice(2000);

        // Print the details of the house and its calculated price
        System.out.println("Address: " + house.getAddress());
        System.out.println("Number of Rooms: " + house.getNumberOfRooms());
        System.out.println("Area: " + house.getArea() + " sq meters");
        System.out.println("Price: $" + price);
    }
 }
