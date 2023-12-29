import API from '@/axios/axios.instance'
import { AuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email' },
        password: { label: 'Password' },
        rememberMe: { label: 'remember me' },
      },
      async authorize(credentials, req) {
        const { token }: { token: string } = await API.post('/auth/login', {
          email: credentials?.email,
          password: credentials?.password,
          rememberMe: credentials?.rememberMe,
        })

        API.setToken(token)

        const response = await fetch(`${process.env.BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()

        const user = { ...data }

        if (user) {
          return user
        } else {
          return null
        }
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
  },
  pages: {
    signIn: '/login',
    newUser: '/user',
    signOut: '/',
    error: '/',
  },
}
export default authOptions
