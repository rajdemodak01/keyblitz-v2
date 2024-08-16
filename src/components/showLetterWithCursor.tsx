import React, { useEffect, useLayoutEffect, useRef } from "react";

interface Props {
  letter: string;
}

const ShowLetterWithCursor = ({ letter }: Props) => {
  return <span>{letter}</span>;
};

export default ShowLetterWithCursor;
