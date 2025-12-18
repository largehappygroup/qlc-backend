// Define the GymMembership class
class GymMembership {
    // Attributes for GymMembership
    String memberName;
    String membershipType;
    int duration; // in months

    // Constructor for GymMembership
    public GymMembership(String memberName, String membershipType, int duration) {
        this.memberName = memberName;
        this.membershipType = membershipType;
        this.duration = duration;
    }

    // Method to calculate membership fees
    public double calculateFees() {
        double baseFee = 50.0; // Base fee per month
        return baseFee * duration;
    }

    // Method to check for special offers
    public String checkSpecialOffers() {
        if (membershipType.equalsIgnoreCase("annual")) {
            return "10% discount on annual membership.";
        } else {
            return "No special offers available.";
        }
    }

    // Method to display membership details
    public void displayDetails() {
        System.out.println("Member Name: " + memberName);
        System.out.println("Membership Type: " + membershipType);
        System.out.println("Duration: " + duration + " months");
        System.out.println("Membership Fees: $" + calculateFees());
        System.out.println("Special Offers: " + checkSpecialOffers());
    }
}
