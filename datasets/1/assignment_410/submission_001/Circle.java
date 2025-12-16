// Circle.java
// Child class Circle

// Declare the Circle class which extends the Shape class
public class Circle extends Shape {
    
    // Private instance variable for the radius of the circle
    private double radius;

    // Constructor for the Circle class, taking the radius as a parameter
    public Circle(double radius) {
        // Initialize the radius instance variable
        this.radius = radius;
    }

    // Override the getPerimeter method from the superclass (Shape)
    @Override
    public double getPerimeter() {
        // Return the perimeter of the circle calculated as 2 * π * radius
        return 2 * Math.PI * radius;
    }

    // Override the getArea method from the superclass (Shape)
    @Override
    public double getArea() {
        // Return the area of the circle calculated as π * radius^2
        return Math.PI * radius * radius;
    }
}
