import { beforeEach, describe, it } from "@jest/globals";
import IServerFacade from "@/service/IServerFacade";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { AuthToken } from "@/model/model";
import ContactService from "@/service/ContactService";
import { Contact } from "@/utils/mockContacts";

const CONTACT: Contact = {
  id: 0,
  email: "CONTACT-EMAIL",
  name: "CONTACT-NAME",
  notes: "CONTACT-NOTES",
  phone: "CONTACT-PHONE",
  timeline: []
}

const TOKEN: AuthToken = {
  token: "TEST-AUTH-TOKEN"
}

describe("ContactService", () => {
  let serverMock: IServerFacade;
  let service: ContactService;

  beforeEach(() => {
    serverMock = mock<IServerFacade>();
    const server = instance(serverMock);
    service = new ContactService(server);
  });

  it("calls the server correctly when createContact() is called", () => {
    service.createContact(CONTACT, TOKEN);
    verify(serverMock.createContact(CONTACT, TOKEN)).once();
  });

  it("calls the server correctly when getContact() is called", () => {
    service.getContact(CONTACT.id, TOKEN);
    verify(serverMock.getContact(CONTACT.id, TOKEN)).once();
  });

  it("calls the server correctly when deleteContact() is called", () => {
    service.deleteContact(CONTACT.id, TOKEN);
    verify(serverMock.deleteContact(CONTACT.id, TOKEN)).once();
  });

  it("calls the server correctly when updateContact() is called", () => {
    service.updateContact(CONTACT, TOKEN);
    verify(serverMock.updateContact(CONTACT, TOKEN)).once();
  });
});
