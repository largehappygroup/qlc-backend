// Main.java

// Define the Main class
public class Main {
  // Main method, entry point of the program
  public static void main(String[] args) {
    // Create a new instance of the Library class
    Library library = new Library();

    // Create new Book objects with title and author
    Book book1 = new Book("Adventures of Tom Sawyer", "Mark Twain");
    Book book2 = new Book("Ben Hur", "Lewis Wallace");
    Book book3 = new Book("Time Machine", "H.G. Wells");
    Book book4 = new Book("Anna Karenina", "Leo Tolstoy");

    // Add the books to the library
    library.addBook(book1);
    library.addBook(book2);
    library.addBook(book3);
    library.addBook(book4);

    // Print a message to indicate the books in the library
    System.out.println("Books in the library:");
    // Iterate through the list of books in the library
    for (Book book : library.getBooks()) {
      // Print the title and author of each book
      System.out.println(book.getTitle() + " by " + book.getAuthor());
    }

    // Remove a book from the library
    library.removeBook(book2);
    // Print a message to indicate the books in the library after removal
    System.out.println("\nBooks in the library after removing " + book2.getTitle() + ":");
    // Iterate through the updated list of books in the library
    for (Book book : library.getBooks()) {
      // Print the title and author of each book
      System.out.println(book.getTitle() + " by " + book.getAuthor());
    }
  }
} 
