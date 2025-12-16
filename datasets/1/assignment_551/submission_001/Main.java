// Main.java
// Main class

// Declare the Main class
public class Main {
    // Main method: entry point of the program
    public static void main(String[] args) {
        // Create an instance of Animal
        Animal animal = new Animal();
        // Create an instance of Bird
        Bird bird = new Bird();
        // Create an instance of Cat
        Cat cat = new Cat();

        // Call the makeSound method on the Animal instance
        animal.makeSound(); // Output: The animal makes a sound
        // Call the makeSound method on the Bird instance
        bird.makeSound();   // Output: The bird chirps
        // Call the makeSound method on the Cat instance
        cat.makeSound();    // Output: The cat meows
    }
} 
