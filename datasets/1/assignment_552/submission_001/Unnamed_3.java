// Tiger.java
// Define the Tiger class that extends Animal
class Tiger extends Animal {
  // Override the eat method
  @Override
  public void eat() {
    // Print that the tiger eats meat and sometimes fish
    System.out.println("Tiger eats meat and sometimes fish.");
  }

  // Override the sound method
  @Override
  public void sound() {
    // Print that the tiger growls
    System.out.println("Tiger growls.");
  }
} 
