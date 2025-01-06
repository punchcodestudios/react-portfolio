const dateUtil = {
  toLocalDateString: (d: Date) => {
    return new Date(d).midnight().toString();
  },
};

export default dateUtil;
