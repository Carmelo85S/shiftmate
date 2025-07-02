import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

const TotUser = () => {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);

  const fetchTotalUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tot-users"); // correggi endpoint con "tot-users"
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTotalUsers(data.totalUsers);
      console.log(`Total users: ${data.totalUsers}`);
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-5">
        <div className="p-4 bg-yellow-200 rounded-full">
          <FileText className="text-yellow-700 w-7 h-7" />
        </div>
        <div>
          <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">
            Total Users
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
            {totalUsers !== null ? totalUsers : "..."}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TotUser;
