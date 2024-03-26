"use client"
import { useEffect } from "react";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useAccount } from "@/context/AccountContext";

export default function Login() {
    const { updateAccountId } = useAccount();
    const { data, loading, error, fetchData } = useFetch(
        "/users/login",
        "POST",
        updateAccountId
    );
    
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    


    
    useEffect(() => {
        // This will be triggered when 'data' or 'error' changes.
        
        if (data && !error) {
            console.log('Redirecting to dashboard'); // Additional logging
            router.push('/dashboard'); // Adjust the route as necessary
        } else if (error) {
            console.error('Login failed', error); // Log the error state
        }
    }, [data, error, router]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log('Form submitted'); // Additional logging
        const userData = { email, password };
        fetchData(userData); // No need to await here as useEffect will handle the response
    };
    






    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto max-h-[100px]"
                    src="/learnlink-logo.webp"
                    alt="Learnlink"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}> 
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                            /> 
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a onClick={() => router.push('/')} className="font-semibold text-blue-400 hover:text-blue-500">
                                    Return to home.
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <a onClick={() => {router.push('/signup')}} className="font-semibold leading-6 text-blue-400 hover:text-blue-200">
                        Create an account now
                    </a> {/* Here would just redirect to sign in page.*/}
                </p>
            </div>
        </div>

    )
}