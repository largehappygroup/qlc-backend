// Main.java
// Import the LocalDate class from the java.time package
import java.time.LocalDate;

// Define the Main class
public class Main {
  
  // Main method, the entry point of the Java application
  public static void main(String[] args) {
    
    // Create a new Employee object named employee1 with name "Roberta Petrus", salary 50000, and hire date "2021-04-01"
    Employee employee1 = new Employee("Roberta Petrus", 50000, LocalDate.parse("2021-04-01"));
    
    // Create a new Employee object named employee2 with name "Loyd Blair", salary 70000, and hire date "2015-04-01"
    Employee employee2 = new Employee("Loyd Blair", 70000, LocalDate.parse("2015-04-01"));
    
    // Create a new Employee object named employee3 with name "Magdalena Artemon", salary 50000, and hire date "2011-01-15"
    Employee employee3 = new Employee("Magdalena Artemon", 50000, LocalDate.parse("2011-01-15"));

    // Print the details of employee1
    employee1.printEmployeeDetails();
    
    // Print the years of service of employee1
    System.out.println("Years of Service: " + employee1.getYearsOfService());
    
    // Print the details of employee2
    employee2.printEmployeeDetails();
    
    // Print the years of service of employee2
    System.out.println("Years of Service: " + employee2.getYearsOfService());
    
    // Print the details of employee3
    employee3.printEmployeeDetails();
    
    // Print the years of service of employee3
    System.out.println("Years of Service: " + employee3.getYearsOfService());
  }
}
