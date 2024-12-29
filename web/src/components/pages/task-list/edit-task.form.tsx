import ButtonControl from "@/components/common/button/button.control";
import { Textbox } from "@/components/common/textbox/textbox.component";
import { EditTaskItem, TaskItem } from "@/entities/TaskItem";
import useTasks from "@/state-management/task/use-tasks";
import { joiResolver } from "@hookform/resolvers/joi";
import JoiDate from "@joi/date";
import BaseJoi from "joi";
import { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import taskService from "../../../services/task-service";

const EditTaskForm = () => {
  const { dispatch } = useTasks();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [taskItem, setTaskItem] = useState<TaskItem>({} as TaskItem);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // console.log("edit task id: ", id);
    if (id) {
      taskService.getTask(id).then((response) => {
        // console.log("response: ", response);
        if (!response || !response.meta.success) {
          //   console.log(response.error.message);
          toast.error(response.error.message);
        } else {
          setTaskItem(response.target[0]);
        }
      });
    }
  }, []);

  useEffect(() => {
    setValue("id", taskItem._id || "");
    setValue("title", taskItem.title || "");
    setValue(
      "dueDate",
      taskItem.dueDate ? new Date(taskItem.dueDate) : new Date()
    );
    setValue("description", taskItem.description || "");
    setValue("taskGroup", taskItem.taskGroup || "");
  }, [taskItem]);

  const Joi = BaseJoi.extend(JoiDate);
  const schema = Joi.object({
    id: Joi.string()
      .required()
      .messages({ "string.empty": "object must include a valid id" }),
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
    taskGroup: Joi.string()
      .required()
      .messages({ "string.empty": "Task Group is required" }),
  });

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      title: "",
      dueDate: new Date(),
      description: "",
      taskGroup: "",
    },
    resolver: joiResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = (values: EditTaskItem) => {
    console.log("Form values: ", values);
    setError("");
    setIsLoading(true);
    taskService
      .updateTask(values)
      .then((response) => {
        if (!response || !response.meta.success) {
          setError(response.error.message);
        } else {
          dispatch({ type: "SET_TASKS", payload: response.target });
          navigate("/tasks/task-list");
        }
      })
      .catch((error: any) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return;
  };

  if (error) {
    // console.log("ERROR: ", error);
    toast.error(error);
  }

  return (
    <>
      <div className="form-container">
        <Toaster></Toaster>
        <div className="formWrapper">
          <Form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="formTitle">Edit Task Item</h1>
            <input type="hidden" id="hidden" {...register("id")}></input>
            <Form.Group className="mb-3">
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Textbox
                    id="title"
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholderText="task title"
                    value={field.value}
                  />
                )}
              />
              <div className="validationError">
                <span>{errors.title?.message}</span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Textbox
                    id="description"
                    name="description"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholderText="task description"
                    value={field.value}
                  />
                )}
              />
              <div className="validationError">
                <span>{errors.description?.message}</span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
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
                    minDate={new Date()}
                    value={new Date(field.value).toDateOnlyString()}
                  />
                )}
              />
              <div className="validationError">
                <span>{errors.dueDate?.message}</span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Controller
                control={control}
                name="taskGroup"
                render={({ field }) => (
                  <Textbox
                    id="taskGroup"
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholderText="task group"
                    value={field.value}
                  />
                )}
              />
              <div className="validationError">
                <span>{errors.taskGroup?.message}</span>
              </div>
            </Form.Group>

            <Form.Group>
              <ButtonControl
                id="submit"
                name="submit"
                type="submit"
                cssClass="btn btn-primary full-height"
                disabled={isLoading}
              >
                {isLoading ? <Spinner></Spinner> : "Edit item"}
              </ButtonControl>
            </Form.Group>

            <Form.Group>
              <ButtonControl
                id="cancel"
                name="cancel"
                type="button"
                cssClass="btn btn-primary full-height mt-3"
                disabled={isLoading}
                onClick={() => navigate("/tasks/task-list")}
              >
                {isLoading ? <Spinner></Spinner> : "Cancel"}
              </ButtonControl>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditTaskForm;
