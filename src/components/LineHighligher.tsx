import { useEffect, useState } from "react";

const LineHighlighter = () => {
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({
    top: "-9999px", // Mimo obrazovku, dokud myš nenajede
    width: "0px",
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const main = document.querySelector("main");
      if (!main) return;

      const paragraphs = main.querySelectorAll("p");
      let found = false;

      paragraphs.forEach((p) => {
        const rect = p.getBoundingClientRect();
        if (event.clientY >= rect.top && event.clientY <= rect.bottom) {
          found = true;
          const lineHeight = parseFloat(getComputedStyle(p).lineHeight);
          const offsetY = event.clientY - rect.top;
          const lineIndex = Math.floor(offsetY / lineHeight);

          setHighlightStyle({
            top: `${rect.top + lineIndex * lineHeight}px`,
            width: `${rect.width}px`,
            left: `${rect.left}px`,
            height: `${lineHeight}px`,
            backgroundColor: "rgba(255, 182, 193, 0.3)", // Jemné podbarvení
            position: "fixed",
            pointerEvents: "none",
            zIndex: -1,
          });
        }
      });

      if (!found) {
        setHighlightStyle((prev) => ({ ...prev, top: "-9999px" }));
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div style={highlightStyle} />;
};

export default LineHighlighter;
