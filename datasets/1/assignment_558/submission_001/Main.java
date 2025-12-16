// Main.java
// Main class
public class Main {  // Declare the Main class
    public static void main(String[] args) {  // Define the main method
        Sports sports = new Sports();  // Create an instance of the Sports class
        Football football = new Football();  // Create an instance of the Football class
        Basketball basketball = new Basketball();  // Create an instance of the Basketball class
        Rugby rugby = new Rugby();  // Create an instance of the Rugby class

        sports.play();  // Call the play method on the Sports instance
        football.play();  // Call the play method on the Football instance
        basketball.play();  // Call the play method on the Basketball instance
        rugby.play();  // Call the play method on the Rugby instance
    }
} 
