"use client";
import FindHeightWidth from "@/components/findHeightWidth";
import FinishTest from "@/components/finishTest";
import TypingParagraph from "@/components/typingParagraph";
import { useAppSelector } from "@/lib/hooks";
import React from "react";

interface Props {}

const Typing = (props: Props) => {
  const { endTest } = useAppSelector((state) => state.typingTests);
  return (
    <FindHeightWidth>
      {!endTest ? <TypingParagraph /> : <FinishTest />}
    </FindHeightWidth>
  );
};

export default Typing;
