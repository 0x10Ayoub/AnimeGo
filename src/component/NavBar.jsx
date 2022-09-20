import React from 'react';

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    return (
        <nav className="flex p-2 justify-around font-medium">
            <div className='flex items-center'>
                <a href='#id' className='bold block font-large'>AnimeGO</a>
            </div>
            <div className='flex'>
                <ul className="w-full flex list-none flex-grow-2 justify-around items-center ">
                    <li>Home</li>
                    <li>News</li>
                    <li>Categories</li>
                </ul>
            </div>
            <div>
                <form>
                    <label html-for="search" className="text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search" id="search" className="block p-2.5 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                    </div>
                </form>
            </div>
            <div className="flex justify-around">
                <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Sign Up</button>
                <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Sign in</button>
            </div>
        </nav>
    )
}
