import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

import { connectDB } from "./src/lib/db";
import { UserModel } from "./src/models/user.model";



export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google, GitHub, Credentials({
      authorize: async (credentials) => {
        try {
          // get form input values
          const {email, password} = credentials;
          if(!email || !password) return null;                 // throw new Error('All fields are required.')
  
          // connectDB
          await connectDB();
          const user = await UserModel.findOne({email});
          if(!user) return null;                               // throw new Error('Incorrect credentials.');
  
          // check password
          if(user.password !== password) return null;          // throw new Error('Incorrect credentials.')
  
          // Return user object (NextAuth will store in session)
          return { 
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
          } 
        } catch(e) {
          console.log(e);
          return null;
        }
      }
    })],
    session: { strategy: "jwt", maxAge: 7*24*60*60 },                  // 7 days
    callbacks: {
      async signIn({user, account}) {
        try {
          // connectDB
          await connectDB();
  
          // check if user exists OR create User
          const existingUser = await UserModel.findOne({email: user.email});
          if(!existingUser) {
            await UserModel.create({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account?.provider
            });
          }
  
          return true;
        } catch(e) {
          console.log(e);
          return false;
        }
      }
    },
    pages: {
      signIn: '/login',   // our custom login page
    }
})