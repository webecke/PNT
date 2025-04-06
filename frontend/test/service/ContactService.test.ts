import { beforeEach, describe, it } from "@jest/globals";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import ContactService from "@/service/ContactService";
import { Contact } from "@/model/Contact";
import { ServerFacade } from "@/service/server";
import { AddContactRequest } from "@/service/server/message/ContactMessage";

const CONTACT: Contact = {
  id: "FAKE-CONTACT-ID",
  email: "CONTACT-EMAIL",
  firstName: "CONTACT-FIRST-NAME",
  lastName: "CONTACT-LAST-NAME",
  notes: "CONTACT-NOTES",
  phone: "CONTACT-PHONE",
  timeline: []
}

const NEW_CONTACT: AddContactRequest = {
  email: "CONTACT-EMAIL",
  firstName: "FIRST-NAME",
  lastName: "LAST-NAME",
  notes: "CONTACT-NOTES",
  phone: "CONTACT-PHONE",
};

describe("ContactService", () => {
  let serverMock: ServerFacade;
  let service: ContactService;

  beforeEach(() => {
    serverMock = mock<ServerFacade>();
    const server = instance(serverMock);
    service = new ContactService(server);
  });

  it("calls the server correctly when createContact() is called", () => {
    service.createContact(NEW_CONTACT);
    verify(serverMock.addContact(NEW_CONTACT)).once();
  });

  it("calls the server correctly when getContact() is called", () => {
    service.getContact(CONTACT.id);
    verify(serverMock.getContact(CONTACT.id)).once();
  });

  it("calls the server correctly when deleteContact() is called", () => {
    service.deleteContact(CONTACT.id);
    verify(serverMock.deleteContact(CONTACT.id)).once();
  });

  it("calls the server correctly when updateContact() is called", () => {
    service.updateContact(CONTACT);
    verify(serverMock.updateContact(CONTACT)).once();
  });
});
