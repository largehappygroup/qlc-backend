// Programmer.java
// Subclass Programmer

// Define the Programmer class as a subclass of Employee
class Programmer extends Employee {

    // Declare private double variables baseSalary and overtimePay
    private double baseSalary;
    private double overtimePay;

    // Constructor for Programmer class that takes name, baseSalary, and overtimePay as parameters
    public Programmer(String name, double baseSalary, double overtimePay) {
        // Call the constructor of the superclass Employee with name and role "Programmer"
        super(name, "Programmer");
        // Assign the parameter baseSalary to the instance variable baseSalary
        this.baseSalary = baseSalary;
        // Assign the parameter overtimePay to the instance variable overtimePay
        this.overtimePay = overtimePay;
    }

    // Override the calculateSalary method from the Employee class
    @Override
    public double calculateSalary() {
        // Calculate and return the salary of the programmer by adding baseSalary and overtimePay
        return baseSalary + overtimePay;
    }
}
