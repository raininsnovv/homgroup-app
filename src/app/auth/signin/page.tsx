'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Building2, CheckCircle, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.get('registered') === 'true') {
            setShowSuccess(true)
            // Заполняем email из localStorage если есть
            const savedEmail = localStorage.getItem('registeredEmail')
            if (savedEmail) {
                setEmail(savedEmail)
                localStorage.removeItem('registeredEmail')
            }
            // Убираем параметр из URL через 3 секунды
            setTimeout(() => {
                router.replace('/auth/signin')
                setShowSuccess(false)
            }, 3000)
        }
    }, [searchParams, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('Неверный email или пароль')
            } else {
                // Получаем обновленную сессию
                const session = await getSession()
                if (session) {
                    router.push('/')
                }
            }
        } catch (error) {
            setError('Произошла ошибка при входе')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Building2 className="mx-auto h-12 w-12 text-blue-600" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Вход в систему
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        HomGroup - Управление строительными проектами
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="bg-white py-8 px-6 shadow rounded-lg">
                        {showSuccess && (
                            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Регистрация успешна! Теперь войдите в систему.
                            </div>
                        )}
                        {error && (
                            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Введите ваш email"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Пароль
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Введите пароль"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Вход...' : 'Войти'}
                            </button>
                        </div>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Нет аккаунта?{' '}
                                <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700">
                                    Зарегистрироваться
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
