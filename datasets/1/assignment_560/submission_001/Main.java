// Main.java
// Define the Main class
public class Main {

  // Define the main method, the entry point of the program
  public static void main(String[] args) {
    // Create an instance of Bird and assign it to the variable bird of type Animal
    Animal bird = new Bird();
    // Create an instance of Panthera and assign it to the variable panthera of type Animal
    Animal panthera = new Panthera();

    // Call the performAction method with bird as the argument
    performAction(bird);
    // Call the performAction method with panthera as the argument
    performAction(panthera);
  }

  // Define the performAction method that takes an Animal object as a parameter
  public static void performAction(Animal animal) {
    // Call the move method on the animal object
    animal.move();
    // Call the makeSound method on the animal object
    animal.makeSound();
  }
}
