import { mockContacts } from "@/utils/mockContacts";
import { useEffect, useState } from "react";
import ContactDetail from "./ContactDetail";
import { IoArrowBackSharp } from "react-icons/io5";

interface ContactListProps {
  category?: string;
}

const ContactList = ({ category }: ContactListProps) => {
  const [contacts] = useState(mockContacts);
  const [filteredContacts, setFilteredContacts] = useState(mockContacts);
  const [selectedContactID, setSelectedContactID] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (category) {
      setFilteredContacts(contacts.filter((contact) => contact.category?.includes(category)));
    } else {
      setFilteredContacts(contacts);
    }
  }, [contacts, category])

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
