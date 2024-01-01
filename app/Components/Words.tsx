"use client";
import React, { useEffect } from "react";

var gameRunning: boolean = false;
var letterAmount: number = 0;
var wordsTyped: number = 1;
var incorrectAmount: number = 0;
var correctAmount: number = 0;
var timeStarted: Date;
var timeFinished: Date;
var timer: string = sessionStorage.getItem("timer") || "None";
let intervalId: number | undefined;

document.addEventListener("keydown", function (event) {
  if (!gameRunning) return;
  const key = event.key.trim();
  if (key.length >= 2) return;
  const wordsElement = document.querySelector(
    "#words"
  ) as HTMLDivElement | null;
  const headerText = document.querySelector(
    "#headerText"
  ) as HTMLHeadingElement | null;
  const correctSpan = document.querySelector(
    "#correctSpan"
  ) as HTMLElement | null;
  const incorrectSpan = document.querySelector(
    "#incorrectSpan"
  ) as HTMLElement | null;
  const activeWord = document.querySelector(".active") as HTMLElement | null;

  if (wordsElement) {
    // Checks If the wordsElement exists
    let addedClass = false; // Variable to determine if a class has been added or not
    const cursorElement = document.querySelector(
      ".cursor"
    ) as HTMLSpanElement | null; // the span element that is currently being cursored
    if (activeWord) {
      // Checks if the active word exists
      const letters = activeWord.querySelectorAll("span"); // gets all the letters from the active word
      let foundCursor = false; // Variable to determine if the cursor element has been found.
      let correctLetter = "";
      if (!cursorElement) {
        // If the cursor element doesn't exist
        return console.error("No Cursor Element Found");
      }

      // Check if the key is correct for the current letter
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];

        if (
          letter.classList.contains("correct") ||
          letter.classList.contains("incorrect")
        ) {
          continue;
        } // To speed up the loop & not overide other letters.

        if (addedClass === true) break; // If the class has already been added then break out of the function

        if (key === letter.textContent) {
          correctLetter = key != "" ? key : "SpaceBar";
          correctAmount += letter.textContent === "" ? 0 : 1;
          letter.classList.add("correct");
          if (correctSpan && incorrectSpan) {
            incorrectSpan.innerHTML = "";
            correctSpan.innerHTML = `Good Job! (${
              key != "" ? key : "SpaceBar"
            })`;
          }
        } else {
          letter.classList.add("incorrect");
          incorrectAmount += letter.textContent === "" ? 0 : 1;
          if (incorrectSpan && correctSpan) {
            correctSpan.innerHTML = "";
            incorrectSpan.innerHTML = `Incorrect! (${
              letter.textContent != "" ? letter.textContent : "SpaceBar"
            })`;
          }
        }

        if (headerText) {
          if (headerText.innerHTML != "") {
            headerText.innerHTML = "";
          }
        }

        if (
          i === letters.length - 2 &&
          letter.parentNode ===
            wordsElement.children[wordsElement.children.length - 1]
        ) {
          timeFinished = new Date();
          alert("Finished all the words.");
          gameResult();
        }

        addedClass = true;
      }

      if (key === "" && correctLetter === "SpaceBar") {
        console.log("RAN THIS SHEET");
        const currentIndex = getChildernIndex(activeWord);

        if (currentIndex !== -1) {
          const nextIndex = currentIndex + 1;

          if (nextIndex < wordsElement.children.length) {
            const nextWordElement = wordsElement.children[nextIndex] as
              | HTMLElement
              | undefined;
            const nextLetterElement = nextWordElement?.firstElementChild as
              | HTMLElement
              | undefined;

            if (nextLetterElement) {
              nextLetterElement.classList.add("cursor");
              cursorElement?.classList.remove("cursor");
              foundCursor = true;
            }
          } else {
            timeFinished = new Date();
            alert("Finished all the words.");
            gameResult();
          }
        }
      }

      if (!foundCursor) {
        for (let i = 0; i < letters.length; i++) {
          // Add the cursor class to the right span elemnt
          const letter = letters[i];

          if (foundCursor) {
            // if the cursor has been found (meaning previous index was the cursor)
            letter.classList.add("cursor"); // then we add the current letter the cursor
            cursorElement.classList.remove("cursor"); // and remove the previous cursor element
            break;
          }

          if (letter === cursorElement) {
            // if the current index is the cursor
            foundCursor = true;
          }

          //   if (i === letters.length - 1 && foundCursor === false) {
          //     /**
          //      * if the current index is the last letter and the cursor hasn't been found, then that means there's a new active word.
          //      * */
          //     letters[1].classList.add("cursor");
          //     cursorElement.classList.remove("cursor");
          //     break;
          //   }
        }
      }

      if (addedClass === false) {
        let foundActive = false;
        let currentActiveIndex = 0;
        for (let i = 0; i < wordsElement.children.length; i++) {
          const childElement = wordsElement.children[i];

          if (childElement.classList.contains("active")) {
            foundActive = true;
            currentActiveIndex = i;
          }

          if (foundActive && Math.abs(currentActiveIndex - i) === 1) {
            childElement.classList.add("active");
            break;
          }
        }

        foundActive = false;
        currentActiveIndex = 0;
        wordsTyped += 1;
        activeWord.classList.remove("active");

        const newLetters = document
          .querySelector(".active")
          ?.querySelectorAll("span");
        if (newLetters) {
          for (let i = 0; i < newLetters.length; i++) {
            const letter = newLetters[i];

            if (
              letter.classList.contains("correct") ||
              letter.classList.contains("incorrect")
            ) {
              continue;
            } // To speed up the loop & not overide other letters.

            if (addedClass === true) break; // If the class has already been added then break out of the function

            if (key === letter.textContent) {
              correctAmount += letter.textContent === "" ? 0 : 1;
              letter.classList.add("correct");
              if (correctSpan && incorrectSpan) {
                incorrectSpan.innerHTML = "";
                correctSpan.innerHTML = `Good Job! (${
                  key != "" ? key : "SpaceBar"
                })`;
              }
            } else {
              incorrectAmount += letter.textContent === "" ? 0 : 1;
              letter.classList.add("incorrect");
              if (incorrectSpan && correctSpan) {
                correctSpan.innerHTML = "";
                incorrectSpan.innerHTML = `Incorrect! (${
                  letter.textContent != "" ? letter.textContent : "SpaceBar"
                })`;
              }
            }

            addedClass = true;
          }
          cursorElement.classList.remove("cursor");
          document
            .querySelector(".active")
            ?.children[1]?.classList.add("cursor");
        }
      }

      if (!timeStarted) {
        timeStarted = new Date();
        intervalId = setInterval(startCountDown, 1000) as any;
      }
    } else {
      timeFinished = new Date();
      alert("Finished all the words.");
      gameResult();
    }
  }
});

const startCountDown = () => {
  console.log("RAN TIMER before conditions");
  if (!gameRunning) {
    if (intervalId) {
      clearInterval(intervalId); // Stop the interval if gameRunning is false
    }
    return;
  }
  if (!timer || timer === "None") return;
  if (!timeStarted) return;
  const currentSeconds = (Date.now() - timeStarted.getTime()) / 1000;
  console.log("RAN TIMER");
  if (currentSeconds >= parseInt(timer)) {
    timeFinished = new Date();
    gameRunning = false;
    alert("Time's Up!");
    gameResult();
  } else {
    const countdownElement = document.querySelector(
      "#timerCountdown"
    ) as HTMLHeadingElement | null;
    if (countdownElement) {
      countdownElement.innerHTML = `${Math.round(currentSeconds)}/${timer}`;
    }
  }
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

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const gameResult = () => {
  /**
   * Timestamps / WPMs
   */
  const timeTook: number = timeFinished.getTime() - timeStarted.getTime();
  const minutes: number = timeTook / 60000;
  const roundedTimeTook: number = Math.round(minutes * 100) / 100;
  const wpmPrecise = wordsTyped / roundedTimeTook;
  const wpmRounded = Math.round(wordsTyped / minutes);
  sessionStorage.setItem("wordsTyped", `${wordsTyped}`);
  sessionStorage.setItem("roundedWPM", `${wpmRounded}`);
  sessionStorage.setItem("preciseWPM", `${wpmPrecise.toPrecision(4)}`);
  sessionStorage.setItem("timeStarted", `${timeStarted.toLocaleTimeString()}`);
  sessionStorage.setItem(
    "timeFinished",
    `${timeFinished.toLocaleTimeString()}`
  );

  const timeDifferenceInSeconds: number = Math.round(timeTook / 1000);
  sessionStorage.setItem(
    "timeTook",
    `${
      timeDifferenceInSeconds > 60
        ? Math.round(timeDifferenceInSeconds / 60) + " Minutes"
        : timeDifferenceInSeconds + " Seconds"
    }`
  );

  /**
   * Accuracy Calculations (Letter, Correct and incorrect total amounts)
   */
  sessionStorage.setItem(
    "accuracy",
    `${Math.round((correctAmount / letterAmount) * 100)}`
  );
  sessionStorage.setItem(
    "preciseAccuracy",
    `${((correctAmount / letterAmount) * 100).toPrecision(4)}`
  );
  sessionStorage.setItem("letterAmount", `${letterAmount}`);
  sessionStorage.setItem("incorrectAmount", `${incorrectAmount}`);
  sessionStorage.setItem("correctAmount", `${correctAmount}`);
  window.location.href = "/result";
};

const generateNewWord = async () => {
  const wordsElement = document.querySelector(
    "#words"
  ) as HTMLDivElement | null;
  const tempText = document.querySelector(
    "#tempText"
  ) as HTMLHeadElement | null;
  const difficulty = sessionStorage.getItem("diff") || "medium";
  var wordAmount: string = sessionStorage.getItem("wordAmount") || "15";
  let lengths;

  if (difficulty) {
    if (difficulty === "easy") {
      lengths = generateRandomIntArray(parseInt(wordAmount), 2, 4);
    } else if (difficulty === "medium") {
      lengths = generateRandomIntArray(parseInt(wordAmount), 4, 6);
    } else {
      lengths = generateRandomIntArray(parseInt(wordAmount), 8, 10);
    }
  } else {
    alert("Problem adding the difficulty Level");
    return window.location.reload();
  }

  shuffleArray(lengths);

  lengths = lengths.slice(0, parseInt(wordAmount));

  if (wordsElement) {
    let wordsArray: string[] = [];
    for await (const wordLength of lengths) {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=1&length=${wordLength}`
      );
      const data = await response.json();
      const word = data[0];
      // sessionStorage.setItem("totalLetters", `${letterAmount}`);
      wordsArray.push(word);
    }

    for (const word of wordsArray) {
      const wordElement = document.createElement("div");
      wordElement.classList.add("word");

      for (let j = 0; j < word.length + 1; j++) {
        const letter = word[j] || "";
        const letterElement = document.createElement("span");
        letterElement.innerHTML = `${letter}`;
        letterAmount += letter === "" ? 0 : 1;

        wordElement.appendChild(letterElement);
      }

      wordsElement.appendChild(wordElement);
    }

    if (tempText) {
      tempText.remove();
    }

    const activeElement = wordsElement.firstElementChild;

    if (activeElement) {
      activeElement.classList.add("active");
      if (activeElement.firstElementChild) {
        activeElement.firstElementChild.classList.add("cursor");
      } else {
        console.error("No letter span element was found to add cursor class.");
      }
    } else {
      console.error("No word div element was found to add active class.");
    }

    gameRunning = true;
  } else {
    console.error("Words Element Not Found");
  }
};

setTimeout(() => {
  generateNewWord();
}, 1000);

function generateRandomIntArray(length: number, min: number, max: number) {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

const Words = () => {
  return (
    <div className="p-2">
      <div id="words" className="words flex gap-2 flex-wrap w-full">
        <h1 id="tempText" className="text-white">
          Start typing as soon the words appear here :)
        </h1>
      </div>
      <div className="countdownDiv z-50">
        <h1 id="timerCountdown" className="text-3xl transition-all duration-300">
          {timer != "None" ? `0/${timer}` : "No timer"}
        </h1>
      </div>
    </div>
  );
};

export default Words;
