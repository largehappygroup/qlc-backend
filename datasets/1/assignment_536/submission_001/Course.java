// Define the Course class
public class Course {
    // Attributes for the course name, instructor, and credits
    private String courseName;
    private String instructor;
    private int credits;

    // Constructor to initialize the Course object
    public Course(String courseName, String instructor, int credits) {
        this.courseName = courseName;
        this.instructor = instructor;
        this.credits = credits;
    }

    // Method to display course details
    public void displayCourseDetails() {
        System.out.println("Course Name: " + courseName);
        System.out.println("Instructor: " + instructor);
        System.out.println("Credits: " + credits);
    }

    // Getter for course name
    public String getCourseName() {
        return courseName;
    }

    // Getter for instructor
    public String getInstructor() {
        return instructor;
    }

    // Getter for credits
    public int getCredits() {
        return credits;
    }
}
