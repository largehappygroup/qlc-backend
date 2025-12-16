// Triangle.java
// Define a class named Triangle that extends Shape
class Triangle extends Shape {
  
  // Declare private double variables base and height
  private double base;
  private double height;

  // Define a constructor that takes a double base and a double height as parameters
  public Triangle(double base, double height) {
    // Assign the parameter base to the instance variable base
    this.base = base;
    // Assign the parameter height to the instance variable height
    this.height = height;
  }

  // Override the draw method from the Shape class
  @Override
  public void draw() {
    // Print "Drawing a triangle" to the console
    System.out.println("Drawing a triangle");
  }

  // Override the calculateArea method from the Shape class
  @Override
  public double calculateArea() {
    // Return the area of the triangle using the formula 0.5 * base * height
    return 0.5 * base * height;
  }
}
