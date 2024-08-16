"use client";
import TypingParagraph from "@/components/typingParagraph";
import { setLetterHeightWidth } from "@/lib/features/typingParagraphProp/typingParagraphProp";
import { findHeightWidth } from "@/lib/findHeightWidth";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { ReactElement, useEffect, useRef, useState } from "react";

interface Props {}

const Typing = (props: Props) => {
  const { height } = useAppSelector((state) => state.typingParagraphProp);
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    findHeightWidth(divRef).then((data) => {
      dispatch(
        setLetterHeightWidth({ height: data.height, width: data.width })
      );
    });
  }, []);

  return (
    <div ref={divRef} className=" bg-blue-50">
      {height !== 0 ? <TypingParagraph /> : "Loading..."}
    </div>
  );
};

export default Typing;
