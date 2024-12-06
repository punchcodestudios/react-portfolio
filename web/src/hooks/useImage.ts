import { useState, useEffect } from "react";

interface Props {
  imgSrc: string;
}

const useImage = ({ imgSrc }: Props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => setLoaded(true);
  }, [imgSrc]);
  return {
    loaded,
  };
};

export default useImage;
