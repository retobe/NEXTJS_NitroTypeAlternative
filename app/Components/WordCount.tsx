"use client";
import React, { ChangeEvent, useState } from "react";

const WordCount = () => {
  const [wordAmount, setWordAmount] = useState(15);

  const handleWordAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWordAmount(parseInt(event.target.value));
    sessionStorage.setItem("wordAmount", `${parseInt(event.target.value) < 15 || parseInt(event.target.value) > 60 ? 15 : parseInt(event.target.value)}`);
  };

  return (
    <div className="flex items-center justify-center gap-3">
        <label htmlFor="wordAmount">Word Amount: </label>
      <input
        type="number"
        name="wordAmount"
        className="input number bg-slate-800 shadow"
        id="wordAmount"
        max={60}
        min={15}
        value={wordAmount}
        onChange={handleWordAmountChange}
      />
    </div>
  );
};

export default WordCount;
