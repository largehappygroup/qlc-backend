// Main.java
// Define the Main class
public class Main {
  // Main method, the entry point of the application
  public static void main(String[] args) {
    // Create a new TravelApp object
    TravelApp app = new TravelApp();
    // Search for flights from New York to London on 2022-09-01 for 1 passenger
    app.searchFlights("New York", "London", "2022-09-01", 1);
    // Search for hotels in London from 2022-08-01 to 2022-09-05 for 2 guests
    app.searchHotels("London", "2022-08-01", "2022-09-05", 2);
    // Book a flight with flight number 12345670 for Martin Nadine from New York to London on 2022-08-01 for 1 passenger with a price of $700.00
    app.bookFlight(12345670, "Martin Nadine", "New York", "London", "2022-08-01", 1, 700.00);
    // Book a flight with flight number 67843513 for Jennifer Ulrike from New York to London on 2022-08-01 for 1 passenger with a price of $655.00
    app.bookFlight(67843513, "Jennifer Ulrike", "New York", "London", "2022-08-01", 1, 655.00);
    // Book a hotel with hotel ID 98765432 for Martin Nadine in London from 2022-09-01 to 2022-09-05 for 1 guest with a price of $100.00
    app.bookHotel(98765432, "Martin Nadine", "London", "2022-09-01", "2022-09-05", 1, 100.00);
    // Cancel the reservation with confirmation number 12345670
    app.cancelReservation(12345670);
  }
} 
