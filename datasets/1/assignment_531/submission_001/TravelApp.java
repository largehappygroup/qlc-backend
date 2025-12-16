// TravelApp.java
// Import the ArrayList class
import java.util.ArrayList;
// Import the Random class
import java.util.Random;

// Define the TravelApp class
public class TravelApp {
  // Declare an ArrayList to store flights
  private ArrayList flights;
  // Declare an ArrayList to store hotels
  private ArrayList hotels;

  // Constructor to initialize the ArrayLists
  public TravelApp() {
    // Initialize the flights ArrayList
    this.flights = new ArrayList();
    // Initialize the hotels ArrayList
    this.hotels = new ArrayList();
  }

  // Method to search for flights
  public void searchFlights(String origin, String destination, String date, int numPassengers) {
    // Print the search details for flights
    System.out.println("Searching for flights from " + origin + " to " + destination + " on " + date + " for " + numPassengers + " passengers.");
  }

  // Method to search for hotels
  public void searchHotels(String location, String checkIn, String checkOut, int numGuests) {
    // Print the search details for hotels
    System.out.println("Searching for hotels in " + location + " from " + checkIn + " to " + checkOut + " for " + numGuests + " guests.");
  }

  // Method to book a flight
  public void bookFlight(int flightNumber, String passengerName, String origin, String destination, String date, int numPassengers, double price) {
    // Create a new Flight object with the provided details
    Flight flight = new Flight(flightNumber, passengerName, origin, destination, date, numPassengers, price);
    // Generate a confirmation number
    int confirmationNumber = generateConfirmationNumber();
    // Set the confirmation number for the flight
    flight.setConfirmationNumber(confirmationNumber);
    // Add the flight to the flights ArrayList
    this.flights.add(flight);
    // Print the confirmation number for the booked flight
    System.out.println("Flight booked! Confirmation number: " + confirmationNumber);
  }

  // Method to book a hotel
  public void bookHotel(int hotelId, String guestName, String location, String checkIn, String checkOut, int numGuests, double price) {
    // Create a new Hotel object with the provided details
    Hotel hotel = new Hotel(hotelId, guestName, location, checkIn, checkOut, numGuests, price);
    // Generate a confirmation number
    int confirmationNumber = generateConfirmationNumber();
    // Set the confirmation number for the hotel
    hotel.setConfirmationNumber(confirmationNumber);
    // Add the hotel to the hotels ArrayList
    this.hotels.add(hotel);
    // Print the confirmation number for the booked hotel
    System.out.println("Hotel booked! Confirmation number: " + confirmationNumber);
  }

  // Method to cancel a reservation
  public void cancelReservation(int confirmationNumber) {
    // Loop through the flights ArrayList to find the reservation
    for (Flight flight : this.flights) {
      // If the confirmation number matches, remove the flight reservation
      if (flight.getConfirmationNumber() == confirmationNumber) {
        this.flights.remove(flight);
        // Print the cancellation message for the flight
        System.out.println("Flight reservation with confirmation number " + confirmationNumber + " cancelled.");
        return;
      }
    }
    // Loop through the hotels ArrayList to find the reservation
    for (Hotel hotel : this.hotels) {
      // If the confirmation number matches, remove the hotel reservation
      if (hotel.getConfirmationNumber() == confirmationNumber) {
        this.hotels.remove(hotel);
        // Print the cancellation message for the hotel
        System.out.println("Hotel reservation with confirmation number " + confirmationNumber + " cancelled.");
        return;
      }
    }
    // Print a message if no reservation is found with the provided confirmation number
    System.out.println("No reservation found with confirmation number " + confirmationNumber + ".");
  }

  // Method to generate a random 6-digit confirmation number
  private int generateConfirmationNumber() {
    // Create a Random object
    Random rand = new Random();
    // Generate and return a random 6-digit number
    return rand.nextInt(900000) + 100000;
  }
} 
