'use client'
import React from "react";

const Navbar = () => {
    return (
        <div className="w-full h-[80px] bg-white border-b">
            <div className="max-w-[1480px] m-auto w-full h-full flex justify-between items-center">
                <p className="h-auto">LEARNLINK</p>


                <div className="flex items-center gap-2">
                    <button className="flex justify-between items-center bg-transparent px-6 gap-2">
                        <img src="" />
                        Login
                    </button>
                    <button className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400">
                        Sign up today!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar