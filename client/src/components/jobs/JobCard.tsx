import { useState } from "react";
import Button from "../ui/Button";
import { Calendar, Clock, Euro, Handshake, MapPin } from "lucide-react";
import type { Job, User } from "../../types/types";

const JobCard = ({
  job,
  user,
  onApply,
}: {
  job: Job;
  user: User | null;
  onApply: (id: number) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 w-full p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 leading-snug">
            {job.title}{" "}
            <span className="text-gray-500 font-normal">– {job.users?.company_name || "Company not specified"}</span>
          </h3>
          <p className="text-sm text-gray-400 mt-1">{job.industry}</p>
        </div>
        <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap">
          {job.employment_type}
        </span>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-yellow-500" />
          {job.location}
        </div>
        <div className="flex items-center gap-2">
          <Euro className="w-4 h-4 text-yellow-500" />
          €{job.salary_min} - €{job.salary_max}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-yellow-500" />
          {job.date_start} → {job.date_end}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-yellow-500" />
          {job.time_start} - {job.time_end}
        </div>
      </div>

      {/* Description */}
      <div className="text-sm text-gray-700 space-y-3 border-t pt-4">
        <p>
          <span className="font-medium text-gray-800">Requirements:</span>{" "}
          {expanded
            ? job.requirements
            : `${job.requirements.substring(0, 120)}${job.requirements.length > 120 ? "..." : ""}`}
        </p>
        <p>
          <span className="font-medium text-gray-800">Responsibilities:</span>{" "}
          {expanded
            ? job.responsibilities
            : `${job.responsibilities.substring(0, 120)}${job.responsibilities.length > 120 ? "..." : ""}`}
        </p>

        {(job.requirements.length > 120 || job.responsibilities.length > 120) && (
          <button
            onClick={toggleExpanded}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition"
          >
            {expanded ? "Show less" : "View more"}
          </button>
        )}
      </div>

      {/* CTA */}
      {user?.user_type === "worker" && (
        <div className="mt-6 flex justify-end">
          <Button
            icon={<Handshake className="w-5 h-5" />}
            label="Apply"
            bgColorClass="bg-yellow-400"
            textColorClass="text-indigo-900"
            hoverBgColorClass="bg-yellow-300"
            onClick={() => onApply(job.id)}
          />
        </div>
      )}
    </div>
  );
};

export default JobCard;
