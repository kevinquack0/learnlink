'use client'

import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon } from "@heroicons/react/16/solid";
import { Fragment } from "react";

const navigation = [
    { name: 'Dashboard', href: '#', current: true},
    { name: 'placeholder', href: '#', current: false},
    { name: 'placeholder', href: '#', current: false},
]

const userNavigation = [
    { name: 'Your Profile', href: '#'},
    { name: 'Sign out', href: '#'},
]

function classNames(...classes: string[]){
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard(){
    const { data, loading, error, fetchData } = useFetch(
        "/users/register",
        "POST"
    );
    console.log("loading", loading);
    console.log("data", data);
    const router = useRouter();

    return(
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-700">
                {({ open}) => (
                    <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-12 w-12"
                                        src="/learnlink-logo.webp"
                                        alt="Learnlink"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Notifications bell button */}
                            <div className='hidden md:block'>
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                    type="button"
                                    className="relative rounded-full bg-gray-700 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus: ring-offset-2 focus:ring-offset-gray-700"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden='true'/>
                                    </button>

                                    {/* Profile dropdown  */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700">
                                                <span className="absolute -inset-1.5"/>
                                                <span className="sr-only">Open user menu</span>
                                                <img className="h-8 w-8 rounded-full" src="" alt=""/> {/* Need to add image source here */}
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            {/* Not sure why the hover isn't working properly here for the sign out button*/}
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) =>(
                                                    <Menu.Item key={item.name}>
                                                        {({ active}) =>
                                                          item.name == 'Sign out' ? (
                                                            <button
                                                                onClick={() => (
                                                                    router.push('/home')
                                                                )}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700' 
                                                                )}
                                                            >
                                                                {item.name}
                                                            </button> 
                                                          ) : (
                                                            <a
                                                            href={item.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                )}
            </Disclosure>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-800">Dashboard</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <p>
                        test
                    </p>

                    {/*CONTENT STARTS TO BE ADDED HERE*/}                                            
                        
                </div>
            </main>

        </div>


    )


}