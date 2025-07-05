import { useEffect, useState } from "react";
import AppliedJobs from "./AppliedJobs";
import PostedJobs from "./PostedJobs";
import { DiamondPlus } from "lucide-react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Info from "../../components/info-user/Info";
import SidebarTotals from "../../components/total/SidebarTotal";

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex flex-col md:flex-row md:space-x-8">
            <aside className="w-full md:w-72 flex flex-col gap-2 items-center mb-6 md:mb-0 md:sticky">
            <Info />
            <SidebarTotals />
              <Button
                label="Post a New Job"
                onClick={handlePostJob}
                icon={<DiamondPlus />}
                bgColorClass="bg-yellow-400"
                textColorClass="text-indigo-900"
                hoverBgColorClass="bg-yellow-300"
              />
            </aside>
              
            <PostedJobs />
          </div>
        </>
      )}

      {role === "worker" && <AppliedJobs />}
    </div>
  );
};

export default Dashboard;
