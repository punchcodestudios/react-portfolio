export const getDateStampForFilename = () => {
  const d = new Date();
  return `${d.getMonth()}_${d.getDate()}_${d.getFullYear()}_${d.getTime()}`;
};
