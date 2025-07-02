import { useState } from "react";
import {
  Info,
  Calendar,
  Clock,
  Briefcase,
  Euro,
  ClipboardList,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition";

const JobForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    industry: "",
    employment_type: "",
    salary_min: "",
    salary_max: "",
    requirements: "",
    responsibilities: "",
    date_start: "",
    date_end: "",
    time_start: "",
    time_end: "",
  });

  const [error, setError] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await fetch("http://localhost:3000/api/job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          user_id: user.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error || "Something went wrong.");

      alert("Job posted successfully!");
      navigate("/main");
    } catch (err) {
      console.error(err);
      setError("An error occurred.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 flex flex-col lg:flex-row gap-8 min-h-screen">
      {/* Form section */}
      <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Post a <span className="text-yellow-400">Job Offer</span>
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block font-semibold text-gray-700">
            Job Title <span className="text-red-500">*</span>
            <input
              name="title"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </label>

          <label className="block font-semibold text-gray-700">
            Job Description <span className="text-red-500">*</span>
            <textarea
              name="description"
              placeholder="Job Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className={inputClass}
            />
          </label>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block font-semibold text-gray-700">
              Location <span className="text-red-500">*</span>
              <input
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </label>

            <label className="block font-semibold text-gray-700">
              Industry
              <input
                name="industry"
                placeholder="Industry"
                value={formData.industry}
                onChange={handleChange}
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block font-semibold text-gray-700">
              Employment Type
              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </label>

            <div className="flex gap-3">
              <label className="block font-semibold text-gray-700 w-1/2">
                Min Salary (€)
                <input
                  name="salary_min"
                  type="number"
                  placeholder="Min €"
                  value={formData.salary_min}
                  onChange={handleChange}
                  className={inputClass}
                />
              </label>

              <label className="block font-semibold text-gray-700 w-1/2">
                Max Salary (€)
                <input
                  name="salary_max"
                  type="number"
                  placeholder="Max €"
                  value={formData.salary_max}
                  onChange={handleChange}
                  className={inputClass}
                />
              </label>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block font-semibold text-gray-700">
              Start Date
              <input
                name="date_start"
                type="date"
                value={formData.date_start}
                onChange={handleChange}
                className={inputClass}
              />
            </label>

            <label className="block font-semibold text-gray-700">
              End Date
              <input
                name="date_end"
                type="date"
                value={formData.date_end}
                onChange={handleChange}
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block font-semibold text-gray-700">
              Start Time
              <input
                name="time_start"
                type="time"
                value={formData.time_start}
                onChange={handleChange}
                className={inputClass}
              />
            </label>

            <label className="block font-semibold text-gray-700">
              End Time
              <input
                name="time_end"
                type="time"
                value={formData.time_end}
                onChange={handleChange}
                className={inputClass}
              />
            </label>
          </div>

          <label className="block font-semibold text-gray-700">
            Requirements
            <textarea
              name="requirements"
              placeholder="Requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              className={inputClass}
            />
          </label>

          <label className="block font-semibold text-gray-700">
            Responsibilities
            <textarea
              name="responsibilities"
              placeholder="Responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              rows={3}
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-semibold py-3 rounded-lg shadow-md transition"
          >
            Post Job
          </button>
        </form>

        {/* Mobile Accordion Help Section */}
        <div className="lg:hidden mt-8 border border-indigo-100 rounded-lg bg-indigo-50">
          <button
            onClick={() => setHelpOpen(!helpOpen)}
            className="w-full flex justify-between items-center px-4 py-3 text-indigo-900 font-semibold hover:bg-indigo-100 rounded-lg focus:outline-none"
            aria-expanded={helpOpen}
            aria-controls="mobile-help-panel"
          >
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              <span>Posting Tips</span>
            </div>
            <span className="text-2xl">{helpOpen ? "−" : "+"}</span>
          </button>
          {helpOpen && (
            <div
              id="mobile-help-panel"
              className="px-4 py-4 text-indigo-900 text-sm space-y-3"
            >
              <p>
                <strong>Title:</strong> Keep it clear and specific, e.g., "Full-Stack Developer".
              </p>
              <p>
                <strong>Description:</strong> Provide a detailed, engaging description.
              </p>
              <p>
                <strong>Location & Industry:</strong> Specify to attract the right candidates.
              </p>
              <p>
                <strong>Employment Type & Salary:</strong> Be transparent to set expectations.
              </p>
              <p>
                <strong>Dates & Hours:</strong> Let applicants know the time frame and schedule.
              </p>
              <p>
                <strong>Requirements & Responsibilities:</strong> Clearly list must-haves and daily
                tasks.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sidebar Help Section */}
      <aside className="hidden lg:block lg:w-1/3 sticky top-24 self-start bg-indigo-50 rounded-2xl p-8 border border-indigo-100 shadow-md space-y-6 text-indigo-900">
        <h3 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <Info className="w-6 h-6 text-yellow-400" />
          How to Fill the Job Form
        </h3>

        <section className="space-y-4">
          <SidebarTip
            icon={<Briefcase className="text-yellow-400" />}
            title="Job Title"
            text="Use a clear, concise title that summarizes the role, e.g., 'Senior Backend Engineer'."
          />
          <SidebarTip
            icon={<ClipboardList className="text-yellow-400" />}
            title="Description"
            text="Write a detailed overview including the team, projects, and company culture."
          />
          <SidebarTip
            icon={<UserCheck className="text-yellow-400" />}
            title="Requirements & Responsibilities"
            text="List essential skills and daily tasks to set clear expectations."
          />
          <SidebarTip
            icon={<Calendar className="text-yellow-400" />}
            title="Dates & Times"
            text="Specify job start/end dates and working hours to avoid confusion."
          />
          <SidebarTip
            icon={<Euro className="text-yellow-400" />}
            title="Salary Range"
            text="Providing a clear salary range helps attract qualified candidates faster."
          />
          <SidebarTip
            icon={<Clock className="text-yellow-400" />}
            title="Employment Type"
            text="Mention if the role is full-time, part-time, contract, etc."
          />
        </section>
      </aside>
    </div>
  );
};

// Reusable sidebar tip
const SidebarTip = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <div className="flex gap-3 items-start">
    <div className="w-6 h-6 mt-1">{icon}</div>
    <div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm text-indigo-900">{text}</p>
    </div>
  </div>
);

export default JobForm;
