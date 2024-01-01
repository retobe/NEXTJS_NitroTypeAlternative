import React from "react";

const Progress = () => {
  return (
    <div className="text-left p-2"><br />
      <h1 id="headerText">
        This will tell you if you got the character right. <br /> Examples:{" "}
        <br />
      </h1>
      <span id="correctSpan" className="text-green-500 text-3xl text-left">
        Good Job! (e)
      </span>
      <br />
      <span id="incorrectSpan" className="text-red-500 text-3xl text-left">
        Unlucky! (Character)
      </span>
    </div>
  );
};

export default Progress;
