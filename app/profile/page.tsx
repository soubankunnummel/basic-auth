"use client";
import { Spinner } from "@/components/ui/spinner";
import { useProfile } from "@/hooks/useProfile";
import React from "react";

export default function Profile() {
  const respose = useProfile();

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  if (respose.isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  console.log(respose?.data?.user);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-10 border flex flex-column items-start shadow-lg rounded-xl">
        <ul>
          <li>
            {" "}
            <span className="font-bold text-xl">User Name </span>:{" "}
            {respose?.data?.user?.username}
          </li>
          <li>
            {" "}
            <span className="font-bold text-xl">Name </span>:{" "}
            {respose?.data?.user?.name}
          </li>
          <li>
            <span className="font-bold text-xl">Email </span> :{" "}
            {respose?.data?.user?.email}
          </li>
        </ul>
      </div>
    </div>
  );
}
