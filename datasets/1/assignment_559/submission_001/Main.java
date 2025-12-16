// Main.java
// Main class
public class Main {  // Declare the Main class
    public static void main(String[] args) {  // Define the main method
        double r = 4.0;  // Initialize a double variable r with the value 4.0
        Circle circle = new Circle(r);  // Create an instance of the Circle class with radius r

        double rs1 = 4.0, rs2 = 6.0;  // Initialize double variables rs1 and rs2 with the values 4.0 and 6.0 respectively
        double ts1 = 3.0, ts2 = 4.0, ts3 = 5.0;  // Initialize double variables ts1, ts2, and ts3 with the values 3.0, 4.0, and 5.0 respectively
        
        Rectangle rectangle = new Rectangle(rs1, rs2);  // Create an instance of the Rectangle class with sides rs1 and rs2
        Triangle triangle = new Triangle(ts1, ts2, ts3);  // Create an instance of the Triangle class with sides ts1, ts2, and ts3

        System.out.println("Radius of the Circle"+r);  // Print the radius of the circle
        System.out.println("Area of the Circle: " + circle.getArea());  // Print the area of the circle
        System.out.println("Perimeter of the Circle: " + circle.getPerimeter());  // Print the perimeter of the circle
        
        System.out.println("\nSides of the rectangle are: "+rs1+','+rs2);  // Print the sides of the rectangle
        System.out.println("Area of the Rectangle: " + rectangle.getArea());  // Print the area of the rectangle
        System.out.println("Perimeter of the Rectangle: " + rectangle.getPerimeter());  // Print the perimeter of the rectangle
        
        System.out.println("\nSides of the Triangle are: "+ts1+','+ts2+','+ts3);  // Print the sides of the triangle
        System.out.println("Area of the Triangle: " + triangle.getArea());  // Print the area of the triangle
        System.out.println("Perimeter of the Triangle: " + triangle.getPerimeter());  // Print the perimeter of the triangle
    }
}  
