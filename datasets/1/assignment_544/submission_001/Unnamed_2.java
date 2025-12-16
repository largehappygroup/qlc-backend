// Define the PremiumMembership class that extends GymMembership
class PremiumMembership extends GymMembership {
    // Additional attributes for PremiumMembership
    boolean personalTrainerAvailable;
    boolean spaAccess;

    // Constructor for PremiumMembership
    public PremiumMembership(String memberName, String membershipType, int duration, boolean personalTrainerAvailable, boolean spaAccess) {
        super(memberName, membershipType, duration);
        this.personalTrainerAvailable = personalTrainerAvailable;
        this.spaAccess = spaAccess;
    }

    // Override the calculateFees method to include additional costs
    @Override
    public double calculateFees() {
        double baseFee = super.calculateFees();
        double additionalFee = 0.0;

        if (personalTrainerAvailable) {
            additionalFee += 30.0 * duration; // Additional fee per month for personal trainer
        }
        if (spaAccess) {
            additionalFee += 20.0 * duration; // Additional fee per month for spa access
        }
        return baseFee + additionalFee;
    }

    // Override the displayDetails method to include premium details
    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Personal Trainer Available: " + (personalTrainerAvailable ? "Yes" : "No"));
        System.out.println("Spa Access: " + (spaAccess ? "Yes" : "No"));
    }
}
