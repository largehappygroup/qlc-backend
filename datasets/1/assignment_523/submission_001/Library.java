// Library.java
// Import the ArrayList class from the java.util package
import java.util.ArrayList;

// Define the Library class
public class Library {
  // Private field to store a list of Book objects
  private ArrayList<Book> books;

  // Constructor to initialize the books field
  public Library() {
    // Create a new ArrayList to hold Book objects
    books = new ArrayList<Book>();
  }

  // Method to add a Book to the books list
  public void addBook(Book book) {
    // Add the specified book to the books list
    books.add(book);
  }

  // Method to remove a Book from the books list
  public void removeBook(Book book) {
    // Remove the specified book from the books list
    books.remove(book);
  }

  // Method to get the list of books
  public ArrayList<Book> getBooks() {
    // Return the list of books
    return books;
  }
}

