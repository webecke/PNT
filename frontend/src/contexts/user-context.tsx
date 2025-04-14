'use client';

import { Contact } from '@/model/Contact';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '@/model/Event';

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  token: string;
}

interface UserContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  selectedContactId: string | undefined;
  setSelectedContactId: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedEventId: string | undefined;
  setSelectedEventId: React.Dispatch<React.SetStateAction<string | undefined>>;
  content: 'contacts' | 'events';
  setContent: React.Dispatch<React.SetStateAction<'contacts' | 'events'>>;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Provides the user context to its children.
 */
export function UserProvider({
  fetchedUser,
  children,
}: {
  fetchedUser: User | undefined;
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(fetchedUser);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string | undefined>();
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>();
  const [content, setContent] = useState<'contacts' | 'events'>('contacts');

  return (
    <UserContext.Provider
      value={{
        user,
        events,
        contacts,
        selectedContactId,
        selectedEventId,
        content, 
        setContent,
        setUser,
        setEvents,
        setContacts,
        setSelectedContactId,
        setSelectedEventId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/**
 * Custom hook to use the UserContext.
 * @throws {Error} If used outside of a UserProvider.
 */
export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
