import { useState } from "react";
import JobSearchBar from "../../components/job-search/JobSearchBar";
import JobList from "../../components/jobs/JobList";
import type { Job } from "../../types/types";
import Info from "../../components/info-user/Info";
import SidebarTotals from "../../components/total/SidebarTotal";

const Main = () => {
  const [searchResults, setSearchResults] = useState<Job[]>([]);

  return (
    <>
      {/* JobSearchBar sticky full width with bg */}
      <div className="w-full bg-gray-50 shadow-md sticky top-14 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <JobSearchBar onSearchResults={setSearchResults} />
        </div>
      </div>

      {/* Container principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 flex flex-col md:flex-row md:space-x-8">
        {/* Left Sidebar */}
        <aside className="w-full md:w-72 flex flex-col gap-2 items-center mb-6 md:mb-0 md:sticky top-64 md:h-[calc(100vh-256px)] md:overflow-y-auto">
          <Info />
          <SidebarTotals />
        </aside>

        {/* Main Content */}
        <main className="w-full md:flex-1 mt-6 md:mt-0">
          <JobList jobs={searchResults} />
        </main>

        
      </div>
    </>
  );
};

export default Main;
