"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface User {
    email:string,
    password : string
}

const page = () => {
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
    });
  
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const onSignIn = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/signin", user);
        console.log("Signin success");
        router.push("/profile");
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
        user.password.length > 0
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [user]);

  return (
    <div className="w-1/3 mx-auto mt-5 p-3 border border-white rounded-lg">
      <h1 className="text-2xl text-center">{loading ? "Processing" : "Signin"} </h1>
      <div className="my-4 px-4">
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
          <h1>Don't have account? <Link href="/signup" className="underline">Signup</Link></h1>
        </div>
        <button onClick={onSignIn} className="w-full p-2 border border-white rounded-md">{buttonDisabled?"No signin":"Signin"}</button>
      </div>
    </div>
  )
}

export default page