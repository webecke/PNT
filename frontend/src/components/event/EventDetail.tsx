import { EventDetailPresenter, EventDetailView } from "@/presenter/EventDetailPresenter";
import { useEffect, useRef, useState } from "react";
import { TimelineEvent } from "@/model/TimelineEvent";
import { QueryState } from "@/utils/QueryState";
import { Contact } from "@/model/Contact";

interface Props {
  eventId: string;
  presenter?: EventDetailPresenter;
}

const EventDetail = (props: Props) => {
  // TODO Make Events editable
  //  This will probably involve combining with ContactDetail, which has that functionality.

  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [queryState, setQueryState] = useState<QueryState>(QueryState.IN_PROCESS);

  const listener: EventDetailView = {};
  const presenter = useRef(props.presenter ?? new EventDetailPresenter(listener));

  const loadEventData = (event: TimelineEvent, contactResults: Contact[]) => {
    setName(event.title);
    setDate(event.date);
    setDescription(event.description);
    setContacts(contactResults);
    setCategories(event.categories);
  };

  useEffect(() => {
    // See comment from ContactDetail.tsx
    const asyncFunction = async () => {
      try {
        const timelineEvent = await presenter.current.getEvent(props.eventId);
        setQueryState(QueryState.SUCCESS);
        const contactResults = await presenter.current.getContacts(timelineEvent.contacts);
        loadEventData(timelineEvent, contactResults);
      } catch (e) {
        setQueryState(QueryState.FAILURE);
        console.warn((e as Error).message);
      }
    }
    asyncFunction();
  }, [props.eventId]);

  switch (queryState) {
    // TODO Move the queryState variable (and logic) into the presenter
    //  Probably combine with ContactDetail first.
    case QueryState.IN_PROCESS:
      return <div>Loading...</div>;
    case QueryState.FAILURE:
      return <div>Event not found.</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
      <p className="text-sm text-gray-500 mb-4">{date}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800">Contacts</h3>
        <div>
          {contacts.map((contact) => (
            <p key={contact.id} className="text-gray-600">{contact.firstName} {contact.lastName}</p>
          ))}
        </div>
      </div>
      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
        {categories.map((category) => (
          <p key={category} className="text-gray-600">{category}</p>
        ))}
      </div>
    </div>
  );
};

export default EventDetail;
