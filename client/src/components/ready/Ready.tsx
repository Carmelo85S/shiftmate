import { Clock10Icon, Users2 } from "lucide-react"
import Button from "../ui/Button"
import Heading from "../ui/Heading"

const Ready = () => {
  return (
    <section id="howitworks" className="bg-indigo-100 px-6 md:px-20 py-20 text-indigo-900">
      <Heading
        title="Are you ready to trasform your staffing?"
        subtitle="Join hundreds of venues and workers already using ShiftMate"
        size="lg"
      />
        <div className="flex justify-center gap-4">
            <Button
              icon={<Users2 className="w-8 h-8" />}
              label="Post a Shift"
              bgColorClass="bg-yellow-400"
              textColorClass="text-indigo-900"
              hoverBgColorClass="bg-yellow-300"
            />
            <Button
              icon={<Clock10Icon className="w-8 h-8" />}
              label="Find Work"
              bgColorClass="bg-pink-500"
              textColorClass="text-white"
              hoverBgColorClass="bg-pink-400"
            />
        </div>
    </section>
  )
}

export default Ready
