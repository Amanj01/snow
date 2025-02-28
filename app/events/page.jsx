import BlogAndEventTemplate from "@/components/BlogAndEventTemplate";
import { sampleEvents } from "@/lib/blog-event-data";
import Head from "next/head";
const EventsPage = ({ events }) => {
  return (
    <>
      <Head>
      <title>Snow Events || Snow Medical</title>
      <meta name="description" content="Read our latest events on snow medical." />
      </Head>
      <BlogAndEventTemplate 
      items={sampleEvents}
      title="EVENTS"
      itemsCountText={`(${sampleEvents.length}) UPCOMING EVENTS`}
      buttonText="VIEW ALL EVENTS"
      itemLinkPrefix="/events"
      accentColor="bg-red-500"  // Different accent color for events
      textAccentColor="text-[#FF4500]"
    />

    </>

  );
};

export default EventsPage;