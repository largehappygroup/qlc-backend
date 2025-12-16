// Main.java
// Main class

// Declare the Main class
public class Main {
    
    // Main method to execute the program
    public static void main(String[] args) {
        
        // Declare a double variable r and initialize it to 8.0
        double r = 8.0;
        
        // Create a Circle object named c1 with radius r
        Circle c1 = new Circle(r);
        
        // Print the radius of the circle c1
        System.out.println("Radius of the circle=" + r);
        
        // Print the perimeter of the circle c1
        System.out.println("Perimeter: " + c1.getPerimeter());
        
        // Print the area of the circle c1
        System.out.println("Area: " + c1.getArea());
        
        // Update the value of r to 3.2
        r = 3.2;
        
        // Create a Circle object named c2 with radius r
        Circle c2 = new Circle(r);
        
        // Print the radius of the circle c2
        System.out.println("\nRadius of the circle=" + r);
        
        // Print the perimeter of the circle c2
        System.out.println("Perimeter: " + c2.getPerimeter());
        
        // Print the area of the circle c2
        System.out.println("Area: " + c2.getArea());
    }
} 
