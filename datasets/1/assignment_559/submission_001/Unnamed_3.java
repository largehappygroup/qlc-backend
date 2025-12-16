// Rectangle.java
// Subclass Rectangle
class Rectangle extends Shape {  // Declare a subclass Rectangle that extends the Shape class
    private double length;  // Declare a private double variable length
    private double width;  // Declare a private double variable width

    public Rectangle(double length, double width) {  // Define a constructor that takes two double parameters length and width
        this.length = length;  // Initialize the length variable with the provided parameter
        this.width = width;  // Initialize the width variable with the provided parameter
    }

    @Override  // Override the getArea method from the Shape class
    public double getArea() {  // Define the getArea method
        return length * width;  // Calculate and return the area of the rectangle
    }

    @Override  // Override the getPerimeter method from the Shape class
    public double getPerimeter() {  // Define the getPerimeter method
        return 2 * (length + width);  // Calculate and return the perimeter of the rectangle
    }
}
