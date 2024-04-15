'use server';
import { PrismaClient } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function createOnRampTransactions(amount : number , bank : string){

    const session = await getServerSession(authOptions);
    const date = new Date();
    const prisma = new PrismaClient();
    const token = (Math.random() * 1000).toString()

    if (!session.user.id){
        return {
            message : 'User not logged int'
        }
    }

    const addOnRampTransaction = await prisma.onRampTransaction.create({
        data : {
            status : 'Processing',
            token : token,
            provider : bank,   
            amount : amount*100,
            startTime : date,
            userId : Number(session?.user?.id)
        }
    })

    if(addOnRampTransaction){
        return {
            message : 'Success'
        }
    }
        return {
            message  : 'Failure'
        }
}