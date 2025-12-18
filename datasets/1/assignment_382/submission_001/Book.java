// Define the Book class
public class Book {
    // Private instance variables
    private String title;
    private String author;
    private double price;

    // Public getter for the title variable
    public String getTitle() {
        return title;
    }

    // Public setter for the title variable
    public void setTitle(String title) {
        this.title = title;
    }

    // Public getter for the author variable
    public String getAuthor() {
        return author;
    }

    // Public setter for the author variable
    public void setAuthor(String author) {
        this.author = author;
    }

    // Public getter for the price variable
    public double getPrice() {
        return price;
    }

    // Public setter for the price variable
    public void setPrice(double price) {
        this.price = price;
    }

    // Method to apply a discount to the price
    public void applyDiscount(double percentage) {
        if (percentage > 0 && percentage <= 100) {
            this.price -= this.price * (percentage / 100);
        }
    }
 }
