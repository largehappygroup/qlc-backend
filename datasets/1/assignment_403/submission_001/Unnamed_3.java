// Class declaration for Developer which extends Employee
class Developer extends Employee {
    // Private field for the programming language
    private String programmingLanguage;

    // Constructor for the Developer class
    public Developer(String name, String address, double salary, String jobTitle, String programmingLanguage) {
        // Calling the constructor of the superclass Employee
        super(name, address, salary, jobTitle);
        // Initializing the programmingLanguage field
        this.programmingLanguage = programmingLanguage;
    }

    // Getter method for the programmingLanguage field
    public String getProgrammingLanguage() {
        return programmingLanguage;
    }

    // Overridden method to calculate the bonus for the developer
    @Override
    public double calculateBonus() {
        // Custom implementation for bonus calculation for developers
        return getSalary() * 0.10;
    }

    // Overridden method to generate the performance report for the developer
    @Override
    public String generatePerformanceReport() {
        // Custom implementation for performance report for developers
        return "Performance report for Developer " + getName() + ": Good";
    }

    // Custom method for writing code
    public void writeCode() {
        // Printing a message indicating the developer is writing code
        System.out.println("Developer " + getName() + " is writing code in " + programmingLanguage);
    }
}
