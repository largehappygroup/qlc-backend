import java.util.List;
import java.util.Date;
// Define the MusicalPerformance class that extends Event
class MusicalPerformance extends Event {
    List performers;

    public MusicalPerformance(String eventName, Date date, String location, List performers) {
        super(eventName, date, location);
        this.performers = performers;
    }

    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Performers: " + String.join(", ", performers));
    }
}
