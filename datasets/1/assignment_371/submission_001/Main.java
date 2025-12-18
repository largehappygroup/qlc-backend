public class Main {
    // Main method to test the Desktop class
    public static void main(String[] args) {
        // Create a new Desktop object
        Desktop desktop = new Desktop();

        // Set the brand, processor, and initial RAM size of the desktop
        desktop.setBrand("ComputeMaster");
        desktop.setProcessor("Intel Core i7");
        desktop.setRamSize(32);

        // Upgrade the RAM size by 32 GB
        desktop.upgradeRam(32);

        // Print the details of the desktop
        System.out.println("Brand: " + desktop.getBrand());
        System.out.println("Processor: " + desktop.getProcessor());
        System.out.println("RAM Size: " + desktop.getRamSize() + "GB");
    }
 }
