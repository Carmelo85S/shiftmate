import {
  Briefcase,
  CalendarDays,
  Clock,
  Euro,
  MapPin,
  X,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import type {PostedJobs} from '../../types/types'

const PostedJobs = () => {
  const [jobs, setJobs] = useState<PostedJobs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<PostedJobs | null>(null);

  const fetchJobs = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.id) throw new Error("User ID missing");

      const res = await fetch(`http://localhost:3000/api/user/${user.id}/jobs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid JSON response");
      }

      if (!res.ok) throw new Error(data.error || "Failed to fetch jobs");
      setJobs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete job");

      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-base font-medium animate-pulse">
        Loading jobs...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-base font-semibold">
        {error}
      </div>
    );

  if (jobs.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-base">
        No jobs posted yet.
      </div>
    );

  return (
    <section className="max-w-4xl mx-auto px-6 mt-10 mb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Briefcase className="w-7 h-7 text-blue-600" />
          Posted Jobs
        </h2>
        <p className="text-sm text-gray-500 mt-1">Manage your job postings below.</p>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 relative hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-gray-600" />
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {job.location} &middot; {job.industry}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-semibold select-none
                    ${
                      job.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-500"
                    }`}
                >
                  {job.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <button
                onClick={() => deleteJob(job.id)}
                aria-label="Delete job"
                className="text-red-500 hover:text-red-600 transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                title="Delete Job"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-700 mt-4 text-sm line-clamp-3">{job.description}</p>

            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-gray-400" /> {job.employment_type}
              </p>
              <p className="flex items-center gap-2">
                <Euro className="w-5 h-5 text-gray-400" /> {job.salary_min}–{job.salary_max} {job.currency}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-gray-400" />{" "}
                {new Date(job.date_start).toLocaleDateString()} &rarr;{" "}
                {new Date(job.date_end).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" /> {job.time_start}–{job.time_end}
              </p>
            </div>

            <button
              onClick={() => setSelectedJob(job)}
              className="mt-6 text-blue-600 hover:text-blue-700 transition font-semibold text-sm focus:outline-none focus:underline"
            >
              View details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-5 right-5 text-gray-500 hover:text-red-500 transition focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Briefcase className="w-7 h-7 text-blue-600" />
              {selectedJob.title}
            </h3>

            <p className="flex items-center gap-1 text-gray-600 text-sm mb-2">
              <MapPin className="w-5 h-5" />
              Location & Industry:
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm mb-6">
              <span>{selectedJob.location}</span>
              <span>•</span>
              <span>{selectedJob.industry}</span>
            </p>

            <h4 className="text-lg font-semibold mb-2 text-gray-800">Description</h4>
            <p className="mb-6 whitespace-pre-line text-gray-700 text-sm">
              {selectedJob.description || "No description provided."}
            </p>

            {selectedJob.requirements && (
              <section className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  {selectedJob.requirements.split("\n").map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </section>
            )}

            {selectedJob.responsibilities && (
              <section>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Responsibilities</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  {selectedJob.responsibilities.split("\n").map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </section>
            )}

            <button
              onClick={() => setSelectedJob(null)}
              className="mt-8 px-5 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostedJobs;
