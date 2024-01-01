"use client";
import React, {
  ButtonHTMLAttributes,
  ChangeEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";

const Countdown = () => {
  const handleBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    var newValue = getChildernIndex(event.target);

    if (newValue < 0) {
      newValue = 0;
    }

    const buttonList = document.querySelector(
      "#buttonList"
    ) as HTMLDivElement | null;
    if (!buttonList) return;

    let addedClass = false;
    for (let i = 0; i < buttonList.children.length; i++) {
      const btnElement = buttonList.children[i];
      if (getChildernIndex(btnElement) === newValue) {
        btnElement.classList.add("clicked");
        addedClass = true;
      } else {
        btnElement.classList.remove("clicked");
      }
    }

    if (!addedClass) {
      buttonList.children[0].classList.add("clicked");
    }

    var sessionValue: any;

    switch (newValue) {
      case 0:
        sessionValue = "None";
        break;
      case 1:
        sessionValue = "15";
        break;
      case 2:
        sessionValue = "30";
        break;
      case 3:
        sessionValue = "60";
        break;
      default:
        sessionValue = "None";
        break;
    }

    sessionStorage.setItem("timer", `${sessionValue}`);
  };

  const getChildernIndex = (element: any) => {
    const parentElement = element.parentElement;

    if (!parentElement) {
      return -1;
    }

    const children = Array.from(parentElement.children);

    const index = children.indexOf(element);

    return index;
  };

  const defaultClicked = () => {
    const buttonList = document.querySelector(
      "#buttonList"
    ) as HTMLDivElement | null;
    if (!buttonList) return window.location.reload();

    let timer = sessionStorage.getItem("timer") || "None";

    if (timer != "None" && timer != "15" && timer != "30" && timer != "60") {
      timer = "None";
      sessionStorage.setItem("timer", `None`);
    }

    switch (timer) {
      case "None":
        buttonList.children[0].classList.add("clicked");
        break;
      case "15":
        buttonList.children[1].classList.add("clicked");
        break;
      case "30":
        buttonList.children[2].classList.add("clicked");
        break;
      case "60":
        buttonList.children[3].classList.add("clicked");
        break;
      default:
        buttonList.children[0].classList.add("clicked");
        sessionStorage.setItem("timer", `None`);
        break;
    }
    console.log(timer);
  };

  useEffect(() => {
    defaultClicked();
  });

  return (
    <div id="buttonList" className="flex gap-4 items-center justify-center">
      <button
        onClick={handleBtnClick}
        className="p-2 shadow-lg bg-slate-400 px-4 rounded-md hover:shadow-none transition-all hover:bg-slate-600 hover:text-white duration-300"
      >
        No Timer
      </button>
      <button
        onClick={handleBtnClick}
        className="p-2 shadow-lg bg-slate-400  px-4 rounded-md hover:shadow-none transition-all hover:bg-slate-600 hover:text-white duration-300"
      >
        15 Seconds
      </button>
      <button
        onClick={handleBtnClick}
        className="p-2 shadow-lg bg-slate-400  px-4 rounded-md hover:shadow-none transition-all hover:bg-slate-600 hover:text-white duration-300"
      >
        30 Seconds
      </button>
      <button
        onClick={handleBtnClick}
        className="p-2 shadow-lg bg-slate-400  px-4 rounded-md hover:shadow-none transition-all hover:bg-slate-600 hover:text-white duration-300"
      >
        60 Seconds
      </button>
    </div>
  );
};

export default Countdown;
