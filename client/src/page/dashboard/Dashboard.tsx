import { useEffect, useState } from "react";
import { DiamondPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Info from "../../components/info-user/Info";
import SidebarTotals from "../../components/total/SidebarTotal";
import SearchWorker from "./SearchWorker";
import AppliedJobs from "./AppliedJobs";
import PostedJobs from "./PostedJobs";

import type { User } from "../../types/types";

const Dashboard = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState<string | null>(null);
  const [searchResultsUsers, setSearchResultsUsers] = useState<User[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex flex-col md:flex-row md:space-x-8">
          {/* Left sidebar */}
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

          {/* Main content */}
          <div className="flex-1">
            {/* Search form */}
            <SearchWorker
              onSearchResults={(results) => {
                setSearchResultsUsers(results);
                setHasSearched(true);
              }}
            />

            {/* Search results */}
            {hasSearched && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Worker Search Results:</h2>
                {searchResultsUsers.length > 0 ? (
                  <ul className="space-y-3">
                    {searchResultsUsers.map((user) => (
                      <li
                        key={user.id}
                        className="border p-4 rounded-md shadow-sm bg-white flex items-start space-x-4"
                      >
                        {/* Avatar or fallback */}
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-800 font-semibold flex items-center justify-center rounded-full text-sm uppercase">
                          {user.name?.charAt(0) || "U"}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <p className="font-bold text-indigo-900">{user.name || "Unnamed Worker"}</p>
                          
                          <p className="text-sm text-gray-600">
                            <strong>Skills:</strong>{" "}
                            {Array.isArray(user.skills)
                              ? user.skills.join(", ")
                              : user.skills || "N/A"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Availability:</strong> {user.availability || "N/A"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No workers matched your search.</p>
                )}
              </div>
            )}

            {/* Posted jobs */}
            <div className="mt-12">
              <h2 className="text-lg font-semibold mb-4">Your Posted Jobs</h2>
              <PostedJobs />
            </div>
          </div>
        </div>
      )}

      {role === "worker" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex flex-col md:flex-row md:space-x-8">
          {/* Left sidebar */}
          <aside className="w-full md:w-72 flex flex-col gap-2 items-center mb-6 md:mb-0 md:sticky top-20">
            <Info />
            <SidebarTotals />
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <AppliedJobs />
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
