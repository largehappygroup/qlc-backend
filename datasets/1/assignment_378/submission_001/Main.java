// Main.java
// Main Class

public class Main {
    public static void main(String[] args) {
        // Create an instance of Employee
        Employee employee = new Employee();

        // Set values using setter methods
        employee.setEmployeeId(15);
        employee.setEmployeeName("Caelius Dathan");
        employee.setEmployeeSalary(4900.0);

        // Get values using getter methods
        int employeeId = employee.getEmployeeId();
        String employeeName = employee.getEmployeeName();
        String formattedSalary = employee.getFormattedSalary();

        // Print the values
		System.out.println("Employee Details:");
        System.out.println("ID: " + employeeId);
        System.out.println("Name: " + employeeName);
        System.out.println("Salary: " + formattedSalary);
    }
}
