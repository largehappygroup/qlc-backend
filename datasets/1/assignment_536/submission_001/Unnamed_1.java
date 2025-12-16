// Define the OnlineCourse subclass that extends the Course class
class OnlineCourse extends Course {
    // Additional attributes for the platform and duration
    private String platform;
    private int duration; // duration in hours

    // Constructor to initialize the OnlineCourse object
    public OnlineCourse(String courseName, String instructor, int credits, String platform, int duration) {
        super(courseName, instructor, credits); // Call the superclass constructor
        this.platform = platform;
        this.duration = duration;
    }

    // Method to display course details, including platform and duration
    @Override
    public void displayCourseDetails() {
        super.displayCourseDetails(); // Call the superclass method to display common details
        System.out.println("Platform: " + platform);
        System.out.println("Duration: " + duration + " hours");
    }

    // Method to check if the course is eligible for a certificate based on duration
    public boolean isEligibleForCertificate() {
        // Assume that a course is eligible for a certificate if its duration is at least 10 hours
        return duration >= 10;
    }

    // Getter for platform
    public String getPlatform() {
        return platform;
    }

    // Getter for duration
    public int getDuration() {
        return duration;
    }
}
