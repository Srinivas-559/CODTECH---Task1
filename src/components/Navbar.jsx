import React from 'react'

function Navbar() {
    return (
        <nav className="flex justify-between bg-violet-800 text-white py-3">
            <div className="logo ">
                <span className="font-bold mx-9 ">iTask</span>

            </div>
            <ul className="flex gap-8 mx-9">
                <li className=' cursor-pointer hover:font-bold transition-all duration-100'>Home  </li>
                <li className='cursor-pointer hover:font-bold transition-all duration-100'>Your Tasks</li>
            </ul>

        </nav>
    )
}

export default Navbar