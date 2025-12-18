 // Student.java
// Import the ArrayList class from the Java Collections Framework
import java.util.ArrayList;

// Define the Student class
public class Student {
  
  // Declare a private variable to store the name of the student
  private String name;
  
  // Declare a private variable to store the grade of the student
  private int grade;
  
  // Declare a private ArrayList to store the courses of the student
  private ArrayList courses;

  // Constructor for the Student class
  public Student(String name, int grade) {
    // Initialize the name of the student
    this.name = name;
    
    // Initialize the grade of the student
    this.grade = grade;
    
    // Initialize the courses ArrayList
    this.courses = new ArrayList();
  }

  // Method to get the name of the student
  public String getName() {
    // Return the name of the student
    return name;
  }

  // Method to get the grade of the student
  public int getGrade() {
    // Return the grade of the student
    return grade;
  }

  // Method to get the courses of the student
  public ArrayList getCourses() {
    // Return the courses ArrayList
    return courses;
  }

  // Method to add a course to the student's course list
  public void addCourse(String course) {
    // Add the given course to the courses ArrayList
    courses.add(course);
  }

  // Method to remove a course from the student's course list
  public void removeCourse(String course) {
    // Remove the given course from the courses ArrayList
    courses.remove(course);
  }

  // Method to print the details of the student
  public void printStudentDetails() {
    // Print the name of the student
    System.out.println("Name: " + name);
    
    // Print the grade of the student
    System.out.println("Grade: " + grade);
  }
}
