import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loader() {
  return (
    <div className='w-[100vw] h-[100vh] bg-base-200 z-990 absolute'>
      <div className="w-full h-full flex items-center justify-center">
        <div className='bg-base-300 w-150 h-50 rounded-2xl flex items-center justify-center flex-col gap-2'>
            <Loader2 className='text-primary animate-spin'/>
            <h1 className='font-bold'>Logging In..</h1>
        </div>
      </div>
    </div>
  )
}
