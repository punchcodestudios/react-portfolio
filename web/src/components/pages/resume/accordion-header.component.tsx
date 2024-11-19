import React from "react";

interface Props {
  company_name: String;
  start_date: String;
  end_date: String;
  position: String;
  location: String;
}
const AccordionHeader = ({ ...props }: Props) => {
  return (
    <div className="row">
      <h4>
        <strong>{props.company_name}</strong>
      </h4>
      {props.start_date && (
        <span className="employment-date">{`${props.start_date} - ${
          props.end_date ? props.end_date : "present"
        }`}</span>
      )}
      {props.position && (
        <span className="tagline">{`${props.position} | ${
          props.location.split("|")[1]
        }, ${props.location.split("|")[2]}`}</span>
      )}
    </div>
  );
};

export default AccordionHeader;
