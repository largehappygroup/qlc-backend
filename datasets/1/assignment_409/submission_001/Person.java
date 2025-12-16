// Person.java
// Parent class Person

// Define the Person class
public class Person {
    // Private fields for first name and last name
    private String firstName;
    private String lastName;

    // Constructor to initialize first name and last name
    public Person(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Method to get the first name
    public String getFirstName() {
        return firstName;
    }

    // Method to get the last name
    public String getLastName() {
        return lastName;
    }
} 
