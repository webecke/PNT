"use client";

import { useParams } from "next/navigation";
import { mockContacts } from "../../utils/mockContacts";
import { getMockTimeline } from "../../utils/mockTimelineEvents";
import ProfileIcon from "../../components/profileIcon";
import Timeline from "@/app/components/timeline/timeline";
import { useEffect, useState } from "react";
import EditForm from "@/app/components/editForm";

const ContactDetail = () => {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [editing, setEditing] = useState<boolean>(false);

  const { id } = useParams();
  const contact = mockContacts.find((c) => c.id.toString() === id);

  const timelineEvents = getMockTimeline(contact);

  useEffect(() => {
    if (!contact) return;
    setImage(contact.image ? contact.image : "");
    setName(contact.name ? contact.name : "");
    setPhone(contact.phone ? contact.phone : "");
    setEmail(contact.email ? contact.email : "");
    setNotes(contact.notes ? contact.notes : "");
  }, [contact]);

  if (!contact) return <div>Contact not found.</div>;

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
