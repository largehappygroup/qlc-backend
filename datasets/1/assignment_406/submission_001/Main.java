// Main.java
// Main class
public class Main {

    // Main method
    public static void main(String[] args) {
        // Create an Employee object with a salary of 40000
        Employee emp = new Employee(40000);

        // Create an HRManager object with a salary of 70000
        HRManager mgr = new HRManager(70000);

        // Call the work method on the Employee object
        emp.work();

        // Print the salary of the Employee object
        System.out.println("Employee salary: " + emp.getSalary());

        // Call the work method on the HRManager object
        mgr.work();

        // Print the salary of the HRManager object
        System.out.println("Manager salary: " + mgr.getSalary());

        // Call the addEmployee method on the HRManager object
        mgr.addEmployee();
    }
}
