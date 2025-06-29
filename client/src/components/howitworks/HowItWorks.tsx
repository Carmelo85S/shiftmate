import Heading from "../ui/Heading";
import { businessSteps, workerSteps } from "./data";

const HowItWorks = () => {
  return (
    <section
      id="howitworks"
      className="bg-gray-100 w-full px-6 md:px-20 py-20 text-indigo-900"
    >
      <Heading
        title="How It Works"
        subtitle="We simply connect businesses and workers – fast, easy, and direct"
        size="lg"
        color=""
      />

      <div className="max-w-7xl m-auto grid md:grid-cols-2 gap-12 mt-12">
        {/* Businesses */}
        <div className="flex flex-col">
          <Heading title="For Businesses" size="sm" />
          <ul className="pl-2 space-y-8 text-gray-700">
            {businessSteps.map(({ title, description }, i) => (
              <li key={i} className="flex gap-4">
                <div className="bg-yellow-400 text-indigo-900 font-bold rounded-full w-8 h-8 flex items-center justify-center text-lg flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-bold text-indigo-900">{title}</p>
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Workers */}
        <div className="flex flex-col">
          <Heading title="For Workers" size="sm" />
          <ul className="pl-2 space-y-8 text-gray-700">
            {workerSteps.map(({ title, description }, i) => (
              <li key={i} className="flex gap-4">
                <div className="bg-pink-500 text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center text-lg flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-bold text-indigo-900">{title}</p>
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-3xl m-auto mt-12 text-sm text-center text-gray-500">
        <p>
          This platform only connects businesses and workers. Any contracts,
          payments, or agreements are managed directly between the parties.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
