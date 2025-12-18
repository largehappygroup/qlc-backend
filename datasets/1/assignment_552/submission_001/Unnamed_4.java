// Panther.java
// Define the Panther class that extends Animal
class Panther extends Animal {
  // Override the eat method
  @Override
  public void eat() {
    // Print that the panther eats meat and small mammals
    System.out.println("Panther eats meat and small mammals.");
  }

  // Override the sound method
  @Override
  public void sound() {
    // Print that the panther purrs and sometimes hisses
    System.out.println("Panther purrs and sometimes hisses.");
  }
} 
