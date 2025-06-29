import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  setIsOpen: (open: null) => void;
  userType: "business" | "worker";
  setIsAuthenticated: (auth: boolean) => void;  
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setIsOpen, userType, setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  
  const buttonBg =
    userType === "business" ? "bg-yellow-400 hover:bg-yellow-300" : "bg-pink-500 hover:bg-pink-400 text-white";

  const inputFocus =
    userType === "business"
      ? "focus:ring-yellow-300 focus:border-yellow-300"
      : "focus:ring-pink-400 focus:border-pink-400";


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (password !== confirmPassword) {
    return setError("Passwords do not match.");
  }

  try {
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        userType,
      }),
    });

    const data = await res.json();
    console.log("Server response:", data);

    if (!res.ok) {
      return setError(data.error || "Something went wrong");
    }

    localStorage.setItem("user", JSON.stringify(data.data[0]));

    alert("Registration successful!");
    setIsAuthenticated(true);
    setIsOpen(null);
    navigate(`/complete-profile/${userType}`);

  } catch (err) {
    console.error(err);
    setError("An error occurred.");
  }
};


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

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${inputFocus}`}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${inputFocus}`}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${inputFocus}`}
            required
            minLength={6}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
