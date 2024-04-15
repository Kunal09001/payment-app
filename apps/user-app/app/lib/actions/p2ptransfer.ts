"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { Prisma, PrismaClient } from "@repo/db/client";

export default async function p2ptransfer({phNumber, amount} : {
    phNumber : string,
    amount : number
}){

    const session = await getServerSession(authOptions);
    const prisma = new PrismaClient();

    const getUserId = await prisma.user.findFirst({
        where : {
            number : phNumber
        },select : {
            id : true
        }
    })

    if(!getUserId){
        return({
            message : "No User Id Found of this Number"
        })
    }

    await prisma.$transaction(async (tx) => {

        // Avoiding Multiple Updates by using Locking (Select for Update)
        const query = Prisma.sql`Select * from "Balance" where "userId" = ${Number(session.user.id)} FOR UPDATE`
        await tx.$queryRaw(query);

        const senderBalance = await tx.balance.findFirst({
            where : {
                userId : Number(session.user.id)
            },select : {
                amount : true
            }
        });
        if(!senderBalance || senderBalance.amount < amount){
            throw new Error("Insufficient Funds for doing Transactions")
        }
        
        await tx.balance.update(
            {
                where : {
                    userId : Number(session.user.id)
                },
                data : {
                    amount : {
                        decrement : amount
                    }
                }
            }
        ),
        await tx.balance.update(
            {
                where : {
                    userId : getUserId.id
                },
                data : {
                    amount : {
                        increment : amount
                    }
                }
            }
        )
        await tx.p2PTransaction.create({
            data : {
                timestamp : new Date(),
                fromUserId : Number(session.user.id),
                toUserId : getUserId.id,
                amount : amount,

            }
        })

    })

    return({
        message : "Successfully Completed"
    })
            
}