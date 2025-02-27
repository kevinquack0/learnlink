'use client'

import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon } from "@heroicons/react/16/solid";
import { Fragment, useEffect, useState } from "react";
import { Icon } from 'semantic-ui-react'
import { useAccount } from "@/context/AccountContext";
import EventForm from "@/components/EventForm";
import { format } from "date-fns";


const navigationStart = [
    { name: 'My Sessions', selected: true },
    { name: 'Find Sessions' },
    { name: 'Create Session' },
]

const userNavigation = [
    { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}




interface Session {
    title: string;
    subtitle: string;
    tags: string[];
}




export default function Dashboard() {



    const [navigation, setNavigation] = useState(navigationStart)
    const { accountId } = useAccount();
    const [searchTerm, setSearchTerm] = useState('');
    // const { data, loading, error, fetchData } = useFetch(
    //     "/sessions/getById",
    //     "POST"
    // );
    const { data: sessionsData, loading, error, fetchData }: any = useFetch(
        "/sessions/getAll",
        "POST"
    );
    const { data, loading: __, error: _, fetchData: fetchById }: any = useFetch(
        "/sessions/getById",
        "POST"
    );
    console.log("data", data)
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
    const [filteredSessions, setFilteredSessions] = useState(mockData);
    // New state to manage "My Sessions"
    const [mySessions, setMySessions] = useState<Session[]>([]);

    // Function to add a session to "My Sessions"
    const addToMySessions = (sessionToAdd: Session) => {
        setMySessions(prevMySessions => {
            // Check if the session is already added to avoid duplicates
            if (prevMySessions.find(session => session.title === sessionToAdd.title)) {
                console.log('Session already added.');
                return prevMySessions;
            }
            return [...prevMySessions, sessionToAdd];
        });
    };

    // Updated Card component to include an add button
    const Card = ({ title, subtitle, tags, addSession, startDate, endDate, mine }: { title: string; subtitle: string; tags: string[]; addSession: (session: Session) => void, startDate: Date, endDate: Date, mine?: boolean }) => {


        const formattedStartDate = startDate ? format(startDate, "MMMM do, h:mma") : 'N/A';
        const formattedEndDate = endDate ? format(endDate, "h:mma") : 'N/A';
        const formattedDateRange = `${formattedStartDate}-${formattedEndDate}`;
        const alreadyAdded = !!mySessions.find(session => session.title === title);
        return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-2 relative">
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
                <div className="px-6 pt-2 pb-4">
                    <p className="text-gray-700 text-base">
                        {formattedDateRange}
                    </p>
                </div>
                <button
                    onClick={() => addSession({ title, subtitle, tags })}
                    className="absolute top-0 right-0 p-2">
                    {!alreadyAdded && !mine && <Icon name="plus" className="h-6 w-6 text-blue-500" />}
                </button>
            </div>
        );
    };

    useEffect(() => {

        if (accountId && navigation[1].selected) {
            fetchData({ student_id: accountId })
        } else if (accountId && navigation[0].selected) {
            fetchById({ student_id: accountId })
        }

    }, [accountId, navigation])
    useEffect(() => {

        if (sessionsData) {
            const results = sessionsData.filter((session: any) => {

                return session.type.toLowerCase().includes(searchTerm.toLowerCase())
            }

            );
            console.log("Results", results)
            setFilteredSessions(results);
        }

    }, [searchTerm, sessionsData, navigation]);


    const renderContent = () => {
        if (navigation[0].selected) {
            return (
                <div className="grid grid-cols-3 gap-4">
                    {data && data.length > 0 ? (
                        data.map((session: any, index: any) => (
                            <Card
                                key={index}
                                title={session.title}
                                subtitle={session.description}
                                tags={[session.type]}
                                startDate={session.start_time}
                                endDate={session.end_time}
                                addSession={addToMySessions}
                                mine={true}
                            />
                        ))
                    ) : (
                        <p>No Sessions yet</p>
                    )}
                </div>
            )


        } else if (navigation[1].selected) {
            return (
                <>
                    <div className="flex justify-center my-4">
                        <input
                            type="text"
                            placeholder="Search by course (e.g., CPSC 101)"
                            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {filteredSessions.map((session: any, index) => (
                            <Card
                                key={index}
                                title={session.title}
                                subtitle={session.description}
                                tags={[session.type]}
                                startDate={session.start_time}
                                endDate={session.end_time}
                                addSession={addToMySessions}
                            />
                        ))}
                    </div>
                </>
            );

        } else if (navigation[2].selected) {

            return (
                <EventForm setNavigation={setNavigation} />
            )
        }


    }

    const router = useRouter();

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gradient-to-r from-white to-blue-400">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-16 w-16"
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
                                                            ? 'bg-blue-600 text-white cursor-pointer  m-[0px]'
                                                            : 'text-black hover:bg-blue-600 hover:text-white cursor-pointer m-[0px]', 'rounded-md px-3 py-2 text-sm font-medium'
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
                                            className="relative rounded-full  p-1 text-white hover:text-blue-600 focus:outline-blue-600 focus:ring-2 focus:ring-blue focus: ring-offset-2 focus:ring-offset-gray-700"
                                        >
                                            <span className="absolute -inset-1.5" />

                                        </button>

                                        {/* Profile dropdown  */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="relative flex max-w-xs items-center rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>

                                                    <img className="h-8 w-8 rounded-full" src="/settings.svg" alt="" /> {/* Need to add image source here */}

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