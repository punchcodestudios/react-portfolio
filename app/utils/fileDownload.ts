import { getDateStampForFilename } from "./date";
import { invariantResponse } from "./site";

export const getResumeDoc = () => {
  return fetch("/docs/CURRENT_RESUME_2025.pdf").then((response) => {
    if (response.ok) {
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `patrick_schandler_resume_${getDateStampForFilename()}.docx`;
        a.click();
        window.URL.revokeObjectURL(url); // Clean up
      });
    } else {
      throw new Error(response.status.toString());
    }
  });
};

export const getResumePdf = () => {
  try {
    fetch("/docs/CURRENT_RESUME_2025.pdf").then((response) => {
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `patrick_schandler_resume_${getDateStampForFilename()}.docx`;
        a.click();
        window.URL.revokeObjectURL(url); // Clean up
      });
    });
  } catch (error) {
    // console.log("error: ", error);
  }
};
