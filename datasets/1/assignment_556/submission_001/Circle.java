// Circle.java
// Subclass Circle

// Define the Circle class as a subclass of Shape
public class Circle extends Shape {

    // Declare a private double variable radius
    private double radius;

    // Constructor for Circle class that takes radius as a parameter
    public Circle(double radius) {
        // Assign the parameter radius to the instance variable radius
        this.radius = radius;
    }

    // Override the calculateArea method from the Shape class
    @Override
    public double calculateArea() {
        // Calculate and return the area of the circle using the formula πr²
        return Math.PI * radius * radius;
    }
} 
