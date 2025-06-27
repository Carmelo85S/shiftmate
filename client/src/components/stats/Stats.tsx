import { useEffect, useState } from "react";
import { Users, CheckCircle, Star, Briefcase } from "lucide-react";

const statsData = [
  { icon: Users, label: "Active Users", value: 12 },
  { icon: CheckCircle, label: "Completed Profiles", value: 5 },
  { icon: Star, label: "Positive Feedback", value: 20 },
  { icon: Briefcase, label: "Opportunities Shared", value: 8 },
];

const CountUp = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 500;
    const incrementTime = 30;
    const totalSteps = Math.ceil(duration / incrementTime);
    const step = value / totalSteps;

    const counter = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.ceil(start));
      }
    }, incrementTime);

    return () => clearInterval(counter);
  }, [value]);

  return <span>{count}</span>;
};

const KeyStats = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="text-center text-sm text-gray-500 mb-10">
        We’re just getting started — here’s what’s already happening
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-indigo-900">
        {statsData.map(({ icon: Icon, label, value }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
          >
            <Icon className="w-10 h-10 text-indigo-600 mb-4" />
            <div className="text-4xl font-extrabold mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              <CountUp value={value} />{value >= 10 ? "+" : ""}
            </div>
            <p className="text-center text-gray-600 font-medium text-base">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyStats;
