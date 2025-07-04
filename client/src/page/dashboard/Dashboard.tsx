import { useEffect, useState } from "react";
import AppliedJobs from "./AppliedJobs";
import PostedJobs from "./PostedJobs";
import { DiamondPlus } from "lucide-react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setRole(user.user_type);
    }
  }, []);

  const handlePostJob = () => {
    navigate("/post-new-job");
  };

  if (!role) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-16">
      {role === "business" && (
        <>
          <div className="mt-10 flex justify-end">
            <Button
              label="Post a New Job"
              onClick={handlePostJob}
              icon={<DiamondPlus />}
              bgColorClass="bg-yellow-400"
              textColorClass="text-indigo-900"
              hoverBgColorClass="bg-yellow-300"
            />
          </div>
          <PostedJobs />
        </>
      )}

      {role === "worker" && <AppliedJobs />}
    </div>
  );
};

export default Dashboard;
