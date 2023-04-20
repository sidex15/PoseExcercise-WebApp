import React, { useState } from 'react';
import * as hiIcons from "react-icons/hi";
import * as vscIcons from "react-icons/vsc";
import { RiHomeLine } from "react-icons/ri";
import { GiBiceps } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { RiFileUserLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useRouter } from "next/router";

const Navbar = ({callback}) => {
    const router = useRouter();

    const [open, setOpen] = useState(false)

    const hamburger = () => {
        setOpen(!open)
        callback(!open)
    }

    const Menus = [
        { title: "Dashboard", icon: <RiHomeLine size='30px' color='white' />, path: "Dashboard", pathname: "/Dashboard"},
        { title: "Workout Session", icon: <GiBiceps size='30px' color='white' />, path: "Session", pathname: "workout-session"},
        { title: "Exercise Records", icon: <TbReportSearch size='30px' color='white' />, path: "Exer_records", pathname: "/exercise-records"},
        { title: "Student Records", icon: <RiFileUserLine size='30px' color='white' />, path: "Stud_records", pathname: "/student-records"},
        { title: "Profile", icon: <IoSettingsOutline size='30px' color='white'/>, path: "profile", gap: true},
    ]

    return <div>
        
        {/* SIDEBAR */}
        <div className={`${open ? 'w-52' : 'w-14'} flex h-screen duration-300 bg-cyan-blue pt-32S fixed`}>
            <ul className='pt-32'>
                {Menus.map((menu, index) => (
                    <li key={index} className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-3 hover:bg-light-white rounded-md  ${menu.gap ? "absolute inset-x-0 bottom-0" : "mt-2"}`} onClick={() => router.push(menu.path,menu.pathname)}>
                        {menu.icon}
                        <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                    </li>
                ))}
            </ul>
        </div>
        {/* TOPBAR */}
        <div className='fixed'>
            <div className='relative w-screen'>
                <nav className="md:flex md:items-center md:justify-between flex-wrap bg-cyan-blue">
                    <div className='p-3'>
                        <hiIcons.HiMenu size="30px" color="white" onClick={hamburger}/>
                    </div>
                    <div className='text-white text-sm flex items-center gap-x-2 cursor-pointer p-3 hover:bg-light-white rounded-md mr-4' onClick={() => router.push('/')}>
                        <RiLogoutBoxRLine size="28px" color="white"/>
                        <span>Logout</span>
                    </div>
                </nav>
            </div>
        </div>
    </div>
}

export default Navbar