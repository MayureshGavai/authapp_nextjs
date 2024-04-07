"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
    const router = useRouter()
    const [data,setData] = useState('nothing')
    const signout = async() => {
        try {
            await axios.get('/api/users/signout')
            toast.success('Logout successful')
            router.push('/signin')
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        try{
            const res = await axios.get('api/users/me')
        console.log(res.data)
        setData(res.data.data._id)
        }catch(err:any){
            console.log(err.message )
        }
    }
  return (
    <div className='w-1/3 mx-auto mt-5 p-3 border border-white rounded-lg'>
        <h1 className="text-2xl text-center">Profile</h1>
        <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        {/* <hr /> */}
        <div className='flex justify-between'>
        <button
        onClick={signout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>
        
        </div>
    </div>
  )
}

export default page