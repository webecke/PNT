import { EventDetailPresenter, EventDetailView } from "@/presenter/EventDetailPresenter";
import { useEffect, useRef, useState } from "react";
import { TimelineEvent } from "@/model/TimelineEvent";
import { QueryState } from "@/utils/QueryState";

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
  const [contacts, setContacts] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [queryState, setQueryState] = useState<QueryState>(QueryState.IN_PROCESS);

  const listener: EventDetailView = {};
  const presenter = useRef(props.presenter ?? new EventDetailPresenter(listener));

  const loadEventData = (event: TimelineEvent) => {
    setName(event.name);
    setDate(event.date.toDateString());
    setDescription(event.desc ?? "");
    setContacts(event.contacts);
    setCategories(event.categories);
  };

  useEffect(() => {
    // See comment from ContactDetail.tsx
    const asyncFunction = async () => {
      const timelineEvent = await presenter.current.getEvent(props.eventId);
      if (timelineEvent) {
        setQueryState(QueryState.SUCCESS);
        loadEventData(timelineEvent);
      } else {
        setQueryState(QueryState.FAILURE);
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
        <p className="text-gray-600">{contacts /* TODO Retrieve & display names rather than IDs */}</p>
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
