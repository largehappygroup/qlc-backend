// Square.java
// Define a class named Square that extends Shape
class Square extends Shape {

  // Declare a private double variable side
  private double side;

  // Define a constructor that takes a double side as a parameter
  public Square(double side) {
    // Assign the parameter side to the instance variable side
    this.side = side;
  }

  // Override the draw method from the Shape class
  @Override
  public void draw() {
    // Print "Drawing a square" to the console
    System.out.println("Drawing a square");
  }

  // Override the calculateArea method from the Shape class
  @Override
  public double calculateArea() {
    // Return the area of the square using the formula side * side
    return side * side;
  }
}
