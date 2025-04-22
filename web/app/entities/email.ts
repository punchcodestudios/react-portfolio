import type { ApiErrorResponse, MetaResponse } from "./api";

export interface Contact {
  subject: string;
  message: string;
  formOfContact: string;
  emailAddress: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  organization: string;
}

export interface ContactRequest {
  params: Contact;
}

export interface ContactResponse {
  target: never;
  meta: MetaResponse;
  error: ApiErrorResponse;
}
