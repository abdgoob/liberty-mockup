import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type StarBorderOwnProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children?: ReactNode;
  color?: string;
  speed?: CSSProperties["animationDuration"];
  thickness?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
};

export type StarBorderProps<T extends ElementType> = StarBorderOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof StarBorderOwnProps<T>>;

export default function StarBorder<T extends ElementType = "button">({
  as,
  className,
  color = "white",
  speed = "6s",
  thickness = 1,
  backgroundColor = "#000000",
  textColor = "#ffffff",
  borderColor = "#222222",
  children,
  ...rest
}: StarBorderProps<T>) {
  const Component = as ?? "button";
  const { style, ...componentProps } = rest as ComponentPropsWithoutRef<ElementType>;

  return (
    <Component
      {...componentProps}
      className={cn(
        "relative inline-block overflow-hidden rounded-[20px] outline-none",
        className,
      )}
      style={{ padding: `${thickness}px 0`, ...style }}
    >
      <span
        aria-hidden="true"
        className="animate-star-movement-bottom absolute bottom-[-11px] right-[-250%] z-0 h-1/2 w-[300%] rounded-full opacity-70"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <span
        aria-hidden="true"
        className="animate-star-movement-top absolute left-[-250%] top-[-10px] z-0 h-1/2 w-[300%] rounded-full opacity-70"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <span
        className="relative z-[1] flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[19px] border px-[26px] py-[14px] text-center text-sm font-bold transition-[background-color,transform] duration-200"
        style={{
          background: backgroundColor,
          color: textColor,
          borderColor,
        }}
      >
        {children}
      </span>
    </Component>
  );
}
