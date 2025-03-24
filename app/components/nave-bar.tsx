'use client';
import Link from "next/link";
import React from "react";

export default function Nave() {
    const token =  localStorage.getItem('token')
    console.log(token)

    const hnadleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

  return (
    <nav className="w-full fixed top-0 items-center flex p-5 bg-lime-200 justify-between ">
      <h1>logo</h1>

      <div className="flex items-center gap-5">
      {!token ? (
        <>
        <Link href="/login"> Login</Link>
        <Link href="/register"> Register</Link>
        </>
      ) :(
        <>
        <Link href='/profile'>Profile</Link>
        <Link href='/' onClick={hnadleLogout} >Log out</Link>
        </>
      ) }
      </div>
    </nav>
  );
}
