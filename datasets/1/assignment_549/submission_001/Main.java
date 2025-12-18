//Main.java
// Define the Main class
public class Main {
  
  // Main method, the entry point of the Java application
  public static void main(String[] args) {
    
    // Create a new TrafficLight object with initial color "red" and duration 30 seconds
    TrafficLight light = new TrafficLight("red", 30);

    // Print whether the traffic light is red
    System.out.println("The light is red: " + light.isRed());
    
    // Print whether the traffic light is green
    System.out.println("The light is green: " + light.isGreen());

    // Change the color of the traffic light to "green"
    light.changeColor("green");

    // Print whether the traffic light is now green
    System.out.println("The light is now green: " + light.isGreen());
    
    // Print the duration of the traffic light
    System.out.println("The light duration is: " + light.getDuration());
    
    // Set a new duration for the traffic light to 20 seconds
    light.setDuration(20);
    
    // Print the updated duration of the traffic light
    System.out.println("The light duration is now: " + light.getDuration());
  }
}
