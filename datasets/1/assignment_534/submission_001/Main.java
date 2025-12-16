// Main class to test the Vehicle, Car, and Truck classes
public class Main {
    public static void main(String[] args) {
        // Create a Car object
        Car car = new Car("Suzuki", "Swift", 2015, 15.1);
        car.displayDetails(); // Display car details

        // Create a Truck object
        Truck truck = new Truck("Ford", "F-150", 2016, 3.5);
        truck.displayDetails(); // Display truck details
    }
}
