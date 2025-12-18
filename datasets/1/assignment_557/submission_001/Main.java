// Main.java
// Main class

// Define the Main class
public class Main {

    // Main method that serves as the entry point for the application
    public static void main(String[] args) {

        // Create a Manager object with name "Lilo Heidi", baseSalary 7500.0, and bonus 1500.0
        Employee emp1 = new Manager("Lilo Heidi", 7500.0, 1500.0);

        // Create a Programmer object with name "Margrit Cathrin", baseSalary 5000.0, and overtimePay 600.0
        Employee emp2 = new Programmer("Margrit Cathrin", 5000.0, 600.0);

        // Print the name, role, and salary of the Manager object
        System.out.println("Manager: " + emp1.getName() + "\nRole: " + emp1.getRole() + "\nSalary: $" + emp1.calculateSalary());

        // Print the name, role, and salary of the Programmer object
        System.out.println("\nProgrammer: " + emp2.getName() + "\nRole: " + emp2.getRole() + "\nSalary: $" + emp2.calculateSalary());
    }
}
