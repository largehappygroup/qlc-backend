// Book.java
// Define the Book class
public class Book {
  // Private field to store the title of the book
  private String title;
  // Private field to store the author of the book
  private String author;

  // Constructor to initialize the title and author fields
  public Book(String title, String author) {
    // Assign the title parameter to the title field
    this.title = title;
    // Assign the author parameter to the author field
    this.author = author;
  }

  // Getter method for the title field
  public String getTitle() {
    // Return the value of the title field
    return title;
  }

  // Setter method for the title field
  public void setTitle(String title) {
    // Assign the title parameter to the title field
    this.title = title;
  }

  // Getter method for the author field
  public String getAuthor() {
    // Return the value of the author field
    return author;
  }

  // Setter method for the author field
  public void setAuthor(String author) {
    // Assign the author parameter to the author field
    this.author = author;
  }
} 
