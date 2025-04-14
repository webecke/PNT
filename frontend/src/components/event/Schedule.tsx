import { getMockTimeline } from "@/utils/mockTimelineEvents";
import Timeline from "@/components/timeline/Timeline";
import ContactService from "@/service/ContactService";
import EventService from "@/service/EventService";
import { Contact } from "@/model/Contact";
import { TimelineEvent } from "@/model/TimelineEvent";
import { hardcodedContactIds, hardcodedEventIds } from "@/utils/mockContacts";
import { useEffect } from "react";
import { useUserContext } from "@/contexts/user-context";

const Schedule = () => {
  const timelineEvents = getMockTimeline();
  const {setContacts, setEvents} = useUserContext();

  const fakeData = async () => {
    const contactService: ContactService = new ContactService();
    const eventService: EventService = new EventService();
    const contactsList: Contact[] = [];
    const eventsList: TimelineEvent[] = [];
    for (const contactId of hardcodedContactIds) {
      const contact: Contact = await contactService.getContact(contactId);
      contactsList.push(contact);
    }
    for (const eventId of hardcodedEventIds) {
      const timelineEvent: TimelineEvent = await eventService.getEvent(eventId);
      eventsList.push(timelineEvent);
    }
    setEvents(eventsList);
    setContacts(contactsList);
  }

  useEffect(() => {
    fakeData();
  }, []);


  return (
    <div className="m-12 p-6 shadow-lg rounded-lg bg-white">
      <div className="max-w-xs">
        <h1 className="text-3xl font-bold mb-4">Your Timeline</h1>
      </div>
      <div className="mt-4">
        <Timeline timelineEvents={timelineEvents} />
      </div>
    </div>
  );
};

export default Schedule;
