declare global {
  interface Date {
    addDays: (n: number) => Date;
    dateDiff: (d: Date) => number;
    midnight: () => Date;
    toDateOnlyString: () => string;
  }
}

Date.prototype.midnight = function () {
  let date = new Date(this.valueOf());
  const newDate = new Date(
    date.getUTCFullYear(),
    date.getUTCDay(),
    date.getUTCDate()
  );
  // console.log(newDate);
  return new Date(date);
};

Date.prototype.toDateOnlyString = function () {
  const date = new Date(this.valueOf());
  return `${
    date.getUTCMonth() + 1
  }-${date.getUTCDate()}-${date.getUTCFullYear()}`;
};

Date.prototype.addDays = function (days: number) {
  var date = new Date(this.valueOf());
  date.setDate(date.getUTCDate() + days);
  return date;
};

Date.prototype.dateDiff = function (compareTo: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const a = new Date(this.valueOf());
  const b = new Date(compareTo);

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export default Date = Date;
