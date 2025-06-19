import React, { useState, type ReactNode, useEffect } from "react";
import { useDataContext } from "../data/dataContext";
import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./button";

interface VerticalExpandCardProps {
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  defaultExpanded?: boolean;
}

const VerticalExpandCard: React.FC<VerticalExpandCardProps> = ({
  header,
  body,
  footer,
  defaultExpanded = faScaleBalanced,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="border rounded shadow bg-white w-full p-2">
      <div className="flex flex-row w-full items-center justify-between">
        <div className="w-[95%]">{header}</div>
        <div className="w-[40px]">
          <Button variant="primary" onClick={() => setExpanded(!expanded)}>
            {expanded ? "▲" : "▼"}
          </Button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          expanded ? "max-h-[1000px]" : "max-h-0"
        }`}
        style={{ willChange: "max-height" }}
        aria-hidden={!expanded}
      >
        <div className="px-4 py-3">{body}</div>

        {footer && (
          <div className="px-4 py-2 border-t bg-gray-50 rounded-b">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalExpandCard;
