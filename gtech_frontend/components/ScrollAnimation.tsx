"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale";
}

export default function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-visible");
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case "fade-in":
        return "animate-fade-in";
      case "fade-left":
        return "animate-fade-left";
      case "fade-right":
        return "animate-fade-right";
      case "scale":
        return "animate-scale";
      default:
        return "animate-fade-up";
    }
  };

  return (
    <div
      ref={elementRef}
      className={`animate-hidden ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
}
