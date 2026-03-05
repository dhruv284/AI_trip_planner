import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import { Button } from "@/components/ui/button";
const menuOptions=[
    {
        name: 'Home',
        path: '/'

    },
    {
        name: 'Pricing',
        path: '/pricing'
    },
    {
        name: 'Contact Us',
        path: '/contact-us'
    }
]
function Header() {
  return (
    <div className='flex justify-between items-center p-4'>
        <div className='flex gap-2 items-center'>
            {/* Logo */}
            <Image src={'/logo.svg'} alt="logo" width={30} height={30}></Image> 
            <h2 className='font-bold text-2xl'>AI Trip Planner</h2>
        </div>
        <div className='flex gap-5 items-center'>
            {menuOptions.map((menu,index)=>(
                <Link href={menu.path}>
                    <h2 className='text-lg hover: scale-105 transition-all hover:text-primary'>{menu.name}</h2>
                </Link>
                

            ))}
        </div>
        <Button>Get Started</Button>

    </div>
  )
}

export default Header