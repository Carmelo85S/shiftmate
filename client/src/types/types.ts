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
  onClick?: () => void;
}

export type Job = {
  [x: string]: any;
  id: number;
  title: string;
  location: string;
  industry: string;
  employment_type: string;
  salary_min: number;
  salary_max: number;
  date_start: string;
  date_end: string;
  time_start: string;
  time_end: string;
  requirements: string;
  responsibilities: string;
  company_name: string;
};

export type User = {
  skills: string;
  id: string;
  email: string;
  location: string;
  bio: string;
  availability: string;
  company_name: string;
  name: string;
  user_type: string;
};

export interface PostedJob {
  id: number;
  title: string;
  description: string;
  location: string;
  industry: string;
  employment_type: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  date_start: string;
  date_end: string;
  time_start: string;
  time_end: string;
  created_at: string;
  is_active: boolean;
  requirements?: string;
  responsibilities?: string;
}
