'use client'
import React from "react"
import Image from 'next/image'
import { useRouter } from "next/navigation";

const CTA = () => {
    const router = useRouter();
    return (
        <div className="w-full bg-white py-16">
            <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px] items-center md:px-0">
                <Image className='rounded-lg'src="/background-students.jpg" alt="Students" width={500} height={500} />
                <div>
                    <h1 className="py-2 text-3xl font-semibold">Join learnlink today!</h1>
                    <p className="py-2 text-lg text-gray-600">Start learning by registering for free</p>
                    <button className="max-[780px]:w-full my-4 px-8 py-5 rounded-md bg-blue-400 text-black font-bold" onClick={() => router.push('/signup')}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default CTA