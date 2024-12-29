import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import IconService from "../../../services/icon-service";
import { SolidIcon } from "../../../utils/enums";
import ButtonControl from "../button/button.control";

interface Props {
  onChange: (currentPage: number) => void;
  totalRecords: number;
  pageSize: number | 5;
}
const DataPager: React.FC<Props> = ({ onChange, totalRecords, pageSize }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);

  useEffect(() => {
    setNumPages(Math.ceil(totalRecords / pageSize) || 1);
    setCurrentPage(1);
  }, [totalRecords, pageSize]);

  useEffect(() => {
    if (onChange) {
      onChange(currentPage);
    }
  }, [currentPage]);

  const handlePageClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    switch (event.currentTarget.id) {
      case "begin":
        setCurrentPage(1);
        break;
      case "previous":
        setCurrentPage(currentPage - 1);
        break;
      case "next":
        setCurrentPage(currentPage + 1);
        break;
      case "end":
        setCurrentPage(Math.ceil((totalRecords || 1) / (pageSize || 1)));
        break;
    }
  };

  return (
    <div className="data-pager d-flex">
      <div className="">
        <ButtonControl
          id="begin"
          name="begin"
          cssClass="btn btn-primary"
          onClick={handlePageClick}
          disabled={currentPage == 1}
        >
          <FontAwesomeIcon
            icon={IconService.getSolid(SolidIcon.BACKWARD)}
          ></FontAwesomeIcon>
        </ButtonControl>
      </div>
      <div className="">
        <ButtonControl
          id="previous"
          name="previous"
          cssClass="btn btn-primary"
          onClick={handlePageClick}
          disabled={currentPage == 1}
        >
          <FontAwesomeIcon
            icon={IconService.getSolid(SolidIcon.SUBTRACT)}
          ></FontAwesomeIcon>
        </ButtonControl>
      </div>
      <div className="d-flex pager-text">{`Page ${currentPage} of ${numPages}`}</div>
      <div className="">
        <ButtonControl
          id="next"
          name="next"
          cssClass="btn btn-primary"
          onClick={handlePageClick}
          disabled={currentPage == numPages}
        >
          <FontAwesomeIcon
            icon={IconService.getSolid(SolidIcon.ADD)}
          ></FontAwesomeIcon>
        </ButtonControl>
      </div>
      <div className="">
        <ButtonControl
          id="end"
          name="end"
          cssClass="btn btn-primary"
          onClick={handlePageClick}
          disabled={currentPage == numPages}
        >
          <FontAwesomeIcon
            icon={IconService.getSolid(SolidIcon.FORWARD)}
          ></FontAwesomeIcon>
        </ButtonControl>
      </div>
    </div>
  );
};

export default DataPager;
