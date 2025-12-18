//TrafficLight.java
// Define the TrafficLight class
public class TrafficLight {
  
  // Declare a private variable to store the color of the traffic light
  private String color;
  
  // Declare a private variable to store the duration of the traffic light in seconds
  private int duration;

  // Constructor for the TrafficLight class
  public TrafficLight(String color, int duration) {
    // Initialize the color of the traffic light
    this.color = color;
    
    // Initialize the duration of the traffic light
    this.duration = duration;
  }

  // Method to change the color of the traffic light
  public void changeColor(String newColor) {
    // Update the color variable to the new color
    color = newColor;
  }

  // Method to check if the traffic light is red
  public boolean isRed() {
    // Return true if the color is red, otherwise return false
    return color.equals("red");
  }

  // Method to check if the traffic light is green
  public boolean isGreen() {
    // Return true if the color is green, otherwise return false
    return color.equals("green");
  }

  // Method to get the duration of the traffic light
  public int getDuration() {
    // Return the duration value
    return duration;
  }

  // Method to set the duration of the traffic light
  public void setDuration(int duration) {
    // Update the duration variable to the new value
    this.duration = duration;
  }
}
