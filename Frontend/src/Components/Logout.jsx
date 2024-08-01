import React from 'react'
import { useAuth } from './context/AuthProvider'
import toast from 'react-hot-toast'

function Logout() {
    const [authUser,setAuthUser]=useAuth()
    const handleLogout=()=>{
        try {
            setAuthUser({
                ...authUser,
                user:null
            })
            localStorage.removeItem("Users");
            toast.success("Logged-out successfully");
            setTimeout(()=>{
                window.location.reload();
                // logout hone k baad reload ho jaye

            },2000); 
            
        } catch (error) {
            toast.error("Error: "+error);    
            setTimeout(()=>{},3000);
        }
    }
  return (
    <div>
      <button className='text-white px-3 py-1 rounded-md bg-red-500'
      onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
