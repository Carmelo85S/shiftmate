import { Clock10Icon, User2Icon, Users2 } from "lucide-react";
import Button from "../ui/heading/Button";
import Card from "./Card";

type HeroProps = {
  openModalAsBusiness: () => void;
  openModalAsWorker: () => void;
};

const Hero = ({ openModalAsBusiness, openModalAsWorker }: HeroProps) => {
  return (
    <section className="w-full min-h-[50vh] bg-gradient-to-br from-indigo-800 to-purple-900 text-white px-6 md:px-20 pt-36 pb-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full opacity-20 blur-3xl z-0" />

      {/* Hero Content */}
      <div className="max-w-7xl m-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-16 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Connecting <span className="text-yellow-300">Businesses </span>
            with <span className="text-pink-300">Workers</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Work when you wwant, Hire when you need. Join today
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Button
              icon={<Users2 className="w-8 h-8" />}
              label="I'm a Business"
              bgColorClass="bg-yellow-400"
              textColorClass="text-indigo-900"
              hoverBgColorClass="bg-yellow-300"
              onClick={openModalAsBusiness}
            />
            <Button
              icon={<Clock10Icon className="w-8 h-8" />}
              label="I'm a Worker"
              bgColorClass="bg-pink-500"
              textColorClass="text-white"
              hoverBgColorClass="hover:bg-pink-400"
              onClick={openModalAsWorker}
            />
          </div>
        </div>

        <div className="relative w-full max-w-md min-h-[300px] mx-auto">
          <div className="absolute top-0 left-0 transform -rotate-6 hover:rotate-0 transition duration-300 z-20">
            <Card
              icon={Clock10Icon}
              title="I'm a Worker"
              info="Browse shifts that match your availability."
            />
          </div>
          <div className="absolute bottom-0 right-0 transform rotate-6 hover:rotate-0 transition duration-300 z-10">
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
