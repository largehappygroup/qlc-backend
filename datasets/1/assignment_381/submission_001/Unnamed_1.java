// Import the ArrayList and List classes from the java.util package
import java.util.ArrayList;
import java.util.List;

// Student Class
class Student {
  // Declare a private int variable for the student ID
  private int student_id;
  
  // Declare a private String variable for the student name
  private String student_name;
  
  // Declare a private List of Double for the grades
  private List grades;

  // Getter method for student_id
  public int getStudent_id() {
    return student_id;
  }

  // Setter method for student_id
  public void setStudent_id(int student_id) {
    this.student_id = student_id;
  }

  // Getter method for student_name
  public String getStudent_name() {
    return student_name;
  }

  // Setter method for student_name
  public void setStudent_name(String student_name) {
    this.student_name = student_name;
  }

  // Getter method for grades
  public List getGrades() {
    return grades;
  }

  // Method to add a grade to the grades list
  public void addGrade(double grade) {
    // Initialize the grades list if it is null
    if (grades == null) {
      grades = new ArrayList<>();
    }
    // Add the grade to the grades list
    grades.add(grade);
  }
}
