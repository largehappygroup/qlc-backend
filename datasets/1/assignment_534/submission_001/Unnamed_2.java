// Define the Truck subclass that extends Vehicle
class Truck extends Vehicle {

    // Attribute for payload capacity of the truck
    private double payloadCapacity;

    // Constructor to initialize Truck object
    public Truck(String make, String model, int year, double payloadCapacity) {
        super(make, model, year); // Call the constructor of the superclass
        this.payloadCapacity = payloadCapacity;
    }

    // Override the displayDetails method to include payload capacity
    @Override
    public void displayDetails() {
        super.displayDetails(); // Call the superclass method
        System.out.println("Payload Capacity: " + payloadCapacity + " tons");
    }

    // Getter method for payload capacity
    public double getPayloadCapacity() {
        return payloadCapacity;
    }

    // Setter method for payload capacity
    public void setPayloadCapacity(double payloadCapacity) {
        if (payloadCapacity > 0) {
            this.payloadCapacity = payloadCapacity;
        } else {
            System.out.println("Payload capacity must be positive.");
        }
    }
} 
