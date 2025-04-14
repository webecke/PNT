"use client";

import { Contact } from '@/model/Contact';
import { useEffect, useState } from 'react';
import ContactDetail from './ContactDetail';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useUserContext } from '@/contexts/user-context';

interface Props {
  category?: string;
}

const ContactList = (props: Props) => {
  const { user, contacts, selectedContactId, setSelectedContactId, setContacts } = useUserContext();
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  // Update filteredContacts whenever contacts or category changes
  useEffect(() => {
    const filtered = props.category
      ? contacts.filter(contact => contact.note?.includes(props.category!))
      : contacts;

    setFilteredContacts(filtered);
  }, [contacts, props.category, setContacts]);

  return (
    <>
      {user ? selectedContactId ? (
        <div>
          <div onClick={() => setSelectedContactId(undefined)}>
            <IoArrowBackSharp className="text-4xl cursor-pointer" />
          </div>
          <ContactDetail contactId={selectedContactId} />
        </div>
      ) : (
        <>
          {filteredContacts.length > 0 ? (
            <div className="w-1/2 mx-auto">
              <ul className="border rounded-lg p-4 bg-white shadow">
                {filteredContacts.map((contact) => (
                  <li key={contact.id ?? `${contact.firstName}-${contact.lastName}`} className="p-2 border-b hover:bg-gray-100 transition">
                    <div onClick={() => setSelectedContactId(contact.id)}>
                      <div className="cursor-pointer flex justify-between items-center">
                        <span className="font-semibold">
                          {contact.firstName + ' ' + contact.lastName}
                        </span>
                        <span className="text-gray-500">{contact.phone}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-lg mb-6">No contacts added yet</div>
          )}
        </>
      ) : (
        <div className="text-lg">Please log in</div>
      )}
    </>
  );
};

export default ContactList;
