// Define the Main class
public class Main {
    // Define the main method which is the entry point of the program
    public static void main(String[] args) {
        // Create an instance of the Dog class with the name "Buddy" and breed "Golden Retriever"
        Dog dog1 = new Dog("Buddy", "Golden Retriever");
        // Create another instance of the Dog class with the name "Charlie" and breed "Bulldog"
        Dog dog2 = new Dog("Charlie", "Bulldog");

        // Print the name and breed of dog1 to the console
        System.out.println(dog1.getName() + " is a " + dog1.getBreed() + ".");
        // Print the name and breed of dog2 to the console
        System.out.println(dog2.getName() + " is a " + dog2.getBreed() + ".");

        // Print a message indicating that the breed of dog1 and the name of dog2 will be changed
        System.out.println("\nSet the new Breed of dog1 and new name of dog2:");
        // Change the breed of dog1 to "Labrador Retriever"
        dog1.setBreed("Labrador Retriever");
        // Change the name of dog2 to "Daisy"
        dog2.setName("Daisy");

        // Print the updated name and breed of dog1 to the console
        System.out.println(dog1.getName() + " is now a " + dog1.getBreed() + ".");
        // Print the updated name and breed of dog2 to the console
        System.out.println(dog2.getName() + " is now a " + dog2.getBreed() + ".");
    }
} 
