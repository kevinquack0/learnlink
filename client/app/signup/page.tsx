'use client';
import React, { useEffect, useState } from 'react'
import styles from "../../styles/Signup.module.scss"
import { Button, Input } from 'semantic-ui-react';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/navigation';
import { useAccount } from '@/context/AccountContext';

export default function page() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [major, setMajor] = useState('');
    const [secondMajor, setSecondMajor] = useState('');
    const [minor, setMinor] = useState('');
    const [classes, setClasses] = useState('');
    const [password, setPassword] = useState('');
    const { updateAccountId } = useAccount();
    const { data, loading, error, fetchData } = useFetch(
        "/users/register",
        "POST",
        updateAccountId
    );

    useEffect(() => {
        if (data) {
            router.push('/dashboard')
        }
    }, [data])

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <img
                    className='mx-auto max-h-[100px]'
                    src='\learnlink-logo.webp'
                    alt='Learnlink'
                />
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    Join Learnlink today!
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-8'>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                </label>
                <div className="mt-2">
                    <input
                        id="name"
                        name="name"
                        type="text" // Specify the type, e.g., text, email, etc.
                        autoComplete="name" // Helps with autofill
                        required // Makes the field mandatory
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
                        onChange={(e) => setName(e.target.value)} // Replace setUsername with your state setter
                    />
                </div>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-8'>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email" // Specify the type, e.g., text, email, etc.
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-8'>
                <label htmlFor="major" className="block text-sm font-medium leading-6 text-gray-900">
                    Major
                </label>
                <div className="mt-2">
                    <input
                        id="major"
                        name="major"
                        type="text" // Specify the type, e.g., text, email, etc.
                        autoComplete="major"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
                        onChange={(e) => setMajor(e.target.value)}
                    />
                </div>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-8'>
                <label htmlFor="secondmajor" className="block text-sm font-medium leading-6 text-gray-900">
                    Second Major (if applicable)
                </label>
                <div className="mt-2">
                    <input
                        id="secondmajor"
                        name="second major"
                        type="text" // Specify the type, e.g., text, email, etc.
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
                        onChange={(e) => setSecondMajor(e.target.value)}
                    />
                </div>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-8'>
                <label htmlFor="minor" className="block text-sm font-medium leading-6 text-gray-900">
                    Minor
                </label>
                <div className="mt-2">
                    <input
                        id="minor"
                        name="minor"
                        type="text" // Specify the type, e.g., text, email, etc.
                        autoComplete="minor"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
                        onChange={(e) => setMinor(e.target.value)}
                    />
                </div>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-8'>
                <label htmlFor="classes" className="block text-sm font-medium leading-6 text-gray-900">
                    Classes
                </label>
                <div className="mt-2">
                    <input
                        id="classes"
                        name="classes"
                        type="text" // Specify the type, e.g., text, email, etc.
                        autoComplete="classes"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
                        onChange={(e) => setClasses(e.target.value)}
                    />
                </div>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-16'>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password" // Specify the type, e.g., text, email, etc.
                        autoComplete="password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className='flex w-full justify-center mt-10 '>
                <button
                    className='w-96 rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400'
                    onClick={() => {
                        fetchData({ name, email, major, second_major: secondMajor, minor, classes: classes.split(','), password })
                    }} >
                    Signup
                </button>

            </div>




        </div>


        // <div className={`w-full h-screen flex justify-center items-center ${styles.background}`}>
        //     <div className={styles.formWrapper}>
        //         <Input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
        //         <Input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        //         <Input placeholder='major' value={major} onChange={(e) => setMajor(e.target.value)} />
        //         <Input placeholder='second major' value={secondMajor} onChange={(e) => setSecondMajor(e.target.value)} />
        //         <Input placeholder='minor' value={minor} onChange={(e) => setMinor(e.target.value)} />
        //         <Input placeholder='classes' value={classes} onChange={(e) => setClasses(e.target.value)} />
        //         <Input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        //         <Button secondary onClick={() => {
        //             fetchData({ name, email, major, second_major: secondMajor, minor, classes: classes.split(','), password })

        //         }} >
        //             Signup
        //         </Button>
        //     </div>
        // </div>
    )
}
