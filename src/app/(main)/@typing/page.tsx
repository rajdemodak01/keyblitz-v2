import FindHeightWidth from "@/components/findHeightWidth";
import TypingParagraph from "@/components/typingParagraph";
import React from "react";

interface Props {}

const Typing = (props: Props) => {
  return (
    <FindHeightWidth>
      <TypingParagraph />
    </FindHeightWidth>
  );
};

export default Typing;
