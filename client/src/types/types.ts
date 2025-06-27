import type { ReactElement } from "react";

export interface HeadingProps {
  title: string;
  subtitle?: string;
  size: 'sm' | 'md' | 'lg';
  color?: string;
  colorSub?: string
}

export interface ButtonProps {
  icon: ReactElement;
  label: string;
  bgColorClass: string;
  textColorClass: string;
  hoverBgColorClass: string;
}