// Class declaration for Employee
class Employee {
    // Private fields for the Employee class
    private String name;
    private String address;
    private double salary;
    private String jobTitle;

    // Constructor for the Employee class
    public Employee(String name, String address, double salary, String jobTitle) {
        // Initializing the name field
        this.name = name;
        // Initializing the address field
        this.address = address;
        // Initializing the salary field
        this.salary = salary;
        // Initializing the jobTitle field
        this.jobTitle = jobTitle;
    }

    // Getter method for the name field
    public String getName() {
        return name;
    }

    // Getter method for the address field
    public String getAddress() {
        return address;
    }

    // Getter method for the salary field
    public double getSalary() {
        return salary;
    }

    // Getter method for the jobTitle field
    public String getJobTitle() {
        return jobTitle;
    }

    // Method to calculate the bonus for the employee
    public double calculateBonus() {
        // Default implementation for bonus calculation
        return 0.0;
    }

    // Method to generate the performance report for the employee
    public String generatePerformanceReport() {
        // Default implementation for performance report
        return "No performance report available.";
    }
} 
