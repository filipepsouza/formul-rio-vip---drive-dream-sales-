import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = ({
  className,
  size = 300,
  duration = 8,
  borderWidth = 2,
  colorFrom = "#C9A535",
  colorTo = "#E4C66A",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]",
        className
      )}
    >
      <div
        style={
          {
            "--duration": `${duration}s`,
            "--delay": `-${delay}s`,
            "--size": `${size}px`,
            "--border-width": `${borderWidth}px`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            "background": `conic-gradient(from 0deg at 50% 50%, var(--color-from) 0deg, var(--color-to) 60deg, transparent 120deg)`,
            "mask": `linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)`,
            "maskComposite": "exclude",
            "WebkitMaskComposite": "destination-out",
            "padding": `var(--border-width)`,
          } as React.CSSProperties
        }
        className="absolute inset-[-100%] animate-spin-slow"
      />
    </div>
  );
};
