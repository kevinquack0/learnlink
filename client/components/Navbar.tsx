'use client'
import React from "react";
import { useRouter } from "next/navigation";


const Navbar = () => {
    const router = useRouter();

    return (
        <div className="w-full h-[80px] bg-white border-b z-10">
            <div className="max-w-[1480px] m-auto w-full h-full flex justify-between items-center z-10">
                <p className="h-[0px] font-semibold hover:font-bold text-4xl">LEARNLINK</p>

                <div className="flex items-center gap-x-5">
                    <button className="flex justify-between items-center rounded-md bg-transparent px-6 gap-2"
                    onClick={() => router.push('/login')}>
                        <img src="/padlock.png"  style={{ width: '20px', height: '25px', objectFit: 'contain' }} />
                        Login
                    </button>
                    <button className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                    onClick={() => router.push('/signup')}>
                        Sign up today!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar