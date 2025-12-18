//Rectangle.java
// Define the Rectangle class, which extends the Shape class
public class Rectangle extends Shape {

    // Private fields to store the length and width of the rectangle
    private double length;
    private double width;

    // Constructor to initialize the length and width of the rectangle
    public Rectangle(double length, double width) {
        this.length = length; // Set the length field to the provided length
        this.width = width; // Set the width field to the provided width
    }

    // Method to calculate and return the area of the rectangle
    public double getArea() {
        return length * width; // Calculate the area by multiplying length and width
    }

    // Method to calculate and return the perimeter of the rectangle
    public double getPerimeter() {
        return 2 * (length + width); // Calculate the perimeter using the formula 2 * (length + width)
    }
}
