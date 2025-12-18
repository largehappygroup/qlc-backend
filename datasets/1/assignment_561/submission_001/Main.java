// Main.java
// Define the Main class
public class Main {

  // Define the main method, the entry point of the program
  public static void main(String[] args) {
    // Create an instance of Circle with radius 7.0 and assign it to the variable circle of type Shape
    Shape circle = new Circle(7.0);
    // Create an instance of Square with side length 12.0 and assign it to the variable square of type Shape
    Shape square = new Square(12.0);
    // Create an instance of Triangle with base 5.0 and height 3.0 and assign it to the variable triangle of type Shape
    Shape triangle = new Triangle(5.0, 3.0);

    // Call the drawShapeAndCalculateArea method with circle as the argument
    drawShapeAndCalculateArea(circle);
    // Call the drawShapeAndCalculateArea method with square as the argument
    drawShapeAndCalculateArea(square);
    // Call the drawShapeAndCalculateArea method with triangle as the argument
    drawShapeAndCalculateArea(triangle);
  }

  // Define the drawShapeAndCalculateArea method that takes a Shape object as a parameter
  public static void drawShapeAndCalculateArea(Shape shape) {
    // Call the draw method on the shape object
    shape.draw();
    // Call the calculateArea method on the shape object and store the result in a variable area
    double area = shape.calculateArea();
    // Print the area of the shape to the console
    System.out.println("Area: " + area);
  }
} 
