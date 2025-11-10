import React from "react";
import jsonData from "../json-data/image-data.json";
import type { PunchcodeImage } from "~/entities/punchcodeImage";

interface Props {
  path: string;
}
const useImage = ({ path }: Props): PunchcodeImage => {
  const item = jsonData.find((i: { ref: string | undefined }) => i.ref == path);
  return item || ({} as PunchcodeImage);
};

export default useImage;
