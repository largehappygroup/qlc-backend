// Bird.java
class Bird extends Animal {  // Declare the Bird class that extends the Animal class
    @Override  // Override the move method from the Animal class
    public void move() {  // Define the move method
        System.out.println("Bird flies");  // Print "Bird flies" to the console
    }

    @Override  // Override the makeSound method from the Animal class
    public void makeSound() {  // Define the makeSound method
        System.out.println("Bird chirps");  // Print "Bird chirps" to the console
    }
}
