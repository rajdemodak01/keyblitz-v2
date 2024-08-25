"use client";

import { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";

const ParentDiv = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // useLayoutEffect(() => {
  //   const parentDiv = document.querySelector(".parent-div");
  //   setDimensions({
  //     width: parentDiv.offsetWidth,
  //     height: parentDiv.offsetHeight,
  //   });
  // }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="parent-div flex gap-4">
      {[0, 1, 2, 3].map((_, index) => (
        <div
          key={index}
          className={`${index === activeIndex ? "active" : ""} flex gap-2`}
          onClick={() => handleClick(index)}
        >
          Child Div {index + 1}
          {index === activeIndex && (
            <motion.div
              layoutId="noice"
              className="cursor"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                height: "20px",
                width: "4px",
                backgroundColor: "blue",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ParentDiv;
