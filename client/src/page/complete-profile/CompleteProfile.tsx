import WorkerProfileForm from "./WorkerProfile";
import BusinessProfileForm from "./BusinessProfile";

const CompleteProfile = ({ userType }: { userType: "worker" | "business" }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {userType === "worker" ? <WorkerProfileForm /> : <BusinessProfileForm />}
    </div>
  );
};

export default CompleteProfile;
