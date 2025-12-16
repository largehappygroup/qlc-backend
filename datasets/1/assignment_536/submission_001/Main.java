// Main class to test the Course and OnlineCourse classes
public class Main {
    public static void main(String[] args) {
        // Create a Course object
        Course course = new Course("Java Programming", "Dr. Timaios Pliny", 4);
        course.displayCourseDetails();
        System.out.println();

        // Create an OnlineCourse object
        OnlineCourse onlineCourse = new OnlineCourse("Advanced Java", "Prof. Isacco Lyuba", 4, "Google", 10);
        onlineCourse.displayCourseDetails();
        System.out.println("Eligible for Certificate: " + onlineCourse.isEligibleForCertificate());
    }
}
