import ButtonControl from "@/components/common/button/button.control";
import { Container, Form, Nav, Navbar, NavItem } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import BaseJoi from "Joi";
import JoiDate from "@joi/date";
import { joiResolver } from "@hookform/resolvers/joi";
import "react-datepicker/dist/react-datepicker.css";

const AddTaskMenuBar = () => {
  const Joi = BaseJoi.extend(JoiDate);
  const schema = Joi.object({
    title: Joi.string()
      .required()
      .messages({ "string.empty": "Title is a required field." }),
    description: Joi.string().required().messages({
      "string.empty": "Description is a required field.",
    }),
    dueDate: Joi.date()
      .required()
      .format("MM-DD-YYYY")
      .messages({ "date.base": "Due Date is required" }),
    // .messages({ "string.empty": "Due Date is a required field." }),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      title: "",
      dueDate: new Date(),
      description: "",
      // taskGroup: "",
    },
    resolver: joiResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (values: any) => {
    console.log(values);
    return;
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="form-menu-bar">
        <Navbar expand="lg" className="nav main-nav" collapseOnSelect>
          <Container>
            <Navbar.Brand></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="form-menu-bar-container"
              id="basic-navbar-nav"
            >
              <Nav className="form-menu-bar">
                <NavItem className="form-menu-bar-item mb-1">
                  <ButtonControl
                    id="submit"
                    name="submit"
                    type="submit"
                    cssClass="btn btn-primary full-height"
                  >
                    Add new item
                  </ButtonControl>
                </NavItem>
                <NavItem className="form-menu-bar-item mb-1">
                  <input
                    className="input"
                    type="text"
                    id="title"
                    aria-label="Task Item title"
                    placeholder="task item title"
                    {...register("title")}
                  />
                  <div className="validationError">
                    <span>{touchedFields.title && errors.title?.message}</span>
                  </div>
                </NavItem>
                <NavItem className="form-menu-bar-item mb-1">
                  <input
                    className="input"
                    type="text"
                    id="description"
                    aria-label="Task Item description"
                    placeholder="task item description"
                    {...register("description")}
                  />
                  <div className="validationError">
                    <span>
                      {touchedFields.description && errors.description?.message}
                    </span>
                  </div>
                </NavItem>
                <NavItem className="form-menu-bar-item mb-1">
                  <Controller
                    control={control}
                    name="dueDate"
                    render={({ field }) => (
                      <DatePicker
                        id="dueDate"
                        name="dueDate"
                        placeholderText="Select date"
                        selected={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className="input"
                      />
                    )}
                  />
                  <div className="validationError">
                    <span>
                      {touchedFields.dueDate && errors.dueDate?.message}
                    </span>
                  </div>
                </NavItem>
                {/*<NavItem className="form-menu-bar-item mb-1"> 
                   <select
                    id="taskGroup"
                    className="input"
                    {...register("taskGroup")}
                  >
                    <option value={"0"}>select a group option</option>
                    {groupOptions.map((opt) => (
                      <option key={opt.refid} value={opt.refid}>
                        {opt.title}
                      </option>
                    ))}
                  </select>
                  <div className="validationError">
                    <span>
                      {touchedFields.taskGroup && errors.taskGroup?.message}
                    </span>
                  </div>
                </NavItem> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {Object.keys(touchedFields).length > 0 && (
          <pre>{JSON.stringify(touchedFields, null, 2)}</pre>
        )}
      </Form>
    </>
  );
};

export default AddTaskMenuBar;
