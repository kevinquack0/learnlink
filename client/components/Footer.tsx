'use client'

import React from 'react'
import {FaFacebookF,FaLinkedinIn,FaInstagram,FaBehance} from 'react-icons/fa'
import Image from 'next/image'


const Footer = () => {
    return(
        <div className='w-full bg-white py-24'>
            <div className='md:max-w-[1480px] m-auto grid md:grid-cols-5 max-[780px]:grid-cols-2 gap-8 max-w-[600px] px-4 md:px-0'> 
            
                <div className='col-span-2'>
                    <p className="h-[0px] font-semibold hover:font-bold text-4xl">LEARNLINK</p>
                    <h3 className='text-2xl font-semibold mt-10 italic'>Contact Us</h3>
                    <h3 className='py-2 text-[#6D737A]'>Call : +587 894-2711</h3>
                    <h3 className='py-2 text-[#6D737A]'>Reach out to our other platforms!<br></br>Have fun.</h3>
                    <h3 className='py-2 text-[#363A3D]'>Email: learnlink@ucalgary.ca</h3>
                    <div className='flex gap-4 py-4'>
                            <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaFacebookF size={25} style={{color:'#66bfff'}} /></div>
                            <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaLinkedinIn size={25} style={{color:'#66bfff'}} /></div>
                            <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaInstagram size={25} style={{color:'#66bfff'}} /></div>
                            <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaBehance size={25} style={{color:'#66bfff'}} /></div>
                    </div>
                </div>

                <div>
                    <Image className='rounded-lg'src="/learnlink-logo.png" alt="Students" width={500} height={500} /> 


                </div>

                <div className='max-[780px]:col-span-2'>
                    <h1 className="py-2 text-3xl font-semibold">Newsletter</h1>
                    <p className="py-2 text-lg text-gray-600">Subscribe to our newsletter for updates and upcoming events!</p>
                    <form className='py-4'>
                        <input
                            className='bg-[#F2F3F4] p-4 w-full rounded'
                            placeholder='Email here'
                        />
                        <button className='max-[780px]:w-full my-4 px-5 py-3 rounded-md bg-blue-400 text-black font-bold'>Subscribe now! </button>
                    </form>
                </div>

                
            
            </div>
        
        </div>
    
    )
}

export default Footer