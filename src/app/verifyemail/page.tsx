"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [token,setToken] = useState('')
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false)

    const router = useRouter()

    const verifyEmail = async () => {
        try{
            await axios.post('api/users/verifyemail',{token})
            setVerified(true)
            setError(false)
            router.push("/signin");
        }catch(err:any){
            setError(true)
            console.log(err.response.data)
        }
    }

    useEffect(()=>{
        setError(false)
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    },[])

    useEffect(()=>{
        setError(false)
        if(token.length>0){
            verifyEmail()
        }
    },[token])

  return (
    <div className="w-1/3 mx-auto mt-5 p-3 border border-white rounded-lg">

    <h1 className="text-2xl text-center my-2">Verify Email</h1>
    <h2 className="mt-5 p-2 bg-purple-300 text-center text-black rounded-md">{token ? `${token}` : "no token"}</h2>

    {verified && (
        <div>
            <h2 className="text-2xl">Email Verified</h2>
            <Link href="/signin">
                Signin
            </Link>
        </div>
    )}
    {error && (
        <div>
            <h2 className="text-2xl bg-red-500 text-black">Error</h2>
            
        </div>
    )}
</div>
  )
}

export default page