import type {
  ContactRequest,
  Contact,
  ContactResponse,
} from "~/entities/email";
import ApiClient from "./apiClient";
import type { ApiResponse } from "~/entities/api";

export const sendContactEmail = async (
  request: ContactRequest
): Promise<ApiResponse<Contact>> => {
  const client = new ApiClient<Contact>("mail/send-contact", {
    params: request.params,
  });
  console.log("request.body: ", request);
  try {
    return client.post(request).then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};
