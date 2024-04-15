'use client'
import { TextInput } from "@repo/ui/TextInput";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useRouter } from "next/navigation";
import {useState} from "react"; 
import createOnRampTransactions from "../app/lib/actions/createOnRampTransactions";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export default function AddMoney() : JSX.Element{
    const router = useRouter();
    const [amount,setAmount] = useState(0)
    const [bank,setBank] = useState(SUPPORTED_BANKS[0]?.name)
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);

    return (
        <div>
            <Card title="Add Money">
                <TextInput label="Amount" onChange={(e) => {
                    setAmount(Number(e))
                }} placeholder="Amount" />
                <div>
                    Bank
                </div>
                <Select onSelect={(value) => {
                    setBank(SUPPORTED_BANKS.find(x => x.name == value)?.name);
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name == value)?.redirectUrl || "")
                }} options={SUPPORTED_BANKS.map((value) => ({
                 key : value.name,
                 value : value.name   
                }))} />

                <div className="flex flex-col justify-center items-center pt-2">
                    <Button onClick={async () => {
                        await createOnRampTransactions(amount, bank || "" );
                        window.location.href = redirectUrl || "";
                    }}>
                        Add Money
                    </Button>
                </div>
            </Card>
        </div>
    )
}