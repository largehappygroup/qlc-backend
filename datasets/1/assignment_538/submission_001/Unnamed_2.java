// Define the ResidentialBuilding class that extends Building
class ResidentialBuilding extends Building {
    // Additional attribute for ResidentialBuilding
    int numberOfApartments;
    double rentPerApartment;

    // Constructor for the ResidentialBuilding class
    public ResidentialBuilding(String address, int numberOfFloors, double totalArea, int numberOfApartments, double rentPerApartment) {
        super(address, numberOfFloors, totalArea); // Call the constructor of the superclass
        this.numberOfApartments = numberOfApartments;
        this.rentPerApartment = rentPerApartment;
    }

    // Method to calculate total rent for ResidentialBuilding
    public double calculateTotalRent() {
        return numberOfApartments * rentPerApartment;
    }

    // Override the displayInfo method to include additional details
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Number of Apartments: " + numberOfApartments);
        System.out.println("Rent per Apartment: $" + rentPerApartment);
        System.out.println("Total Rent: $" + calculateTotalRent());
    }
}
