// Define the Smartphone class
public class Smartphone {
    // Private instance variables
    private String brand;
    private String model;
    private int storageCapacity;

    // Public getter for the brand variable
    public String getBrand() {
        return brand;
    }

    // Public setter for the brand variable
    public void setBrand(String brand) {
        this.brand = brand;
    }

    // Public getter for the model variable
    public String getModel() {
        return model;
    }

    // Public setter for the model variable
    public void setModel(String model) {
        this.model = model;
    }

    // Public getter for the storageCapacity variable
    public int getStorageCapacity() {
        return storageCapacity;
    }

    // Public setter for the storageCapacity variable
    public void setStorageCapacity(int storageCapacity) {
        this.storageCapacity = storageCapacity;
    }

    // Method to increase the storage capacity by a given value
    public void increaseStorage(int additionalStorage) {
        if (additionalStorage > 0) {
            this.storageCapacity += additionalStorage;
        }
    }
}
