import { useEffect, useState } from "react";
import type { User } from "../../types/types";
import { User as UserIcon, Mail, MapPin, Info as InfoIcon } from "lucide-react";

const Info = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      setLoading(false);
      return;
    }

    const userId = JSON.parse(userString).id;
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading user info...</p>;
  if (!user) return <p>No user found</p>;

  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-sm p-6">
      <header className="mb-5 flex items-center space-x-3">
        <InfoIcon className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-900">User Info</h2>
      </header>

      <ul className="space-y-4 text-gray-700">
        <li className="flex items-center space-x-3">
          <UserIcon className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          <span className="text-base font-medium">{user.name}</span>
        </li>

        <li className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          <span className="text-sm font-medium">{user.email}</span>
        </li>

        <li className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          <span className="text-sm font-medium">{user.location}</span>
        </li>

        {user.user_type === "worker" && Array.isArray(user.skills) && user.skills.length > 0 && (
          <li>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full select-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Info;
