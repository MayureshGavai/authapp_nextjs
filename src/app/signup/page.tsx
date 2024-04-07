"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const router = useRouter();

  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success");
      router.push("/signin");
    } catch (err: any) {
      console.log("signup failed", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="w-1/3 mx-auto mt-5 p-3 border border-white rounded-lg">
      <h1 className="text-2xl text-center"> Signup </h1>
      <div className="my-4 px-4">
        <div className="flex items-center my-2">
          <label htmlFor="" className="w-1/3">
            Username
          </label>
          <input
            type="text"
            className="w-2/3 px-2 py-1 border rounded-md text-black"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />
        </div>
        <div className="flex items-center my-2">
          <label htmlFor="" className="w-1/3">
            Email
          </label>
          <input
            type="text"
            className="w-2/3 px-2 py-1 border rounded-md text-black"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
        </div>
        <div className="flex items-center my-2">
          <label htmlFor="" className="w-1/3">
            Password
          </label>
          <input
            type="password"
            className="w-2/3 px-2 py-1 border rounded-md text-black"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
        </div>
        <div className="my-3">
          <h1>Already have account? <Link href="/signin" className="underline">Signin</Link></h1>
        </div>
        <button onClick={onSignUp} className="w-full p-2 border border-white rounded-md">{buttonDisabled?"No signup":"Signup"}</button>
      </div>
    </div>
  );
};

export default Signup;
