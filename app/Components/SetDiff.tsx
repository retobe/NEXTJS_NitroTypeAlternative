"use client";
import React, { ChangeEvent, useState } from "react";

const SetDiff = () => {
  const [diff, setDiff] = useState(6);

  const handleDiff = (event: ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt(event.target.value);
    const spanElement = document.querySelector(
      "#rangeDiff"
    ) as HTMLSpanElement | null;

    if (value && spanElement) {
      if (!isNaN(value) && value >= 3 && value <= 10) {
        if (value > 6) {
          spanElement.className = "";
          spanElement.classList.add("text-red-300");
          spanElement.innerHTML = "Hard";
          sessionStorage.setItem("diff", "hard");
        } else if (value <= 6 && value > 3) {
          spanElement.className = "";
          spanElement.classList.add("text-yellow-300");
          spanElement.innerHTML = "Medium";
          sessionStorage.setItem("diff", "medium");
        } else {
          spanElement.className = "";
          spanElement.classList.add("text-green-300");
          spanElement.innerHTML = "Easy";
          sessionStorage.setItem("diff", "easy");
        }
        setDiff(value);
      }
    }
  };

  return (
    <div className="flex items-center mx-auto justify-center p-3 shadow rounded-md">
      <label id="diffLabel" htmlFor="difficulty">
        Your Difficulty is set to{" "}
        <span id="rangeDiff" className="text-yellow-300">
          Medium:
        </span>{" "}
        &nbsp;{" "}
      </label>
      <input
        type="range"
        className="input-bordered range max-w-[200px]"
        name="difficulty"
        id="difficulty"
        onChange={handleDiff}
        max={10}
        min={3}
        step={1}
        value={diff}
      />
    </div>
  );
};

export default SetDiff;
