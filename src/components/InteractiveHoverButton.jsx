import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

export const InteractiveHoverButton = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <button
      ref={ref}
      className={cn(
        // Button starts with a black background and white border.
        // On hover, the background transitions to red (#C1121F).
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border border-white bg-black p-2 px-6 text-center font-semibold transition-colors duration-300 hover:bg-[#C1121F]",
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-2">
        {/* Dot: starts at black; on hover, scales up and transitions to red */}
        <div className="h-2 w-2 rounded-full bg-black transform transition-all duration-300 group-hover:scale-150 group-hover:bg-[#C1121F]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
