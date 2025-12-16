// Employee.java
// Child class Employee

// Declare the Employee class which extends the Person class
public class Employee extends Person {
    
    // Private instance variable for employee ID
    private int employeeId;
    
    // Private instance variable for job title
    private String jobTitle;

    // Constructor for Employee class, taking first name, last name, employee ID, and job title as parameters
    public Employee(String firstName, String lastName, int employeeId, String jobTitle) {
        // Call the constructor of the superclass (Person) with first name and last name
        super(firstName, lastName);
        // Initialize the employeeId instance variable
        this.employeeId = employeeId;
        // Initialize the jobTitle instance variable
        this.jobTitle = jobTitle;
    }

    // Public method to get the employee ID
    public int getEmployeeId() {
        return employeeId;
    }

    // Override the getLastName method from the superclass (Person)
    @Override
    public String getLastName() {
        // Return the last name from the superclass combined with the job title
        return super.getLastName() + ", " + jobTitle;
    }
} 
