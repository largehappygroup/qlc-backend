//Employee.java
// Define the Employee class
public class Employee {
    // Declare a private variable to store the name of the employee
    private String name;
    // Declare a private variable to store the job title of the employee
    private String jobTitle;
    // Declare a private variable to store the salary of the employee
    private double salary;

    // Constructor for the Employee class that initializes the name, job title, and salary variables
    public Employee(String name, String jobTitle, double salary) {
        // Set the name variable to the provided name parameter
        this.name = name;
        // Set the jobTitle variable to the provided jobTitle parameter
        this.jobTitle = jobTitle;
        // Set the salary variable to the provided salary parameter
        this.salary = salary;
    }

    // Method to retrieve the name of the employee
    public String getName() {
        // Return the value of the name variable
        return name;
    }

    // Method to set the name of the employee
    public void setName(String name) {
        // Set the name variable to the provided name parameter
        this.name = name;
    }

    // Method to retrieve the job title of the employee
    public String getJobTitle() {
        // Return the value of the jobTitle variable
        return jobTitle;
    }

    // Method to set the job title of the employee
    public void setJobTitle(String jobTitle) {
        // Set the jobTitle variable to the provided jobTitle parameter
        this.jobTitle = jobTitle;
    }

    // Method to retrieve the salary of the employee
    public double getSalary() {
        // Return the value of the salary variable
        return salary;
    }

    // Method to set the salary of the employee
    public void setSalary(double salary) {
        // Set the salary variable to the provided salary parameter
        this.salary = salary;
    }

    // Method to raise the salary of the employee by a given percentage
    public void raiseSalary(double percentage) {
        // Calculate the new salary by increasing the current salary by the given percentage
        salary = salary + salary * percentage / 100;
    }

    // Method to print the details of the employee
    public void printEmployeeDetails() {
        // Print the name of the employee
        System.out.println("Name: " + name);
        // Print the job title of the employee
        System.out.println("Job Title: " + jobTitle);
        // Print the salary of the employee
        System.out.println("Salary: " + salary);
    }
}
