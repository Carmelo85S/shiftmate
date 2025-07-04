import { FileText, Users } from "lucide-react";
import { useEffect, useState } from "react";

const SidebarTotals = () => {
  const [totalPosts, setTotalPosts] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const postsRes = await fetch("http://localhost:3000/api/tot-post");
        const postsData = await postsRes.json();
        setTotalPosts(postsData.totalPosts);

        const usersRes = await fetch("http://localhost:3000/api/tot-users");
        const usersData = await usersRes.json();
        setTotalUsers(usersData.totalUsers);
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    fetchTotals();
  }, []);

  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-sm p-4 mt-2">
      <header className="mb-5">
        <h3 className="text-xl font-semibold text-gray-900 tracking-wide">Statistics</h3>
      </header>

      <ul className="space-y-6 text-gray-700">
        <li className="flex items-center space-x-3 cursor-default">
          <FileText className="w-6 h-6 text-yellow-500 flex-shrink-0" />
          <span className="text-lg font-medium">
            {totalPosts !== null ? totalPosts : "..."} Posts
          </span>
        </li>

        <li className="flex items-center space-x-3 cursor-default">
          <Users className="w-6 h-6 text-yellow-500 flex-shrink-0" />
          <span className="text-lg font-medium">
            {totalUsers !== null ? totalUsers : "..."} Users
          </span>
        </li>
      </ul>
    </aside>
  );
};

export default SidebarTotals;
