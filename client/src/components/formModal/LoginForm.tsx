import { X } from "lucide-react";

type LoginFormProps = {
  setIsOpen: (open: null) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ setIsOpen }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Close button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(null)}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to ShiftMate</h2>

        {/* Form */}
        <form className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            minLength={6}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold rounded-lg py-3 shadow-md hover:bg-indigo-500 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
