import React from "react";
import Link from "next/link";

const StartBtn = () => {
  return (
    <Link
      href={"/speed-test"}
      className="p-2 shadow-lg bg-slate-700  px-4 rounded-md hover:shadow-none transition-all hover:bg-black hover:text-white duration-300"
    >
      Begin The Game
    </Link>
  );
};

export default StartBtn;
