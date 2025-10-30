import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
    try {
        const { name, email, password, role } = await request.json()

        // Проверяем, существует ли пользователь
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'Пользователь с таким email уже существует' },
                { status: 400 }
            )
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 12)

        // Создаем пользователя
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || 'EMPLOYEE',
                position: '',
                phone: ''
            }
        })

        // Возвращаем пользователя без пароля
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(
            {
                message: 'Пользователь успешно создан',
                user: userWithoutPassword
            },
            { status: 201 }
        )

    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'Ошибка при создании пользователя' },
            { status: 500 }
        )
    }
}
