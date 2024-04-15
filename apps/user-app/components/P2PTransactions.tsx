import { Card } from "@repo/ui/card";

interface transactionsInterface {
    type : string,
    amount : number | undefined,
    timestamp : Date | undefined
}





export default function P2PTransactions({transactions}: {transactions : transactionsInterface[]}) : JSX.Element {

    console.log(transactions)
    if(transactions.length == 0){
        return (
            <div className="flex flex-col items-center h-screen justify-center">
                <Card title="Recent Transactions">
                    No Recent Transactions
                </Card>
            </div>
        )
    }


    return(
        <div className="flex flex-col items-center h-screen justify-center">
            <Card title="Recent Transactions">
                <div className="flex-col ">
                    {transactions.map((t,index) => {
                        return (
                            <div className="flex justify-between w-[21.875rem]" key={index}>
                                <div className="flex flex-col items-start justify-center">
                                    <div className="text-sm">{t.type} INR</div>
                                    <div className="text-slate-600 text-xs">{t.timestamp?.toDateString()}</div> 
                                </div>
                                <div className="p-2">
                                    {t.type == 'Recieved' ? '-' : '+'} RS {(t.amount ?? 0) / 100}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>
        </div>
    )
}