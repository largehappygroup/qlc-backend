// HRManager.java
// Child class HRManager
public class HRManager extends Employee {

    // Constructor to initialize the salary of the HRManager
    public HRManager(int salary) {
        // Call the parent class constructor with the salary
        super(salary);
    }

    // Overridden method to simulate the HRManager working
    public void work() {
        // Print a message indicating the HRManager is managing employees
        System.out.println("\nManaging employees");
    }

    // Method to simulate adding a new employee
    public void addEmployee() {
        // Print a message indicating a new employee is being added
        System.out.println("\nAdding new employee!");
    }
}
