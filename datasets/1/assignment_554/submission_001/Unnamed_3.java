// Cylinder.java
// Define a class named Cylinder that extends Circle
class Cylinder extends Circle {
  // Declare a private double variable height
  private double height;

  // Constructor for Cylinder that takes a double radius and a double height as parameters
  public Cylinder(double radius, double height) {
    // Call the superclass (Circle) constructor with the radius parameter
    super(radius);
    // Assign the parameter height to the instance variable height
    this.height = height;
  }

  // Override the draw method from Circle class
  @Override
  public void draw() {
    // Print "Drawing a cylinder" to the console
    System.out.println("Drawing a cylinder");
  }

  // Override the calculateArea method from Circle class
  @Override
  public double calculateArea() {
    // Calculate the area of the circular base using the superclass method
    double circleArea = super.calculateArea();
    // Calculate the side area of the cylinder
    double sideArea = 2 * Math.PI * getRadius() * height;
    // Return the total surface area of the cylinder (2 circles + side area)
    return 2 * circleArea + sideArea;
  }
}
