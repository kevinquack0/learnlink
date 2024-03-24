'use client'

import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon } from "@heroicons/react/16/solid";
import { Fragment, useEffect, useState } from "react";
import { Icon } from 'semantic-ui-react'
import { useAccount } from "@/context/AccountContext";
import EventForm from "@/components/EventForm";

const navigationStart = [
    { name: 'My Sessions', selected: true },
    { name: 'Find Sessions' },
    { name: 'Create Session' },
]

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
const mockData = [
    { title: "Study Session 1", subtitle: "Introduction to Programming", tags: ["CPSC 101", "CPSC 102"] },
    { title: "Study Session 2", subtitle: "Data Structures", tags: ["CPSC 201", "CPSC 202"] },
    { title: "Study Session 3", subtitle: "Algorithms", tags: ["CPSC 301", "CPSC 302"] },
    { title: "Study Session 4", subtitle: "Operating Systems", tags: ["CPSC 401", "CPSC 402"] },
    { title: "Study Session 5", subtitle: "Computer Networks", tags: ["CPSC 501", "CPSC 502"] },
    { title: "Study Session 6", subtitle: "Database Systems", tags: ["CPSC 601", "CPSC 602"] },
    { title: "Study Session 7", subtitle: "Software Engineering", tags: ["CPSC 701", "CPSC 702"] },
    { title: "Study Session 8", subtitle: "Artificial Intelligence", tags: ["CPSC 801", "CPSC 802"] },
    { title: "Study Session 9", subtitle: "Machine Learning", tags: ["CPSC 901", "CPSC 902"] },
    { title: "Study Session 10", subtitle: "Cloud Computing", tags: ["CPSC 1001", "CPSC 1002"] },
];
const Card = (title: string, subtitle: string, tags: string[]) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-2">

            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    {subtitle}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                {tags && tags.map((tag) => (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
                ))}


            </div>
        </div>
    );
}
export default function Dashboard() {
    const [navigation, setNavigation] = useState(navigationStart)
    const { accountId } = useAccount();
    const { data, loading, error, fetchData } = useFetch(
        "/sessions/getAll",
        "POST"
    );

    useEffect(() => {
        if (accountId) {
            fetchData({ student_id: accountId })
        }

    }, [accountId])

    const renderContent = () => {
        if (navigation[0].selected) {
            return (
                <p>
                    {!data ? "No Sessions yet" : ''}
                </p>
            )

        } else if (navigation[1].selected) {
            return (
                <div className="grid grid-cols-3 gap-4">
                    {mockData.map((session) => (
                        Card(session.title, session.subtitle, session.tags)
                    ))}
                </div>
            )
        } else if (navigation[2].selected) {

            return (
                <EventForm />
            )
        }

    }

    const router = useRouter();

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-700">
                {({ open }) => (
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
                                        <div className="ml-10 flex items-baseline space-x-4 ">
                                            {navigation.map((item) => (
                                                <p
                                                    key={item.name}
                                                    onClick={() => { setNavigation(navigation.map((navItem) => ({ ...navItem, selected: navItem.name === item.name }))) }}
                                                    className={classNames(
                                                        item.selected
                                                            ? 'bg-gray-900 text-white cursor-pointer  m-[0px]'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer m-[0px]', 'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                    aria-current={item.selected ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </p>
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
                                            <BellIcon className="h-6 w-6" aria-hidden='true' />
                                        </button>

                                        {/* Profile dropdown  */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-8 w-8 rounded-full" src="" alt="" /> {/* Need to add image source here */}
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
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) =>
                                                                item.name == 'Sign out' ? (
                                                                    <button
                                                                        onClick={() => (
                                                                            router.push('/home')
                                                                        )}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700 w-full text-left'
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

                    {renderContent()}

                </div>
            </main>

        </div>


    )


}