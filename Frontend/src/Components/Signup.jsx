import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.form?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password
        };
        await axios.post("http://localhost:5001/user/signup", userInfo).then((res) => {
            console.log(res.data);
            if (res.data) {
                // alert("Signup successfull");
                toast.success("Signup successfull");
                navigate(from, { replace: true });
            }
            localStorage.setItem("Users", JSON.stringify(res.data.user));//localstorage me data ko store kra rhe h taaki baad me use kr paye
        }).catch((err) => {
            if (err.response) {
                console.log(err);
                // alert("Error:"+ err.response.data.message );
                toast.error("Error: " + err.response.data.message);
            }
        });
    };

    return (
        <div className='flex h-screen items-center justify-center bg-white'>
            <div className='w-[600px]' >
                <div className='modal-box bg-white text-black'>
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        {/* If there is a button in form, it will close the modal */}
                        <Link to="/">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button></Link>

                        <h3 className="font-bold text-lg">Signup</h3>

                        <div className='mt-4 space-y-2'>
                            <label className="text-black">Name</label><br />
                            <input type="text" placeholder='Enter your fullname' className='w-80 px-3 py-1 text-black bg-white border rounded-md outline-none'  {...register("fullname", { required: true })} /> <br />
                            {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>

                        <div className='mt-6 space-y-2'>
                            <label className="text-black">Email</label><br />
                            <input type="email" placeholder='Enter your Email' className='w-80 px-3 py-1 text-black bg-white border rounded-md outline-none'  {...register("email", { required: true })} /> <br />
                            {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>
                        {/* Password */}
                        <div className='mt-8 space-y-2'>
                            <label className="text-black">Password</label><br />
                            <input type="password" placeholder='Enter your Password' className='w-80 px-3 py-1 text-black bg-white border rounded-md outline-none'  {...register("password", { required: true })} /> <br />
                            {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>
                        <div className='flex mt-4 justify-around'>
                            <button className='bg-pink-500 px-4 py-1 mt-2  rounded-md text-white hover:bg-pink-700 duration-200'>Signup</button>

                            <p className='mt-4'>Have account? <button onClick={() => document.getElementById("my_modal_3").showModal()} className='underline text-blue-500 text-lg cursor-pointer'> Login</button>  <Login /></p>

                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup
