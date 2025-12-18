// Student.java
// Define the Student class
public class Student {
  // Private field to store the name of the student
  private String name;
  // Private field to store the age of the student
  private int age;

  // Constructor to initialize the name and age of the student
  public Student(String name, int age) {
    // Assign the name parameter to the name field
    this.name = name;
    // Assign the age parameter to the age field
    this.age = age;
  }

  // Getter method for the name field
  public String getName() {
    // Return the value of the name field
    return name;
  }

  // Setter method for the name field
  public void setName(String name) {
    // Assign the name parameter to the name field
    this.name = name;
  }

  // Getter method for the age field
  public int getAge() {
    // Return the value of the age field
    return age;
  }

  // Setter method for the age field
  public void setAge(int age) {
    // Assign the age parameter to the age field
    this.age = age;
  }
} 
