"use client";

import { Children, type ReactNode, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import { cn } from "@/lib/utils";

type BounceCardsProps = {
  className?: string;
  children: ReactNode;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  enableHover?: boolean;
};

export default function BounceCards({
  className,
  children,
  animationDelay = 0.1,
  animationStagger = 0.08,
  easeType = "elastic.out(1, 0.65)",
  enableHover = true,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cards = Children.toArray(children);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cardElements = Array.from(
      container.querySelectorAll<HTMLElement>("[data-bounce-card]"),
    );

    if (reduceMotion) {
      gsap.set(cardElements, { clearProps: "all" });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(cardElements, {
        autoAlpha: 1,
        y: 90,
        scale: 0,
        rotate: (index) => (index % 2 === 0 ? -9 : 9),
        transformOrigin: "50% 70%",
      });
    }, container);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        context.add(() => {
          gsap.to(cardElements, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            stagger: animationStagger,
            ease: easeType,
            delay: animationDelay,
            duration: 1.35,
            clearProps: "transform,opacity,visibility",
          });
        });
        observer.disconnect();
      },
      { threshold: 0.18 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      context.revert();
    };
  }, [animationDelay, animationStagger, easeType]);

  const pushSiblings = (hoveredIndex: number) => {
    if (!enableHover || !containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cardElements = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>("[data-bounce-card]"),
    );

    cardElements.forEach((card, index) => {
      gsap.killTweensOf(card);
      gsap.to(card, {
        x: index < hoveredIndex ? -30 : index > hoveredIndex ? 30 : 0,
        y: index === hoveredIndex ? -18 : 3,
        scale: index === hoveredIndex ? 1.055 : 0.96,
        rotate: index < hoveredIndex ? -2.5 : index > hoveredIndex ? 2.5 : 0,
        zIndex: index === hoveredIndex ? 10 : 1,
        duration: 0.46,
        ease: "back.out(1.7)",
        overwrite: "auto",
      });
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;

    const cardElements = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>("[data-bounce-card]"),
    );

    gsap.to(cardElements, {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      zIndex: 1,
      duration: 0.4,
      ease: "back.out(1.4)",
      overwrite: "auto",
    });
  };

  return (
    <div ref={containerRef} className={cn(className)}>
      {cards.map((card, index) => (
        <div
          key={index}
          data-bounce-card
          className="h-full will-change-transform"
          onMouseEnter={() => pushSiblings(index)}
          onMouseLeave={resetSiblings}
          onFocusCapture={() => pushSiblings(index)}
          onBlurCapture={resetSiblings}
        >
          {card}
        </div>
      ))}
    </div>
  );
}
