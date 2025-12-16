// Main method to test the Book class
 public class Main {
    // Main method to test the Smartphone class
    public static void main(String[] args) {
        // Create a new Smartphone object
        Smartphone phone = new Smartphone();

        // Set the brand, model, and initial storage capacity of the phone
        phone.setBrand("SmartMobile");
        phone.setModel("W1000");
        phone.setStorageCapacity(60);

        // Increase the storage capacity by 30
        phone.increaseStorage(30);

        // Print the details of the phone
        System.out.println("Brand: " + phone.getBrand());
        System.out.println("Model: " + phone.getModel());
        System.out.println("Storage Capacity: " + phone.getStorageCapacity() + "GB");
    }
 }
