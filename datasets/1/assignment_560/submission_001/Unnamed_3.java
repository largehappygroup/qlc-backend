// Panthera.java
// Define a class named Panthera that extends Animal
class Panthera extends Animal {
  
  // Override the move method from the Animal class
  @Override
  public void move() {
    // Print "Panthera walks" to the console
    System.out.println("Panthera walks");
  }

  // Override the makeSound method from the Animal class
  @Override
  public void makeSound() {
    // Print "Panthera roars" to the console
    System.out.println("Panthera roars");
  }
}
