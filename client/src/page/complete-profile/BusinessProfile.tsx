import { useState } from "react";
import BusinessFormImg from "../../../src/assets/BusinessFormImg.png";
import { useNavigate } from "react-router-dom";

const BusinessProfile = () => {
  const [form, setForm] = useState({
    id:"",
    phone: "",
    bio: "",
    location: "",
    company_name: "",
    company_website: "",
    industry: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate() 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  const userString = localStorage.getItem("user");
  console.log("User string from localStorage:", userString);

  if (!userString) {
    setError("User not found. Please log in again.");
    return;
  }

  let user;
  try {
    user = JSON.parse(userString);
    console.log("Parsed user object:", user);
  } catch (parseError) {
    console.error("Failed to parse user from localStorage", parseError);
    setError("Invalid user data. Please log in again.");
    return;
  }

  if (!user?.id || typeof user.id !== 'string') {
    setError("User not logged in or ID is missing");
    return;
  }

  const payload = { ...form, id: user.id };
  console.log("Payload sent to /api/profile:", payload);

  try {
    const res = await fetch("http://localhost:3000/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Response from /api/profile:", data);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setSuccess("Profile completed successfully!");
    navigate('/post-new-job')
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
            Complete Your Business Profile
          </h1>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          {[
            { label: "Phone", name: "phone", type: "tel", placeholder: "e.g. +39 123 456 7890" },
            { label: "Location", name: "location", type: "text", placeholder: "e.g. Milan, Italy" },
            { label: "Company Name", name: "company_name", type: "text", placeholder: "e.g. Yellow Tech SRL" },
            { label: "Company Website", name: "company_website", type: "url", placeholder: "e.g. https://yellowtech.it" },
            { label: "Industry", name: "industry", type: "text", placeholder: "e.g. Software, Marketing" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                required
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              placeholder="Tell us a bit about your company"
              required
              value={form.bio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 h-24 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-semibold py-2 rounded-md shadow-sm transition-colors text-sm"
          >
            Save & Continue
          </button>
        </form>

        {/* Side Info */}
        <div className="flex flex-col items-center gap-6">
          <img
            src={BusinessFormImg}
            alt="Business form illustration"
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
              <li>Write a clear, concise bio</li>
              <li>Ensure your website is active</li>
              <li>Use a valid business phone number</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessProfile;
