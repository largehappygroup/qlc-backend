// Hotel.java
// Define the Hotel class
public class Hotel {
  // Declare an integer variable to store the hotel ID
  private int hotelId;
  // Declare a string variable to store the guest name
  private String name;
  // Declare a string variable to store the location of the hotel
  private String location;
  // Declare a string variable to store the check-in date
  private String checkIn;
  // Declare a string variable to store the check-out date
  private String checkOut;
  // Declare an integer variable to store the number of guests
  private int numGuests;
  // Declare a double variable to store the price of the stay
  private double price;
  // Declare an integer variable to store the confirmation number
  private int confirmationNumber;

  // Constructor to initialize the Hotel object with provided details
  public Hotel(int hotelId, String name, String location, String checkIn, String checkOut, int numGuests, double price) {
    // Initialize the hotel ID
    this.hotelId = hotelId;
    // Initialize the guest name
    this.name = name;
    // Initialize the location of the hotel
    this.location = location;
    // Initialize the check-in date
    this.checkIn = checkIn;
    // Initialize the check-out date
    this.checkOut = checkOut;
    // Initialize the number of guests
    this.numGuests = numGuests;
    // Initialize the price of the stay
    this.price = price;
  }

  // Method to get the hotel ID
  public int getHotelId() {
    return hotelId;
  }

  // Method to get the guest name
  public String getName() {
    return name;
  }

  // Method to get the location of the hotel
  public String getLocation() {
    return location;
  }

  // Method to get the check-in date
  public String getCheckIn() {
    return checkIn;
  }

  // Method to get the check-out date
  public String getCheckOut() {
    return checkOut;
  }

  // Method to get the price of the stay
  public double getPrice() {
    return price;
  }

  // Method to get the number of guests
  public int getNumGuests() {
    return numGuests;
  }

  // Method to get the confirmation number
  public int getConfirmationNumber() {
    return confirmationNumber;
  }

  // Method to set the confirmation number
  public void setConfirmationNumber(int confirmationNumber) {
    this.confirmationNumber = confirmationNumber;
  }
}
