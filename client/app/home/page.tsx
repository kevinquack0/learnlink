'use client'
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import styles from '../../styles/Home.module.scss'
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer'

const page = () => {
    return(
        <div >
            <Navbar />
            <Hero />
            <About />
            <CTA />
            <Footer />
        </div>
    )
}

export default page
