// components/TypingArea.js
"use client";
import React, { useState, useRef, useEffect } from "react";

const TypingArea = () => {
  const [typedText, setTypedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const wordContainerRef = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      const containerHeight = wordContainerRef.current.clientHeight;
      const scrollHeight = wordContainerRef.current.scrollHeight;
      const lineHeight =
        scrollHeight / wordContainerRef.current.children.length;

      if (
        scrollHeight > containerHeight &&
        (lineIndex + 1) * lineHeight <= scrollHeight
      ) {
        setLineIndex((prev) => prev + 1);
      }
    };

    handleTyping();
  }, [typedText, lineIndex]);

  const handleInputChange = (e) => {
    setTypedText(e.target.value);
  };

  return (
    <div className="container">
      <div
        className="word-container"
        ref={wordContainerRef}
        style={{ transform: `translateY(-${lineIndex * 1.5}em)` }}
      >
        {typedText.split(" ").map((word, index) => (
          <div className="word" key={index}>
            {word.split("").map((letter, letterIndex) => (
              <span className="letter" key={letterIndex}>
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={typedText}
        onChange={handleInputChange}
        className="typing-input"
        autoFocus
      />
    </div>
  );
};

export default TypingArea;
