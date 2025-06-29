import { data } from "../hero/CardsData";
import Heading from "../ui/Heading";

const WhyUs = () => {
  return (
    <section id="whyus"className="bg-gray-100 w-full px-6 md:px-20 py-20 text-indigo-900">
      <Heading
        title="Why Choose ShiftMate"
        subtitle="Streamlined staffing for the modern hospitality industry"
        size="lg"
      />

      <div className="max-w-7xl m-auto grid gap-10 md:grid-cols-3 mt-12">
        {data.map(({ id, icon: Icon, title, content }) => (
          <div
            key={id}
            className="bg-white rounded-2xl p-6 text-center shadow-lg border hover:shadow-lg transition"
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-yellow-400 rounded-full mb-4">
              <Icon className="w-6 h-6 text-indigo-900" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-600 mt-2">{content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
