import type { ButtonProps } from "../../types/types";

const Button = ({
  icon,
  label,
  bgColorClass,
  textColorClass,
  hoverBgColorClass,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 ${bgColorClass} ${textColorClass} font-semibold px-8 py-3 rounded-full hover:${hoverBgColorClass} transition cursor-pointer`}
      type="button"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
