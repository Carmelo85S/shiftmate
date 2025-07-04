import { useEffect, useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import type { Job } from "../../types/types";
import Button from "../ui/Button";

interface JobSearchBarProps {
  onSearchResults: (results: Job[]) => void;
}

const JobSearchBar = ({ onSearchResults }: JobSearchBarProps) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (!keyword && !location && !type) {
      const fetchAllJobs = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/job", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (!response.ok) throw new Error("Failed to fetch all jobs");
          const data = await response.json();
          onSearchResults(data);
        } catch (error) {
          console.error("Error fetching all jobs:", error);
          onSearchResults([]);
        }
      };
      fetchAllJobs();
    }
  }, [keyword, location, type, onSearchResults]);

  const handleSearch = async () => {
    if (!keyword && !location && !type) {
      alert("Please enter at least one search parameter.");
      return;
    }
    try {
      const queryParams = new URLSearchParams();
      if (keyword) queryParams.append("keyword", keyword);
      if (location) queryParams.append("location", location);
      if (type) queryParams.append("type", type);

      const response = await fetch(
        `http://localhost:3000/api/search?${queryParams.toString()}`,
        {
          method: "GET",
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
    <div
      className="max-w-7xl bg-white rounded-2xl shadow-sm border p-4
                 md:sticky md:top-20 md:z-30"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <div className="flex justify-start items-baseline mb-6flex-row">
        <h2 className="text-xl font-semibold text-gray-800 p-4">
          Find Your Next Shift
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Just pick one filter or combine a few — whatever works best for you to
          land your perfect shift.
        </p>
      </div>

      <div className="flex flex-col space-y-4 md:grid md:grid-cols-4 md:gap-3 md:space-y-0">
        {/* Keyword Input */}
        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by job title or skill"
            className="bg-transparent outline-none w-full text-sm text-gray-800"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Location Input */}
        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <MapPin className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Location"
            className="bg-transparent outline-none w-full text-sm text-gray-800"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Employment Type Dropdown */}
        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <Briefcase className="w-5 h-5 text-gray-400 mr-2" />
          <select
            className="bg-transparent outline-none w-full text-sm text-gray-800"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="full time">Full time</option>
            <option value="part time">Part time</option>
            <option value="contract">Contract</option>
            <option value="temporary">Temporary</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-center">
          <Button
            icon={<Search />}
            label={"Search"}
            bgColorClass="bg-yellow-400"
            textColorClass="text-indigo-900"
            hoverBgColorClass="bg-yellow-300"
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default JobSearchBar;
