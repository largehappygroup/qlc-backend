// Circle.java
// Define a class named Circle that extends Shape
class Circle extends Shape {
  
  // Declare a private double variable radius
  private double radius;

  // Define a constructor that takes a double radius as a parameter
  public Circle(double radius) {
    // Assign the parameter radius to the instance variable radius
    this.radius = radius;
  }

  // Override the draw method from the Shape class
  @Override
  public void draw() {
    // Print "Drawing a circle" to the console
    System.out.println("Drawing a circle");
  }

  // Override the calculateArea method from the Shape class
  @Override
  public double calculateArea() {
    // Return the area of the circle using the formula π * radius^2
    return Math.PI * radius * radius;
  }
}
