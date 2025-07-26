import { Clock10Icon, User2Icon, Users2 } from "lucide-react";
import Button from "../ui/Button";
import Card from "./Card";

type HeroProps = {
  openModalAsBusiness: () => void;
  openModalAsWorker: () => void;
};

const Hero = ({ openModalAsBusiness, openModalAsWorker }: HeroProps) => {
  return (
    <section className="relative w-full min-h-[60vh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white px-6 md:px-24 pt-40 pb-28 overflow-hidden">
      {/* Background Glow Circles */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-600 rounded-full opacity-30 blur-3xl animate-pulse-slow z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-700 rounded-full opacity-25 blur-3xl animate-pulse-slow z-0" />

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-20 z-10">
        {/* Text Block */}
        <div className="flex-1 text-center lg:text-left max-w-xl animate-fadeInLeft">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Work Smarter. <br />
            <span className="text-yellow-400 underline decoration-yellow-300 decoration-4">
              Hire Faster{" "}
            </span>{" "}.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-md drop-shadow-sm">
            Shift Mate makes it effortless to find your next shift or fill your open roles — no hassle, no middlemen.
          </p>


          <div className="flex justify-center lg:justify-start gap-6">
            <Button
              icon={<Users2 className="w-8 h-8" />}
              label="I'm a Business"
              bgColorClass="bg-yellow-500"
              textColorClass="text-indigo-900"
              hoverBgColorClass="hover:bg-yellow-200"
              onClick={openModalAsBusiness}
            />
            <Button
              icon={<Clock10Icon className="w-8 h-8" />}
              label="I'm a Worker"
              bgColorClass="bg-pink-500"
              textColorClass="text-white"
              hoverBgColorClass="hover:bg-pink-200"
              onClick={openModalAsWorker}
            />
          </div>
        </div>

        {/* Cards Stack */}
        <div className="relative w-full max-w-md min-h-[320px] mx-auto animate-fadeInRight">
          <div className="absolute top-0 left-0 transform -rotate-6 hover:rotate-0 transition-transform duration-500 shadow-lg shadow-pink-500/30 rounded-xl z-20">
            <Card
              icon={Clock10Icon}
              title="I'm a Worker"
              info="Browse shifts that match your availability."
            />
          </div>
          <div className="absolute bottom-0 right-0 transform rotate-6 hover:rotate-0 transition-transform duration-500 shadow-lg shadow-yellow-400/30 rounded-xl z-10">
            <Card
              icon={User2Icon}
              title="I'm a Business"
              info="Post open shifts and connect with a flexible workforce."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
