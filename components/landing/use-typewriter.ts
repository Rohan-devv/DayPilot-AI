import { useState, useEffect } from "react";

export function useTypewriter(text: string, speed = 22, active = true) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    setDisplayed("");
  }, [text, active]);

  useEffect(() => {
    if (!active) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      speed
    );
    return () => clearTimeout(t);
  }, [active, displayed, text, speed]);

  return displayed;
}