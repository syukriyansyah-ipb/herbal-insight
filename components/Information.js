"use client";
import { CgInfo } from "react-icons/cg";
import { Tooltip } from "react-tooltip";

export default function Information({ id, text }) {
  return (
    <div>
      <CgInfo className={`h-4 w-4 ${id}`} />
      <Tooltip anchorSelect={`.${id}`} place="top">
        <div className="text-[10px] md:text-[11px] max-w-32">
          {text ? text : "input your tooltip text"}
        </div>
      </Tooltip>
    </div>
  );
}
