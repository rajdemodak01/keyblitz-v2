"use client";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

type Themes = "dark" | "windows98" | "pastel" | "deepsea" | "daylight";

export default function ThemeManager({ children }: Props) {
  const [theme, setTheme] = useState<Themes>("deepsea");

  return (
    <body className={`theme-${theme} bg-background text-foreground`}>
      {children}
    </body>
  );
}
