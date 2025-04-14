import { Contact } from '@/model/Contact';
import { useEffect, useMemo, useRef, useState } from 'react';
import ContactDetail from './ContactDetail';
import { IoArrowBackSharp } from 'react-icons/io5';
import { ContactListPresenter, ContactListView } from '@/presenter/ContactListPresenter';
import { QueryState } from '@/utils/QueryState';
import { useUserContext } from '@/contexts/user-context';

interface Props {
  category?: string;
  presenter?: ContactListPresenter;
}

const ContactList = (props: Props) => {
  const { user, contacts, selectedContactId, setSelectedContactId } = useUserContext();
  // const [selectedContactId, setSelectedContactId] = useState<string | undefined>(undefined);
  // const [queryState, setQueryState] = useState<QueryState>(QueryState.IN_PROCESS);

  const listener: ContactListView = {};
  const presenter = useRef(props.presenter ?? new ContactListPresenter(listener));

  useEffect(() => {
    console.log('selectedID was: ', selectedContactId);
  }, [selectedContactId, setSelectedContactId]);

  // useEffect(() => {
  //   // See comment from ContactDetail.tsx about async useEffect()
  //   const asyncFunction = async () => {
  //     const contactList = await presenter.current.getContacts();
  //     // setQueryState(contactList ? QueryState.SUCCESS : QueryState.FAILURE);
  //     setContacts(contactList);
  //   };
  //   asyncFunction();
  // }, []);

  // const filteredContacts: Contact[] = useMemo(() => {
  //   return props.category
  //     ? contacts.filter((contact) => contact.categories?.includes(props.category!))
  //     : contacts;
  // }, [contacts, props.category]);

  // switch (queryState) {
  //   // TODO Move the queryState variable (and logic) into the presenter
  //   case QueryState.IN_PROCESS:
  //     return <div>Loading contacts...</div>;
  //   case QueryState.FAILURE:
  //     return <div>It looks like there are no contacts yet. Go ahead and add a few!</div>;
  // }

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
          {contacts.length > 0 ? (
            <div className="w-1/2 mx-auto">
              <ul className="border rounded-lg p-4 bg-white shadow">
                {contacts.map((contact) => (
                  <li key={contact.id} className="p-2 border-b hover:bg-gray-100 transition">
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
      ) : <div className="text-lg">Please log in </div>}
    </>
  );
};

export default ContactList;
