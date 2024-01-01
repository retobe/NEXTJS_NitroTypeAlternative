"use client";
import React, { useEffect, useRef, useState, ReactNode } from "react";

interface ReactPopoverProps {
  children: ReactNode;
  content: ReactNode;
  trigger?: "click" | "hover";
}

function ReactPopover({
  children,
  content,
  trigger = "click",
}: ReactPopoverProps) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleMouseOver = () => {
    if (trigger === "hover") {
      setShow(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setShow(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [show, wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className="w-fit h-fit relative flex justify-center "
    >
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        hidden={!show}
        className="min-w-fit w-[200px] h-fit absolute bottom-[100%] z-50 "
      >
        <div className="rounded bg-yellow-600 text-white shadow p-3 mb-[10px]">
          {content}
        </div>
      </div>
    </div>
  );
}

export default ReactPopover;
