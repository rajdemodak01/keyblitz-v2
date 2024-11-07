"use client";

import React from "react";
import { useResetStates } from "@/hooks/useResetStates";
import { Button } from "./ui/Button";

const RestartButton = () => {
  const { resetStates } = useResetStates();

  function handleRestartClick() {
    resetStates();
    document.getElementById("main-user-typing-cursor")?.focus();
  }

  return (
    <div className=" grid place-items-center mt-8">
      <Button onClick={handleRestartClick}>Restart</Button>
    </div>
  );
};

export default RestartButton;
