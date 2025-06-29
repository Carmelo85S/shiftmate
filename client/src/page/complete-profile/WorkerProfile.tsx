import { useState } from "react";
import WorkerFormImg from "../../../src/assets/BusinessFormImg.png";

const WorkerProfile = () => {
  const [form, setForm] = useState({
    id: "",
    phone: "",
    bio: "",
    location: "",
    skills: "",
    availability: "",
    experience_years: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const userString = localStorage.getItem("user");

    if (!userString) {
      setError("User not found. Please log in again.");
      return;
    }

    let user;
    try {
      user = JSON.parse(userString);
    } catch (parseError) {
      console.error("Failed to parse user from localStorage", parseError);
      setError("Invalid user data. Please log in again.");
      return;
    }

    if (!user?.id || typeof user.id !== "string") {
      setError("User not logged in or ID is missing.");
      return;
    }

    const payload = {
      ...form,
      id: user.id,
      skills: form.skills.split(",").map((s) => s.trim()),
      experience_years: Number(form.experience_years),
    };

    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setSuccess("Profile completed successfully!");
    } catch (err) {
      console.error(err);
      setError("An error occurred.");
    }
  };

  return (
    <section className="w-full min-h-screen bg-gray-100 pt-24 px-4 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-md flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-center text-indigo-900">
            Complete Your Worker Profile
          </h1>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          {[
            { label: "Phone", name: "phone", type: "tel", placeholder: "e.g. +39 123 456 7890" },
            { label: "Location", name: "location", type: "text", placeholder: "e.g. Milan, Italy" },
            { label: "Skills", name: "skills", type: "text", placeholder: "e.g. Waiter, Bartender" },
            { label: "Availability", name: "availability", type: "text", placeholder: "e.g. Mon-Fri, Weekends" },
            { label: "Years of Experience", name: "experience_years", type: "number", placeholder: "e.g. 2", min: "0" },
          ].map(({ label, name, type, placeholder, min }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                required
                min={min}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              placeholder="Tell us a bit about yourself"
              required
              value={form.bio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 h-24 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-pink-500 hover:bg-pink-400 text-white font-semibold py-2 rounded-md shadow-sm transition-colors text-sm"
          >
            Save & Continue
          </button>
        </form>

        {/* Side Info */}
        <div className="flex flex-col items-center gap-6">
          <img
            src={WorkerFormImg}
            alt="Worker form illustration"
            className="w-full max-w-sm object-contain"
          />
          <p className="text-xs text-gray-500 text-center">
            <a
              href="https://storyset.com/people"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Illustration by Storyset
            </a>
          </p>
          <div className="bg-white w-full max-w-sm p-5 rounded-lg shadow-sm">
            <h2 className="text-base font-semibold text-indigo-800 mb-2">Tips for a Great Profile</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Use clear job-related keywords in your skills</li>
              <li>List realistic availability</li>
              <li>Mention any certifications in your bio</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkerProfile;
