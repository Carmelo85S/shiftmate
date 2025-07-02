import { useEffect, useState } from 'react';

type Job = {
  id: number;
  title: string;
  location: string;
  industry: string;
  employment_type: string;
  salary_min: number;
  salary_max: number;
  date_start: string;
  date_end: string;
};

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      try {
        const res = await fetch(`http://localhost:3000/api/user/${user.id}/applications`);
        const data = await res.json();
        setAppliedJobs(data.map((app: any) => app.jobs)); 
      } catch (error) {
        console.error('Failed to fetch applied jobs:', error);
        setError("Failed to load applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  if (loading) return <p className="ml-0 md:ml-64 px-6 py-8">Loading applied jobs...</p>;
  if (error) return <p className="ml-0 md:ml-64 px-6 py-8 text-red-500">Error: {error}</p>;
  if (appliedJobs.length === 0)
    return <p className="ml-0 md:ml-64 px-6 py-8">You have not applied to any jobs yet.</p>;

  return (
    <div className="ml-0 md:ml-64 px-6 py-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Applied Jobs</h2>
      <div className="grid gap-6">
        {appliedJobs.map((job) => (
          <div
            key={job.id}
            className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {job.location} • {job.employment_type}
            </p>
            <p className="text-sm text-gray-600 mt-1">{job.industry}</p>
            <p className="text-sm text-gray-700 mt-2">
              Salary: €{job.salary_min} - €{job.salary_max}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Dates: {formatDate(job.date_start)} to {formatDate(job.date_end)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
