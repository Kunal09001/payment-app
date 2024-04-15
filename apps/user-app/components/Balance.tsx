import { Card } from "@repo/ui/card";
import Amount from "./Amount";

export default function Balance({amount, locked} : {
    amount : number,
    locked : number
}) : JSX.Element {
    return (
        <Card title="Balance">
            <div className="flex-col">
                <Amount title="Locked Balance" amount={locked / 100} />
                <Amount title="UnLocked Balance" amount={amount/ 100} />
                <Amount title="Total Balance" amount={(amount + locked) / 100} />
            </div>
        </Card>
    )
}