import React from 'react'

export default function Header({ heading }) {
  return (
    <div className="flex justify-left items-center bg-base-300 p-3">
        <h1 className='font-bold text-xl' >{heading}</h1>
    </div>
  )
}
