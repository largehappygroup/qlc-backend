// Main method to test the Book class
 public class Main {
    public static void main(String[] args) {
        // Create a new Book object
        Book book = new Book();

        // Set the title, author, and price of the book
        book.setTitle("Java Programming");
        book.setAuthor("Imani Matey");
        book.setPrice(35.0);

        // Apply a 10% discount to the book price
        book.applyDiscount(10);

        // Print the details of the book
        System.out.println("Title: " + book.getTitle());
        System.out.println("Author: " + book.getAuthor());
        System.out.println("Price: $" + book.getPrice());
    }
 }
