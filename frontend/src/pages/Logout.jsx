import api from "@/api";
import { clearUser } from "@/features/userSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/logout");
        console.log(res.data);
        dispatch(clearUser());
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <div className="min-h-[80vh] max-w-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">Please Wait...</h1>
    </div>
  );
}
