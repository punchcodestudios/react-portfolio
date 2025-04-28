import { sendContactEmail } from "~/api/emailApi";
import type { ApiResponse } from "~/entities/api";
import type {
  Contact,
  ContactRequest,
  ContactResponse,
} from "~/entities/email";

export const emailService = {
  sendContactEmail: async (request: ContactRequest) => {
    console.log("emailservice. send contact email", request);
    try {
      const response = await sendContactEmail(request);
      return Promise.resolve(mapContact(response));
    } catch (error) {
      throw error;
    }
  },
};

function mapContact(item: ApiResponse<Contact>): ContactResponse {
  const res = {
    target: item.content.target,
    meta: item.content.meta,
    error: item.content.error,
  } as ContactResponse;

  return res;
}
