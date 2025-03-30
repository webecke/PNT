import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginPresenter } from "@/presenter/authentication/LoginPresenter";
import { NavigableView } from "@/presenter/Presenter";

interface Props {
  presenter?: LoginPresenter;
}

const Login = (props: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const listener: NavigableView = {
    navigateTo: url => router.push(url)
  }

  const presenter = useRef(props.presenter ? props.presenter : new LoginPresenter(listener));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await presenter.current.login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <a href="/frontend/src/components/auth/Signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
