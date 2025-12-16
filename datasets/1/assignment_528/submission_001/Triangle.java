// Triangle.java

// Define the Triangle class, which extends the Shape class
public class Triangle extends Shape {

    // Private fields to store the sides of the triangle
    private double side1;
    private double side2;
    private double side3;

    // Constructor to initialize the sides of the triangle
    public Triangle(double side1, double side2, double side3) {
        this.side1 = side1; // Set the side1 field to the provided side1
        this.side2 = side2; // Set the side2 field to the provided side2
        this.side3 = side3; // Set the side3 field to the provided side3
    }

    // Method to calculate and return the area of the triangle
    public double getArea() {
        double s = (side1 + side2 + side3) / 2; // Calculate the semi-perimeter
        return Math.sqrt(s * (s - side1) * (s - side2) * (s - side3)); // Calculate the area using Heron's formula
    }

    // Method to calculate and return the perimeter of the triangle
    public double getPerimeter() {
        return side1 + side2 + side3; // Calculate the perimeter by summing the sides
    }
}
