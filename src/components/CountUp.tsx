"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUp({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const start = performance.now();
    let frameId = 0;

    const tick = (time: number) => {
      const elapsed = Math.min((time - start) / (duration * 1000), 1);
      const eased = easeOutCubic(elapsed);
      const next = Math.round(end * eased);
      setValue(next);

      if (elapsed < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [end, duration, isInView]);

  return (
    <span ref={ref} className="font-extrabold">
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
