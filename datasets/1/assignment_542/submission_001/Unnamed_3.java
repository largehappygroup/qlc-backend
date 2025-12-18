// Define the Bird class that extends Pet
class Bird extends Pet {
    // Additional attribute for Bird
    double wingSpan;

    // Constructor for the Bird class
    public Bird(String name, int age, double wingSpan) {
        super(name, "Bird", age); // Call the constructor of the superclass
        this.wingSpan = wingSpan;
    }

    // Override the displayDetails method to include wing span
    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Wing Span: " + wingSpan + " meters");
    }
}
