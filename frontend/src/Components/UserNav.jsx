import React, {Fragment} from 'react'
import { Menu, Transition } from '@headlessui/react';
import { getColor, createImageFromInitials } from './Utils/Utils.js';
import { useAuth } from '../AuthContextProvider.jsx';
import secureLocalStorage from 'react-secure-storage';

const UserNav = () => {
    const { userData } = useAuth();
    function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}
    const logout = () => {
		secureLocalStorage.clear();
		window.open('http://localhost:5000/auth/logout', '_self');
	};
    return (
        <div>
            <Menu as='div' className='user relative ml-4'>
                <div>
                    <Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                        <img id='preview' src={createImageFromInitials(60, userData.firstName + " " + userData.lastName, getColor())} alt='profile-pic' className='rounded-full w-12 h-12' />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <Menu.Items className='absolute right-0 z-99999 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <Menu.Item>
                        {({ active }) => (
                        <a href='/' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                            Student
                        </a>
                        )}
                    </Menu.Item>
                    <hr/>
                    <Menu.Item>
                        {({ active }) => (
                        <a
                            href='/home/my-courses/learning'
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                            My learning
                        </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                        <a
                            href='/home/my-courses/wishlist'
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                            Wishlist
                        </a>
                        )}
                    </Menu.Item>
                    <hr />
                    <Menu.Item>
                        {({ active }) => (
                        <a href='/user/edit-profile' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                            Edit profile
                        </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                        <a href='/user/account-settings' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                            Account settings
                        </a>
                        )}
                    </Menu.Item>
                    <hr />
                    <Menu.Item>
                        {({ active }) => (
                        <button
                            onClick={logout}
                            className={classNames(active ? 'bg-gray-100 w-full text-left' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                            Logout
                        </button>
                        )}
                    </Menu.Item>
                    <hr />
                    <div className='flex flex-row justify-between'>
                        <a href='/about-us' className={classNames('px-4 py-2 text-xs text-gray-600')}>
                        About Udemy
                        </a>
                        <a href='/help' className={classNames('px-4 py-2 text-xs text-gray-600')}>
                        Help
                        </a>
                    </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default UserNav