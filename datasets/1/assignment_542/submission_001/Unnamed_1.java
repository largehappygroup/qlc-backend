// Define the Pet class
class Pet {
    // Attributes for the Pet class
    String name;
    String species;
    int age;

    // Constructor for the Pet class
    public Pet(String name, String species, int age) {
        this.name = name;
        this.species = species;
        this.age = age;
    }

    // Method to display pet details
    public void displayDetails() {
        System.out.println("Name: " + name);
        System.out.println("Species: " + species);
        System.out.println("Age: " + age + " years");
    }

    // Method to calculate pet's age in human years
    public int calculateHumanAge() {
        if (species.equals("Dog")) {
            return age * 7;
        } else {
            // Assuming bird's age in human years is the same as actual age
            return age;
        }
    }
}
