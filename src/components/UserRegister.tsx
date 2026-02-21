import React, { useState } from 'react';
import { useCartStore } from '../store/useCounterStore';
import { useNavigate, Link } from 'react-router-dom';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const setAuth = useCartStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Auto-login after successful registration
        setAuth(data.user, data.token);
        navigate("/view");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error("Register Error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-800 rounded-lg shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            name="username"
            type="text"
            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500"
            placeholder="johndoe"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors mt-4"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default UserRegister;
