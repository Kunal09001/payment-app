'use client'
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

interface SideBarInterface {
    href : string,
    title : string,
    icon : string
}


export default function SideBarItem ({href,title,icon} : SideBarInterface){

    const router = useRouter();
    const pathname = usePathname();
    const isSelected = pathname === href

    return (
        <div className={`p-2 pl-5 flex justify-start cursor-pointer hover:border-b-2 hover:border-slate-500 delay-200 ${isSelected ? 'text-[#6a51a6]' : 'text-slate-500' }`} onClick={() => {
        router.push(href)
        }}>
            <div className="pr-2">
            <Image src={icon} alt="image" width={20} height={20}  />
            </div>
            <div className={`${isSelected ? 'text-[#6a51a6]' : 'text-slate-500'} font-bold`}>
                {title}
            </div>
        </div>
    )
}