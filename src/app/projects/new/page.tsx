'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Building2, ArrowLeft, Save, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewProjectPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        budget: '',
        startDate: '',
        endDate: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        managerId: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Здесь будет API запрос для создания проекта
        console.log('Creating project:', formData)

        // Имитация задержки
        await new Promise(resolve => setTimeout(resolve, 1000))

        setIsLoading(false)
        router.push('/projects')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Доступ запрещен</h1>
                    <p className="text-gray-600 mb-4">Для создания проекта необходимо войти в систему</p>
                    <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700">
                        Войти в систему
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <Link href="/projects" className="mr-4 text-gray-600 hover:text-gray-900">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <Building2 className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-xl font-semibold text-gray-900">Новый проект</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Project Info */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Информация о проекте</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Название проекта *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Например: КВ | Кадырова 40А"
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                    Адрес *
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Полный адрес объекта"
                                />
                            </div>

                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                                    Бюджет (руб.)
                                </label>
                                <input
                                    type="number"
                                    id="budget"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="2500000"
                                />
                            </div>

                            <div>
                                <label htmlFor="managerId" className="block text-sm font-medium text-gray-700 mb-2">
                                    Ответственный
                                </label>
                                <select
                                    id="managerId"
                                    name="managerId"
                                    value={formData.managerId}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Выберите ответственного</option>
                                    <option value="1">Мария Сидорова</option>
                                    <option value="2">Алексей Козлов</option>
                                    <option value="3">Иван Петров</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                                    Дата начала
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                                    Дата окончания
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Описание
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Подробное описание проекта..."
                            />
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Информация о заказчике</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Имя заказчика *
                                </label>
                                <input
                                    type="text"
                                    id="customerName"
                                    name="customerName"
                                    required
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="ФИО заказчика"
                                />
                            </div>

                            <div>
                                <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="customerEmail"
                                    name="customerEmail"
                                    value={formData.customerEmail}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Телефон
                                </label>
                                <input
                                    type="tel"
                                    id="customerPhone"
                                    name="customerPhone"
                                    value={formData.customerPhone}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="+7 (999) 123-45-67"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-4">
                        <Link
                            href="/projects"
                            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Отмена
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            {isLoading ? 'Создание...' : 'Создать проект'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}
