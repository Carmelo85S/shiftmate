import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import type { Job, User } from "../../types/types";

interface JobListProps {
  jobs?: Job[];
}

const JobList = ({ jobs: propJobs }: JobListProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage once
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Handle job list updates or fetch all jobs if no or empty propJobs
  useEffect(() => {
    if (propJobs && propJobs.length > 0) {
      setJobs(propJobs);
    } else {
      // Fetch all jobs if propJobs is undefined or empty array
      const fetchJobs = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/job");
          if (!response.ok) throw new Error("Failed to fetch jobs");
          const data = await response.json();
          setJobs(data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          setJobs([]);
        }
      };
      fetchJobs();
    }
  }, [propJobs]);

const handleApply = async (jobId: number) => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return alert("You must be logged in to apply");

  const user = JSON.parse(storedUser);
  try {
    // 1. Invia la candidatura
    const applyResponse = await fetch("http://localhost:3000/api/apply", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        user_id: user.id,
        job_id: jobId,
      }),
    });

    const applyResult = await applyResponse.json();
    if (!applyResponse.ok) throw new Error(applyResult.error);

    const messageContent = `Hi! I just applied for your job posting. Looking forward to hearing from you.`;

    const messageResponse = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        sender_id: user.id,
        job_id: jobId,
        content: messageContent,
      }),
    });

    const messageResult = await messageResponse.json();
    if (!messageResponse.ok) throw new Error(messageResult.error);

    alert("Application submitted and message sent!");
  } catch (error: any) {
    console.error("Error applying:", error);
    alert(error.message || "Failed to apply");
  }
};


  return (
    <section>

      <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto px-4 mb-20 sm:px-6 lg:px-8">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} user={user} onApply={handleApply}  />
          ))
        )}
      </div>
    </section>
  );
};

export default JobList;
