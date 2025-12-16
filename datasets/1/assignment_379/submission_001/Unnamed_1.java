// Circle.java

// Circle Class
class Circle {
  // Declare a private double variable for radius
  private double radius;

  // Getter method for radius
  public double getRadius() {
    return radius;
  }

  // Setter method for radius
  public void setRadius(double radius) {
    this.radius = radius;
  }

  // Method to calculate the area of the circle
  public double calculateArea() {
    return Math.PI * radius * radius;
  }

  // Method to calculate the perimeter (circumference) of the circle
  public double calculatePerimeter() {
    return 2 * Math.PI * radius;
  }
}
