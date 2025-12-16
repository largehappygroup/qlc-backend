// Define the Main class
public class Main {
    
    // The main method - the entry point of the Java application
    public static void main(String[] args) {
        
        // Create a rectangle shape with length 10 and width 12
        Shape rectangle = new Rectangle(10, 12);
        
        // Create a circle shape with radius 5
        Shape circle = new Circle(5);
        
        // Create a triangle shape with sides 7, 8, and 6
        Shape triangle = new Triangle(7, 8, 6);

        // Print the header for the area and perimeter calculations
        System.out.println("\nArea and perimeter of various shapes:");
        
        // Print the details and calculations for the rectangle
        System.out.println("\nRectangle: Length-10, Width-12");
        System.out.println("Area: " + rectangle.getArea());
        System.out.println("Perimeter: " + rectangle.getPerimeter());

        // Print the details and calculations for the circle
        System.out.println("\nCircle: Radius-5");
        System.out.println("Area: " + circle.getArea());
        System.out.println("Perimeter: " + circle.getPerimeter());

        // Print the details and calculations for the triangle
        System.out.println("\nTriangle: Side1-7, Side2-8, Side3-6");
        System.out.println("Area: " + triangle.getArea());
        System.out.println("Perimeter: " + triangle.getPerimeter());
    }
}
