// School.java
// Import the ArrayList class from the java.util package
import java.util.ArrayList;

// Define the School class
public class School {
  // Private field to store a list of Student objects
  private ArrayList<Student> students;
  // Private field to store a list of Teacher objects
  private ArrayList<Teacher> teachers;
  // Private field to store a list of SchoolClass objects
  private ArrayList<SchoolClass> classes;

  // Constructor to initialize the students, teachers, and classes fields
  public School() {
    // Create a new ArrayList to hold Student objects
    this.students = new ArrayList<Student>();
    // Create a new ArrayList to hold Teacher objects
    this.teachers = new ArrayList<Teacher>();
    // Create a new ArrayList to hold SchoolClass objects
    this.classes = new ArrayList<SchoolClass>();
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

  // Method to add a Teacher to the teachers list
  public void addTeacher(Teacher teacher) {
    // Add the specified teacher to the teachers list
    teachers.add(teacher);
  }

  // Method to remove a Teacher from the teachers list
  public void removeTeacher(Teacher teacher) {
    // Remove the specified teacher from the teachers list
    teachers.remove(teacher);
  }

  // Method to add a SchoolClass to the classes list
  public void addClass(SchoolClass schoolClass) {
    // Add the specified school class to the classes list
    classes.add(schoolClass);
  }

  // Method to remove a SchoolClass from the classes list
  public void removeClass(SchoolClass schoolClass) {
    // Remove the specified school class from the classes list
    classes.remove(schoolClass);
  }

  // Method to get the list of students
  public ArrayList<Student> getStudents() {
    // Return the list of students
    return students;
  }

  // Method to get the list of teachers
  public ArrayList<Teacher> getTeachers() {
    // Return the list of teachers
    return teachers;
  }

  // Method to get the list of classes
  public ArrayList<SchoolClass> getClasses() {
    // Return the list of classes
    return classes;
  }
}
