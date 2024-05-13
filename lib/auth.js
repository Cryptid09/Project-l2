
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils"; 
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";


const login = async (credentials) => {
  
};

export default NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
      
        await connectToDb();
        
     
        const user = await User.findOne({ email: credentials.email });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user;
        } else {
          return null;
        }
      },
    }),
    
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
     
      return true;
    },
   
    ...authConfig.callbacks,
  },
  
});
