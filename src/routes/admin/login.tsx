import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Untuk navigasi ke halaman lain

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman

    // Validasi username dan password
    if (username === "admin" && password === "admin123") {
      // Simpan token sederhana ke localStorage
      localStorage.setItem("authToken", "dummyToken");
      // Arahkan ke admin dashboard
      navigate("/adminDashboard");
    } else {
      // Tampilkan pesan error jika login gagal
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo.jpeg"
            alt="App Logo"
            className="w-20 h-20 rounded-full"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Please sign in to your account
        </p>

        {/* Form */}
        <form className="mt-6" onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-800"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-800"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="mt-2 text-sm text-center text-red-500">{error}</p>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
