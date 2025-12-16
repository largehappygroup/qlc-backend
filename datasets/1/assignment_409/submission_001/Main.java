// Main.java
// Main class

// Declare the Main class
public class Main {
    
    // Main method to execute the program
    public static void main(String[] args) {
        
        // Create an Employee object named employee1 with first name, last name, employee ID, and job title
        Employee employee1 = new Employee("Kortney", "Rosalee", 4451, "HR Manager");
        
        // Print the first name, last name with job title, and employee ID of employee1
        System.out.println(employee1.getFirstName() + " " + employee1.getLastName() + " (" + employee1.getEmployeeId() + ")");
        
        // Create an Employee object named employee2 with first name, last name, employee ID, and job title
        Employee employee2 = new Employee("Junior", "Philipa", 4452, "Software Manager");
        
        // Print the first name, last name with job title, and employee ID of employee2
        System.out.println(employee2.getFirstName() + " " + employee2.getLastName() + " (" + employee2.getEmployeeId() + ")");
    }
} 
