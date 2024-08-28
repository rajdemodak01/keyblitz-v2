"use client";
import FindHeightWidth from "@/components/findHeightWidth";
import FinishTest from "@/components/finishTest";
import TypingParagraph from "@/components/typingParagraph";
import { useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";

interface Props {}

const Typing = (props: Props) => {
  const { endTest } = useAppSelector((state) => state.typingTests);
  const [showFinishTest, setShowFinishTest] = useState(false);

  useEffect(() => {
    let timer: null | NodeJS.Timeout = null;
    if (endTest) {
      timer = setTimeout(() => {
        setShowFinishTest(true);
      }, 1000);
    }
    if (!endTest && !timer) {
      setShowFinishTest(false);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [endTest]);

  return (
    <FindHeightWidth>
      {!endTest ? (
        <TypingParagraph />
      ) : showFinishTest ? (
        <FinishTest />
      ) : (
        <div>Loading...</div>
      )}
    </FindHeightWidth>
  );
};

export default Typing;
