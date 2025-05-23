"use client"

import { DarkMode } from "./darkMode"
import DropdownListMenu from "./DropdownListMenu"
import Logo from "./Logo"
import Search from "./Search"

const Navbar = () => {
  return (
    <nav>
        <div className="container flex flex-col justify-between py-8 
         sm:flex-row sm:items-center gap-4">
            {/* LOGO */}
            <Logo />
            {/* Search */}
            <Search />
            {/* Darkmode & profile */}
            <div className="flex gap-4">
                <DarkMode />
                <DropdownListMenu />
            </div>
           
        </div>
    </nav>
  )
}
export default Navbar