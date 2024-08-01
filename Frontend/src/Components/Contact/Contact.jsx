import React from 'react'
import Navbar from '../Navbar'
import Contacts from '../Contacts'

const Contact = () => {
  return (
    
    <div className='flex h-screen items-center justify-center'>
      <div><Navbar /></div>
      
      <div className=' bg-gray-300 mt-20 rounded-md px-[100px] py-8 flex items-center justify-center border-[5px] border-pink-500 '>
       <div>
       <Contacts/>
       </div>
      </div>
    
    </div>
  )
}

export default Contact
