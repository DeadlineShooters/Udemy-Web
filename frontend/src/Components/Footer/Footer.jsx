import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css'
import { IconWorld } from '@tabler/icons-react';

const logo_light = 'https://res.cloudinary.com/dqxtf297o/image/upload/v1713627289/Logo_light.png';

const Footer = () => {
  return (
    <div className='flex w-full max-h-sm bg-[#2D2F31]'>
        <div className='flex w-full flex-col mx-10 mt-12'>
            <div className='general flex flex-row justify-between'>
                <div className='detail flex flex-row'>
                    <div className='flex flex-col mb-10'>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Udemy Business</p>
                        </Link>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Teach on Udemy</p>
                        </Link>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Get the app</p>
                        </Link>
                        <Link>
                            <p className='text-white hover:underline mb-2'>About us</p>
                        </Link>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Contact us</p>
                        </Link>
                    </div>
                    <div className='middle flex flex-col mb-10 mx-44'>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Careers</p>
                        </Link>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Blog</p>
                        </Link>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Help and Support</p>
                        </Link>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Affiliate</p>
                        </Link>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Investors</p>
                        </Link>
                    </div>
                    <div className='flex flex-col mb-10'>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Terms</p>
                        </Link>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Privacy policy</p>
                        </Link>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Cookie settings</p>
                        </Link>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Sitemap</p>
                        </Link>
                        <Link>
                            <p className='text-white hover:underline mb-2'>Accessibility statement</p>
                        </Link>
                    </div>
                </div>
                <div>
                    <button className="language flex flex-row border border-white px-5 py-2 rounded-md">
                        <IconWorld stroke={2} color="white" />
                        <p className='text-white ml-2'>English</p>
                    </button>
                </div>
            </div>
            <div className='flex flex-row w-full justify-between items-end mb-10 '>
                <Link to='/'>
                    <img src={logo_light} alt='' className='w-24'></img>
                </Link>
                <div className='text-white'>
                    © 2024 Udemy, Inc.
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer