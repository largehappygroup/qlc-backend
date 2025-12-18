// Main class to test the Pet, Dog, and Bird classes
public class Main {
    public static void main(String[] args) {
        // Create an instance of Dog
        Dog dog = new Dog("Cooper", 3, "Ball");

        // Create an instance of Bird
        Bird bird = new Bird("Pelican", 2, 0.5);

        // Display details of the dog
        System.out.println("Dog Details:");
        dog.displayDetails();
        System.out.println("Dog's age in human years: " + dog.calculateHumanAge());

        // Display details of the bird
        System.out.println("\nBird Details:");
        bird.displayDetails();
        System.out.println("Bird's age in human years: " + bird.calculateHumanAge());
    }
}
