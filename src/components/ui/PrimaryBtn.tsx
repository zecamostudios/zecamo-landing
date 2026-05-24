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
type PrimaryBtnProps = AsButton | AsAnchor;

export default function PrimaryBtn(props: PrimaryBtnProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { children, icon, className = "", as = "button", ...rest } = props as any;
  const cls =
    "cta-glow inline-flex items-center justify-center gap-2 rounded-full " +
    "bg-primary hover:bg-primary-hover px-6 py-3 " +
    "font-display font-medium text-[15px] tracking-tight text-white " +
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
