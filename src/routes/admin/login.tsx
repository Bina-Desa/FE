/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + '/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError('Username atau password salah');
        return;
      }

      const now = new Date();
      const expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      sessionStorage.setItem('authToken', result.token);
      sessionStorage.setItem('authTokenExpiry', expiry.toISOString());

      toast.success('Login successful');
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError('Terjadi kesalahan saat login. Silakan coba lagi' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/images/logo.jpeg" alt="App Logo" className="w-20 h-20 rounded-full" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">Selamat Datang Kembali</h2>
        <p className="mt-2 text-sm text-center text-gray-600">Lengkapi form ini untuk masuk ke akun anda</p>

        {/* Form */}
        <form className="mt-6" onSubmit={handleSubmit(handleLogin)}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Masukan username"
              {...register('username', { required: true })}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukan password"
              {...register('password', { required: true })}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="showpassword" onClick={() => setShowPassword(!showPassword)} />
            <label htmlFor="showpassword">Tampilkan Password</label>
          </div>

          {/* Error Message */}
          {error && <p className="mt-2 text-sm text-left text-red-500">{error}</p>}

          {/* Loading Indicator */}
          {loading && <p className="mt-2 text-sm text-left text-gray-500">Mohon tunggu...</p>}

          {/* Sign In Button */}
          <button type="submit" className="w-full px-4 py-2 mt-6 font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" disabled={loading}>
            {loading ? 'Login...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
