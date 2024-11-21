import React, { FormEvent, useRef } from "react";

const RegisterForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("event: ", event);
  };

  return (
    <form className="mb-3">
      <div className="row mb-3">
        <input
          id="name"
          name="name"
          type="text"
          ref={nameRef}
          className="form-control"
        ></input>
      </div>
      <div className="row mb-3">
        <input
          id="email"
          name="email"
          type="text"
          ref={emailRef}
          className="form-control"
        ></input>
      </div>
      <div className="row mb-3">
        <input
          id="password"
          name="password"
          type="password"
          ref={passwordRef}
          className="form-control"
        ></input>
      </div>
      <div className="row mb-3">
        <button
          type="submit"
          className="btn btn-submit"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
