import type { HeadingProps } from "../../../types/types";

const Heading = ({ title, subtitle, size = "md", color, colorSub }: HeadingProps) => {
  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
  };

  return (
    <section className="text-center mb-12">
      <h2
        className={`font-extrabold leading-tight mb-3 ${sizeClasses[size]} ${
          color ?? "text-indigo-800"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`${colorSub ?? "text-gray-700"} text-lg md:text-xl`}>
          {subtitle}
        </p>
      )}
    </section>
  );
};

export default Heading;
