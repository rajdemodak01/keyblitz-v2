import { useAppSelector } from "@/lib/hooks";
import React from "react";

interface Props {}

function Logo({}: Props) {
  return (
    <div className=" tracking-[0.2em]  text-3xl font-bold bg-foreground text-background w-fit py-2 px-4 rounded-tl-md rounded-br-md ">
      KeyBlitz
    </div>
  );
}

export default Logo;
