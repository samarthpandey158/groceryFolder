import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import User from "./models/user.model";
import bcrypt from "bcrypt";
import Google from "next-auth/providers/google";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        name:"Credentials",
        credentials:{
            email:{label:"email",type:"email",placeholder:"eamil"},
            password:{label:"password",type:"password",placeholder:"password"},
        },

        async authorize(credentials)
        {
            await connectDb();
            const password = credentials.password as string;
            const email = credentials.email;
            const user = await User.findOne({email})
            if(!user)
            {
                throw new Error("User don't exists")
            }
            const checkpass = await bcrypt.compare(password,user.password)
            if(!checkpass)
            {
                throw new Error("invalid password")
            }

            return {
                id : user._id.toString(),
                name:user.name,
                email:user.email,
                role:user.role
            }            
        }
    }),
    Google({
        clientId     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks:{
    async signIn({user,account})
    {
        if(account?.provider == "google")
        {
            await connectDb();
            let dbUser = await User.findOne({email:user.email})
            if(!dbUser)
            {
               dbUser = await User.create({
                    name:user.name,
                    email:user.email,
                    image:user.image
                })
            }
            user.id = dbUser._id.toString(),
            user.role = dbUser.role
        }
        return true;
    },
    jwt({token,user,trigger,session})
    {
        if(user)
        {
            token.id = user.id,
            token.name = user.name,
            token.email = user.email,
            token.role = user.role
        }
        if(trigger=="update")
        {
            token.role = session.role
        }
        return token;
    },
    session({session,token})
    {
        if(session.user)
        {
            session.user.id = token.id as string,
            session.user.name = token.name as string,
            session.user.email = token.email as string,
            session.user.role = token.role as string
        }

        return session;
    }
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge: 10*24*60*60
  },
  secret:process.env.AUTH_SECRET
})