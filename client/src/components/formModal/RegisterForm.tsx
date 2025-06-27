import { X } from "lucide-react";

interface RegisterFormProps {
  setIsOpen: (open: null) => void;
  userType: "business" | "worker";
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setIsOpen, userType }) => {

  const buttonBg =
    userType === "business" ? "bg-yellow-400 hover:bg-yellow-300" : "bg-pink-500 hover:bg-pink-400 text-white";

  const inputFocus =
    userType === "business" ? "focus:ring-yellow-300 focus:border-yellow-300" : "focus:ring-pink-400 focus:border-pink-400 text-white";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-8">
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(null)}
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-900">
          Register as{" "}
          <span className={userType === "business" ? "text-yellow-400" : "text-pink-400"}>
            {userType === "business" ? "Business" : "Worker"}
          </span>
        </h2>
        <form className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className={`border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${inputFocus}`}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${inputFocus}`}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${inputFocus}`}
            required
            minLength={6}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${inputFocus}`}
            required
            minLength={6}
          />
          <button
            type="submit"
            className={`${buttonBg} text-indigo-900 font-bold rounded-lg py-3 shadow-md transition-colors`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
