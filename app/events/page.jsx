import BlogAndEventTemplate from "@/components/BlogAndEventTemplate";
import { sampleEvents } from "@/lib/blog-event-data";
const EventsPage = ({ events }) => {
  return (
    <BlogAndEventTemplate 
      items={sampleEvents}
      title="EVENTS"
      itemsCountText={`(${sampleEvents.length}) UPCOMING EVENTS`}
      buttonText="VIEW ALL EVENTS"
      itemLinkPrefix="/events"
      accentColor="bg-red-500"  // Different accent color for events
      textAccentColor="text-[#FF4500]"
    />
  );
};

export default EventsPage;