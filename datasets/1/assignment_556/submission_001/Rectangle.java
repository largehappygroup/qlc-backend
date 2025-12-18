// Rectangle.java
// Subclass Rectangle

// Define the Rectangle class as a subclass of Shape
public class Rectangle extends Shape {

    // Declare private double variables width and height
    private double width;
    private double height;

    // Constructor for Rectangle class that takes width and height as parameters
    public Rectangle(double width, double height) {
        // Assign the parameter width to the instance variable width
        this.width = width;
        // Assign the parameter height to the instance variable height
        this.height = height;
    }

    // Override the calculateArea method from the Shape class
    @Override
    public double calculateArea() {
        // Calculate and return the area of the rectangle using the formula width * height
        return width * height;
    }
} 
