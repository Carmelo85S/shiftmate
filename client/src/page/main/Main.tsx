import { useState } from "react";
import JobSearchBar from "../../components/job-search/JobSearchBar";
import JobList from "../../components/jobs/JobList";
import type { Job } from "../../types/types";
import Info from "../../components/info-user/Info";
import SidebarTotals from "../../components/total/SidebarTotal";

const Main = () => {
  const [searchResults, setSearchResults] = useState<Job[]>([]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <JobSearchBar onSearchResults={setSearchResults} />

      <div className="flex flex-col md:flex-row md:space-x-8 mt-6">
        
        {/* Sidebar: full width mobile, fixed width desktop */}
        <aside className="hidden md:flex w-full mx-auto md:w-72 mt-6 md:mt-0 items-center flex-col">
          <Info />
          <SidebarTotals />
        </aside>

        {/* Job list: full width on mobile, flex-grow on desktop */}
        <main className="w-full md:flex-1 mt-6 md:mt-0">
          <JobList jobs={searchResults} />
        </main>
      </div>
    </div>
  );
};


export default Main;
