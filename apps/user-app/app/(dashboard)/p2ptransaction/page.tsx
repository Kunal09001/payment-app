import { getServerSession } from "next-auth";
import P2PTransactions from "../../../components/P2PTransactions";
import SendCard from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import { PrismaClient } from "@repo/db/client";

interface transactionsInterface {
    type : string,
    amount : number | undefined,
    timestamp : Date | undefined
}
async function getTransactions() : Promise<transactionsInterface[]>{

    const Transactions : transactionsInterface[] = []
    const session = await getServerSession(authOptions);
    const prisma = new PrismaClient()

    const getSentTransactions = await prisma.p2PTransaction.findMany({
        where : {
            fromUserId : Number(session.user.id)
        }
    })

    for(let i=0;i < getSentTransactions.length; i++){
        const entry = {
            amount : getSentTransactions[i]?.amount,
            type : 'Sent',
            timestamp : getSentTransactions[i]?.timestamp,
        }
        Transactions.push(entry)
    }

    const getRecievedTransactions = await prisma.p2PTransaction.findMany({
        where : {
            toUserId : Number(session.user.id)
        }
    })

    for(let i=0;i < getRecievedTransactions.length; i++){
        const entry = {
            amount : getRecievedTransactions[i]?.amount,
            type : 'Recieved',
            timestamp : getRecievedTransactions[i]?.timestamp,
        }
        Transactions.push(entry)
    }
    return Transactions

}

export default async function(){
    
    const transactions = await getTransactions();
    return (
        <div className="flex-col min-h-screen">
            <div className="text-[2rem] font-bold text-[#6a51a6] p-7">P2P Transaction Page</div>
            <div className="grid grid-cols-2 ml-4 h-[5/6] w-[5/6]">
                <div>
                <SendCard />
                </div>
                <div>
                    <P2PTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    )
}