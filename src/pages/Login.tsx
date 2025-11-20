import { useNavigate } from "react-router-dom";
import { MailIcon, PasswordIcon } from "../assets/Icons";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-white">
      <div className="bg-[var(--bg)] p-8 sm:p-10 md:p-12 flex flex-col justify-center items-center rounded-xl gap-6 w-[90vw] max-w-[500px]">
        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          Chugo Admin
        </p>

        <div className="w-full space-y-4">
          <div className="relative w-full">
            <MailIcon className="absolute h-6 w-6 top-3 left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative w-full">
            <PasswordIcon className="absolute h-6 w-6 top-3 left-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="mt-4 w-full bg-black text-white py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-medium transition transform hover:scale-95 active:scale-105"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
