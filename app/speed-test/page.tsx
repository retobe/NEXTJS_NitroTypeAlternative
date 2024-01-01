"use server";
import React from "react";
import Words from "../Components/Words";
import Link from "next/link";
import Progress from "../Components/Progress";
const page = () => {
  return (
    <div>
      <h1 className="text-2xl p-2">Start Typing to Begin</h1>
      <Words />
      <Link href={"/"} className="link ml-3">
        Go Back To Home Page
      </Link>
      <Progress></Progress>
    </div>
  );
};

export default page;
