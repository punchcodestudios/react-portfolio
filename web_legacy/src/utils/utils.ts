const utcDateToLocalString = (date: Date) => {
  const offset = date.getTimezoneOffset();
  return new Date(
    date.setMinutes(date.getMinutes() + offset)
  ).toLocaleDateString("en-us");
};

export { utcDateToLocalString };
