
import express from 'express';
import {PrismaClient} from '@repo/db/client';

const app = express()
const prisma = new PrismaClient();

app.use(express.json())

app.post("/", async (req,res) => {

    // TODO : Add ZOD Validation Here

    const paymentInformation = {
        token : req.body.token,
        userId : req.body.user_identifer,
        amount : req.body.amount
    }
    console.log(paymentInformation)

    // TODO : Add Transactions Here
    // TODO : Only increase balance if the request is processing (onRamp) else we can just keep sending requests 

    try {

        await prisma.$transaction(
            [
            prisma.balance.update(
            {
                where : {
                    userId : paymentInformation.userId
                },
                data : {
                    amount : {
                        increment : paymentInformation.amount
                    }             
                }
            }
        )
        ,
            prisma.onRampTransaction.update({
            where : {
                token : paymentInformation.token
            },data : {
                status : "Success"
            }
        })
    ]
        )
        res.status(200).json({
            message : "Captured"
        })
    }catch(error){
        console.log(error)
        res.status(411).json({
            message : "There was an error while doing transaction"
        })
    }

})

app.listen(3003)