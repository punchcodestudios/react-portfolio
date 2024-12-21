import ButtonControl from "@/components/common/button/button.control";
import { AddTaskItem, TaskGroup } from "@/entities/TaskItem";
import useTasks from "@/state-management/task/use-tasks";

import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { utcDateToLocalString } from "../../../utils/utils";

const AddTaskForm = () => {
  const { addTask } = useTasks();

  // this is bullshit lol
  const onDateFocus = (e: any) => (e.target.type = "date");
  const onDateBlur = (e: any) => {
    e.target.type = "text";
    e.target.value = utcDateToLocalString(new Date(e.target.value));
  };

  const groupOptions: TaskGroup[] = [
    { refid: "1", title: "Group 1", description: "description for group one" },
    { refid: "2", title: "Group 2", description: "description for group two" },
    {
      refid: "3",
      title: "Group 3",
      description: "description for group three",
    },
    { refid: "4", title: "Group 4", description: "description for group four" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      taskGroupRefid: "0",
    },
    mode: "onChange",
  });

  const onSubmit = (values: AddTaskItem) => {
    addTask(values)
      .then((response) => {
        // console.log("Response: ", response);
      })
      .catch((error) => {
        // console.log("ERROR: ", error);
      });
  };

  return (
    <>
      <div className="form-container">
        <Toaster></Toaster>
        <div className="formWrapper">
          <Form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="formTitle">Add Task Item</h1>
            <Form.Group className="mb-3">
              <input
                className="input"
                type="text"
                id="title"
                aria-label="Task Item title"
                required
                placeholder="task item title"
                {...register("title", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
              />
              <div className="validationError">
                <span>{touchedFields.title && errors.title?.message}</span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <input
                className="input"
                type="text"
                id="description"
                aria-label="Task Item description"
                required
                placeholder="task item description"
                {...register("description", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
              />
              <div className="validationError">
                <span>
                  {touchedFields.description && errors.description?.message}
                </span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <input
                className="input"
                type="text"
                id="dueDate"
                aria-label="Task Item dueDate"
                required
                placeholder="task item dueDate"
                onFocus={(e) => onDateFocus(e)}
                {...register("dueDate", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                  onBlur: onDateBlur,
                })}
              />
              <div className="validationError">
                <span>{touchedFields.dueDate && errors.dueDate?.message}</span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <select
                id="selectId"
                className="input"
                {...register("taskGroupRefid", {
                  required: "this is required",
                })}
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
                  {touchedFields.taskGroupRefid &&
                    errors.taskGroupRefid?.message}
                </span>
              </div>
            </Form.Group>

            <Form.Group>
              <ButtonControl
                id="submitTaskItem"
                name="submittaskitem"
                cssClass="btn btn-primary"
              >
                Add Task
              </ButtonControl>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddTaskForm;
