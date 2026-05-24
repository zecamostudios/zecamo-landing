"use client";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type CommonProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

type AsButton = CommonProps & { as?: "button" } & ButtonHTMLAttributes<HTMLButtonElement>;
type AsAnchor = CommonProps & { as: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>;
type GhostBtnProps = AsButton | AsAnchor;

export default function GhostBtn(props: GhostBtnProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { children, icon, className = "", as = "button", ...rest } = props as any;
  const cls =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 " +
    "font-display font-medium text-[15px] tracking-tight text-white " +
    "border border-line bg-white/[.02] hover:bg-white/[.05] hover:border-primary/50 " +
    "transition-colors duration-200 " +
    className;

  if (as === "a") {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <span>{children}</span>
        {icon}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span>{children}</span>
      {icon}
    </button>
  );
}
