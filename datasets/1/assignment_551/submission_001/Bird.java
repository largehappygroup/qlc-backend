// Bird.java
// Subclass Bird

// Declare the Bird class that extends the Animal class
public class Bird extends Animal {
    // Override the makeSound method to provide a specific implementation for Bird
    @Override
    public void makeSound() {
        System.out.println("The bird chirps");
    }
}
