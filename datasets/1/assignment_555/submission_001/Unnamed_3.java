// Motorcycle.java
// Subclass Motorcycle

// Declare the Motorcycle class that extends the Vehicle class
class Motorcycle extends Vehicle {
    // Override the speedUp method from the Vehicle class
    @Override
    public void speedUp() {
        // Call the speedUp method of the parent class (Vehicle)
        super.speedUp();
        // Print a message indicating that the motorcycle's speed has increased
        System.out.println("Motorcycle speed increased by 12 units");
    }
} 
