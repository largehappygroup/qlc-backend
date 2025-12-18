// Employee.java
// Base class Employee

// Define the Employee class
class Employee {

    // Declare private String variables name and role
    private String name;
    private String role;

    // Constructor for Employee class that takes name and role as parameters
    public Employee(String name, String role) {
        // Assign the parameter name to the instance variable name
        this.name = name;
        // Assign the parameter role to the instance variable role
        this.role = role;
    }

    // Public method to get the name of the employee
    public String getName() {
        // Return the name of the employee
        return name;
    }

    // Public method to get the role of the employee
    public String getRole() {
        // Return the role of the employee
        return role;
    }

    // Public method to calculate the salary of the employee
    public double calculateSalary() {
        // Return 0.0 as the default salary
        return 0.0;
    }
} 
