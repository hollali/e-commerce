"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  signInWithPopup,
  onAuthStateChanged,
  User,
  signOut,
  deleteUser,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { FaSignOutAlt, FaTrashAlt } from "react-icons/fa"; // ✅ logout + delete icons

export default function SignUp() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signInLoading, setSignInLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setSignInLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ User signed in:", result.user);
    } catch (error: any) {
      console.error("❌ Google sign-in error:", error);
      setError("Failed to sign in. Please try again.");
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("✅ User signed out");
    } catch (error) {
      console.error("❌ Sign-out error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirmDelete = confirm(
      "⚠️ Are you sure you want to permanently delete your account? This cannot be undone."
    );
    if (!confirmDelete) return;

    setActionLoading(true);
    setError("");
    try {
      await deleteUser(user);
      console.log("✅ User account deleted");
    } catch (error: any) {
      console.error("❌ Delete account error:", error);
      if (error.code === "auth/requires-recent-login") {
        setError("Please sign in again before deleting your account.");
      } else {
        setError("Failed to delete account. Please try again.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl text-center">
        <div className="mb-6">
          <Image
            src="/nadia.jpeg"
            alt="Sign Up Illustration"
            width={300}
            height={200}
            className="mx-auto rounded-lg"
            priority
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!user ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Welcome!</h2>
            <button
              onClick={handleGoogleSignIn}
              disabled={signInLoading}
              className="w-full flex items-center justify-center px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signInLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></div>
              ) : (
                <Image
                  src="/google.png"
                  alt="Google Sign In"
                  width={24}
                  height={24}
                  className="mr-2"
                />
              )}
              <span className="text-gray-700 font-medium">
                {signInLoading ? "Signing in..." : "Continue with Google"}
              </span>
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
            <div className="flex flex-col items-center space-y-4">
              <Image
                src={user.photoURL || "/model.jpeg"}
                alt="User avatar"
                width={80}
                height={80}
                className="rounded-full border-4 border-white shadow-lg"
              />
              <div className="text-left space-y-1">
                <p>
                  <strong>Name:</strong> {user.displayName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phoneNumber || "Not provided"}
                </p>
              </div>
              {/* ✅ Sign Out button with icon */}
              <div className="flex gap-3">
                <button
                  onClick={handleSignOut}
                  disabled={actionLoading}
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                >
                  <FaSignOutAlt className="text-lg" />
                  Sign Out
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={actionLoading}
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                >
                  <FaTrashAlt className="text-lg" />
                  {actionLoading ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
