"use client";

import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      {user ? (
        <div>
          <h1>Welcome {user.name}!</h1>
          <p>Email: {user.email}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h1>Please log in</h1>
          <a
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block"
          >
            Go to Login
          </a>
        </div>
      )}
    </div>
  );
}
