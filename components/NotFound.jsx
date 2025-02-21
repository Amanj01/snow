import React from 'react'

const NotFound = ({type}) => {
  return (
    <div className='flex flex-col justify-center content-center text-center h-screen w-screen items-center'>
      <h1 className='text-3xl text-red-600 mb-4'>{type} Not Found</h1>
      <p className='text-lg'>The {type} you're looking for does not exist.</p>
    </div>
  )
}

export default NotFound