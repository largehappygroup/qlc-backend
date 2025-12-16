// Circle.java
// Define a class named Circle that extends Shape
class Circle extends Shape {
  // Declare a private double variable radius
  private double radius;

  // Constructor for Circle that takes a double radius as a parameter
  public Circle(double radius) {
    // Assign the parameter radius to the instance variable radius
    this.radius = radius;
  }

  // Override the draw method from Shape class
  @Override
  public void draw() {
    // Print "Drawing a circle" to the console
    System.out.println("Drawing a circle");
  }

  // Override the calculateArea method from Shape class
  @Override
  public double calculateArea() {
    // Calculate and return the area of the circle
    return Math.PI * radius * radius;
  }

  // Protected method to get the radius of the circle
  protected double getRadius() {
    // Return the radius
    return radius;
  }
}
