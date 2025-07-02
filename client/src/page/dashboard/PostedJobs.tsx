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

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  industry: string;
  employment_type: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  date_start: string;
  date_end: string;
  time_start: string;
  time_end: string;
  created_at: string;
  is_active: boolean;
  requirements?: string;
  responsibilities?: string;
}

const PostedJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

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

  if (loading) return <div className="text-center py-10 text-gray-500">Loading jobs...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (jobs.length === 0) return <div className="text-center py-10 text-gray-600">No jobs posted yet.</div>;

  return (
    <div className="ml-0 md:ml-64 max-w-6xl mx-auto px-6 mt-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Posted Jobs</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" /> {job.location}
                </p>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${job.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {job.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-4 line-clamp-3">{job.description}</p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-400" /> {job.employment_type}
              </p>
              <p className="flex items-center gap-2">
                <Euro className="w-4 h-4 text-gray-400" /> {job.salary_min}–{job.salary_max} {job.currency}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-400" /> {job.date_start} → {job.date_end}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" /> {job.time_start}–{job.time_end}
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => setSelectedJob(job)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-2 transition"
              >
                View details
              </button>
              <button
                onClick={() => deleteJob(job.id)}
                className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-medium transition"
                title="Delete Job"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{selectedJob.location} · {selectedJob.industry}</p>
            <p className="text-gray-700 mb-6 whitespace-pre-line">{selectedJob.description}</p>

            {selectedJob.requirements && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {selectedJob.requirements.split('\n').map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedJob.responsibilities && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Responsibilities</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {selectedJob.responsibilities.split('\n').map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedJobs;
