// Triangle.java
// Subclass Triangle

class Triangle extends Shape {  // Declare a subclass Triangle that extends the Shape class
    private double side1;  // Declare a private double variable side1
    private double side2;  // Declare a private double variable side2
    private double side3;  // Declare a private double variable side3

    public Triangle(double side1, double side2, double side3) {  // Define a constructor that takes three double parameters side1, side2, and side3
        this.side1 = side1;  // Initialize the side1 variable with the provided parameter
        this.side2 = side2;  // Initialize the side2 variable with the provided parameter
        this.side3 = side3;  // Initialize the side3 variable with the provided parameter
    }

    @Override  // Override the getArea method from the Shape class
    public double getArea() {  // Define the getArea method
        double s = (side1 + side2 + side3) / 2;  // Calculate the semi-perimeter of the triangle
        return Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));  // Calculate and return the area of the triangle using Heron's formula
    }

    @Override  // Override the getPerimeter method from the Shape class
    public double getPerimeter() {  // Define the getPerimeter method
        return side1 + side2 + side3;  // Calculate and return the perimeter of the triangle
    }
} 
