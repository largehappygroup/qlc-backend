// SchoolClass.java
// Import the ArrayList class from the java.util package
import java.util.ArrayList;

// Define the SchoolClass class
public class SchoolClass {
  // Private field to store the name of the class
  private String className;
  // Private field to store the teacher of the class
  private Teacher teacher;
  // Private field to store a list of Student objects
  private ArrayList<Student> students;

  // Constructor to initialize the className, teacher, and students fields
  public SchoolClass(String className, Teacher teacher) {
    // Assign the className parameter to the className field
    this.className = className;
    // Assign the teacher parameter to the teacher field
    this.teacher = teacher;
    // Create a new ArrayList to hold Student objects
    this.students = new ArrayList<Student>();
  }

  // Getter method for the className field
  public String getClassName() {
    // Return the value of the className field
    return className;
  }

  // Setter method for the className field
  public void setClassName(String className) {
    // Assign the className parameter to the className field
    this.className = className;
  }

  // Getter method for the teacher field
  public Teacher getTeacher() {
    // Return the value of the teacher field
    return teacher;
  }

  // Setter method for the teacher field
  public void setTeacher(Teacher teacher) {
    // Assign the teacher parameter to the teacher field
    this.teacher = teacher;
  }

  // Getter method for the students field
  public ArrayList<Student> getStudents() {
    // Return the list of students
    return students;
  }

  // Method to add a Student to the students list
  public void addStudent(Student student) {
    // Add the specified student to the students list
    students.add(student);
  }

  // Method to remove a Student from the students list
  public void removeStudent(Student student) {
    // Remove the specified student from the students list
    students.remove(student);
  }
}
