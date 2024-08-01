import { useEffect, useState } from 'react'
import Login from './Login'
import Logout from './Logout'
import { useAuth } from './context/AuthProvider'

const Navbar = () => {
    const [authUser] = useAuth();
    const [sticky, setSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => setSticky(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const navItems = [
        { href: "/", text: "Home" },
        { href: "/mentors", text: "Mentors" },
        { href: "/contact", text: "Contact" },
        { href: "#", text: "About" },
        { href: "/becomeMentor", text: "Become a Mentor" }
    ];

    return (
        <div className={`max-w-screen-2xl container mx-auto md:px-20 px-4 duration-100 fixed top-0 left-0 right-0 z-50 ${sticky ? "sticky-navbar shadow-md bg-base-200 duration-300 transition-all ease-in-out" : ""}`}>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems.map((item, index) => (
                                <li key={index}><a href={item.href} className='text-black hover:bg-black hover:text-white duration-200'>{item.text}</a></li>
                            ))}
                        </ul>
                    </div>
                    <a className="text-2xl text-black font-bold cursor-pointer">mentorsHub</a>
                </div>
                <div className="navbar-end space-x-3">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItems.map((item, index) => (
                                <li key={index}><a href={item.href} className='text-black hover:bg-pink-500 transition duration-500 hover:text-white'>{item.text}</a></li>
                            ))}
                        </ul>
                    </div>
                    {authUser ? <Logout /> : (
                        <div className='flex items-center'>
                            <a className="font-light bg-orange-500 text-white text-base px-3 py-1 rounded-md hover:bg-orange-600 hover:text-white duration-200 cursor-pointer" onClick={() => document.getElementById("my_modal_3").showModal()}>Login</a>
                            <Login />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
