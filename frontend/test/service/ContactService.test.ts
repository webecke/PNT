import { beforeEach, describe, it } from "@jest/globals";
import { anything, instance, mock, verify, when } from "@typestrong/ts-mockito";
import ContactService from "@/service/ContactService";
import { Contact } from "@/model/Contact";
import { ServerFacade } from "@/service/server";
import { AddContactRequest, GetContactResponse } from "@/service/server/message/ContactMessage";
import { BasicResponse } from "@/service/server/message/BasicResponse";

const CONTACT: Contact = {
  id: "FAKE-CONTACT-ID",
  email: "CONTACT-EMAIL",
  firstName: "CONTACT-FIRST-NAME",
  lastName: "CONTACT-LAST-NAME",
  note: "CONTACT-NOTES",
  phone: "CONTACT-PHONE",
  timeline: []
}

const NEW_CONTACT: AddContactRequest = {
  email: "CONTACT-EMAIL",
  firstName: "FIRST-NAME",
  lastName: "LAST-NAME",
  note: "CONTACT-NOTES",
  phone: "CONTACT-PHONE",
};

const basicResponse: BasicResponse = {
  success: true
};

const getContactResponse: GetContactResponse = {
  ...basicResponse,
  contact: {} as Contact
};

describe("ContactService", () => {
  let serverMock: ServerFacade;
  let service: ContactService;

  beforeEach(() => {
    serverMock = mock<ServerFacade>();
    const server = instance(serverMock);
    service = new ContactService(server);

    when(serverMock.addContact(anything())).thenResolve(basicResponse);
    when(serverMock.getContact(anything())).thenResolve(getContactResponse);
    when(serverMock.updateContact(anything())).thenResolve(basicResponse);
    when(serverMock.deleteContact(anything())).thenResolve(basicResponse);
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
