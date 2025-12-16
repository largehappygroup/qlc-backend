// Class declaration for Programmer which extends Developer
class Programmer extends Developer {
    // Constructor for the Programmer class
    public Programmer(String name, String address, double salary, String programmingLanguage) {
        // Calling the constructor of the superclass Developer
        super(name, address, salary, "Programmer", programmingLanguage);
    }

    // Overridden method to calculate the bonus for the programmer
    @Override
    public double calculateBonus() {
        // Custom implementation for bonus calculation for programmers
        return getSalary() * 0.12;
    }

    // Overridden method to generate the performance report for the programmer
    @Override
    public String generatePerformanceReport() {
        // Custom implementation for performance report for programmers
        return "Performance report for Programmer " + getName() + ": Excellent";
    }

    // Custom method for debugging code
    public void debugCode() {
        // Printing a message indicating the programmer is debugging code
        System.out.println("Programmer " + getName() + " is debugging code in " + getProgrammingLanguage());
    }
} 
