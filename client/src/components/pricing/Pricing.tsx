import { Handshake } from "lucide-react";
import Button from "../ui/heading/Button";
import Heading from "../ui/heading/Heading";


const pricingPlans = [
  {
    id: 1,
    name: "Basic",
    price: "$29",
    description: "Perfect for small businesses just getting started.",
    features: [
      "Post up to 10 shifts/month",
      "Basic matching algorithm",
      "Email support",
    ],
  },
  {
    id: 2,
    name: "Pro",
    price: "$79",
    description: "For growing businesses with advanced needs.",
    features: [
      "Post unlimited shifts",
      "Priority matching",
      "Phone & email support",
      "Detailed analytics dashboard",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations.",
    features: [
      "Dedicated account manager",
      "Custom integrations",
      "24/7 priority support",
      "Advanced reporting",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="w-full bg-indigo-900 text-white px-6 md:px-20 py-20">
      <Heading
        title="Pricing"
        subtitle="Simple plans that grow with your business"
        size="lg"
        color="text-yellow-400"
        colorSub="text-gray-300"
        />


      <div className="max-w-7xl m-auto mt-12 grid gap-8 md:grid-cols-3">
        {pricingPlans.map(({ id, name, price, description, features, popular }) => (
          <div
            key={id}
            className={`rounded-lg p-8 flex flex-col border ${
              popular ? "border-yellow-400 bg-indigo-800 shadow-lg" : "border-indigo-700 bg-indigo-900"
            }`}
          >
            {popular && (
              <div className="self-start bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full uppercase text-xs font-bold mb-4">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-extrabold mb-2">{name}</h3>
            <p className="text-yellow-400 text-4xl font-bold mb-4">{price}</p>
            <p className="mb-6 text-gray-300">{description}</p>

            <ul className="flex-1 mb-6 space-y-3 text-gray-300">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              icon={<Handshake className="w-6 h-6" />}
              label="Choose Plan"
              bgColorClass="bg-yellow-400"
              textColorClass="text-indigo-900"
              hoverBgColorClass="bg-yellow-300"
            />          
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
