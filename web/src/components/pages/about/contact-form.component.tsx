import { Email } from "@/entities/Email";
import NodeAPIClient from "@/services/node-api-client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      from: "punchcodestudios.com",
      subject: "",
      message: "",
    },
  });
  const apiClient = new NodeAPIClient<Email>("/mail/send");

  //   const handleChange = (
  //     event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  //   ) => {
  //     setState((prevState) => ({
  //       ...prevState,
  //       [event.target.name]: event.target.value,
  //     }));
  //   };

  const onSubmit = async (values: Email) => {
    const contact: Email = {
      name: values.name,
      message: values.message,
      from: values.message,
      subject: "Contact from website",
    };
    try {
      apiClient.post(contact).then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Email sent!. \nResponse:", response);
        } else {
          console.log("Email not sent. \nResponse:", response);
        }
      });
    } catch (error) {
      console.log("error sending email");
    }
  };

  return (
    <div className="contact-page">
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
              message: "Name cannot be more than 30 characters",
            },
          })}
        />
        <div className="error">
          <span>{touchedFields.name && errors.name?.message}</span>
        </div>

        <input
          type="text"
          placeholder="Subject"
          id="from"
          className="form-control mb-3"
          {...register("from", {
            required: { value: true, message: "From is required." },
            minLength: {
              value: 2,
              message: "From cannot be less than 2 characters",
            },
            maxLength: {
              value: 30,
              message: "From cannot be more than 30 characters",
            },
          })}
        />
        <div className="error">
          <span>{touchedFields.from && errors.from?.message}</span>
        </div>

        <textarea
          id="message"
          className="form-control mb-3"
          placeholder="Message"
          {...register("message", {
            required: { value: true, message: "Message is required." },
            minLength: {
              value: 2,
              message: "Message cannot be less than 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Message cannot be more than 50 characters",
            },
          })}
        />
        <div className="error">
          <span>{touchedFields.message && errors.message?.message}</span>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default ContactForm;
