"use client"


import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function Login(){
    const { data, loading, error, fetchData } = useFetch(
        "/users/register",
        "POST"
    );
    console.log("loading", loading);
    console.log("data", data);
    const router = useRouter();
    return(
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
                <form className="space-y-6" action="#" method="POST"> {/* Form declaration here, put POST method but not entirely sure */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                        </label>
                    <div className="mt-2">
                        <input 
                        id=""
                        name=""
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                        /> {/*believe this gotta compare with our DB entries*/}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="text-sm">
                            <a href="#" className="font-semiboldd text-blue-400 hover:text-blue-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input 
                        id=""
                        name=""
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
                <a href="#" className="font-semibold leading-6 text-blue-400 hover:text-blue-200">
                    Create an account now
                </a> {/* Here would just redirect to sign in page.*/}
            </p>
        </div>
    </div>    

    )
}