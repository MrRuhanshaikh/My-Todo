import React from 'react'
const Navbar = () => {
  return (
    <nav>
        <ul className="flex justify-between border px-8 py-2 bg-slate-100  items-center">
            <li><img className="w-12" src="favicon.ico" alt="logo" /></li>
              <div className="flex gap-6 items-center" >
                <li className=" cursor-pointer p-2 p bg-transparent rounded-lg transition-all 3s ease-in-out hover:bg-slate-300">Home</li>
                <li className=" cursor-pointer p-2 p bg-transparent rounded-lg transition-all 3s ease-in-out hover:bg-slate-300">Your Tasks</li>
              </div>
        </ul> 
    </nav>
  )
}

export default Navbar
