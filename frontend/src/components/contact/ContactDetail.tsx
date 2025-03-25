import ProfileIcon from "@/components/ProfileIcon";
import Timeline from "@/components/timeline/Timeline";
import { useEffect, useRef, useState } from "react";
import EditForm from "@/components/EditForm";
import { ContactDetailPresenter, ContactDetailView } from "@/presenter/ContactDetailPresenter";
import { TimelineEvent } from "@/model/TimelineEvent";
import { Contact } from "@/model/Contact";
import { QueryState } from "@/utils/QueryState";

interface Props {
  presenter?: ContactDetailPresenter;
  userId: number;
}

const ContactDetail = (props: Props) => {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  // TODO Add categories

  const [editing, setEditing] = useState<boolean>(false);

  const [queryState, setQueryState] = useState<QueryState>(QueryState.IN_PROCESS);

  const listener: ContactDetailView = {};
  const presenter = useRef(props.presenter ?? new ContactDetailPresenter(listener));

  const loadContactData = (contact: Contact, timelineEvents: TimelineEvent[]) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email);
    setNotes(contact.notes);
    setImage(contact.image ?? "");
    setTimelineEvents(timelineEvents);
  }

  useEffect(() => {
    // An async lambda is created and called as a workaround to safely make
    // async calls in a useEffect. One concern is that Promise rejections are
    // unhandled; that will need to be taken care of in the Service layer.
    // See this Stack Overflow:
    // https://stackoverflow.com/questions/56838392/how-to-call-an-async-function-inside-useeffect-in-react
    const asyncFunction = async () => {
      const contact = await presenter.current.getContact(props.userId);
      if (contact) {
        const timelineEvents = await presenter.current.getContactTimeline(props.userId);
        setQueryState(QueryState.SUCCESS);
        loadContactData(contact, timelineEvents);
      } else {
        setQueryState(QueryState.FAILURE);
      }
    };
    asyncFunction();
  }, [props.userId]);

  switch (queryState) {
    // TODO Move the queryState variable (and logic) into the presenter
    //  This will probably require adding loadContactData to the view
    //  and giving presenter.getContact() significantly more control.
    case QueryState.IN_PROCESS:
      return <div>Loading...</div>;
    case QueryState.FAILURE:
      return <div>Contact not found.</div>;
  }

  return (
    <div className="m-12 p-6 shadow-lg rounded-lg bg-white">
      <div className="flex flex-col">
        <div className="flex flex-row gap-x-24 p-2 items-center justify-left">
          {/* Profile pic */}
          <ProfileIcon src={image} alt={name ? name : "undefined"} />
          {/* Contact info */}
          <div className="max-w-xs">
            <h2 className="text-xl font-semibold">Contact Info</h2>
            <div>
              {editing ? (
                <EditForm
                  name="Phone"
                  value={phone}
                  setValue={setPhone}
                  setEditing={setEditing}
                />
              ) : (
                <div>📞 {phone}</div>
              )}
            </div>
            <div>
              {editing ? (
                <EditForm
                  name="Email"
                  value={email}
                  setValue={setEmail}
                  setEditing={setEditing}
                />
              ) : (
                <div>✉️ {email}</div>
              )}
            </div>
          </div>
          {!editing ? (
            <div
              className="bg-blue-600 rounded shadow-lg text-white p-2 hover:bg-blue-700 text-lg"
              onClick={() => setEditing(true)}
            >
              Edit
            </div>
          ) : (
            <div
              className="bg-blue-600 rounded shadow-lg text-white p-2 hover:bg-blue-700 text-lg"
              onClick={() => setEditing(false)}
            >
              Save Edits
            </div>
          )}
        </div>

        {editing ? (
          <EditForm
            name="Name"
            value={name}
            setValue={setName}
            setEditing={setEditing}
          />
        ) : (
          <div className="items-center mb-4">
            <div className="text-3xl font-bold">{name}</div>
          </div>
        )}
        {editing ? (
          <EditForm
            name="Notes"
            value={notes}
            setValue={setNotes}
            setEditing={setEditing}
            fullWidth
          />
        ) : (
          <div className="text-gray-700 bg-gray-100 rounded-lg shadow-sm p-2 flex-shrink">
            {notes}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Timeline</h2>
        <Timeline timelineEvents={timelineEvents} />
      </div>
    </div>
  );
};

export default ContactDetail;
