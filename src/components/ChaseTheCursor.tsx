"use client";
import React from "react";
import Button from "./ui/Button";
import { useResetStates } from "@/hooks/useResetStates";

const ChaseTheCursor = () => {
  const { resetStates } = useResetStates();

  function handleRestartClick() {
    resetStates();
    document.getElementById("main-user-typing-cursor")?.focus();
  }

  return (
    <div className=" grid place-items-center mt-8">
      <Button size="small" onClick={handleRestartClick}>
        Restart
      </Button>
    </div>
  );
};

export default ChaseTheCursor;
