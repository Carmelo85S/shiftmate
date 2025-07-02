// MyProfile.tsx
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Info,
  Building2,
  Globe,
  BadgeCheck,
  Briefcase,
  Type,
} from "lucide-react";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  user_type: string;
  phone?: string;
  bio?: string;
  location?: string;
  profile_complete: boolean;

  // Worker-specific
  skills?: string[];
  availability?: string;
  experience_years?: number;

  // Business-specific
  company_name?: string;
  company_website?: string;
  industry?: string;
}

const MyProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");
      const data = await response.json();
      setProfile(data);
      setLoading(false);
    } catch {
      setError("Error fetching profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
      setError("User not found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(userJson);
      const userId = user.id;
      if (!userId) {
        setError("User ID not found in user data.");
        setLoading(false);
        return;
      }
      fetchProfile(userId);
    } catch {
      setError("Invalid user data.");
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full text-gray-500 text-lg font-medium animate-pulse">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-full text-red-600 text-lg font-semibold">
        {error}
      </div>
    );

  return (
    // Container pushed right on desktop, full width on mobile
    <div className="ml-0 md:ml-64 pt-20 p-8 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <header className="mb-12 px-4 md:px-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <User size={32} /> My Profile
          </h1>
          <p className="text-gray-500 mt-2">
            Review your personal and account information below.
          </p>
        </header>

        {profile && (
          <main className="space-y-12 px-4 md:px-8 pb-8">
            {/* Personal Info */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-3 mb-8 flex items-center gap-3">
                <BadgeCheck size={24} /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <InfoItem icon={User} label="Name" value={profile.name} />
                <InfoItem icon={Mail} label="Email" value={profile.email} />
                <InfoItem icon={Type} label="User Type" value={profile.user_type} />
                <InfoItem
                  icon={Phone}
                  label="Phone"
                  value={profile.phone}
                  fallback="Not provided"
                />
                <InfoItem
                  icon={MapPin}
                  label="Location"
                  value={profile.location}
                  fallback="Not specified"
                />
                <div className="md:col-span-2">
                  <InfoItem
                    icon={Info}
                    label="Bio"
                    value={profile.bio}
                    fallback="No bio available"
                  />
                </div>
              </div>
            </section>

            {/* Business Info */}
            {profile.user_type === "business" && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3 border-b border-gray-300 pb-3 mb-8">
                  <Building2 size={24} /> Business Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <InfoItem
                    icon={Building2}
                    label="Company Name"
                    value={profile.company_name}
                    fallback="Not provided"
                  />
                  <InfoItem
                    icon={Briefcase}
                    label="Industry"
                    value={profile.industry}
                    fallback="Not specified"
                  />
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-1 mb-2">
                      <Globe size={16} /> Company Website
                    </h3>
                    {profile.company_website ? (
                      <a
                        href={profile.company_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 break-all"
                      >
                        {profile.company_website}
                      </a>
                    ) : (
                      <p className="text-gray-500">Not provided</p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Worker Info */}
            {profile.user_type === "worker" && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3 border-b border-gray-300 pb-3 mb-8">
                  <Briefcase size={24} /> Worker Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <InfoItem
                    icon={Type}
                    label="Availability"
                    value={profile.availability}
                    fallback="Not specified"
                  />
                  <InfoItem
                    icon={User}
                    label="Experience (Years)"
                    value={profile.experience_years?.toString()}
                    fallback="Not provided"
                  />
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-1 mb-2">
                      <BadgeCheck size={16} /> Skills
                    </h3>
                    {profile.skills && profile.skills.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-700">
                        {profile.skills.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No skills listed</p>
                    )}
                  </div>
                </div>
              </section>
            )}
          </main>
        )}
      </div>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value?: string | null;
  fallback?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value, fallback }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-2 mb-2">
      <Icon size={16} /> {label}
    </h3>
    <p className="text-gray-700">{value && value.trim() !== "" ? value : fallback || "N/A"}</p>
  </div>
);

export default MyProfile;
