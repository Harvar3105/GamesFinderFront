"use client";

import { LottieFactory } from "@/components/animations/animationFactory";
import { AnimationType } from "@/components/animations/animationTypes";
import { useToken } from "@/components/providers/tokenProvider";
import { useUser } from "@/components/providers/userProvider";
import { redirect } from "next/navigation";
import { useState } from "react";
import { bffUserFetcher } from "utils/fetch/bff/bffUserFetcher";
import { HttpError } from "utils/fetch/httpError";

export default function LoginPage() {
  const { setUser } = useUser();
  const { updateJwt } = useToken();

  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let result;
    if (form.usernameOrEmail.includes("@")) {
      result = await bffUserFetcher.login({ email: form.usernameOrEmail, password: form.password });
    } else {
      result = await bffUserFetcher.login({
        username: form.usernameOrEmail,
        password: form.password,
      });
    }

    if (result instanceof HttpError) {
      setError("Login failed");
      return;
    }

    setUser(result.user);
    updateJwt(result.accessToken);
    setError("");
    redirect("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative max-w-md w-full bg-cyan-50 dark:bg-white p-8 rounded-lg shadow-lg overflow-hidden">
        <div className="z-0 absolute inset-0 opacity-35 pointer-events-none top-6/14">
          <LottieFactory animationType={AnimationType.Auth} width="100%" height="100%" />
        </div>
        <div className="z-1 relative backdrop-blur-[1.5px] text-1xl font-medium">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="usernameOrEmail" className="block mb-1">
                Username or Email
              </label>
              <input
                id="usernameOrEmail"
                type="text"
                name="usernameOrEmail"
                value={form.usernameOrEmail}
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-xl text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
        <div className="h-70"></div>
      </div>
    </div>
  );
}
