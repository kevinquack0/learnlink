'use client'
import React from "react";

const Hero = () => {
    return(
        <div className="w-full bg-white py-16 pb-2 bg-gradient-to-r from-white to-blue-400 z-5">
            <div className="max-w-[1480px] m-auto grid grid-cols-2">
                <div>
                    <p className="text-2xl text-blue-400 font-medium">ONE STEP CLOSER TOWARDS ACADEMIC SUCCESS!</p>
                    <h1 className="text-5xl font-semibold">Designed by students, for students. </h1>
                    <h2 className="text-4xl font-semibold"> Learnlink is the go-to platform for connecting, collaborating, and thriving in your academic journey. </h2>
                    <p className="text-lg text-gray-600">Join the community revolutionizing the way students learn and socialize</p>
                    <button></button>
                </div>

                <img className="-mt-[50px] w-[400px] z-0"src="/learnlink-logo.png" />
            </div>
        </div>
    )
}

export default Hero