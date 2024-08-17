"use client";
import { setLetterHeightWidth } from "@/lib/features/typingParagraphProp/typingParagraphProp";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

const FindHeightWidth = ({ children }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { height } = useAppSelector((state) => state.typingParagraphProp);

  const dispatch = useAppDispatch();

  function findHeightWidth(divRef: React.RefObject<HTMLDivElement>): Promise<{
    height: number;
    width: number;
  }> {
    return document.fonts.ready.then(() => {
      const divElem = document.createElement("div");
      const spanElem = document.createElement("span");
      spanElem.innerText = "W";
      divElem.appendChild(spanElem);
      divElem.classList.add("flex");
      // spanElem.classList.add("font-sans");
      spanElem.classList.add("text-pa");
      spanElem.classList.add("bg-blue");
      // spanElem.style.fontFamily = "";
      divRef.current?.appendChild(divElem);

      const rect = spanElem.getBoundingClientRect();
      const exactWidth = rect.width.toFixed(2);
      const exactHeight = rect.height.toFixed(2);

      console.log("Exact width:", exactWidth);
      console.log("Exact height:", exactHeight);

      divRef.current?.removeChild(divElem);
      return {
        width: Number(exactWidth),
        height: Number(exactHeight),
      };
    });
  }

  useEffect(() => {
    findHeightWidth(divRef).then((data) => {
      dispatch(
        setLetterHeightWidth({ height: data.height, width: data.width })
      );
    });
  }, []);

  return <div ref={divRef}>{height !== 0 ? children : "Loading..."}</div>;
};

export default FindHeightWidth;
