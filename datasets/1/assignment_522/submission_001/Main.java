// Main.java

// Define the Main class
public class Main {
  
  // Main method, the entry point of the Java application
  public static void main(String[] args) {
    
    // Create a new Student object named student1 with name "Carolus Vitali" and grade 11
    Student student1 = new Student("Carolus Vitali", 11);
    
    // Create a new Student object named student2 with name "Nakeisha Uhuru" and grade 10
    Student student2 = new Student("Nakeisha Uhuru", 10);
    
    // Create a new Student object named student3 with name "Gabriella Cherice" and grade 10
    Student student3 = new Student("Gabriella Cherice", 10);
    
    // Print a header for student details
    System.out.println("Student Details:");
    
    // Print the details of student1
    student1.printStudentDetails();
    
    // Print the details of student2
    student2.printStudentDetails();
    
    // Print the details of student3
    student3.printStudentDetails();
    
    // Print a message indicating courses are being added for student1
    System.out.println("Adding courses for " + student1.getName());
    
    // Add the course "Math" to student1's courses
    student1.addCourse("Math");
    
    // Add the course "Science" to student1's courses
    student1.addCourse("Science");
    
    // Add the course "English" to student1's courses
    student1.addCourse("English");
    
    // Print student1's name and their list of courses
    System.out.println(student1.getName() + "'s courses: " + student1.getCourses());

    // Print a message indicating courses are being added for student2
    System.out.println("\nAdding courses for " + student2.getName());
    
    // Add the course "History" to student2's courses
    student2.addCourse("History");
    
    // Add the course "Geography" to student2's courses
    student2.addCourse("Geography");
    
    // Add the course "English" to student2's courses
    student2.addCourse("English");
    
    // Print student2's name and their list of courses
    System.out.println(student2.getName() + "'s courses: " + student2.getCourses());
    
    // Print a message indicating the course "Science" is being removed for student1
    System.out.println("\nRemoving 'Science' course for " + student1.getName());
    
    // Remove the course "Science" from student1's courses
    student1.removeCourse("Science");
    
    // Print student1's name and their updated list of courses
    System.out.println(student1.getName() + "'s courses: " + student1.getCourses());
  }
}
