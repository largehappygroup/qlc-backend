// Circle.java
// Subclass Circle
class Circle extends Shape {  // Declare a subclass Circle that extends the Shape class
    private double radius;  // Declare a private double variable radius

    public Circle(double radius) {  // Define a constructor that takes a double parameter radius
        this.radius = radius;  // Initialize the radius variable with the provided parameter
    }

    @Override  // Override the getArea method from the Shape class
    public double getArea() {  // Define the getArea method
        return Math.PI * radius * radius;  // Calculate and return the area of the circle
    }

    @Override  // Override the getPerimeter method from the Shape class
    public double getPerimeter() {  // Define the getPerimeter method
        return 2 * Math.PI * radius;  // Calculate and return the perimeter of the circle
    }
} 
