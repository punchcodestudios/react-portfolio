const STATUS = Object.freeze({
  IDLE: "idle",
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
});

const utcDateToLocalString = (date: Date) => {
  const offset = date.getTimezoneOffset();
  return new Date(
    date.setMinutes(date.getMinutes() + offset)
  ).toLocaleDateString("en-us");
};

export { STATUS, utcDateToLocalString };
