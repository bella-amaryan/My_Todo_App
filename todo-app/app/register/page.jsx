"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle redirect after successful registration
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      setSuccess("Registration successful! You can now login.");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7e8fb] to-[#eef4ff] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#2f234f]">Create account</h1>
          <p className="text-sm text-gray-500 mt-1">Sign up to start organizing your tasks</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-600">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block bg-white text-sm font-medium text-gray-800">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition  text-black placeholder:text-gray-400  focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block bg-white text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              id="email"
            type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition text-black placeholder:text-gray-400   focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block bg-white text-sm font-medium text-gray-800">
              Password
            </label>
            <input
              id="password"
               type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              autoComplete="new-password"
              onChange={handleChange}
              className="w-full rounded-lg border bg-white border-gray-300 px-4 py-3 outline-none transition text-black placeholder:text-gray-400   focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block bg-white text-sm font-medium text-gray-800">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
            type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg border bg-white border-gray-300 px-4 py-3 outline-none transition text-black placeholder:text-gray-400  focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-purple-600 hover:text-purple-700">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}