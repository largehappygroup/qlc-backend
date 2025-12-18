public class Main {
    public static void main(String[] args) {
        // Define a string 'text' with a sentence
        String text = "Check two consecutive identical letters in a given string";
        System.out.println("Original text: " + text); // Display the original text
        
        // Reverse the words with odd lengths in the string and display the modified string
        System.out.println("\nReverses the words in the string that have odd lengths:\n" + test(text));
        
        // Change the value of 'text' to another sentence
        text = "Create a Date object using the Calendar class";
        System.out.println("\nOriginal text: " + text); // Display the original text
        
        // Reverse the words with odd lengths in the string and display the modified string
        System.out.println("\nReverses the words in the string that have odd lengths:\n" + test(text));
    }

    // Method to reverse words with odd lengths in a string
    public static String test(String str) {
        // Split the string into words using space as a delimiter
        String[] str_words = str.split(" ");
        
        // Iterate through each word in the array
        for (int i = 0; i < str_words.length; i++) {
            // Check if the length of the word is odd
            if (str_words[i].length() % 2 != 0) {
                // Reverse the word using StringBuilder and update the array element
                StringBuilder reverser = new StringBuilder(str_words[i]);
                str_words[i] = reverser.reverse().toString();
            }
        }
        
        // Join the modified words to form a string and return the result
        return String.join(" ", str_words);
    }
}
