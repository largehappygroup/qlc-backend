// Define the Circle class
public class Circle {
    // Declare a private variable to store the radius of the circle
    private double radius;

    // Constructor for the Circle class that initializes the radius variable
    public Circle(double radius) {
        // Set the radius variable to the provided radius parameter
        this.radius = radius;
    }

    // Method to retrieve the radius of the circle
    public double getRadius() {
        // Return the value of the radius variable
        return radius;
    }

    // Method to set the radius of the circle
    public void setRadius(double radius) {
        // Set the radius variable to the provided radius parameter
        this.radius = radius;
    }

    // Method to calculate and return the area of the circle
    public double getArea() {
        // Calculate the area using the formula π * radius^2 and return the result
        return Math.PI * radius * radius;
    }

    // Method to calculate and return the circumference of the circle
    public double getCircumference() {
        // Calculate the circumference using the formula 2 * π * radius and return the result
        return 2 * Math.PI * radius;
    }
} 
