'use client';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import styles from '../../styles/Home.module.scss'
export default function page() {

    return (
        <div className="flex justify-center items-center w-full h-screen" style={{ background: "#0F0F0F" }}>

            <p className={styles.title}>Home </p>

        </div>
    )
}
