// Teacher.class
// Define the Teacher class
public class Teacher {
  // Private field to store the name of the teacher
  private String name;
  // Private field to store the subject of the teacher
  private String subject;

  // Constructor to initialize the name and subject of the teacher
  public Teacher(String name, String subject) {
    // Assign the name parameter to the name field
    this.name = name;
    // Assign the subject parameter to the subject field
    this.subject = subject;
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

  // Getter method for the subject field
  public String getSubject() {
    // Return the value of the subject field
    return subject;
  }

  // Setter method for the subject field
  public void setSubject(String subject) {
    // Assign the subject parameter to the subject field
    this.subject = subject;
  }
}
