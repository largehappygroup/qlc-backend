// Main class to test the Building, ResidentialBuilding, and CommercialBuilding classes
public class Main {
    public static void main(String[] args) {
        // Create an instance of ResidentialBuilding
        ResidentialBuilding residentialBuilding = new ResidentialBuilding("99 ABC Street.", 10, 2500.0, 20, 1000.0);

        // Create an instance of CommercialBuilding
        CommercialBuilding commercialBuilding = new CommercialBuilding("100 PQR Business Avenue.", 15, 4500.0, 3000.0, 20.0);

        // Display information about the residential building
        System.out.println("Residential Building Info:");
        residentialBuilding.displayInfo();

        // Display information about the commercial building
        System.out.println("\nCommercial Building Info:");
        commercialBuilding.displayInfo();
    }
}
