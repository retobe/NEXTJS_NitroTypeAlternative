import StartBtn from "./Components/StartBtn";
import SetDiff from "./Components/SetDiff";
import WordCount from "./Components/WordCount";
import Countdown from "./Components/Countdown";


export default function Home() {
  return (
    <div className="p-3">
      <div className="mx-auto text-center p-2 py-3 pb-5 shadow rounded-sm shadow-gray-700 w-full max-w-[60rem]">
        <h1 className="text-center mt-2 lg:text-[3rem] text-[2rem]">
          NITRO TYPE
        </h1>
        <p className="text-lg">
          This is an alternative Monkey/Nitro Type website thing In order to
          begin typing click the start button at the bottom to get started.
          You can set a timer (optional) to test your limits, you also can range your difficulty level depending on the
          length of each of the word and the amount of words
        </p>
        <br />
        <StartBtn />
        <br />
        <br />
        <Countdown/>
        <SetDiff />
        <WordCount/>
      </div>
    </div>
  );
}
