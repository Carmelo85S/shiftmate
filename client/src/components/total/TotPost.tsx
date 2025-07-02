import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

const TotPost = () => {
  const [totalPosts, setTotalPosts] = useState<number | null>(null);

  const fetchTotalPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tot-post");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTotalPosts(data.totalPosts);
      console.log(`Total posts: ${data.totalPosts}`);
    } catch (error) {
      console.error("Error fetching total posts:", error);
    }
  };

  useEffect(() => {
    fetchTotalPosts();
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-5">
        <div className="p-4 bg-yellow-200 rounded-full">
          <FileText className="text-yellow-700 w-7 h-7" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
            Total Job Posts
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-1">
            {totalPosts !== null ? totalPosts : "..."}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TotPost;
