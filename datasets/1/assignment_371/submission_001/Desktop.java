// Define the Desktop class
public class Desktop {
    // Private instance variables
    private String brand;
    private String processor;
    private int ramSize;

    // Public getter for the brand variable
    public String getBrand() {
        return brand;
    }

    // Public setter for the brand variable
    public void setBrand(String brand) {
        this.brand = brand;
    }

    // Public getter for the processor variable
    public String getProcessor() {
        return processor;
    }

    // Public setter for the processor variable
    public void setProcessor(String processor) {
        this.processor = processor;
    }

    // Public getter for the ramSize variable
    public int getRamSize() {
        return ramSize;
    }

    // Public setter for the ramSize variable
    public void setRamSize(int ramSize) {
        this.ramSize = ramSize;
    }

    // Method to upgrade the RAM size by a given value
    public void upgradeRam(int additionalRam) {
        if (additionalRam > 0) {
            this.ramSize += additionalRam;
        }
    }
}
