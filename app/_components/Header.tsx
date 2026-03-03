import React from 'react'
import Image from 'next/image'
import Link from "next/link"
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
    <div>
    <div className='flex gap-2 items-center'>
        {/* Logo */}
        <Image src={'/logo.svg'} alt="logo" width={30} height={30}></Image> 
        <h2 className='font-bold text-2xl'>AI Trip Planner</h2>
    </div>
    <div className='flex gap-5 items-center'>
        {menuOptions.map((menu,index)=>(
            <Link href={menu.path}>
                <h2>{menu.name}</h2>
            </Link>
            

        ))}
    </div>
    </div>
  )
}

export default Header