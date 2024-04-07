import React from 'react'

const page = ({params}:any) => {
  return (
    <div className="w-1/3 mx-auto mt-5 p-3 border border-white rounded-lg">
      <h1 className='text-center text-2xl'>{params.id}</h1>
      
    </div>
  )
}

export default page