'use client';
import React, { useEffect, useState } from 'react'
import styles from "../../styles/Signup.module.scss"
import { Button, Input } from 'semantic-ui-react';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/navigation';

export default function page() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [major, setMajor] = useState('');
    const [secondMajor, setSecondMajor] = useState('');
    const [minor, setMinor] = useState('');
    const [classes, setClasses] = useState('');
    const [password, setPassword] = useState('');
    const { data, loading, error, fetchData } = useFetch(
        "/users/register",
        "POST"
    );

    useEffect(() => {
        if (data) {
            router.push('/home')
        }
    }, [data])
    console.log("classes.split(',')", classes.split(','))
    return (
        <div className={`w-full h-screen flex justify-center items-center ${styles.background}`}>
            <div className={styles.formWrapper}>
                <Input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder='major' value={major} onChange={(e) => setMajor(e.target.value)} />
                <Input placeholder='second major' value={secondMajor} onChange={(e) => setSecondMajor(e.target.value)} />
                <Input placeholder='minor' value={minor} onChange={(e) => setMinor(e.target.value)} />
                <Input placeholder='classes' value={classes} onChange={(e) => setClasses(e.target.value)} />
                <Input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button secondary onClick={() => {
                    fetchData({ name, email, major, second_major: secondMajor, minor, classes: classes.split(','), password })

                }} >
                    Signup
                </Button>
            </div>
        </div>
    )
}
