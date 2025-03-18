import { Contact } from "@/utils/mockContacts";
import { useEffect, useMemo, useRef, useState } from "react";
import ContactDetail from "./ContactDetail";
import { IoArrowBackSharp } from "react-icons/io5";
import { ContactListPresenter, ContactListView } from "@/presenter/ContactListPresenter";
import { QueryState } from "@/utils/QueryState";

interface Props {
  category?: string;
  presenter?: ContactListPresenter;
}

const ContactList = (props: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactID, setSelectedContactID] = useState<number | undefined>(undefined);
  const [queryState, setQueryState] = useState<QueryState>(QueryState.IN_PROCESS);

  const listener: ContactListView = {};
  const presenter = useRef(props.presenter ?? new ContactListPresenter(listener));

  useEffect(() => {
    // See comment from ContactDetail.tsx about async useEffect()
    const asyncFunction = async () => {
      const contactList = await presenter.current.getContacts();
      setQueryState(contactList ? QueryState.SUCCESS : QueryState.FAILURE);
      setContacts(contactList);
    };
    asyncFunction();
  }, []);

  const filteredContacts: Contact[] = useMemo(() => {
    return props.category
      ? contacts.filter((contact) => contact.category?.includes(props.category!))
      : contacts;
  }, [contacts, props.category]);

  switch (queryState) {
    // TODO Move the queryState variable (and logic) into the presenter
    case QueryState.IN_PROCESS:
      return <div>Loading contacts...</div>;
    case QueryState.FAILURE:
      return <div>Looks like you don't have any contacts yet. Let's add a few!</div>;
  }

  return (
    <>
    { selectedContactID ?
      <div>
        <div onClick={() => setSelectedContactID(undefined)}>
          <IoArrowBackSharp className="text-4xl cursor-pointer"/>
        </div>
        <ContactDetail userId={selectedContactID} />
      </div>
      :
      <div className="w-1/2 mx-auto">
        <ul className="border rounded-lg p-4 bg-white shadow">
          {filteredContacts.map((contact) => (
            <li
              key={contact.id}
              className="p-2 border-b hover:bg-gray-100 transition"
            >
              <div onClick={() => setSelectedContactID(contact.id)}>
                <div className="cursor-pointer flex justify-between items-center">
                  <span className="font-semibold">{contact.name}</span>
                  <span className="text-gray-500">{contact.phone}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
  }
    </>
  );
};

export default ContactList;
