import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    // Сначала ищем пользователя в базе данных
                    const dbUser = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    })

                    if (dbUser) {
                        // Проверяем пароль из базы данных
                        const isValidPassword = await bcrypt.compare(credentials.password, dbUser.password)

                        if (isValidPassword) {
                            return {
                                id: dbUser.id,
                                email: dbUser.email,
                                name: dbUser.name,
                                role: dbUser.role,
                            }
                        }
                    }

                    return null
                } catch (error) {
                    console.error('Auth error:', error)
                    return null
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub!
                session.user.role = token.role as string
            }
            return session
        }
    },
    pages: {
        signIn: '/auth/signin',
    }
}
