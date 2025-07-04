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
  skills?: string[];
  availability?: string;
  experience_years?: number;
  company_name?: string;
  company_website?: string;
  industry?: string;
}

const MyProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      const fetchProfile = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/profile/${userId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (!response.ok) throw new Error("Failed to fetch profile");
          const data = await response.json();
          setProfile(data);
        } catch {
          setError("Error fetching profile");
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    } catch {
      setError("Invalid user data.");
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg font-medium animate-pulse">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg font-semibold">
        {error}
      </div>
    );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-24">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <header className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5 text-yellow-500" />
            My Profile
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review your personal and account information.
          </p>
        </header>

        {profile && (
          <div className="space-y-12">
            {/* Personal Info */}
            <ProfileSection icon={BadgeCheck} title="Personal Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoItem icon={User} label="Name" value={profile.name} />
                <InfoItem icon={Mail} label="Email" value={profile.email} />
                <InfoItem icon={Type} label="User Type" value={profile.user_type} />
                <InfoItem icon={Phone} label="Phone" value={profile.phone} fallback="Not provided" />
                <InfoItem icon={MapPin} label="Location" value={profile.location} fallback="Not specified" />
                <InfoItem icon={Info} label="Bio" value={profile.bio} fallback="No bio available" full />
              </div>
            </ProfileSection>

            {/* Business Info */}
            {profile.user_type === "business" && (
              <ProfileSection icon={Building2} title="Business Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InfoItem icon={Building2} label="Company Name" value={profile.company_name} fallback="Not provided" />
                  <InfoItem icon={Briefcase} label="Industry" value={profile.industry} fallback="Not specified" />
                  <div className="sm:col-span-2">
                    <InfoItem icon={Globe} label="Company Website" value={profile.company_website} fallback="Not provided" link />
                  </div>
                </div>
              </ProfileSection>
            )}

            {/* Worker Info */}
            {profile.user_type === "worker" && (
              <ProfileSection icon={Briefcase} title="Worker Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InfoItem icon={Type} label="Availability" value={profile.availability} fallback="Not specified" />
                  <InfoItem icon={User} label="Experience (Years)" value={profile.experience_years?.toString()} fallback="Not provided" />
                  <div className="sm:col-span-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-2 mb-2">
                      <BadgeCheck className="w-4 h-4 text-yellow-500" /> Skills
                    </h3>
                    {profile.skills?.length ? (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {profile.skills.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No skills listed</p>
                    )}
                  </div>
                </div>
              </ProfileSection>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyProfile;

// Helper components

const ProfileSection = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-6 border-b border-gray-200 pb-2">
      <Icon className="w-5 h-5 text-yellow-500" />
      {title}
    </h2>
    {children}
  </section>
);

const InfoItem = ({
  icon: Icon,
  label,
  value,
  fallback,
  full,
  link = false,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
  fallback?: string;
  full?: boolean;
  link?: boolean;
}) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <h3 className="text-sm font-medium text-gray-600 flex items-center gap-2 mb-1">
      <Icon className="w-4 h-4 text-yellow-500" />
      {label}
    </h3>
    {link && value ? (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 hover:underline break-all"
      >
        {value}
      </a>
    ) : (
      <p className="text-sm text-gray-800">{value?.trim() || fallback || "N/A"}</p>
    )}
  </div>
);
