import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import type { Job, User } from "../../types/types";

interface JobListProps {
  jobs?: Job[];
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const JobList = ({ jobs: propJobs }: JobListProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingJobId, setLoadingJobId] = useState<number | null>(null);

  // Load user from localStorage once
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Load jobs from props or fetch
  useEffect(() => {
    if (propJobs?.length) {
      setJobs(propJobs);
      setLoading(false);
    } else {
      const fetchJobs = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await fetch(`${API_BASE}/api/job`);
          if (!response.ok) throw new Error("Failed to fetch jobs");
          const data = await response.json();
          setJobs(data);
        } catch (err: any) {
          console.error("Error fetching jobs:", err);
          setError(err.message || "Failed to load jobs");
          setJobs([]);
        } finally {
          setLoading(false);
        }
      };
      fetchJobs();
    }
  }, [propJobs]);

  const handleApply = async (jobId: number) => {
    if (!user) return alert("You must be logged in to apply");

    try {
      setLoadingJobId(jobId);

      // Send application
      const applyResponse = await fetch(`${API_BASE}/api/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          user_id: user.id,
          job_id: jobId,
        }),
      });

      const applyResult = await applyResponse.json();
      if (!applyResponse.ok) throw new Error(applyResult.error);

      // Send follow-up message
      const messageResponse = await fetch(`${API_BASE}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          sender_id: user.id,
          job_id: jobId,
          content:
            "Hi! I just applied for your job posting. Looking forward to hearing from you.",
        }),
      });

      const messageResult = await messageResponse.json();
      if (!messageResponse.ok) throw new Error(messageResult.error);

      alert("Application submitted and message sent!");
    } catch (error: any) {
      console.error("Error applying:", error);
      alert(error.message || "Failed to apply");
    } finally {
      setLoadingJobId(null);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto px-4 mb-20 sm:px-6 lg:px-8">
        {loading && <p className="text-center text-gray-500">Loading jobs...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && jobs.length === 0 && !error && (
          <p className="text-center text-gray-500">No jobs found.</p>
        )}
        {!loading &&
          jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              user={user}
              onApply={handleApply}
              applying={loadingJobId === job.id}
            />
          ))}
      </div>
      
    </section>
  );
};

export default JobList;
