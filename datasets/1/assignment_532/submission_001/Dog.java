// Define the Dog class
public class Dog {
    // Declare a private variable to store the name of the dog
    private String name;
    // Declare a private variable to store the breed of the dog
    private String breed;

    // Constructor for the Dog class that initializes the name and breed variables
    public Dog(String name, String breed) {
        // Set the name variable to the provided name parameter
        this.name = name;
        // Set the breed variable to the provided breed parameter
        this.breed = breed;
    }

    // Method to retrieve the name of the dog
    public String getName() {
        // Return the value of the name variable
        return name;
    }

    // Method to set the name of the dog
    public void setName(String name) {
        // Set the name variable to the provided name parameter
        this.name = name;
    }

    // Method to retrieve the breed of the dog
    public String getBreed() {
        // Return the value of the breed variable
        return breed;
    }

    // Method to set the breed of the dog
    public void setBreed(String breed) {
        // Set the breed variable to the provided breed parameter
        this.breed = breed;
    }
} 
