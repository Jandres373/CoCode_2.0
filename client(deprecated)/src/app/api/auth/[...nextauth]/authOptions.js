import CredentialsProvider from 'next-auth/providers/credentials'
import API from '../../../../axios/axios'
import {User} from '../../../../entity/user.entity'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const res = await API.post('/auth/login', {
          email: credentials?.email,
          password: credentials?.password,
          rememberMe: credentials?.rememberMe,
        })
       
        const response = API.assignToken(res.data.token)
        if (response.fail) throw response
        const { user, token } = await API.getUserData()

        return { user, token }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      console.log(auth)
      return true
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/user',
    signOut: '/',
    error: '/',
  },
}

export default authOptions
