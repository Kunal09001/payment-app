'use client'
import { TextInput } from "@repo/ui/TextInput";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import p2ptransfer from "../app/lib/actions/p2ptransfer";

export default function SendCard () : JSX.Element {

    const [number,setNumber] = useState("");
    const [amount,setAmount] = useState("");

    return (
        <div className="flex justify-center h-screen items-center">
                <Card title="Send">
                    <TextInput placeholder="1111111111" label="Number" onChange={(e) => {setNumber(e)}} />
                    <TextInput placeholder="123123" label="Amount" onChange={(e) => {setAmount(e)}} />
                    <div className="flex justify-center">
                        <Button onClick={async () => {
                            const response = await p2ptransfer({
                                phNumber : number,
                                amount : Number(amount) * 100
                            })
                            window.alert(response.message);
                        }}>Send</Button>
                    </div>
                </Card>
        </div>
    )
}