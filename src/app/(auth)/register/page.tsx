"use client";

import { LottieFactory } from "@/components/animations/animationFactory";
import { AnimationType } from "@/components/animations/animationTypes";
import { useToken } from "@/components/providers/TokenProvider";
import { useUser } from "@/components/providers/UserProvider";
import { useState } from "react";
import { userFetcher } from "utils/fetch/userFetcher";

export default function RegisterPage() {
  const { setUser } = useUser();
  const { updateJwt, updateRt } = useToken();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const result = await userFetcher.register(form.username, form.email, form.password);
    if (!result) {
      setError("Registration failed");
      return;
    }

    setUser(result.user);
    updateJwt(result.jwt);
    updateRt(result.refreshToken);

    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative max-w-md w-full bg-cyan-50 dark:bg-white p-8 rounded-lg shadow-lg overflow-hidden">
        <div className="z-0 absolute inset-0 opacity-35 pointer-events-none top-11/20">
          <LottieFactory animationType={AnimationType.Auth} width="100%" height="100%" />
        </div>
        <div className="z-1 relative backdrop-blur-[1.5px] text-1xl font-medium">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-xl text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
        </div>
        <div className="h-70"></div>
      </div>
    </div>
  );
}
