import { ReactNode } from "react";
import useImage from "../../../hooks/useImage";

interface Props {
  children: ReactNode;
  imgSrc: string;
  imgAlt: string;
}

const ContentCard = ({ children, imgSrc, imgAlt }: Props) => {
  const { loaded } = useImage({ imgSrc });
  return (
    <section className="content-card mt-3 col-md-10 p-3">
      <div className="card-header d-flex justify-content-center">
        <h2>Summary</h2>
      </div>
      <hr></hr>
      <div className="d-flex flex-row justify-content-between">
        <div className="col-md-3">
          <img className={`smooth ${loaded}`} src={imgSrc} alt={imgAlt} />
        </div>
        <div className="col-md-9">{children}</div>
      </div>
    </section>
  );
};
export default ContentCard;
