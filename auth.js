import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import userData from './dummy.json';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  session: { strategy: 'jwt' },

  providers: [

    CredentialsProvider({

      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {

        const email = credentials.email;
        const password = credentials.password;

        for (var index in userData.users) {

          let record = userData.users[index];
          var user = {}
          var flag=false;

          if(record.email==email) {
            if(record.password==password) {
              user = {
                id: record.id,
                email: record.email,
              }
              flag=true;
              break;
            } 
          }
        }

        if(flag) {
          return user;
        }

        // Throw an error if no user is found
        throw new Error('User not found');

      }
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // the user present here gets the same data as received
      // from DB call  made above -> fetchUserInfo(credentials.opt)
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      // user param present in the session(function) does not recive 
      //all the data from DB call -> fetchUserInfo(credentials.opt)
      return token;
    },
  },
  secret: "SECRET",
})