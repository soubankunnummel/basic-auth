"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Nave() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(`token----`, token);
    setToken(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/";
  };

  return (
    <nav className="w-full fixed z-50 top-0 items-center flex p-5 bg-lime-200 justify-between ">
      <h1>logo</h1>

      <div className="flex items-center gap-5">
        {!token ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <>
            <Link href="/profile">Profile</Link>
            <button onClick={handleLogout}>Log out</button>
          </>
        )}
      </div>
    </nav>
  );
}
