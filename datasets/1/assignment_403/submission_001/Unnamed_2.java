// Class declaration for Manager which extends Employee
class Manager extends Employee {
    // Private field for the number of subordinates
    private int numberOfSubordinates;

    // Constructor for the Manager class
    public Manager(String name, String address, double salary, String jobTitle, int numberOfSubordinates) {
        // Calling the constructor of the superclass Employee
        super(name, address, salary, jobTitle);
        // Initializing the numberOfSubordinates field
        this.numberOfSubordinates = numberOfSubordinates;
    }

    // Getter method for the numberOfSubordinates field
    public int getNumberOfSubordinates() {
        return numberOfSubordinates;
    }

    // Overridden method to calculate the bonus for the manager
    @Override
    public double calculateBonus() {
        // Custom implementation for bonus calculation for managers
        return getSalary() * 0.15;
    }

    // Overridden method to generate the performance report for the manager
    @Override
    public String generatePerformanceReport() {
        // Custom implementation for performance report for managers
        return "Performance report for Manager " + getName() + ": Excellent";
    }

    // Custom method for managing projects
    public void manageProject() {
        // Printing a message indicating the manager is managing a project
        System.out.println("Manager " + getName() + " is managing a project.");
    }
}
