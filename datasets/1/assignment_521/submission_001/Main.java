// Define the Main class
public class Main {
    // Define the main method which is the entry point of the program
    public static void main(String[] args) {
        // Create an instance of the Person class with the name "Ean Craig" and age 11
        Person person1 = new Person("Ean Craig", 11);
        // Create another instance of the Person class with the name "Evan Ross" and age 12
        Person person2 = new Person("Evan Ross", 12);

        // Print the name and age of person1 to the console
        System.out.println(person1.getName() + " is " + person1.getAge() + " years old.");
        // Print the name and age of person2 to the console
        System.out.println(person2.getName() + " is " + person2.getAge() + " years old.\n");

        // Modify the age of person1 using the setter methods
        person1.setAge(14);
        // Modify the name and age of person2 using the setter methods
        person2.setName("Lewis Jordan");
        person2.setAge(12);
        System.out.println("Set new age and name:");
        // Print the updated name and age of person1 to the console
        System.out.println(person1.getName() + " is now " + person1.getAge() + " years old.");
        // Print the updated name and age of person2 to the console
        System.out.println(person2.getName() + " is now " + person2.getAge() + " years old.");
    }
} 
