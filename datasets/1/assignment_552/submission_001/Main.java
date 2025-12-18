// Main.java
// Define the Main class
public class Main {
  // Main method, program entry point
  public static void main(String[] args) {
    // Create an Animal reference to a Lion object
    Animal lion = new Lion();
    // Create an Animal reference to a Tiger object
    Animal tiger = new Tiger();
    // Create an Animal reference to a Panther object
    Animal panther = new Panther();

    // Call the eat method on the lion object
    lion.eat();
    // Call the sound method on the lion object
    lion.sound();

    // Call the eat method on the tiger object
    tiger.eat();
    // Call the sound method on the tiger object
    tiger.sound();

    // Call the eat method on the panther object
    panther.eat();
    // Call the sound method on the panther object
    panther.sound();
  }
}
