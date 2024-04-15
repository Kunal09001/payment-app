


import  CredentialsProvider  from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import  { PrismaClient } from '@repo/db/client'

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : 'Credentials',
            credentials : {
                phone : {label : 'Phone Number', type : 'text', placeholder : '123123123'},
                password : {label : 'Password', type : 'password'}
            },
            // TODO : User Credentials type for next-auth
            async authorize(credentials : any){

                const client = new PrismaClient
                // TODO : Add zod validation , OTP validation here
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await client.user.findFirst({
                    where : {
                        number : credentials.phone
                    }
                })

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(hashedPassword,existingUser.password)
                    if(passwordValidation){
                        return {
                            id : existingUser.id.toString(),
                            name : existingUser.name,
                            email : existingUser.email,

                    }
                    }
                    return null
                }
                try {
                    const user = await client.user.create({
                        data : {
                        number : credentials.phone,
                        password : hashedPassword
                        }
                    })

                    return {
                        id : user.id.toString(),
                        email : user.email,
                        name : user.name
                    }

            }catch(e){
                console.log(e)
            }
                return null
            },
        })
    ],
    secret : process.env.JWT_SECRET || 'secret',
    callbacks : {
        //TODO : can you fix type here, using any is bad
        async session({token,session} : any){
            session.user.id = token.sub

            return session
        } 
    }
}