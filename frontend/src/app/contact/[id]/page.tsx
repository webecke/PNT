"use client";

import ContactDetail from "@/components/pages/contact/ContactDetail";
import { useParams } from "next/navigation";

const ContactPage = () => {
  const { id } = useParams();

  return <ContactDetail userId={id} />;
};

export default ContactPage;
