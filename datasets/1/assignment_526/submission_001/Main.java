//Main.java
// Import the ArrayList class from the java.util package
import java.util.ArrayList;

// Define the Main class
public class Main {
  // Main method, entry point of the program
  public static void main(String[] args) {
    // Create a new instance of the School class
    School school = new School();
    
    // Create new Student objects with name and age
    Student student1 = new Student("Mats Yatzil", 15);
    Student student2 = new Student("Karolina Ralf", 16);
    Student student3 = new Student("Felicie Anuschka", 16);
    Student student4 = new Student("Norbert Micha", 15);
    
    // Add the students to the school
    school.addStudent(student1);
    school.addStudent(student2);
    school.addStudent(student3);
    school.addStudent(student4);
    
    // Create new Teacher objects with name and subject
    Teacher teacher1 = new Teacher("Jens Amalia", "Math");
    Teacher teacher2 = new Teacher("Elise Giiwedin", "English");
    Teacher teacher3 = new Teacher("Angelika Lotta", "Science");
    
    // Add the teachers to the school
    school.addTeacher(teacher1);
    school.addTeacher(teacher2);
    school.addTeacher(teacher3);

    // Create new SchoolClass objects with class name and teacher
    SchoolClass mathClass = new SchoolClass("Mathematics", teacher1);
    // Add students to the math class
    mathClass.addStudent(student1);
    mathClass.addStudent(student2);
    mathClass.addStudent(student3);
    mathClass.addStudent(student4);

    SchoolClass englishClass = new SchoolClass("English", teacher2);
    // Add students to the English class
    englishClass.addStudent(student1);
    englishClass.addStudent(student2);
    englishClass.addStudent(student3);

    SchoolClass scienceClass = new SchoolClass("Science", teacher3);
    // Add students to the Science class
    scienceClass.addStudent(student1);
    scienceClass.addStudent(student2);
    scienceClass.addStudent(student3);
    scienceClass.addStudent(student4);

    // Add the classes to the school
    school.addClass(mathClass);
    school.addClass(englishClass);
    school.addClass(scienceClass);

    // Print general school information
    System.out.println("School information:");
    System.out.println("Number of students: " + school.getStudents().size());
    System.out.println("Number of teachers: " + school.getTeachers().size());
    System.out.println("Number of classes: " + school.getClasses().size());
    System.out.println();

    // Print math class information
    System.out.println("Math class information:");
    System.out.println("Class name: " + mathClass.getClassName());
    System.out.println("Teacher: " + mathClass.getTeacher().getName());
    System.out.println("Number of students: " + mathClass.getStudents().size());
    System.out.println();

    // Print English class information
    System.out.println("English class information:");
    System.out.println("Class name: " + englishClass.getClassName());
    System.out.println("Teacher: " + englishClass.getTeacher().getName());
    System.out.println("Number of students: " + englishClass.getStudents().size());
    System.out.println();
    
    // Print Science class information
    System.out.println("Science class information:");
    System.out.println("Class name: " + scienceClass.getClassName());
    System.out.println("Teacher: " + scienceClass.getTeacher().getName());
    System.out.println("Number of students: " + scienceClass.getStudents().size());
    System.out.println();

    // Remove a student, a teacher, and a class from the school
    school.removeStudent(student1);
    school.removeTeacher(teacher2);
    school.removeClass(mathClass);

    // Print updated school information after removal
    System.out.println("School information after removing one student, teacher and class:");
    System.out.println("Number of students: " + school.getStudents().size());
    System.out.println("Number of teachers: " + school.getTeachers().size());
    System.out.println("Number of classes: " + school.getClasses().size());
  }
}
