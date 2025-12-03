import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '../assets/logo.png'
import { LayoutDashboardIcon, BookIcon } from "lucide-react";


const sidebarMenu = [
    {
        name: "Dashboard",
        icon: <LayoutDashboardIcon />,
        href: "/dashboard",
    },
    {
        name: "Courses",
        icon: <BookIcon />,
        href: "/courses",
    },
]

export default function Sidebar() {
    return (
        <div className="flex flex-col  w-1/5 p-6 h-100% bg-[#5955B3]"  >
         
         <Image src={logo} alt="logo" width={800} height={400} />
            <div className="flex flex-col p-10 gap-12">
                {sidebarMenu.map((menuItem :{name: string, href: string, icon: ReactElement}) => (
                    <Link
                    key={menuItem.href}
                    className="flex items-center gap-2" href={menuItem.href}>{menuItem.icon} {menuItem.name}</Link>
                ))} </div>
        </div>
    )
}