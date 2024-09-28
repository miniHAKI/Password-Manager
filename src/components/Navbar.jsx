import React from 'react'

const Navbar = () => {
    return (
        <nav className='text-white '>
            <div className='flex justify-between h-14 items-center py-5 my-container'>

            <div className='logo text-2xl font-bold'>
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
                </div>
            {/* <ul>
                <li className='flex gap-4'>
                    <a className='hover:font-medium' href="/">Home</a>
                    <a className='hover:font-medium' href="#">About</a>
                    <a className='hover:font-medium' href="#">Contact us</a>
                </li>
            </ul> */}
            <button className='text-white ring-white ring-1 px-2 bg-green-600 my-5 flex justify-between items-center rounded-lg'>
                <img className='invert w-6 py-1' src="/icons/github.svg" alt="" />
                <span className='font-normal px-2'>GitHub</span>
            </button>
            </div>
        </nav>
    )
}

export default Navbar
