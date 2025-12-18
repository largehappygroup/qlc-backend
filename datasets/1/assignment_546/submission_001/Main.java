//Main.java
// Import the ArrayList class from the java.util package
import java.util.ArrayList;

// Define the Main class
public class Main {
    // Define the main method which is the entry point of the program
    public static void main(String[] args) {
        // Create an instance of the Book class with the title "The C Programming Language", author "Dennis Ritchie, Brian Kernighan", and ISBN "9780131101630"
        Book book1 = new Book("The C Programming Language", "Dennis Ritchie, Brian Kernighan", "9780131101630");
        // Create another instance of the Book class with the title "An Introduction to Python", author "Guido van Rossum", and ISBN "9355423489"
        Book book2 = new Book("An Introduction to Python", "Guido van Rossum", "9355423489");
        
        // Add book1 to the book collection
        Book.add_Book(book1);
        // Add book2 to the book collection
        Book.add_Book(book2);
        
        // Retrieve the book collection and store it in an ArrayList named bookCollection
        ArrayList<Book> bookCollection = Book.get_BookCollection();
        
        // Print a heading for the list of books
        System.out.println("List of books:");
        
        // Iterate over each book in the bookCollection
        for (Book book : bookCollection) {
            // Print the title, author, and ISBN of each book
            System.out.println(book.get_Title() + " by " + book.get_Author() + ", ISBN: " + book.get_ISBN());
        }
        
        // Remove book1 from the book collection
        Book.remove_Book(book1);
        
        // Print a message indicating that book1 has been removed
        System.out.println("\nAfter removing " + book1.get_Title() + ":");
        
        // Print a heading for the updated list of books
        System.out.println("List of books:");
        
        // Iterate over each book in the bookCollection
        for (Book book : bookCollection) {
            // Print the title, author, and ISBN of each book
            System.out.println(book.get_Title() + " by " + book.get_Author() + ", ISBN: " + book.get_ISBN());
        }
    }
}
