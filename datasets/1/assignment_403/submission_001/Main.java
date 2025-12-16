// Public class declaration for Main
public class Main {
    // Main method
    public static void main(String[] args) {
        // Creating an instance of Manager
        Manager manager = new Manager("Avril Aroldo", "1 ABC St", 80000.0, "Manager", 5);
        // Creating an instance of Developer
        Developer developer = new Developer("Iver Dipali", "2 PQR St", 72000.0, "Developer", "Java");
        // Creating an instance of Programmer
        Programmer programmer = new Programmer("Yaron Gabriel", "3 ABC St", 76000.0, "Python");

        // Printing the manager's bonus
        System.out.println("Manager's Bonus: $" + manager.calculateBonus());
        // Printing the developer's bonus
        System.out.println("Developer's Bonus: $" + developer.calculateBonus());
        // Printing the programmer's bonus
        System.out.println("Programmer's Bonus: $" + programmer.calculateBonus());

        // Printing the manager's performance report
        System.out.println(manager.generatePerformanceReport());
        // Printing the developer's performance report
        System.out.println(developer.generatePerformanceReport());
        // Printing the programmer's performance report
        System.out.println(programmer.generatePerformanceReport());

        // Manager managing a project
        manager.manageProject();
        // Developer writing code
        developer.writeCode();
        // Programmer debugging code
        programmer.debugCode();
    }
} 
