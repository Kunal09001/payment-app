import SideBarItem from "./SideBarItem";
import styles from "./SideBar.module.css"

const SideBarItems = [
    {
        href : '/dashboard',
        title : 'Home',
        icon : 'home.svg'
    },
    {
        href : '/transfer',
        title : 'Transfer',
        icon : 'Transfer.svg'
    },
    {
        href : '/transactions',
        title : 'Transaction',
        icon : 'transactions.svg'
    },{
        href : '/p2ptransaction',
        title : 'P2P Transactions',
        icon : 'pvp.svg'
    }
]

export default function SideBar () {
    return (
        <div className="flex flex-col justify-center p-5 pt-[100px]">
            {SideBarItems.map((item,index) => {
                return (
                    <SideBarItem href={item.href} title={item.title} icon={item.icon} key={index} />
                )
            })}
        </div>
    )
}