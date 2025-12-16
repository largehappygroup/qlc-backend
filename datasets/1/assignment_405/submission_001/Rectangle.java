// Define the child class Rectangle that extends Shape
public class Rectangle extends Shape {
    // Define private instance variables length and width
    private double length;
    private double width;
    
    // Define the constructor that takes length and width as parameters
    public Rectangle(double length, double width) {
        // Assign the length parameter to the instance variable length
        this.length = length;
        // Assign the width parameter to the instance variable width
        this.width = width;
    }
    
    // Use the @Override annotation to indicate that this method overrides a method in the superclass
    @Override
    // Define the getArea method that returns a double
    public double getArea() {
        // Return the area of the rectangle (length * width)
        return length * width;
    }
} 
