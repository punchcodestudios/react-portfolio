import toast, { Toaster } from "react-hot-toast";
import { Email } from "@/entities/Email";
import NodeAPIClient from "@/services/node-api-client";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ContactForm = () => {
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
      text: "",
    },
  });

  const apiClient = new NodeAPIClient<Email>("/mail/send-contact");

  const onSubmit = async (values: Email) => {
    const contact: Email = {
      name: values.name,
      from: values.from,
      subject: values.subject,
      text: values.text,
    };
    try {
      const response = await apiClient.post(contact);
      if (response.status === 200) {
        toast.success(response.message);
        reset();
        // console.log("Email sent!. \nResponse:", response.status);
      } else {
        toast.error(response.message);
        // console.log("Email not sent. \nResponse:", response);
      }
    } catch (error) {
      console.log("error sending email", error);
    }
  };

  return (
    <div className="contact-page">
      <Toaster></Toaster>
      <Form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="name"></Form.Group>
        <input
          type="text"
          id="name"
          className="form-control mb-3"
          placeholder="Your Name"
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
        <div className="error">
          <span>{touchedFields.name && errors.name?.message}</span>
        </div>

        <input
          type="text"
          placeholder="Subject"
          id="subject"
          className="form-control mb-3"
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
        <div className="error">
          <span>{touchedFields.subject && errors.subject?.message}</span>
        </div>

        <textarea
          id="text"
          className="form-control mb-3"
          placeholder="Message"
          {...register("text", {
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
        <div className="error">
          <span>{touchedFields.text && errors.text?.message}</span>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default ContactForm;
