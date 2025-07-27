import { useEffect, useState } from "react";
import type { User } from "../../types/types";
import { Search } from "lucide-react";
import Button from "../../components/ui/Button";

interface WorkerSearchBarProps {
  onSearchResults: (results: User[]) => void;
}

const SearchWorker = ({ onSearchResults }: WorkerSearchBarProps) => {
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("");

  // Fetch all workers if no filters are set
  useEffect(() => {
    if (!skills && !availability) {
      const fetchAllWorkers = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/search/users", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (!response.ok) throw new Error("Failed to fetch all workers");
          const data = await response.json();
          onSearchResults(data);
        } catch (error) {
          console.error("Error fetching all workers:", error);
          onSearchResults([]);
        }
      };
      fetchAllWorkers();
    }
  }, [skills, availability, onSearchResults]);

  // Search handler
  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (skills) queryParams.append("skills", skills);
      if (availability) queryParams.append("availability", availability);

      const response = await fetch(
        `http://localhost:3000/api/search/users?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        alert("Search failed");
        return;
      }

      const data = await response.json();
      onSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
      alert("An error occurred during search");
    }
  };

  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-sm p-4 mt-2">
      <header className="mb-5">
        <h3 className="text-xl font-semibold text-gray-900 tracking-wide">Search Worker</h3>
      </header>

      {/* Skills input */}
      <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 mb-3">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search by skill"
          className="bg-transparent outline-none w-full text-sm text-gray-800"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      {/* Availability input */}
      <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 mb-4">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search by availability"
          className="bg-transparent outline-none w-full text-sm text-gray-800"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <div className="flex justify-center">
        <Button
          icon={<Search />}
          label="Search"
          bgColorClass="bg-yellow-400"
          textColorClass="text-indigo-900"
          hoverBgColorClass="bg-yellow-300"
          onClick={handleSearch}
        />
      </div>
    </aside>
  );
};

export default SearchWorker;
