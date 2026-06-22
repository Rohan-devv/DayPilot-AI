"use client";

import { useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  aiPanel: React.ReactNode;
};

export function ResizableLayout({
  children,
  aiPanel,
}: Props) {
  const [panelWidth, setPanelWidth] = useState(420);

  useEffect(() => {
    const saved = localStorage.getItem(
      "daypilot-ai-width"
    );

    if (saved) {
      setPanelWidth(Number(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "daypilot-ai-width",
      panelWidth.toString()
    );
  }, [panelWidth]);

  const startResize = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = panelWidth;

    const onMove = (event: MouseEvent) => {
      const newWidth =
        startWidth - (event.clientX - startX);

      setPanelWidth(
        Math.min(
          Math.max(newWidth, 320),
          window.innerWidth * 0.8
        )
      );
    };

    const onUp = () => {
      document.removeEventListener(
        "mousemove",
        onMove
      );

      document.removeEventListener(
        "mouseup",
        onUp
      );
    };

    document.addEventListener(
      "mousemove",
      onMove
    );

    document.addEventListener(
      "mouseup",
      onUp
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Resize Handle */}
      <div
        onMouseDown={startResize}
        className="
          relative
          w-[4px]
          cursor-col-resize
          bg-zinc-800
          transition-colors
          hover:bg-indigo-500
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-20
            w-1
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-indigo-500/50
          "
        />
      </div>

      {/* AI Panel */}
      <aside
        style={{
          width: `${panelWidth}px`,
        }}
        className="
          shrink-0
          border-l
          border-zinc-800
          bg-black
        "
      >
        {aiPanel}
      </aside>
    </div>
  );
}