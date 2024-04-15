import { getServerSession } from "next-auth";
import AddMoney from "../../../components/AddMoney";
import Balance from "../../../components/Balance";
import OnRampTransaction from "../../../components/OnRampTransaction";
import { PrismaClient } from "@repo/db/client";
import { authOptions } from "../../lib/auth";

async function getBalance(){

    const session = await getServerSession(authOptions);
    const prisma = new PrismaClient();

    const balance = await prisma.balance.findFirst({
        where : {
            userId : Number(session?.user?.id)
        }
    })

    return {
        amount : balance?.amount || 0,
        locked : balance?.locked || 0
    }
}

async function getTransactions(){
    const session = await getServerSession(authOptions);
    const prisma = new PrismaClient();
    const transactions = await prisma.onRampTransaction.findMany({
        where : {
            userId : Number(session?.user?.id)
        }
    })

    return transactions.map((transaction) => ({
        time : transaction?.startTime, 
        amount : transaction?.amount,
        provider : transaction?.provider,
        status : transaction?.status
    }));
}

export default async function(){

    const balance = await getBalance();
    const transactions = await getTransactions();

    return(
        <div className="min-h-screen flex-col ">
            <div className="text-[2rem] font-bold text-[#6a51a6] p-10">
                Transfer
            </div>
            <div className="grid grid-cols-2 gap-2 ml-4 h-[5/6] pl-4">
                <div className="">
                    <AddMoney />
                </div>
                <div className="grid grid-rows-2 gap-2 w-5/6">
                    <Balance amount={balance.amount} locked={balance.locked} />
                    <OnRampTransaction transactions={transactions}/>
                </div>
            </div>
        </div>
    )
}