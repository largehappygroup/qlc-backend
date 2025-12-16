// Define the Dog class that extends Pet
class Dog extends Pet {
    // Additional attribute for Dog
    String favoriteToy;

    // Constructor for the Dog class
    public Dog(String name, int age, String favoriteToy) {
        super(name, "Dog", age); // Call the constructor of the superclass
        this.favoriteToy = favoriteToy;
    }

    // Override the displayDetails method to include favorite toy
    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Favorite Toy: " + favoriteToy);
    }
}
