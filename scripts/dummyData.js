const helenSubmimssion = [
  // PA-01, Index: 0
  `
// FILE: BasicIO.java
import java.util.Scanner;

public class BasicIO {
    public static void main(String[] args) {
        Scanner scnr = new Scanner(System.in);

        // first number input + calculations
        System.out.print("Enter an integer: ");
        int num1 = scnr.nextInt();

        System.out.println("The triple of " + num1 + " is " + (3 * num1));
        System.out.println("The square of " + num1 + " is " + (num1 * num1));

        System.out.println("Voila!");

        // second number input + calculations
        System.out.print("Enter another integer: ");
        int num2 = scnr.nextInt();

        System.out.println("(" + num1 + " + " + num2 + ") is " + (num1 + num2));
        System.out.println("(" + num1 + " * " + num2 + ") is " + (num1 * num2));

        System.out.println("That is all!");

    }  // End of main method.
}  // End of BasicIO class.


// FILE: EiffelTower.java
public class EiffelTower {
    public static void main(String[] args) {
        // eiffel tower ascii art
        System.out.println("                |");
        System.out.println("                |");
        System.out.println("                A");
        System.out.println("              _/X\\_");
        System.out.println("              \\/X\\/");
        System.out.println("               |V|");
        System.out.println("               |A|");
        System.out.println("               |V|");
        System.out.println("              /XXX\\");
        System.out.println("              |\\/\\|");
        System.out.println("              |/\\/|");
        System.out.println("              |\\/\\|");
        System.out.println("              |/\\/|");
        System.out.println("              |\\/\\|");
        System.out.println("              |/\\/|");
        System.out.println("             IIIIIII");
        System.out.println("             |\\/_\\/|");
        System.out.println("            /\\// \\\\/\\");
        System.out.println("            |/|   |\\|");
        System.out.println("           /\\X/___\\X/\\");
        System.out.println("          IIIIIIIIIIIII");
        System.out.println("         /\`-\\/XXXXX\\/-\`\\");
        System.out.println("       /\`.-'/\\|/I\\|/\\'-.\`\\");
        System.out.println("      /\`\\-/_.-\"\`\`\"-._ \\-/\\");
        System.out.println("     /.-'.'           '.'-.\\");
        System.out.println("    /\`\\-/               \\-/\`\\");
        System.out.println(" _/\` -
    "/\`_               _\`\\" -
    \`\\_");
        System.out.println("\`\"\"\"\"\"\"\"\`\`\"\"\"\"\"\"\`");
    }  // End of main method.
}  // End of EiffelTower class.


// FILE: HelloThere.java
import java.util.Scanner;

public class HelloThere {
    public static void main(String[] args) {
        // create a scanner object
        Scanner scnr = new Scanner(System.in);

        // get user's first name as a string
        System.out.print("What is your name? ");
        String name = scnr.next();

        // greet the user with their first name
        System.out.println("Hello " + name + "!");
    }  // End of main method.
}  // End of HelloThere class.


// FILE: ProgrammingStyleGuide.java
public class ProgrammingStyleGuide {
    public static void main(String[] args) {
        // confirmation of style guide reading
        System.out.print("I have read the CS 1101 programming style guide document on " +
                "Brightspace and agree to follow the style guidelines in the document.\n");
    }  // End of main method.
}  // End of ProgrammStyleGuide class.
`,
  // PA-02, Index: 1
  `
// FILE: BirthdayTrivia.java
import java.time.temporal.ChronoUnit;
import java.time.LocalDate;

import java.util.Scanner;

public class BirthdayTrivia {
    // constants to use for date conversions
    public static final int daysInYear = 365;
    public static final int hoursInDay = 24;
    public static final int minutesInHour = 60;
    public static final int secondsInMinute = 60;
    public static final int beatsPerMinute = 72;
    public static final int tacosPerWeek = 2;

    public static void main(String[] args) {
        Scanner scnr = new Scanner(System.in);

        // user input for their birthdate
        System.out.print("Enter the month you were born (1-12): ");
        int monthBorn = scnr.nextInt();
        System.out.print("Enter the day you were born (1-31): ");
        int dayBorn = scnr.nextInt();
        System.out.print("Enter the year you were born (1900-2017): ");
        int yearBorn = scnr.nextInt();

        // converts user input to the LocalDate object
        LocalDate birthDate = LocalDate.of(yearBorn, monthBorn, dayBorn);

        // calculates the number of days the user has been alive (as of october 1)
        LocalDate targetDate = LocalDate.of(2023, 10, 1);
        int daysAlive = (int) ChronoUnit.DAYS.between(birthDate, targetDate);

        // outputs basic time stats based on daysAlive
        System.out.println("On October 1st of this year,");
        System.out.println("you will have been alive for around ...");
        System.out.printf("- %.2f years\n", (double) daysAlive / daysInYear);
        System.out.printf("- %d days\n", daysAlive);
        System.out.printf("- %d hours\n", daysAlive * hoursInDay);
        System.out.printf("- %d minutes\n", daysAlive * hoursInDay * minutesInHour);

        // amount of seconds user has been alive
        System.out.printf(
                "- %d seconds\n\n",
                daysAlive * hoursInDay * minutesInHour * secondsInMinute);

        // amount of times user's heart has beaten
        System.out.printf(
                "Your heart will have beaten around %d times\n",
                daysAlive * hoursInDay * minutesInHour * beatsPerMinute);

        // average amount of tacos per week eaten
        System.out.printf(
                "and most importantly, you will have eaten about %d tacos.\n",
                daysAlive / 7 * tacosPerWeek);
    } // End of main method.
}  // End of BirthdayTrivia class.


// FILE: CarCosts.java
import java.util.Scanner;

public class CarCosts {
    public static void main(String[] args) {
        Scanner scnr = new Scanner(System.in);

        // get user input for carEfficiency and gasCost
        System.out.print("Enter the car's efficiency: ");
        double carEfficiency = scnr.nextDouble();
        System.out.print("Enter the cost of fuel: ");
        double gasCost = scnr.nextDouble();

        // calculate + output the cost to drive for 10, 50 and 400 miles.
        System.out.printf(
                "The cost to drive this car for 10 miles is $%.2f\n",
                10.0 * (1 / carEfficiency) * gasCost);
        System.out.printf(
                "The cost to drive this car for 50 miles is $%.2f\n",
                50.0 * (1 / carEfficiency) * gasCost);
        System.out.printf(
                "The cost to drive this car for 400 miles is $%.2f\n",
                400.0 * (1 / carEfficiency) * gasCost);

    }  // End of main method.
}  // End of CarCosts class.


// FILE: DoTheMath.java
import java.util.Scanner;

public class DoTheMath {
    public static void main(String[] args) {
        Scanner scnr = new Scanner(System.in);

        // get inputs for x, y and z
        System.out.print("Enter value for x: ");
        double x = scnr.nextDouble();
        System.out.print("Enter value for y: ");
        double y = scnr.nextDouble();
        System.out.print("Enter value for z: ");
        double z = scnr.nextDouble();

        // give appropriate calculations using x, y and z
        System.out.println(
                "The result of x to the power y is "
                + Math.pow(x, y));
        System.out.println(
                "The result of x to the power (y to the power z) is "
                + Math.pow(x, (Math.pow(y, z))));
        System.out.println(
                "The absolute value of x is "
                + Math.abs(x));
        System.out.println(
                "The square root of (x * y) to the power z is "
                + Math.pow(Math.sqrt(x * y), z));

    }  // End of main method.
}  // End of DoTheMath class.

// FILE: Polynomial.java
import java.util.*;

public class Polynomial {
    public static void main(String[] args) {
    Scanner console = new Scanner(System.in);
    int root1, root2;

    // get input for the roots
    System.out.print("Enter first root: ");
    root1 = console.nextInt();
    System.out.print("Enter second root: ");
    root2 = console.nextInt();

    // output the polynomial in standard form
    System.out.print("The polynomial is ");
    System.out.println("x^2 + " + -(root1 + root2) + "x + " + (root1 * root2));


    }
}
`,
  // PA-03, Index: 2
  `
// FILE: AnimalKingdom.java
public class AnimalKingdom {
    public static void main(String[] args) {
        printMessage();

        // print bull twice
        bull();
        bull();

        // print dog twice
        dog();
        dog();

        // print fox twice
        fox();
        fox();

        // print lion twice
        lion();
        lion();
    }

    /**
     * Prints an introductory message.
     */
    public static void printMessage() {
        System.out.println("This program will print various animal faces.");
        System.out.println();
    }

    /**
     * prints an ASCII art of a bull face.
     */
    public static void bull() {
        System.out.println("((___))");
        System.out.println("-(. .)-");
        System.out.println("(o___o)");
        System.out.println();
    }

    /**
     * prints an ASCII art of a dog face.
     */
    public static void dog() {
        System.out.println("  -___-");
        System.out.println("\\/). .(\\/");
        System.out.println("  (_o_)");
        System.out.println();
    }

    /**
     * prints an ASCII art of a fox face.
     */
    public static void fox() {
        System.out.println("(\\,,,/)");
        System.out.println(" (. .)");
        System.out.println("  \\_/");
        System.out.println();
    }

    /**
     * prints an ASCII art of a lion face.
     */
    public static void lion() {
        System.out.println(" ^,,,^");
        System.out.println(" <. .>");
        System.out.println("==(Y)==");
        System.out.println();
    }

}


// FILE: ASCIIComputers.java
public class ASCIIComputers {
    public static void main(String[] args) {
        printHappyGirl();
        printHappyBoy();
        printTiredGirl();
        printTiredBoy();
    }

    /**
     * Prints the ASCII top of a tired PC common to boy and girl PC.
     */
    public static void printTiredTop() {
        System.out.println("     ---------");
        System.out.println("     | Tired |");
    }

    /**
     * Prints the ASCII top of a happy PC common to boy and girl PC.
     */
    public static void printHappyTop() {
        System.out.println("     ---------");
        System.out.println("     | Happy |");
    }

    /**
     * Prints the ASCII header of a girl PC.
     */
    public static void printGirlHeader() {
        System.out.println("     | Girl  |");
        System.out.println("     ---------");
        System.out.println("  _   _");
        System.out.println(" | \\_/ |_________");
        System.out.println(" |_/-\\_|_______  |");
    }

    /**
     * Prints the ASCII header of a boy PC.
     */
    public static void printBoyHeader() {
        System.out.println("     |  Boy  |");
        System.out.println("     ---------");
        System.out.println("  _______________");
        System.out.println(" |  ___________  |");
    }

    /**
     * Prints the ASCII face of a tired PC common to boy and girl PC.
     */
    public static void printTiredScreen() {
        System.out.println(" | |           | |");
        System.out.println(" | |   X   X   | |");
        System.out.println(" | |     -     | |");
        System.out.println(" | |    ___    | |");
    }

    /**
     * Prints the ASCII face of a happy PC common to boy and girl PC.
     */
    public static void printHappyScreen() {
        System.out.println(" | |           | |");
        System.out.println(" | |   0   0   | |");
        System.out.println(" | |     -     | |");
        System.out.println(" | |   \\___/   | |");
    }

    /**
     * Prints the ASCII footer of a boy PC.
     */
    public static void printBoyFooter() {
        System.out.println(" | |___     ___| |");
        System.out.println(" |_____|\\_/|_____|");
        System.out.println("    _|_|/ \\|_|_");
    }

    /**
     * Prints the ASCII footer of a girl PC.
     */
    public static void printGirlFooter() {
        System.out.println(" | |___________| |");
        System.out.println(" |_______________|");
        System.out.println("    _|_______|_");
    }

    /**
     * Prints the ASCII keyboard common to all PCs.
     */
    public static void printKeyboard() {
        System.out.println("   / ********* \\");
        System.out.println(" /  ***********  \\");
        System.out.println("-------------------");
        System.out.println();
    }

    /**
     * Prints the ASCII art of a tired girl PC.
     */
    public static void printTiredGirl() {
        printTiredTop();
        printGirlHeader();
        printTiredScreen();
        printGirlFooter();
        printKeyboard();
    }

    /**
     * Prints the ASCII art of a tired boy PC.
     */
    public static void printTiredBoy() {
        printTiredTop();
        printBoyHeader();
        printTiredScreen();
        printBoyFooter();
        printKeyboard();
    }

    /**
     * Prints the ASCII art of a happy girl PC.
     */
    public static void printHappyGirl() {
        printHappyTop();
        printGirlHeader();
        printHappyScreen();
        printGirlFooter();
        printKeyboard();
    }

    /**
     * Prints the ASCII art of a happy boy PC.
     */
    public static void printHappyBoy() {
        printHappyTop();
        printBoyHeader();
        printHappyScreen();
        printBoyFooter();
        printKeyboard();
    }
}


// FILE: PaintCalculator.java
import java.util.Scanner;
import java.lang.Math;

public class PaintCalculator {
    /**
     * the number of walls in a room being painted.
     */
    public static final int NUM_WALLS = 4;
    /**
     * the area that a single gallon of paint covers.
     */
    public static final double SINGLE_GALLON_COVERAGE = 350;

    public static void main(String[] args) {
        Scanner console = new Scanner(System.in);

        // Get wall height and width.
        double wallHeight = getWallHeight(console);
        double wallWidth = getWallWidth(console);

        double wallArea = calcWallArea(wallHeight, wallWidth);
        double gallonsPaintNeeded = calcGallons(wallArea);

        displayResults(wallArea, gallonsPaintNeeded);
    }

    /**
     * Prompts and returns the wall height.
     *
     * THIS METHOD PROVIDED TO YOU. DO NOT MODIFY.
     *
     * @param  console A Scanner object for console (or keyboard) input.
     * @return         The wall height in feet.
     */
    public static double getWallHeight(Scanner console) {
        System.out.print("Enter wall height (feet): ");
        double wallHeight = console.nextDouble();
        return wallHeight;
    }

    /**
     * Prompts and returns the wall width.
     *
     * THIS METHOD PROVIDED TO YOU. DO NOT MODIFY.
     *
     * @param  console A Scanner object for console (or keyboard) input.
     * @return         The wall width in feet.
     */
    public static double getWallWidth(Scanner console) {
        System.out.print("Enter wall width (feet): ");
        double wallWidth = console.nextDouble();
        return wallWidth;
    }

    /**
     * Calculates and returns the wall area.
     * @param wallHeight A double representing the wall height in feet.
     * @param wallWidth A double representing the wall width in feet.
     * @return          The wall area in feet^2.
     */
    public static double calcWallArea(double wallHeight, double wallWidth) {
        return wallHeight * wallWidth;
    }

    /**
     * Calculates and returns the amount of paint needed in gallons.
     * @param wallArea  A double representing the wall area in feet^2.
     * @return          Paint needed in gallons.
     */
    public static double calcGallons(double wallArea) {
        return (NUM_WALLS * wallArea) / SINGLE_GALLON_COVERAGE;
    }

    /**
     * Prints the wall area, gallons of paint needed, and number of paint cans needed.
     * @param wallArea              A double representing the wall area in feet^2.
     * @param gallonsPaintNeeded    A double representing gallons of paint needed.
     */
    public static void displayResults(double wallArea, double gallonsPaintNeeded) {
        System.out.printf("The wall area is %.1f square feet\n", wallArea);
        System.out.printf(
                "The paint needed (assuming 4 walls) is %.2f gallons\n",
                gallonsPaintNeeded);

        // calculate and print number of paint cans
        int numPaintCans = (int) Math.ceil(gallonsPaintNeeded);
        System.out.printf("The number of cans to purchase is %d can(s)\n", numPaintCans);
    }


}
`,

  // PA-10, Index: 3
  `
// FILE: AlteredPuntoBanco.java
import java.util.Scanner;
import java.util.Random;

public class AlteredPuntoBanco {
    public static void main(String[] args) {
        Scanner console = new Scanner(System.in);

        // sets rand object with a set seed from input
        Random rand = new Random();
        int seed = getSeed(console);
        rand.setSeed(seed);
        System.out.println();

        int[] stats = new int[3];

        do {
            int playerTurn = turn("Player", rand);

            // player auto wins if their value is 8 or 9
            if (playerTurn == 8 || playerTurn == 9) {
                stats[0]++;
                System.out.println("Result of game: player wins");
            } else {
                int bankTurn = turn("Bank", rand);
                checkWin(playerTurn, bankTurn, stats);
            }
            System.out.println();

            System.out.print("Would you like to play again (Y/N)? ");
        } while (!console.next().equals("n"));
        displayStats(stats);
    }

    /**
     * checks whether the bank or player wins
     * @param playerTurn - integer that represents the player sum
     * @param bankTurn - integer that represents the bank sum
     * @param stats - Integer array that counts the total wins, losses and ties of the player
     */
    public static void checkWin(int playerTurn, int bankTurn, int[] stats) {
        if (playerTurn > bankTurn) {
            stats[0]++;
            System.out.println("Result of game: player wins");
        } else if (playerTurn < bankTurn) {
            stats[1]++;
            System.out.println("Result of game: bank wins");
        } else {
            stats[2]++;
            System.out.println("Result of game: tie");
        }
    }

    /**
     * gets a seed number from input
     * @param console - Scanner object gets user input
     * @return - a seed to be used for randomness as an int
     */
    public static int getSeed(Scanner console) {
        System.out.print("Enter a seed: ");
        return console.nextInt();
    }

    /**
     * takes the turn of either the player or bank
     * @param name - the name of "player" or "bank" as a String
     * @param rand - Random object generates pseudo-random values.
     * @return - the total of the person's turn as an int
     */
    public static int turn(String name, Random rand) {
        int[] cards = new int[3];
        String[] cardIncrement = {"first", "second", "third"};

        for (int i = 0; i < cards.length; i++) {
            if (!(i == 2) || arrayTotal(cards) % 10 <= 5) {
                cards[i] = rand.nextInt(13) + 1;
                System.out.printf(
                        "%s draws %s card: %s\n",
                        name,
                        cardIncrement[i],
                        displayCard(cards[i])
                );
                cards[i] = (cards[i] >= 10) ? 0 : cards[i];

            }
        }

        System.out.println(name + " total: " + arrayTotal(cards) % 10);
        System.out.println();
        return arrayTotal(cards) % 10;
    }

    /**
     * returns a string corresponding to the card drawn (based on card value)
     * @param cardVal - an integer representing the value of the card from 1-13
     * @return - a name or the number the card represents as a String
     */
    public static String displayCard(int cardVal) {
        if (cardVal == 1) {
            return "Ace";
        } else if (cardVal == 11) {
            return "Jack";
        } else if (cardVal == 12) {
            return "Queen";
        } else if (cardVal == 13) {
            return "King";
        } else {
            return Integer.toString(cardVal);
        }
    }

    /**
     * gets the sum of an array
     * @param arr - Integer array holding various integers
     * @return - the sum total of all elements in the array as an int.
     */
    public static int arrayTotal(int[] arr) {
        int total = 0;
        for (int i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        return total;
    }

    /**
     * displays the winning distribution for player, bank and their ties
     * @param stats - an integer array holding the number of games won, lost and tied by player
     */
    public static void displayStats(int[] stats) {
        System.out.printf("Player wins: %d of %d game%s (%.1f%%)\n",
                stats[0],
                arrayTotal(stats),
                (arrayTotal(stats) != 1) ? "s" : "",
                ((double) stats[0]/arrayTotal(stats) * 100));
        System.out.printf("Bank wins: %d of %d game%s (%.1f%%)\n",
                stats[1],
                arrayTotal(stats),
                (arrayTotal(stats) != 1) ? "s" : "",
                ((double) stats[1]/arrayTotal(stats) * 100));
        System.out.printf("Ties: %d of %d game%s (%.1f%%)\n",
                stats[2],
                arrayTotal(stats),
                (arrayTotal(stats) != 1) ? "s" : "",
                ((double) stats[2]/arrayTotal(stats) * 100));
    }
}

`,
  // PA-11A, Index: 4

  `
// FILE: Card.java
public class Card {
    /** integer representing the rank of the Card object */
    private int rank;
    /** integer representing the suit of the Card object */
    private int suit;
    /** The card ranks. */
    public static final String[] RANK = {"Ace", "2", "3", "4", "5", "6", "7",
    "8", "9", "10", "Jack", "Queen", "King"};
    /** The card suits. */
    public static final String[] SUIT = {"Spades", "Hearts", "Clubs", "Diamonds"};

    /**
     * Empty constructor for the Card class
     */
    public Card() {
        this(0,0);
    }

    /**
     * Alternate constructor for the Card class
     * @param rank - the card rank as an int
     * @param suit - the card suit as an int
     */
    public Card(int rank, int suit) {
        this.rank = rank;
        this.suit = suit;
    }

    /**
     * gets the rank of the card
     * @return - String representation of the card rank
     */
    public String getRank() {
        return RANK[rank];
    }

    /**
     * gets the suit of the card
     * @return - String representation of the card suit
     */
    public String getSuit() {
        return SUIT[suit];
    }

    /**
     * generates a String representation of the card
     * @return - a String with the rank and suit of the card
     */
    @Override
    public String toString() {
        return getRank() + "|" + getSuit();
    }

    /**
     * checks if two Card objects are equivalent
     * @param object - any Object, though likely to be a Card object
     * @return - a boolean representing if the objects are the same based on properties
     */
    @Override
    public boolean equals(Object object) {
        if (object instanceof Card) {
            Card card = (Card) object;
            return getRank().equals(card.getRank()) && getSuit().equals(card.getSuit());
        } else {
            return false;
        }
    }

}

// FILE: Deck.java
public class Deck {
    /** holds all cards in the deck as a Card Array */
    private Card[] card;
    /** the id for the next card in the deck as an int */
    private int currIdx;
    /** The size of the deck with 13 cards per suit of spades, hearts, clubs and diamonds.*/
    public static final int SIZE_OF_DECK = Card.SUIT.length * Card.RANK.length;

    /**
     * Empty constructor for the Deck class
     */
    public Deck() {
        this.currIdx = 0;
        this.card = new Card[SIZE_OF_DECK];
        for (int i = 0; i < SIZE_OF_DECK; i++) {
            card[i] = new Card(i % 13, i / 13);
        }
    }

    /**
     * Alternate constructor for the Deck class with order of cards
     * @param order - int Array with indices for the generated cards
     */
    public Deck(int[] order) {
        this.currIdx = 0;
        this.card = new Card[SIZE_OF_DECK];
        for (int i = 0; i < SIZE_OF_DECK; i++) {
            card[order[i]] = new Card(i % 13, i / 13);
        }
    }

    /**
     * draws a card from the top of the deck
     * @return - a Card object that was next in the deck
     */
    public Card draw() {
        Card newCard = card[currIdx];
        card[currIdx] = null;
        currIdx++;
        return newCard;
    }

    /**
     * checks if the deck has available cards remaining
     * @return - a boolean representing if the deck is empty or not
     */
    public boolean isEmpty() {
        return currIdx >= SIZE_OF_DECK;
    }

    /**
     * generates a String representation of the deck
     * @return - a String with the number of remaining cards
     */
    @Override
    public String toString() {
        int remainingCards = SIZE_OF_DECK - currIdx;
        String pluralWord = ((remainingCards != 1) ? "s." : ".");
        return "The deck has " + remainingCards + " remaining card" + pluralWord;
    }

    /**
     * checks if two Deck objects are equivalent
     * @param object - any Object, though likely to be a Deck object
     * @return - a boolean representing if the objects are the same based on properties
     */
    @Override
    public boolean equals(Object object) {
        if (object instanceof Deck) {
            Deck deck = (Deck) object;
            return currIdx == deck.currIdx;
        } else {
            return false;
        }
    }
}


// FILE: Player.java
import java.util.Arrays;
public class Player {
    /** identification number for the player as an int */
    private int id;
    /** hand of cards the player holds as a Card Array */
    private Card[] hand;
    /** number of cards in the player's hand as an int */
    private int numOfCards;

    /**
     * Empty Constructor for the Player class
     */
    public Player() {
        this(0);
    }

    /**
     * Alternate constructor for the Player class
     * @param id - an integer representing an identification number for the player
     */
    public Player(int id) {
        this.id = id;
        this.numOfCards = 0;
        this.hand = new Card[52];
    }

    /**
     * gets the identification number for the player
     * @return - an integer representing the player id
     */
    public int getID() {
        return id;
    }

    /**
     * gets the number of cards for the player's hand
     * @return - an integer representing the number of cards in the player's hand
     */
    public int getNumOfCards() {
        return numOfCards;
    }

    /**
     * removes a card from the player's hand and returns it
     * @param idx - position of the card in the player's hand as an int
     * @return - Card object with the desired card properties.
     */
    public Card getCard(int idx) {
        Card newCard = hand[idx];
        hand[idx] = null;
        numOfCards--;
        return newCard;
    }

    /**
     * adds a card to an empty slot in the player's hand
     * @param card - Card object to be added.
     */
    public void addCard(Card card) {
        int i = 0;
        while (hand[i] != null) {
            i++;
        }
        hand[i] = card;
        numOfCards++;
    }

    /**
     * checks if a card is present in the player's hand
     * @param card - the target Card Object to be searched in the hand
     * @return - the position of the card in the hand or a value of -1 as an int
     */
    public int hasCard(Card card) {
        for (int i = 0; i < hand.length; i++) {
            if (hand[i] != null) {
                if (hand[i].getSuit().equals(card.getSuit()) ||
                    hand[i].getRank().equals(card.getRank())) {
                    return i;
                }
            }
        }
        return -1;
    }

    /**
     * outputs all cards in the player's hand or "no cards" if empty hand
     * @return - a String with all string representations of the cards in the player's hand
     */
    @Override
    public String toString() {
        String output = "";
        for (int i = 0; i < hand.length; i++) {
            if (hand[i] != null) {
                output += hand[i].toString() + " ";
            }
        }
        if (output.isEmpty()) {
            output = "No cards";
        }
        return output;
    }

    /**
     * checks if two Player objects are equivalent
     * @param object - any Object, though likely to be a Player object
     * @return - a boolean representing if the objects are the same based on properties
     */
    @Override
    public boolean equals(Object object) {
        if (object instanceof Player) {
            Player player = (Player) object;
            return Arrays.equals(hand, player.hand);
        } else {
            return false;
        }
    }

}
`,
  // PA-11B Index: 5
  `
// FILE: Building.java
public class Building {
    /** length of the building */
    private int length;
    /** width of the building */
    private int width;
    /** length of the lot, including building */
    private int lotLength;
    /** width of the lot, including building */
    private int lotWidth;

    /**
     * Building constructor with size parameters
     * @param length - length of the building as an int
     * @param width - width of the building as an int
     * @param lotLength - length of the lot as an int
     * @param lotWidth - width of the lot as an int
     */
    public Building(int length, int width, int lotLength, int lotWidth) {
        this.length = length;
        this.width = width;
        this.lotLength = lotLength;
        this.lotWidth = lotWidth;
    }

    /**
     * calculates the area of the building
     * @return - area of the building as an int
     */
    public int calcBuildingArea() {
        return length * width;
    }

    /**
     * calculates the area of the building lot
     * @return - area of the building lot as an int
     */
    public int calcLotArea() {
        return lotLength * lotWidth;
    }

    /**
     * generates a String representation of the building
     * @return - a String with the building area and lot area
     */
    @Override
    public String toString() {
        return "Building area: " + calcBuildingArea() + " / Lot area: " + calcLotArea();
    }

    /**
     * checks if two Building objects are equivalent
     * @param object - any Object, though likely to be a Building object
     * @return - a boolean representing if the objects are the same based on properties
     */
    @Override
    public boolean equals(Object object) {
        if (object instanceof Building) {
            Building building = (Building) object;
            return calcBuildingArea() == building.calcBuildingArea();
        } else {
            return false;
        }
    }
}

// FILE: House.java
public class House extends Building {
    /** name of the house owner as a String */
    private String owner;
    /** whether the house has a pool as a boolean */
    private boolean pool;

    /**
     * House constructor with four parameters
     * @param length - length of house as an int
     * @param width - width of house as an int
     * @param lotLength - length of house lot as an int
     * @param lotWidth - width of house lot as an int
     */
    public House(int length, int width, int lotLength, int lotWidth) {
        this(length, width, lotLength, lotWidth, null, false);
    }

    /**
     * House constructor with five parameters
     * @param length - length of house as an int
     * @param width - width of house as an int
     * @param lotLength - length of house lot as an int
     * @param lotWidth - width of house lot as an int
     * @param owner - name of the house owner as a String
     */
    public House(int length, int width, int lotLength, int lotWidth, String owner) {
        this(length, width, lotLength, lotWidth, owner, false);
    }

    /**
     * House constructor with six parameters
     * @param length - length of house as an int
     * @param width - width of house as an int
     * @param lotLength - length of house lot as an int
     * @param lotWidth - width of house lot as an int
     * @param owner - name of the house owner as a String
     * @param pool - whether a pool exists for the house as a boolean
     */
    public House(int length, int width, int lotLength, int lotWidth, String owner, boolean pool) {
        super(length, width, lotLength, lotWidth);
        this.owner = owner;
        this.pool = pool;
    }

    /**
     * updates the owner name
     * @param owner - name of the house owner as a String
     */
    public void setOwner(String owner) {
        this.owner = owner;
    }

    /**
     * updates whether a pool exists for the house
     * @param pool - whether a pool exists for the house as a boolean
     */
    public void setPool(boolean pool) {
        this.pool = pool;
    }

    /**
     * generates a String representation of the house
     * @return - a String with the owner name, house properties and building properties
     */
    @Override
    public String toString() {
        String output = "Owner: ";
        if (owner == null) {
            output += "n/a";
        } else {
            output += owner;
        }
        if (pool) {
            output += "; has a pool";
        }
        if (calcLotArea() - calcBuildingArea() > calcBuildingArea()) {
            output += "; has a big open space";
        }
        output += "\n" + super.toString();
        return output;
    }

    /**
     * checks if two House objects are equivalent
     * @param object - any Object, though likely to be a House object
     * @return - a boolean representing if the objects are the same based on properties
     */
    @Override
    public boolean equals(Object object) {
        if (object instanceof House) {
            House house = (House) object;
            return calcBuildingArea() == house.calcBuildingArea() && pool == house.pool;
        } else {
            return false;
        }
    }
}

// FILE: Office.java
public class Office extends Building {
    /** name of the business which owns the office */
    private String businessName;
    /** number of parking spaces owned by the building */
    private int parkingSpaces;
    /** total number of office buildings */
    private static int totalOffices = 0;

    /**
     * Office constructor with four parameters
     * @param length - length of office as an int
     * @param width - width of office as an int
     * @param lotLength - length of office lot as an int
     * @param lotWidth - width of office lot as an int
     */
    public Office(int length, int width, int lotLength, int lotWidth) {
        super(length, width, lotLength, lotWidth);
        this.businessName = null;
        this.parkingSpaces = 0;
        totalOffices++;
    }

    /**
     * Office constructor with five parameters
     * @param length - length of office as an int
     * @param width - width of office as an int
     * @param lotLength - length of office lot as an int
     * @param lotWidth - width of office lot as an int
     * @param businessName - name of the business which owns the office as a String
     */
    public Office(int length, int width, int lotLength, int lotWidth, String businessName) {
        super(length, width, lotLength, lotWidth);
        this.businessName = businessName;
        this.parkingSpaces = 0;
        totalOffices++;
    }

    /**
     * Office constructor with six parameters
     * @param length - length of office as an int
     * @param width - width of office as an int
     * @param lotLength - length of office lot as an int
     * @param lotWidth - width of office lot as an int
     * @param businessName - name of the business which owns the office as a String
     * @param parkingSpaces - number of parking spaces in the office as an int
     */
    public Office(int length, int width, int lotLength,
    int lotWidth, String businessName, int parkingSpaces) {
        super(length, width, lotLength, lotWidth);
        this.businessName = businessName;
        this.parkingSpaces = parkingSpaces;
        totalOffices++;
    }

    /**
     * updates the number of parking spaces
     * @param parkingSpaces - number of parking spaces as an int
     */
    public void setParkingSpaces(int parkingSpaces) {
        this.parkingSpaces = parkingSpaces;
    }

    /**
     * generates a String representation of the office
     * @return - a String with the business name, office properties and building properties
     */
    @Override
    public String toString() {
        String output = "Business: ";
        if (businessName == null) {
            output += "unoccupied";
        } else {
            output += businessName;
        }
        if (parkingSpaces > 0) {
            output += "; has " + parkingSpaces + " parking spaces";
        }
        output += " (total offices: " + totalOffices + ")";
        output += "\n" + super.toString();
        return output;
    }

    /**
     * checks if two Office objects are equivalent
     * @param object - any Object, though likely to be a Office object
     * @return - a boolean representing if the objects are the same based on properties
     */
    @Override
    public boolean equals(Object object) {
        if (object instanceof Office) {
            Office office = (Office) object;
            return calcBuildingArea() == office.calcBuildingArea() &&
            parkingSpaces == office.parkingSpaces;
        } else {
            return false;
        }
    }
}
`,
  // PA-10A, Index: 6
  `
// FILE: AirportStats.java
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.io.File;
import java.util.Arrays;

public class AirportStats {
    public static void main(String[] args) throws FileNotFoundException {
        Scanner console = new Scanner(System.in);
        String airport = getAirport(console);
        String[] airportInfo = findAirport(airport);

        // checks that the airport was found and is valid
        if (airportInfo != null) {
            File airportFile = getDataFile(console);

            printChartHeader(airportInfo);
            int[] totalFlight = airportFlights(airportInfo[0], airportFile);
            printReport(totalFlight);
        }
    }

    /**
     * looks up an airport in a file and returns the code and name
     *
     * @param airport - the airport code or name as a String
     * @return - a String Array with the airport code and name
     * @throws FileNotFoundException - Exception Object stops program when file isn't found.
     */
    public static String[] findAirport(String airport) throws FileNotFoundException {
        Scanner readFile = new Scanner(new File("airports-code.csv"));

        // reads the airport codes file
        while (readFile.hasNextLine()) {
            String[] line = readFile.nextLine().split(",");
            // makes sure code and airport are both present
            if (line.length == 2) {
                if (line[0].equalsIgnoreCase(airport)) {
                    return line;
                }
                if (line[1].toLowerCase().contains(airport.toLowerCase())) {
                    return line;
                }
            }
        }

        // if no airport is found, we don't have an array
        System.out.println("Airport not found.");
        return null;
    }

    /**
     * gets an airport code or name from input
     *
     * @param console - Scanner object gets user input.
     * @return -
     */
    public static String getAirport(Scanner console) {
        System.out.print("Enter airport name or code: ");
        return console.nextLine();
    }

    /**
     * gets a file from input that will hold flight information
     *
     * @param console - Scanner object gets user input.
     * @return - File object that exists in the file system.
     */
    public static File getDataFile(Scanner console) {
        System.out.print("Enter data file name: ");
        String fileName = console.nextLine();
        File dataFile = new File(fileName);

        // checks if the file exists, asks for a new one if not present
        while (!dataFile.exists()) {
            System.out.print("File does not exist, try again: ");
            fileName = console.nextLine();
            dataFile = new File(fileName);
        }

        System.out.println(fileName + " successfully found.");
        return dataFile;
    }

    /**
     * outputs the header of the table
     *
     * @param airportInfo - String array with the airport code and name
     */
    public static void printChartHeader(String[] airportInfo) {
        System.out.println();
        System.out.println(airportInfo[0] + " | " + airportInfo[1]);
        System.out.println("Flight Statistics");
        System.out.println();
        System.out.println("============================================================");
        System.out.println("Year     Cancelled       Delayed      Diverted       On Time");
        System.out.println("============================================================");
    }

    /**
     * outputs a row in the chart of flights
     *
     * @param year        - the year being printed as an int
     * @param totalFlight - Integer array with all years' flight details summed up
     * @param yearFlight  - Integer array with one year of flight details
     */
    public static void printRow(int year, int[] totalFlight, int[] yearFlight) {
        System.out.printf(
                "%d%,14d%,14d%,14d%,14d\n",
                year,
                yearFlight[0],
                yearFlight[1],
                yearFlight[2],
                yearFlight[3]
        );
        for (int i = 0; i < totalFlight.length; i++) {
            totalFlight[i] += yearFlight[i];
        }
        Arrays.fill(yearFlight, 0);
    }

    /**
     * reads the data file and outputs all flight information for an airport by year
     *
     * @param code     - the airport code to analyze as a String
     * @param dataFile - File object represents a system file.
     * @return - Integer array with all years' flight information summed together
     * @throws FileNotFoundException - Exception object stops program when file not found
     */
    public static int[] airportFlights(String code, File dataFile) throws FileNotFoundException {
        Scanner readFile = new Scanner(dataFile);
        int[] totalFlight = new int[4];
        int year = 2003;

        int[] yearFlight = new int[4];


        while (readFile.hasNextLine()) {
            String[] row = readFile.nextLine().split(",");

            // skip the row if there is any missing values or code is not the target airport
            if (row.length == 6 && row[0].equalsIgnoreCase(code)) {
                int rowYear = Integer.parseInt(row[1].split("/")[0]);

                // if we've changed to a new year, we want to output the row for the old year
                if (rowYear != year) {
                    printRow(year, totalFlight, yearFlight);
                    year = rowYear;
                }

                // add corresponding flight values to the array
                for (int i = 2; i < row.length; i++) {
                    int value = Integer.parseInt(row[i]);
                    yearFlight[i - 2] += value;
                }
            }
        }

        // output the last row
        printRow(year, totalFlight, yearFlight);
        return totalFlight;
    }

    /**
     * displays the final report of all years
     *
     * @param totalFlight - Integer array with related flight details summed
     */
    public static void printReport(int[] totalFlight) {
        System.out.println("============================================================");

        // the sum of all flights for the airport
        System.out.printf(
                "%,18d%,14d%,14d%,14d\n",
                totalFlight[0],
                totalFlight[1],
                totalFlight[2],
                totalFlight[3]
        );

        // the percentage distribution for all airport flights
        System.out.printf(
                "%,17.1f%%%,13.1f%%%,13.1f%%%,13.1f%%\n",
                (double) totalFlight[0] / arrayTotal(totalFlight) * 100,
                (double) totalFlight[1] / arrayTotal(totalFlight) * 100,
                (double) totalFlight[2] / arrayTotal(totalFlight) * 100,
                (double) totalFlight[3] / arrayTotal(totalFlight) * 100
        );
    }

    /**
     * finds the sum of an integer array
     *
     * @param arr - Integer array holding different integers.
     * @return - the sum of all individual elements in the array as an int
     */
    public static int arrayTotal(int[] arr) {
        int total = 0;
        for (int i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        return total;
    }


}
`,
  // PA-09A, Index: 7

  `
// FILE: MadLibs.java
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.io.File;
import java.util.Random;

public class MadLibs {
    public static void main(String[] args) throws FileNotFoundException {
        Scanner console = new Scanner(System.in);
        Random rand = new Random();

        // getting all strings for each type of file
        String[] adjectives = getWords("adjectives", console);
        String[] animals = getWords("animals", console);
        String[] objects = getWords("objects", console);
        String[] answers = getWords("answers", console);

        // get the seed and the total number of sentences
        int seed = getSeed(console);
        rand.setSeed(seed);
        int numSentences = getNumSentences(console);

        System.out.println("\nHere " +
            ((numSentences != 1) ? "are the sentences:\n" : "is the sentence:\n"));

        // display all sentences
        for (int i = 1; i <= numSentences; i++) {
            System.out.printf("Sentence %2d: ", i);
            System.out.printf("Six %s %s sit in the %s. Do they fit? %s\n",
                getRandomWord(adjectives, rand),
                getRandomWord(animals, rand),
                getRandomWord(objects, rand),
                getRandomWord(answers, rand)
            );
        }
    }

    /**
     * checks if the inputted file exists and gets it if so
     * @param type - the type of words in the file as a String
     * @param console - Scanner object gets user input.
     * @return - File object with details about a valid file in the system.
     */
    public static File getFile(String type, Scanner console) {
        System.out.print("Enter file name for " + type + ": ");
        File stringsFile = new File(console.next());

        // if the file doesn't exist, ask for a new file name
        while (!stringsFile.exists()) {
            System.out.print("File does not exist, try again: ");
            stringsFile = new File(console.next());
        }

        // file must be successfully found if loop is exited
        System.out.println(stringsFile.getName() + " successfully found.");
        System.out.println();

        return stringsFile;
    }

    /**
     * gets a positive number from input to be used as a seed
     * @param console - Scanner object gets user input
     * @return - the seed to be used as an int
     */
    public static int getSeed(Scanner console) {
        System.out.print("Enter a seed: ");
        int seed = console.nextInt();

        // checks if positive, asks for a new number if not
        while (seed <= 0) {
            System.out.print("Not a positive number, try again: ");
            seed = console.nextInt();
        }
        return seed;
    }

    /**
     * gets the number of sentences to be generated from input, must be between 1-50
     * @param console - Scanner object gets user input.
     * @return - number of sentences to be generated as an int
     */
    public static int getNumSentences(Scanner console) {
        System.out.print("Enter number of sentences to produce: ");
        int numSentences = console.nextInt();

        // checks if in range, asks for new number if not
        while (numSentences < 1 || numSentences > 50) {
            System.out.print("Not between 1 and 50, try again: ");
            numSentences = console.nextInt();
        }

        return numSentences;
    }

    /**
     * gets all strings from a file
     * @param type - the type of words in the file as a String
     * @param console - Scanner object gets user input.
     * @return - String Array holding various words/phrases to be used
     * @throws FileNotFoundException - Exception object, stops program if file doesn't exist
     */
    public static String[] getWords(String type, Scanner console) throws FileNotFoundException {
        File stringsFile = getFile(type, console);
        Scanner readFile = new Scanner(stringsFile);

        int numStrings = readFile.nextInt();
        String[] strings = new String[numStrings];

        // ensures cursor is on the next line
        readFile.nextLine();

        for (int i = 0; i < numStrings; i++) {
            strings[i] = readFile.nextLine();
        }

        return strings;
    }

    /**
     * gets a random word from a given array of words
     * @param words - String Array containing different phrases/words
     * @param rand - Random object generates pseudo-random values
     * @return - a random word from the String Array as a String
     */
    public static String getRandomWord(String[] words, Random rand) {
        int randIndex = rand.nextInt(words.length);
        return words[randIndex];
    }
}
`,
  // PA-09B, Index: 8
  `
  // FILE: MatchingNumbers.java
import java.util.Scanner;
import java.util.Random;
import java.util.Arrays;

public class MatchingNumbers {
    /** number of dice being rolled per experiment */
    private static final int NUM_DICE = 5;
    /** number of sides on a die */
    private static final int DICE_SIDES = 6;
    /** number combinations we are looking for */
    private static final int NUM_TYPES = 4;
    /** value representing a combination with 3 same dice */
    private static final int THREE_TIMES = 0;
    /** value representing a combination with 4 same dice */
    private static final int FOUR_TIMES = 1;
    /** value representing a combination with 5 same dice */
    private static final int FIVE_TIMES = 2;
    /** value representing a combination with 2 same and 3 same dice */
    private static final int TWO_THREE_TIMES = 3;

    public static void main(String[] args) {
        Scanner console = new Scanner(System.in);
        Random rand = new Random();
        String again = "y";
        int totalRolls = 0;
        int[] totalMatchingTypeCount = new int[NUM_TYPES];

        // gets seed number from user
        int seed = getNumber("Enter a seed: ", console);
        rand.setSeed(seed);

        // while the user wants to keep playing
        while (!again.equalsIgnoreCase("n")) {

            // get number of rolls and run the simulation
            int numRolls = getNumber("Enter number of rolls: ", console);
            System.out.println();
            int[] matchingTypeCount = runExperiment(rand, numRolls);

            displayReport(matchingTypeCount, numRolls);

            // keep track of all statistics (reported at the end)
            totalRolls += numRolls;
            for (int i = 0; i < totalMatchingTypeCount.length; i++) {
                totalMatchingTypeCount[i] += matchingTypeCount[i];
            }

            // checks if the user wants to run the experiment again
            System.out.print("\nWould you like to run experiment again (Y/N)? ");
            again = console.next();
        }

        // displays total stats of all experiments conducted
        displayReport(totalMatchingTypeCount, totalRolls);
    }

    /**
     * gets a positive number from input
     * @param prompt - instructions for the user as a String
     * @param console - Scanner object gets user input
     * @return - a positive integer
     */
    public static int getNumber(String prompt, Scanner console) {
        System.out.print(prompt);
        int num = console.nextInt();
        while (num <= 0) {
            System.out.print("Not a positive number, try again: ");
            num = console.nextInt();
        }
        return num;
    }

    /**
     * looks for a target number in an unsorted array
     * @param arr - Array to be searched
     * @param target - the number we are looking for
     * @return - a boolean representing if the number is in the array
     */
    public static boolean searchNum(int[] arr, int target) {
        boolean containsTarget = false;
        for (int num : arr) {
            containsTarget = containsTarget || (num == target);
        }

        return containsTarget;
    }

    /**
     * calculate the percentage of a type of roll out of total rolls conducted
     * @param targetRolls - number of one type of roll as an int
     * @param totalRolls - number of the total rolls conducted as an int
     * @return - a percentage as a double
     */
    public static double calcPercentage(int targetRolls, int totalRolls) {
        return (double) targetRolls / totalRolls * 100;
    }

    /**
     * runs the experiment and keeps track of the different types found
     * @param rand - Random object to generate pseudo-random values
     * @param numRolls - total number of rolls to be conducted
     * @return - integer Array with the counts for the corresponding types of rolls.
     */
    public static int[] runExperiment(Random rand, int numRolls) {
        int [] matchingTypeCount = new int[NUM_TYPES];
        Arrays.fill(matchingTypeCount, 0);
        int[] typeCount = new int[DICE_SIDES];

        for (int i = 0; i < numRolls; i++) {
            Arrays.fill(typeCount, 0);
            for (int j = 0; j < NUM_DICE; j++) {
                int diceRoll = rand.nextInt(6) + 1;
                typeCount[diceRoll-1]++;
            }

            // increments if the target number is found in typeCount
            if (searchNum(typeCount, 3) && searchNum(typeCount, 2)) {
                matchingTypeCount[TWO_THREE_TIMES]++;
            }
            if (searchNum(typeCount, 3)) {
                matchingTypeCount[THREE_TIMES]++;
            }
            if (searchNum(typeCount, 4)) {
                matchingTypeCount[FOUR_TIMES]++;
            }
            if (searchNum(typeCount, 5)) {
                matchingTypeCount[FIVE_TIMES]++;
            }
        }
        return matchingTypeCount;
    }

    /**
     * displays the statistics for an experiment
     * @param matchingTypeCount - Array that holds the number of times each type occurred
     * @param numRolls - number of rolls in the experiment as an int
     */
    public static void displayReport(int[] matchingTypeCount, int numRolls) {
        System.out.println("After " + numRolls + " " + wordPlural("roll", numRolls) + ":");
        for (int i = 0; i < matchingTypeCount.length; i++) {
            String type;
            // match
            if (i == THREE_TIMES) {
                type = "Three";
            } else if (i == FOUR_TIMES) {
                type = "Four";
            } else if (i == FIVE_TIMES) {
                type = "Five";
            } else {
                type = "Three and two";
            }
            System.out.printf(
                "- %s dice matching: %d %s (%.1f%%)\n",
                type,
                matchingTypeCount[i],
                wordPlural("time", matchingTypeCount[i]),
                calcPercentage(matchingTypeCount[i], numRolls));
        }
    }

    /**
     * adds an "s" to the end of a word if applicable
     * @param word - the singular version of the word as a String
     * @param num - the number of things that word represents as an int
     * @return - an appropriate version of the word as a String
     */
    public static String wordPlural(String word, int num) {
        return word + ((num != 1) ? "s" : "");
    }

}
  `,
  // PA-08A, Index: 9
  `
// FILE: Harshad.java
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class Harshad {
    public static void main(String[] args) throws FileNotFoundException {
        Scanner console = new Scanner(System.in);

        File inputFile = getFile(console);

        findHarshadNumbers(inputFile);
    }

    /**
     * gets a valid file name from the user
     *
     * @param console - Scanner object to get user input.
     * @return - a File object that represents data files
     */
    public static File getFile(Scanner console) {
        System.out.print("Enter file name: ");
        String fileName = console.nextLine().trim();
        File inputFile = new File(fileName);

        // if file doesn't exist, get another name
        while (!inputFile.exists()) {
            System.out.print("File does not exist, try again: ");
            fileName = console.next();
            inputFile = new File(fileName);
        }

        System.out.println(fileName + " successfully found.");
        return inputFile;
    }

    /**
     * displays the final report regarding the data file
     *
     * @param harshadCount    - total harshad numbers as an int
     * @param nonHarshadCount - total non-harshad numbers as an int
     * @param badTokens       - total bad tokens as an int
     */
    public static void displayResults(int harshadCount, int nonHarshadCount, int badTokens) {
        System.out.println("- Total Harshad numbers: " + harshadCount);
        System.out.println("- Total non-Harshad numbers: " + nonHarshadCount);
        System.out.println("- Total bad tokens: " + badTokens);
    }

    /**
     * scans the file, finds all tokens, and figures out if they are harshad numbers
     *
     * @param inputFile - File object with various tokens in it.
     * @throws FileNotFoundException - Exception object, stops program if file doesn't exist
     */
    public static void findHarshadNumbers(File inputFile) throws FileNotFoundException {
        // scanner to read file input
        System.out.println("\nScanning " + inputFile.getName() + "...");
        Scanner readFile = new Scanner(inputFile);

        int harshadCount = 0, nonHarshadCount = 0, badTokens = 0;

        // token processing
        while (readFile.hasNext()) {
            String token = readFile.next();
            Scanner readToken = new Scanner(token);

            if (readToken.hasNextInt()) {

                int num = readToken.nextInt();
                // harshad number if number divisible by digit sum
                if (num % (num / 100 + (num / 10) % 10 + num % 10) == 0) {
                    System.out.println(num + " is a Harshad number.");
                    harshadCount++;
                } else {
                    nonHarshadCount++;
                }

            } else {
                badTokens++;
            }

            readToken.close();
        }
        readFile.close();

        //display final results
        System.out.println("\nResults for " + inputFile.getName() + "...");
        displayResults(harshadCount, nonHarshadCount, badTokens);
    }


}
  `,
  // PA-08B, Index: 10
  `
// FILE: GuessingGame.java
import java.util.Scanner;
import java.util.Random;

public class GuessingGame {
    /**
     * Constant for biggest number that the user can guess.
     */
    private static final int MAX = 100;  // DO NOT CHANGE

    public static void main(String[] args) {
        /***** DO NOT EDIT THE CODE BELOW *****/

        Scanner console = new Scanner(System.in);
        Random random = new Random();

        printHeading("Game setup");

        // Get seed from user.
        int seed = getSeed(console);

        // Set seed for random number generator.
        random.setSeed(seed);

        /***** DO NOT EDIT THE CODE ABOVE *****/

        // Get the maximum number of times the user can guess.
        int maxGuesses = getValidNum("Enter maximum guesses allowed: ", console);

        // Display instructions.
        printInstructions(maxGuesses);

        int hiddenNum = random.nextInt(MAX) + 1;

        playGame(console, maxGuesses, hiddenNum);
    }

    /**
     * Prints a heading based on the passed string.
     * <p>
     * THIS METHOD PROVIDED TO YOU. DO NOT MODIFY.
     *
     * @param heading The heading to print.
     */
    public static void printHeading(String heading) {
        System.out.println(heading);

        for (int i = 0; i < heading.length(); ++i) {
            System.out.print("=");
        }

        System.out.println();
        System.out.println();
    }

    /**
     * displays the initial instructions for the player to understand the game
     *
     * @param maxGuesses - the maximum number of guesses for the user as an int
     */
    public static void printInstructions(int maxGuesses) {
        System.out.println();
        printHeading("Play game");
        System.out.println("I'll pick a number between 1-" + MAX + ". You try to guess it.");
        System.out.println("If you don't guess it right, I'll give you a hint to help you.");

        String guessPlural = ((maxGuesses > 1) ? " guesses" : " guess");
        System.out.println("You get " + maxGuesses + guessPlural + ". Let's play!");
        System.out.println();
        System.out.println("I am thinking of a number between 1 and " + MAX + ".\n");
    }

    /**
     * Prompts and returns the random number generator seed.
     * THIS METHOD PROVIDED TO YOU. DO NOT MODIFY.
     *
     * @param console A Scanner object for console (or keyboard) input.
     * @return The seed to set the random number generator.
     */
    public static int getSeed(Scanner console) {
        System.out.print("Enter a seed: ");
        int seed = console.nextInt();
        return seed;
    }

    /**
     * returns a valid integer between 1 and the max.
     *
     * @param console - a Scanner Object that gets user input.
     * @return - an integer between 1 and the maximum.
     */
    public static int getValidNum(String prompt, Scanner console) {
        // get initial input
        System.out.print(prompt);
        String token = console.next();

        // checks if the token is valid - gets another token if not
        while (!(isValidNum(token))) {
            System.out.print("Not in the range 1-" + MAX + ", try again: ");
            token = console.next();
        }

        // scanner to convert the string to an integer
        Scanner convertInt = new Scanner(token);
        int num = convertInt.nextInt();
        convertInt.close();

        return num;
    }

    /**
     * checks if the given number is a valid int and within the range 1 to max
     *
     * @param guessToken - possible number as a String
     * @return - boolean whose value describes if the number is a valid int
     */
    public static boolean isValidNum(String guessToken) {
        // scanner to check if a number exists
        Scanner validityScanner = new Scanner(guessToken);

        if (!validityScanner.hasNextInt()) {
            return false;
        }

        // convert the value to a string and check if the number is in the range
        int guessNum = validityScanner.nextInt();
        validityScanner.close();
        return (guessNum >= 1 && guessNum <= MAX);
    }

    /**
     * plays through the guessing game
     *
     * @param console    - Scanner object gets user input
     * @param maxGuesses - maximum number of guesses as an int
     * @param hiddenNum  - desired number as an int
     */
    public static void playGame(Scanner console, int maxGuesses, int hiddenNum) {
        int whichGuess = 1;

        // Get the user's guess.
        int guess = getValidNum("Guess " + whichGuess + ", enter your guess: ", console);

        // Give user up to given tries to get it right.
        while (!((guess == hiddenNum) || (whichGuess >= maxGuesses))) {

            System.out.println("Sorry, that guess is incorrect.");
            // Guess is incorrect. Give the user a hint.
            System.out.println("The number I am thinking of is " +
                    ((guess < hiddenNum) ? "higher." : "lower."));

            // increment on which guess it is and get another guess
            whichGuess++;
            guess = getValidNum("Guess " + whichGuess + ", enter your guess: ", console);
        }

        // checks the final result
        if (guess == hiddenNum) {
            // The user guessed correctly.
            String guessPlural = (whichGuess > 1) ? " guesses" : " guess";
            System.out.println("Correct! You got it in " + whichGuess + guessPlural + ".");
        } else {
            // The user guessed incorrectly.
            System.out.println("Sorry, you lose. The number I was thinking of was "
                    + hiddenNum + ".");
        }
    }

}
  `,
];

const helenContext = [
  // PA-01
  `
    Chapter Details:
        - Chapter Title: Introduction to I/O operations in Java
        - Chapter Description: This chapter covers the basics: getting user input, printing to the screen, and using arithmetic operators for simple math.
        - Learning Objectives:
            1. More exercise on console/screen input/output.
            2. Identify the input and output parts of a program run.
            3. Introduce you to arithmetic operators.
            4. Introduce you to variables and assignment statements. 
            5. Read and follow the CS 1101 programming style guide document.

    Assignment Details:
        - Assignment Title: PA-01
        - Assignment Instructions:
            You'll create four small programs for this assignment:
            1.  ProgrammingStyleGuide.java: Print the style guide confirmation statement.
            2.  EiffelTower.java: Print the Eiffel Tower ASCII art.
            3.  HelloThere.java: Ask for the user's name and print a personalized greeting.
            4.  BasicIO.java: Get two integers from the user and perform some math operations.
  `,
  // PA-02
  `
        Chapter Details:
        - Chapter Title: Mathematical Operations in Java
        - Chapter Description: This chapter focuses on using variables to store numerical data and performing calculations with arithmetic operators and the Java Math class.
        - Learning Objectives:
            - Practice calculations with numbers.
            - Practice using variables.
            - Practice incorporating Math class methods.
            - Learn to identify and correct errors.

    Assignment Details:
        - Assignment Title: PA-02
        - Assignment Instructions:
            You will create four separate programs to practice numerical calculations:

            1.  DoTheMath.java: Get three numbers from the user and perform the specified calculations using methods from the Math class.
            2.  Polynomial.java: Ask the user for two roots and print the resulting quadratic polynomial in the canonical form.
            3.  CarCosts.java: Calculate the cost of driving for different distances (10, 50 and 400 miles) based on user input for gas price and car efficiency.
            4.  BirthdayTrivia.java: Ask for the user's birthday and calculate various fun statistics about their life.
    `,

  // PA-03
  `
        Chapter Details:
        - Chapter Title: Introduction to Methods
        - Chapter Description: This chapter covers how to break down complex problems into smaller, reusable pieces of code by creating and calling methods.
        - Learning Objectives:
            - Introduce you to program decomposition.
            - Introduce you to writing your own methods.
            - Introduce you to methods calling other methods.
            - Introduce you to passing parameters when calling a method.
            - Introduce you to methods returning values.


    Assignment Details:
        - Assignment Title: PA-03
        - Assignment Instructions:
            You will create three separate programs to practice writing and calling your own methods:

            1.  AnimalKingdom.java: Create a separate method for each animal's ASCII art and call each one from the main method to print them.
            2.  ASCIIComputers.java: Decompose the problem of drawing a computer into smaller methods (e.g., for the header, screen, footer) and combine them to draw different computer variations.
            3.  PaintCalculator.java: Calculates the amount of paint needed to cover a room, based on given  room dimensions. 
//                     
    `,
  // PA-10
  `
        Chapter Details:
        - Chapter Title: Arrays and Random Numbers
        - Chapter Description: This chapter covers how to use arrays to store collections of data and how to use the Random class to add chance to your programs.
        - Learning Objectives:
            - Give you more practice with arrays.
            - Give you more practice with random numbers.

    Assignment Details:
        - Assignment Title: PA-10
        - Assignment Instructions:
            In this assignment, you will implement a modified version of a game called Punto Banco. Your program will need to:
            
            1.  Use the Random class to simulate drawing cards.
            2.  Implement the game logic to determine the winner of each round.
            3.  Keep track of the game statistics (wins, losses, ties) and display them at the end.
    `,

  // PA-11A
  `
        Chapter Details:
        - Chapter Title: Creating Your Own Classes
        - Chapter Description: This chapter focuses on object-oriented programming by teaching you how to define your own custom classes with fields, constructors, and methods.
        - Learning Objectives:
            - Introduce you to making your own classes.
            - Give you more practice working with objects. 

    Assignment Details:
        - Assignment Title: PA-11A
        - Assignment Instructions:
            For this assignment, you will build the classes needed to power a card game.

            1.  Card.java: Create a class to represent a single playing card with a rank and suit.
            2.  Deck.java: Create a class to represent a full 52-card deck, including a method to draw cards.
            3.  Player.java: Create a class to represent a player, including a "hand" to hold their cards.

    `,
];

const studentSubmissions1 = [
  // Submission 1: Basic OOP - Classes and Objects
  `
// FILE: main/Vehicle.java
package main;

public class Vehicle {
    String make;
    String model;

    public Vehicle(String make, String model) {
        this.make = make;
        this.model = model;
    }

    public void displayInfo() {
        System.out.println("Make: " + this.make + ", Model: " + this.model);
    }
}

// FILE: main/App.java
package main;

public class App {
    public static void main(String[] args) {
        Vehicle myCar = new Vehicle("Toyota", "Camry");
        myCar.displayInfo();
    }
}
  `,
  // Submission 2: Inheritance and Method Overriding
  `
// FILE: models/Animal.java
package models;

public class Animal {
    public void makeSound() {
        System.out.println("Some generic animal sound");
    }
}

// FILE: models/Dog.java
package models;

public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof");
    }
}

// FILE: main/Zoo.java
package main;
import models.Dog;

public class Zoo {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.makeSound();
    }
}
  `,
  // Submission 3: ArrayList and Enhanced For-Each Loop
  `
// FILE: com/example/TaskManager.java
package com.example;

import java.util.ArrayList;
import java.util.List;

public class TaskManager {
    public static void main(String[] args) {
        List<String> tasks = new ArrayList<>();
        tasks.add("Buy groceries");
        tasks.add("Pay bills");
        tasks.add("Walk the dog");

        System.out.println("--- Your Tasks ---");
        for (String task : tasks) {
            System.out.println("- " + task);
        }
    }
}
  `,
  // Submission 4: HashMap with Safe Key Access
  `
// FILE: com/inventory/InventoryManager.java
package com.inventory;

import java.util.HashMap;
import java.util.Map;

public class InventoryManager {
    public static void main(String[] args) {
        Map<String, Integer> inventory = new HashMap<>();
        inventory.put("Apples", 50);
        inventory.put("Oranges", 35);

        // Safely retrieve a value that might not exist using getOrDefault
        int appleCount = inventory.getOrDefault("Apples", 0);
        int bananaCount = inventory.getOrDefault("Bananas", 0);
        
        System.out.println("Number of apples: " + appleCount);
        System.out.println("Number of bananas: " + bananaCount);
    }
}
  `,
  // Submission 5: Reading a File with Try-With-Resources
  `
// FILE: com/filereader/TextReader.java
package com.filereader;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.File;
import java.io.PrintWriter;

public class TextReader {
    // This helper method creates a dummy file to be read
    public void setupDummyFile(String fileName, String content) throws IOException {
        File file = new File(fileName);
        try (PrintWriter writer = new PrintWriter(file)) {
            writer.println(content);
        }
    }
    
    public void readFile(String fileName) {
        // The try-with-resources statement ensures the reader is automatically closed.
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            System.out.println("Reading from " + fileName + ":");
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
    }

    public static void main(String[] args) throws IOException {
        TextReader textReader = new TextReader();
        String tempFile = "config.txt";
        textReader.setupDummyFile(tempFile, "Setting1=true\\nSetting2=false");
        textReader.readFile(tempFile);
    }
}
  `,
  // Submission 6: Implementing an Interface Correctly
  `
// FILE: contracts/Shape.java
package contracts;

public interface Shape {
    double getArea();
}

// FILE: shapes/Rectangle.java
package shapes;
import contracts.Shape;

public class Rectangle implements Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double getArea() {
        return this.width * this.height;
    }
}

// FILE: main/GeometryApp.java
package main;
import shapes.Rectangle;

public class GeometryApp {
    public static void main(String[] args) {
        Rectangle myRect = new Rectangle(5.0, 10.0);
        System.out.println("The area of the rectangle is: " + myRect.getArea());
    }
}
  `,
  // Submission 7: Correct Exception Handling
  `
// FILE: com/math/Divider.java
package com.math;

public class Divider {
    public int divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Cannot divide by zero.");
        }
        return a / b;
    }
}

// FILE: com/math/Calculator.java
package com.math;

public class Calculator {
    public static void main(String[] args) {
        Divider divider = new Divider();
        try {
            int result = divider.divide(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}
  `,
  // Submission 8: Thread-Safe Singleton Pattern
  `
// FILE: com/config/Settings.java
package com.config;

public class Settings {
    // Using a static final instance is the simplest and safest way
    // to create a thread-safe singleton in Java.
    private static final Settings INSTANCE = new Settings();
    
    public String theme;

    private Settings() {
        // Simulate loading settings
        this.theme = "dark";
    }

    public static Settings getInstance() {
        return INSTANCE;
    }
}

// FILE: com/config/AppConfigManager.java
package com.config;

public class AppConfigManager {
    public static void main(String[] args) {
        Settings settings1 = Settings.getInstance();
        Settings settings2 = Settings.getInstance();
        
        System.out.println("Theme from instance 1: " + settings1.theme);
        System.out.println("Are both instances the same? " + (settings1 == settings2));
    }
}
  `,
  // Submission 9: Complete and Valid Java Servlet Response
  `
// FILE: com/webapp/HelloServlet.java
package com.webapp;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;

public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet HelloServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Hello, World!</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }
}
  `,
  // Submission 10: Using Generics Correctly
  `
// FILE: com/box/Box.java
package com.box;

public class Box<T> {
    private T content;

    public void setContent(T content) {
        this.content = content;
    }

    public T getContent() {
        return content;
    }
}

// FILE: com/box/Main.java
package com.box;

public class Main {
    public static void main(String[] args) {
        // Correctly use the parameterized type for type safety
        Box<String> stringBox = new Box<>();
        stringBox.setContent("This is a string in a box.");
        String content = stringBox.getContent();
        System.out.println("Box content: " + content);

        Box<Integer> integerBox = new Box<>();
        integerBox.setContent(123);
        Integer number = integerBox.getContent();
        System.out.println("Box content: " + number);
    }
}
  `,
];

const contextArray1 = [
  // Context 1: Basic OOP - Classes and Objects
  `
    Chapter Details:
        - Chapter Title: Introduction to Object-Oriented Programming
        - Chapter Description: This chapter covers the fundamental concepts of OOP in Java, including classes, objects, fields (attributes), and methods.
        - Learning Objectives: Define a class with fields. Create a constructor to initialize object state. Instantiate an object from a class using the 'new' keyword.

    Assignment Details:
        - Assignment Title: My First Java Class
        - Assignment Instructions: Create a 'Vehicle' class with 'make' and 'model' string fields. Add a constructor to set these fields. In the main method of an 'App' class, create an instance of 'Vehicle' and call a 'displayInfo' method to print its details to the console.
  `,
  // Context 2: Inheritance
  `
    Chapter Details:
        - Chapter Title: Inheritance and Polymorphism
        - Chapter Description: Explains how to create subclasses that inherit properties and behaviors from a superclass, and how to override methods for polymorphic behavior.
        - Learning Objectives: Use the 'extends' keyword to create a subclass. Understand the parent-child class relationship. Use the '@Override' annotation to provide a specialized implementation of a parent method.

    Assignment Details:
        - Assignment Title: Animal Hierarchy
        - Assignment Instructions: Create a base 'Animal' class with a 'makeSound()' method. Then, create a 'Dog' class that extends 'Animal' and overrides 'makeSound()' to print "Woof". In a main class, create a 'Dog' object and call its 'makeSound()' method.
  `,
  // Context 3: ArrayList and Loops
  `
    Chapter Details:
        - Chapter Title: The Java Collections Framework
        - Chapter Description: Introduces the 'ArrayList' class for managing dynamic arrays and demonstrates different ways to iterate over collection elements.
        - Learning Objectives: Declare and initialize an 'ArrayList'. Use the 'add()' method to insert elements. Iterate over an 'ArrayList' using an enhanced for-each loop.

    Assignment Details:
        - Assignment Title: Simple To-Do List
        - Assignment Instructions: Create an 'ArrayList' of strings to act as a to-do list. Add at least three tasks to the list. Use an enhanced for-each loop to iterate through the list and print each task to the console.
  `,
  // Context 4: HashMap for Data Storage
  `
    Chapter Details:
        - Chapter Title: Working with Maps
        - Chapter Description: This chapter introduces the 'Map' interface and the 'HashMap' implementation for storing key-value pairs.
        - Learning Objectives: Declare and initialize a 'HashMap'. Use 'put()' to add entries. Safely retrieve entries using 'getOrDefault' or 'containsKey'.

    Assignment Details:
        - Assignment Title: Product Inventory
        - Assignment Instructions: Use a 'HashMap<String, Integer>' to represent a store's inventory. Add a few products, then safely retrieve and print the quantity of one existing product and one non-existent product.
  `,
  // Context 5: Reading a File with FileReader
  `
    Chapter Details:
        - Chapter Title: Basic File I/O (Input/Output)
        - Chapter Description: Covers how to read text from files using Java's I/O streams, focusing on the try-with-resources statement for automatic resource management.
        - Learning Objectives: Understand how to construct a 'FileReader'. Use a 'BufferedReader' to read a file line by line. Use a try-with-resources block to ensure streams are closed correctly.

    Assignment Details:
        - Assignment Title: Configuration File Reader
        - Assignment Instructions: Write a method that accepts a file name, reads its contents line by line, and prints each line to the console. The implementation must use a try-with-resources statement to guarantee the file reader is closed.
  `,
  // Context 6: Implementing an Interface
  `
    Chapter Details:
        - Chapter Title: Interfaces and Abstract Classes
        - Chapter Description: Explains how to use interfaces to define a contract of methods that a class must implement, achieving full abstraction.
        - Learning Objectives: Declare an interface with method signatures. Use the 'implements' keyword. Provide concrete implementations for all methods defined in the interface.

    Assignment Details:
        - Assignment Title: Geometric Shapes
        - Assignment Instructions: Define a 'Shape' interface with a single method: 'double getArea()'. Create a 'Rectangle' class that implements the 'Shape' interface. The class must provide a working implementation for the 'getArea' method.
  `,
  // Context 7: Basic Exception Handling
  `
    Chapter Details:
        - Chapter Title: Exception Handling
        - Chapter Description: This chapter introduces Java's exception handling mechanism using try-catch blocks to manage runtime errors gracefully.
        - Learning Objectives: Understand the difference between checked and unchecked exceptions. Use a 'try-catch' block to handle potential runtime errors like 'ArithmeticException'.

    Assignment Details:
        - Assignment Title: Safe Division
        - Assignment Instructions: Create a 'Divider' class with a method that divides two integers. In a separate 'Calculator' class, call this method with values that will cause a divide-by-zero error. Use a try-catch block to catch the 'ArithmeticException' and print a user-friendly error message.
  `,
  // Context 8: Simple Singleton Pattern
  `
    Chapter Details:
        - Chapter Title: Common Design Patterns
        - Chapter Description: Introduces fundamental software design patterns, including the Singleton pattern, used to ensure that a class has only one instance in a thread-safe manner.
        - Learning Objectives: Create a class with a private constructor. Implement a static method that returns the single, shared instance. Ensure the implementation is thread-safe.

    Assignment Details:
        - Assignment Title: Application Configuration
        - Assignment Instructions: Implement a 'Settings' class as a thread-safe Singleton. The constructor must be private, and a public static method should provide access to the single instance.
  `,
  // Context 9: Simple Servlet for a Web App
  `
    Chapter Details:
        - Chapter Title: Introduction to Java Servlets
        - Chapter Description: Provides a basic overview of the Java Servlet API for handling web requests and generating dynamic, valid HTML responses.
        - Learning Objectives: Extend the 'HttpServlet' class. Override the 'doGet' method. Use 'HttpServletResponse' to set the content type and send a well-formed HTML document to the client.

    Assignment Details:
        - Assignment Title: Hello Web
        - Assignment Instructions: Create a simple 'HelloServlet' that extends 'HttpServlet'. Override the 'doGet' method to respond with a complete and valid HTML page containing an 'h1' tag that says "Hello, World!".
  `,
  // Context 10: Using a Generic Type
  `
    Chapter Details:
        - Chapter Title: Java Generics
        - Chapter Description: This chapter introduces generics, which allow for type-safe data structures by enabling types to be parameters to methods and classes.
        - Learning Objectives: Create a generic class using the '<T>' syntax. Instantiate a generic class with a specific type parameter (e.g., 'Box<String>'). Understand the benefits of type safety over using raw types.

    Assignment Details:
        - Assignment Title: A Box for Everything
        - Assignment Instructions: Create a generic 'Box<T>' class that can hold a single item of any type. In a 'Main' class, create an instance of 'Box' specifically for holding a 'String' and another for holding an 'Integer' to demonstrate its type-safe use.
  `,
];

// console.log(helenSubmimssion[4]);
// console.log(helenContext.length);
module.exports = {
  //   studentSubmissions,
  //   contextArray,
  helenSubmimssion,
  helenContext,
};

`
// FILE: Deck.java
public class Deck {
    /** holds all cards in the deck as a Card Array */
    private Card[] card;
    /** the id for the next card in the deck as an int */
    private int currIdx;
    /** The size of the deck with 13 cards per suit of spades, hearts, clubs and diamonds.*/
    public static final int SIZE_OF_DECK = Card.SUIT.length * Card.RANK.length;

    /**
     * Empty constructor for the Deck class
     */
    public Deck() {
        this.currIdx = 0;
        this.card = new Card[SIZE_OF_DECK];
        for (int i = 0; i < SIZE_OF_DECK; i++) {
            card[i] = new Card(i % 13, i / 13);
        }
    }

    /**
     * Alternate constructor for the Deck class with order of cards
     * @param order - int Array with indices for the generated cards
     */
    public Deck(int[] order) {
        this.currIdx = 0;
        this.card = new Card[SIZE_OF_DECK];
        for (int i = 0; i < SIZE_OF_DECK; i++) {
            card[order[i]] = new Card(i % 13, i / 13);
        }
    }

    /**
     * draws a card from the top of the deck
     * @return - a Card object that was next in the deck
     */
    public Card draw() {
        Card newCard = card[currIdx];
        card[currIdx] = null;
        currIdx++;
        return newCard;
    }

    /**
     * checks if the deck has available cards remaining
     * @return - a boolean representing if the deck is empty or not
     */
    public boolean isEmpty() {
        return currIdx >= SIZE_OF_DECK;
    }

    /**
     * generates a String representation of the deck
     * @return - a String with the number of remaining cards
     */
    @Override
    public String toString() {
        int remainingCards = SIZE_OF_DECK - currIdx;
        String pluralWord = ((remainingCards != 1) ? "s." : ".");
        return "The deck has " + remainingCards + " remaining card" + pluralWord;
    }

    /**
     * checks if two Deck objects are equivalent
     * @param object - any Object, though likely to be a Deck object
     * @return - a boolean representing if the objects are the same based on properties
     */
    @Override
    public boolean equals(Object object) {
        if (object instanceof Deck) {
            Deck deck = (Deck) object;
            return currIdx == deck.currIdx;
        } else {
            return false;
        }
    }
}


`;
