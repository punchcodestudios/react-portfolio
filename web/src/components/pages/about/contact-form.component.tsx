import toast, { Toaster } from "react-hot-toast";
import { Email } from "@/entities/Email";
// import NodeAPIClient from "@/services/node-api-client";
import { Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ButtonControl from "@/components/common/button/button.control";
import { useState } from "react";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      from: "punchcodestudios.com",
      subject: "",
      message: "",
    },
  });

  // const apiClient = new NodeAPIClient<Email>("/mail/send-contact");

  const onSubmit = async (values: Email) => {
    const contact: Email = {
      name: values.name,
      from: values.from,
      subject: values.subject,
      message: values.message,
    };
    try {
      setIsLoading(true);
      // const response = await apiClient.post(contact);
      // if (response.status === 200) {
      //   toast.success(response.message);
      //   reset();
      //   // console.log("Email sent!. \nResponse:", response.status);
      // } else {
      //   toast.error(response.message);
      //   // console.log("Email not sent. \nResponse:", response);
      // }
    } catch (error) {
      // console.log("error sending email", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <Toaster></Toaster>
      <div className="formWrapper">
        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="formTitle">Contact Us</h1>

          <Form.Group className="mb-3" controlId="name">
            <div className="error">
              <span>{touchedFields.name && errors.name?.message}</span>
            </div>
            <input
              type="text"
              id="name"
              className="input mb-3"
              placeholder="From"
              {...register("name", {
                required: { value: true, message: "Name is required." },
                minLength: {
                  value: 2,
                  message: "Name cannot be less than 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Name cannot be more than 20 characters",
                },
              })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="subject">
            <div className="error">
              <span>{touchedFields.subject && errors.subject?.message}</span>
            </div>
            <input
              type="text"
              placeholder="Subject"
              id="subject"
              className="input mb-3"
              {...register("subject", {
                required: { value: true, message: "Subject is required." },
                minLength: {
                  value: 2,
                  message: "Subject cannot be less than 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Subject cannot be more than 30 characters",
                },
              })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="message">
            <div className="error">
              <span>{touchedFields.message && errors.message?.message}</span>
            </div>
            <textarea
              id="message"
              className="input mb-3"
              placeholder="Message"
              {...register("message", {
                required: { value: true, message: "Message is required." },
                minLength: {
                  value: 2,
                  message: "Message cannot be less than 2 characters",
                },
                maxLength: {
                  value: 300,
                  message: "Message cannot be more than 300 characters",
                },
              })}
            />
          </Form.Group>

          <div className="mt-3">
            <ButtonControl
              cssClass="btn btn-primary"
              id="submitContact"
              name="submit-contact"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <Spinner size="sm" style={{ marginRight: "3px" }}></Spinner>
              )}
              Submit
            </ButtonControl>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
