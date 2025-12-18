// Triangle.java
// Subclass Triangle

// Define the Triangle class as a subclass of Shape
public class Triangle extends Shape {

    // Declare private double variables base and height
    private double base;
    private double height;

    // Constructor for Triangle class that takes base and height as parameters
    public Triangle(double base, double height) {
        // Assign the parameter base to the instance variable base
        this.base = base;
        // Assign the parameter height to the instance variable height
        this.height = height;
    }

    // Override the calculateArea method from the Shape class
    @Override
    public double calculateArea() {
        // Calculate and return the area of the triangle using the formula 0.5 * base * height
        return 0.5 * base * height;
    }
}
