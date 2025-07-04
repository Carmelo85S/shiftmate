import { Eye, X, Briefcase, Calendar, MapPin, Building, DollarSign, Tag } from "lucide-react";
import { useEffect, useState } from "react";

type Job = {
  id: number;
  title: string;
  description?: string;
  location: string;
  industry: string;
  employment_type: string;
  salary_min: number;
  salary_max: number;
  date_start: string;
  date_end: string;
  requirements?: string;
  responsibilities?: string;
  company_name?: string;
  company_website?: string;
};

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      try {
        const res = await fetch(`http://localhost:3000/api/user/${user.id}/applications`);
        if (!res.ok) throw new Error("Failed to fetch applied jobs");

        const data = await res.json();

        setAppliedJobs(data.map((app: any) => app.jobs));
      } catch (error: any) {
        console.error("Failed to fetch applied jobs:", error);
        setError("Failed to load applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();

  const cancelApplication = async (jobId: number) => {
    const confirmed = window.confirm("Are you sure you want to cancel your application?");
    if (!confirmed) return;

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return alert("User not found");

      const user = JSON.parse(storedUser);

      const res = await fetch(`http://localhost:3000/api/applications/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id, job_id: jobId }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to cancel application");
      }

      setAppliedJobs((prev) => prev.filter((job) => job.id !== jobId));
      alert("Application cancelled");
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-base font-medium animate-pulse">
        Loading applied jobs...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-base font-semibold">
        {error}
      </div>
    );

  if (appliedJobs.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-base">
        You haven’t applied to any jobs yet.
      </div>
    );

  return (
    <section className="max-w-3xl mx-auto px-4 mt-24 mb-20 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          Applied Jobs
        </h2>
        <p className="text-sm text-gray-500">Here's a list of jobs you’ve applied to.</p>
      </div>

      <div className="space-y-4">
        {appliedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow border border-gray-100 p-4"
          >
            <h3 className="text-base font-medium text-gray-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-600" />
              {job.title}
            </h3>
            {job.company_name && (
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <Building className="w-4 h-4" />
                Company:{" "}
                {job.company_website ? (
                  <a
                    href={job.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    {job.company_name}
                  </a>
                ) : (
                  <span className="ml-1">{job.company_name}</span>
                )}
              </p>
            )}
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {job.location} • {job.employment_type}
            </p>
            <p className="text-sm text-gray-700 mt-2 flex items-center gap-1">
              <DollarSign className="w-4 h-4" /> Salary: €{job.salary_min} - €{job.salary_max}
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Dates: {formatDate(job.date_start)} → {formatDate(job.date_end)}
            </p>

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => setSelectedJob(job)}
                aria-label="View job details"
                className="text-blue-600 hover:text-blue-700 transition"
                title="View details"
              >
                <Eye className="w-5 h-5" />
              </button>

              <button
                onClick={() => cancelApplication(job.id)}
                aria-label="Cancel application"
                className="text-red-500 hover:text-red-600 transition"
                title="Cancel application"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full job details */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white rounded-lg shadow p-4 max-w-xl w-full overflow-auto max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              {selectedJob.title}
            </h3>

            {selectedJob.company_name && (
              <p className="mb-2 text-sm text-gray-700 flex items-center gap-1">
                <Building className="w-4 h-4" />
                Company:{" "}
                {selectedJob.company_website ? (
                  <a
                    href={selectedJob.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    {selectedJob.company_name}
                  </a>
                ) : (
                  <span className="ml-1">{selectedJob.company_name}</span>
                )}
              </p>
            )}

            <p className="mb-2 text-sm font-semibold text-gray-700 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Location & Industry:
            </p>
            <p className="mb-3 text-sm text-gray-600 flex items-center gap-2">
              <span>{selectedJob.location}</span>
              <Tag className="w-4 h-4" />
              <span>{selectedJob.industry}</span>
            </p>

            {/* New Description Section */}
            <h4 className="text-md font-semibold mb-1 text-gray-800 flex items-center gap-1">
              <X className="w-4 h-4" />
              Description
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              {selectedJob.description
                ? selectedJob.description.split("\n").map((req, i) => (
                    <li key={i}>{req}</li>
                  ))
                : <li>No description provided.</li>}
            </ul>

            {selectedJob.requirements && (
              <div className="mb-4">
                <h4 className="text-md font-semibold mb-1 text-gray-800 flex items-center gap-1">
                  <X className="w-4 h-4" />
                  Requirements
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {selectedJob.requirements.split("\n").map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedJob.responsibilities && (
              <div>
                <h4 className="text-md font-semibold mb-1 text-gray-800 flex items-center gap-1">
                  <X className="w-4 h-4" />
                  Responsibilities
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {selectedJob.responsibilities.split("\n").map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setSelectedJob(null)}
              className="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AppliedJobs;
