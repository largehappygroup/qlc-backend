// Define the Main class
public class Main {
    // Define the main method which is the entry point of the program
    public static void main(String[] args) {
        // Declare an integer variable r and initialize it with the value 5
        int r = 5;
        // Create an instance of the Circle class with the radius r
        Circle circle = new Circle(r);
        // Print the radius of the circle to the console
        System.out.println("Radius of the circle is " + r);
        // Print the area of the circle to the console
        System.out.println("The area of the circle is " + circle.getArea());
        // Print the circumference of the circle to the console
        System.out.println("The circumference of the circle is " + circle.getCircumference());
        // Update the radius variable r to 8
        r = 8;
        // Set the radius of the circle to the new value of r
        circle.setRadius(r);
        // Print the updated radius of the circle to the console
        System.out.println("\nRadius of the circle is " + r);
        // Print the updated area of the circle to the console
        System.out.println("The area of the circle is now " + circle.getArea());
        // Print the updated circumference of the circle to the console
        System.out.println("The circumference of the circle is now " + circle.getCircumference());
    }
}
