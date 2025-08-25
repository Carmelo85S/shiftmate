import type { ButtonProps } from "../../types/types";

const Button = ({
  icon,
  label,
  bgColorClass,
  textColorClass,
  hoverBgColorClass,
  onClick,
  disabled = false,
}: ButtonProps & { disabled?: boolean }) => {
  return (
    <button
      className={`
        flex justify-center items-center gap-2
        font-semibold px-8 py-3 rounded-full transition
        ${disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : `${bgColorClass} ${textColorClass} hover:${hoverBgColorClass} cursor-pointer`}
      `}
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
