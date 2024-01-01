"use client";
import React from "react";
import ReactPopover from "../Components/Popover";
import Link from "next/link";

const setStatistics = (): void => {
  const correctAmount = sessionStorage.getItem("correctAmount");
  const incorrectAmount = sessionStorage.getItem("incorrectAmount");
  const letterAmount = sessionStorage.getItem("letterAmount");
  const wpmRounded = sessionStorage.getItem("roundedWPM");
  const preciseWPM = sessionStorage.getItem("preciseWPM");
  const timeTook = sessionStorage.getItem("timeTook");
  const accuracy = sessionStorage.getItem("accuracy");
  const preciseAccuracy = sessionStorage.getItem("preciseAccuracy");
  const timeStarted = sessionStorage.getItem("timeStarted");
  const timeFinished = sessionStorage.getItem("timeFinished");
  const wordsTyped = sessionStorage.getItem("wordsTyped");

  // Parse values as needed
  const parsedPreciseWPM = parseFloat(preciseWPM || "0");
  const parsedWpmRounded = parseFloat(wpmRounded || "0");
  const parsedPreciseAccuracy = parseFloat(preciseAccuracy || "0");
  const parsedAccuracy = parseFloat(accuracy || "0");
  const parsedCorrectAmount = parseInt(correctAmount || "0", 10);
  const parsedIncorrectAmount = parseInt(incorrectAmount || "0", 10);
  const parsedLetterAmount = parseInt(letterAmount || "0", 10);
  const parsedTimeTook = timeTook || "";
  const parsedTimeStarted = timeStarted || ""; // Assuming this is a string
  const parsedTimeFinished = timeFinished || ""; // Assuming this is a string

  /**
   * Main Statistics Elements
   */
  const exactNumberWPMElement = document.querySelector(
    "#exactNumberWPM"
  ) as HTMLParagraphElement | null;
  const roundedWPMElement = document.querySelector(
    "#roundedNumberWPM"
  ) as HTMLSpanElement | null;
  const accuracyElement = document.querySelector(
    "#exactNumberAccuracy"
  ) as HTMLParagraphElement | null;
  const accuracyRoundedElement = document.querySelector(
    "#roundedNumberAccuracy"
  ) as HTMLSpanElement | null;

  /**
   * Letter Statistics Elements
   */
  const letterCorrectElement = document.getElementById(
    "letterCorrect"
  ) as HTMLSpanElement | null;
  const letterIncorrectElement = document.getElementById(
    "letterIncorrect"
  ) as HTMLSpanElement | null;
  const letterAmountElement = document.getElementById(
    "letterAmount"
  ) as HTMLSpanElement | null;

  /**
   * Time Elements
   */
  const timeTookElement = document.getElementById(
    "timeTook"
  ) as HTMLSpanElement | null;
  const timeFinishedElement = document.getElementById(
    "timeFinished"
  ) as HTMLSpanElement | null;
  const timeStartedElement = document.getElementById(
    "timeStarted"
  ) as HTMLSpanElement | null;

  if (exactNumberWPMElement) {
    exactNumberWPMElement.textContent = `${parsedPreciseWPM} WPM`;
  }

  if (roundedWPMElement) {
    roundedWPMElement.textContent = `${parsedWpmRounded} WPM`;
  }

  if (accuracyElement) {
    accuracyElement.textContent = `${parsedPreciseAccuracy}%`;
  }

  if (accuracyRoundedElement) {
    accuracyRoundedElement.textContent = `${parsedAccuracy}%`;
  }

  if (letterCorrectElement) {
    letterCorrectElement.textContent = `${parsedCorrectAmount} Correct`;
  }

  if (letterIncorrectElement) {
    letterIncorrectElement.textContent = `${parsedIncorrectAmount} Incorrect`;
  }

  if (letterAmountElement) {
    letterAmountElement.textContent = `${parsedLetterAmount} Letters`;
  }

  if (timeTookElement) {
    timeTookElement.textContent = ` ${parsedTimeTook}`;
  }

  if (timeFinishedElement) {
    timeFinishedElement.textContent = ` ${parsedTimeFinished}`;
  }

  if (timeStartedElement) {
    timeStartedElement.textContent = ` ${parsedTimeStarted}`;
  }
};

setTimeout(setStatistics, 2000);

const page = () => {
  return (
    <div className="flex transition-all duration-300 flex-col gap-2 items-center bg-yellow-500 w-full h-full absolute text-white select-none">
      <h1 className="text-3xl mt-2 capitalize">Results from the test!</h1>
      <div className="result">
        <h1 className="wpm  transition-all duration-300">
          Word Per Minute Calculation{" "}
          <ReactPopover
            trigger="click"
            content={
              <p
                className="text-white transition-all duration-300"
                id="exactNumberWPM"
              >
                0.00 WPM
              </p>
            }
          >
            <span
              className="text-2xl block ml-2 text-yellow-300 cursor-pointer transition-all duration-300"
              id="roundedNumberWPM"
            >
              0 WPM
            </span>
          </ReactPopover>{" "}
        </h1>
        <h1 className="accuracy">
          Accuracy Calculation{" "}
          <ReactPopover
            trigger="click"
            content={
              <p
                className="text-white  transition-all duration-300"
                id="exactNumberAccuracy"
              >
                0.00 %
              </p>
            }
          >
            <span
              className="text-2xl block ml-2 text-yellow-300 cursor-pointer transition-all duration-300"
              id="roundedNumberAccuracy"
            >
              0%
            </span>
          </ReactPopover>{" "}
        </h1>
        <h1 className="letters">
          Letter Statistics
          <div className="flex flex-row-reverse gap-3 ">
            <span className="text-2xl ml-2 text-green-500" id="letterCorrect">
              Correct
            </span>
            <span className="text-2xl ml-2 text-red-500" id="letterIncorrect">
              Incorrect
            </span>
            <span className="text-2xl ml-2 text-yellow-300" id="letterAmount">
              Total
            </span>
          </div>
        </h1>

        <div className="time">
          Time Statistics
          <div className="flex flex-col gap-3 w-full items-start justify-start">
            <span className="text-2xl ml-2 text-yellow-300">
              Started:{" "}
              <span className="timeStarted text-black" id="timeStarted"></span>
            </span>
            <span className="text-2xl ml-2 text-yellow-300">
              Finished:
              <span
                className="timeFinished text-black"
                id="timeFinished"
              ></span>
            </span>
            <span className="text-2xl ml-2 text-yellow-300">
              Time Took:
              <span id="timeTook" className="timeTook text-black"></span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <Link
          href={"/speed-test"}
          className="p-3 rounded-lg shadow bg-white text-black hover:bg-black hover:text-white duration-300"
        >
          Try Again
        </Link>
        <Link
          href={"/"}
          className="p-3 rounded-lg shadow bg-white text-black hover:bg-black hover:text-white duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default page;
