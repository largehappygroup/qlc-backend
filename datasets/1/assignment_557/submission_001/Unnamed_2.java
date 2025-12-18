// Manager.java
// Subclass Manager

// Define the Manager class as a subclass of Employee
class Manager extends Employee {

    // Declare private double variables baseSalary and bonus
    private double baseSalary;
    private double bonus;

    // Constructor for Manager class that takes name, baseSalary, and bonus as parameters
    public Manager(String name, double baseSalary, double bonus) {
        // Call the constructor of the superclass Employee with name and role "Manager"
        super(name, "Manager");
        // Assign the parameter baseSalary to the instance variable baseSalary
        this.baseSalary = baseSalary;
        // Assign the parameter bonus to the instance variable bonus
        this.bonus = bonus;
    }

    // Override the calculateSalary method from the Employee class
    @Override
    public double calculateSalary() {
        // Calculate and return the salary of the manager by adding baseSalary and bonus
        return baseSalary + bonus;
    }
} 
