// Main.java
// Main class

// Define the Main class
public class Main {

    // Main method that serves as the entry point for the application
    public static void main(String[] args) {

        // Create a Circle object with radius 4
        Circle circle = new Circle(4);
        // Print the area of the Circle object
        System.out.println("Area of Circle: " + circle.calculateArea());

        // Create a Rectangle object with width 12 and height 34
        Rectangle rectangle = new Rectangle(12, 34);
        // Print the area of the Rectangle object
        System.out.println("\nArea of Rectangle: " + rectangle.calculateArea());

        // Create a Triangle object with base 5 and height 9
        Triangle triangle = new Triangle(5, 9);
        // Print the area of the Triangle object
        System.out.println("\nArea of Triangle: " + triangle.calculateArea());
    }
} 
