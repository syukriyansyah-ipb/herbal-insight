"use client";
import { Tooltip } from "react-tooltip";

export default function CustomTooltip({ children, id, text }) {
  return (
    <>
      <div className={`${id}`}>{children}</div>
      <Tooltip anchorSelect={`.${id}`} place="top">
        <div className="text-[10px] md:text-[11px] max-w-32">
          {text ? text : "input your tooltip text"}
        </div>
      </Tooltip>
    </>
  );
}
