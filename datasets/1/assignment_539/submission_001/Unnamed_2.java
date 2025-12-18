import java.util.Date;
import java.util.List;
// Define the Seminar class that extends Event
class Seminar extends Event {
    int numberOfSpeakers;

    public Seminar(String eventName, Date date, String location, int numberOfSpeakers) {
        super(eventName, date, location);
        this.numberOfSpeakers = numberOfSpeakers;
    }

    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Number of Speakers: " + numberOfSpeakers);
    }
}
