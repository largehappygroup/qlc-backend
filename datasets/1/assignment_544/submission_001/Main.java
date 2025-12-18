// Main class to test the GymMembership and PremiumMembership classes
public class Main {
    public static void main(String[] args) {
        // Create an instance of GymMembership
        GymMembership basicMember = new GymMembership("Njeri Inka", "Monthly", 6);

        // Create an instance of PremiumMembership
        PremiumMembership premiumMember = new PremiumMembership("Willy Diantha", "Annual", 12, true, true);

        // Display details of the basic membership
        System.out.println("Basic Membership Details:");
        basicMember.displayDetails();

        // Display details of the premium membership
        System.out.println("\nPremium Membership Details:");
        premiumMember.displayDetails();
    }
}
