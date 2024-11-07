"use client";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

type Themes = "dark" | "windows98" | "pastel" | "deepsea" | "daylight" | "test";

export default function ThemeManager({ children }: Props) {
  const [theme, setTheme] = useState<Themes>("dark");

  return (
    <div className={`theme-${theme} bg-background text-foreground`}>
      {children}
    </div>
  );
}
