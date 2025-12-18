// Define the CommercialBuilding class that extends Building
class CommercialBuilding extends Building {
    // Additional attribute for CommercialBuilding
    double officeSpace; // in square meters
    double rentPerSquareMeter;

    // Constructor for the CommercialBuilding class
    public CommercialBuilding(String address, int numberOfFloors, double totalArea, double officeSpace, double rentPerSquareMeter) {
        super(address, numberOfFloors, totalArea); // Call the constructor of the superclass
        this.officeSpace = officeSpace;
        this.rentPerSquareMeter = rentPerSquareMeter;
    }

    // Method to calculate total rent for CommercialBuilding
    public double calculateTotalRent() {
        return officeSpace * rentPerSquareMeter;
    }

    // Override the displayInfo method to include additional details
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Office Space: " + officeSpace + " sq meters");
        System.out.println("Rent per Square Meter: $" + rentPerSquareMeter);
        System.out.println("Total Rent: $" + calculateTotalRent());
    }
}
