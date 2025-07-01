"use client";
import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";

export default function ClerkAuthButtons() {
  const { isSignedIn } = useAuth();
  return (
    <div className="flex items-center space-x-2">
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <>
          <SignInButton mode="modal">
            <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/5">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25">
              Join IMDb
            </button>
          </SignUpButton>
        </>
      )}
    </div>
  );
}
