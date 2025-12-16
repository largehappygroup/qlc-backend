// Main.java
// Define the Main class
public class Main {
  // Main method, entry point of the application
  public static void main(String[] args) {
    // Create a Shape reference pointing to a Circle object with radius 7.0
    Shape circle = new Circle(7.0);
    // Create a Shape reference pointing to a Cylinder object with radius 4.0 and height 9.0
    Shape cylinder = new Cylinder(4.0, 9.0);

    // Call the drawShapeAndCalculateArea method with the circle object
    drawShapeAndCalculateArea(circle);
    // Call the drawShapeAndCalculateArea method with the cylinder object
    drawShapeAndCalculateArea(cylinder);
  }

  // Static method to draw the shape and calculate its area
  public static void drawShapeAndCalculateArea(Shape shape) {
    // Call the draw method of the shape object
    shape.draw();
    // Call the calculateArea method of the shape object and store the result in area
    double area = shape.calculateArea();
    // Print the area of the shape to the console
    System.out.println("Area: " + area);
  }
} 
