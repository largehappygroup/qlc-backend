// Import necessary classes for date handling
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

// Define the CustomerOrder class
public class CustomerOrder {
    // Attributes for order ID, customer, and order date
    private String orderId;
    private String customer;
    private LocalDate orderDate;

    // Constructor to initialize the CustomerOrder object
    public CustomerOrder(String orderId, String customer, LocalDate orderDate) {
        this.orderId = orderId;
        this.customer = customer;
        this.orderDate = orderDate;
    }

    // Getter for order ID
    public String getOrderId() {
        return orderId;
    }

    // Getter for customer
    public String getCustomer() {
        return customer;
    }

    // Getter for order date
    public LocalDate getOrderDate() {
        return orderDate;
    }

    // Method to display order details
    public void displayOrderDetails() {
        System.out.println("Order ID: " + orderId);
        System.out.println("Customer: " + customer);
        System.out.println("Order Date: " + orderDate);
    }
}
