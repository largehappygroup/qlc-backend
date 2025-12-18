// Car.java
// Subclass Car

// Declare the Car class that extends the Vehicle class
class Car extends Vehicle {
    // Override the speedUp method from the Vehicle class
    @Override
    public void speedUp() {
        // Call the speedUp method of the parent class (Vehicle)
        super.speedUp();
        // Print a message indicating that the car's speed has increased
        System.out.println("\nCar speed increased by 22 units.");
    }
} 
