'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Users, Plus, Edit, Trash2, UserPlus } from 'lucide-react'
import Link from 'next/link'

interface TeamMember {
    id: string
    name: string
    email: string
    role: string
    position?: string
    phone?: string
    isActive: boolean
}

export default function TeamPage() {
    const { data: session } = useSession()
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Заглушка данных - в реальном проекте здесь будет API запрос
        setTeamMembers([
            {
                id: '1',
                name: 'Иван Петров',
                email: 'ivan@homgroup.com',
                role: 'ADMIN',
                position: 'Генеральный директор',
                phone: '+7 (999) 123-45-67',
                isActive: true
            },
            {
                id: '2',
                name: 'Мария Сидорова',
                email: 'maria@homgroup.com',
                role: 'MANAGER',
                position: 'Менеджер проектов',
                phone: '+7 (999) 234-56-78',
                isActive: true
            },
            {
                id: '3',
                name: 'Алексей Козлов',
                email: 'alexey@homgroup.com',
                role: 'EMPLOYEE',
                position: 'Прораб',
                phone: '+7 (999) 345-67-89',
                isActive: true
            }
        ])
        setIsLoading(false)
    }, [])

    const getRoleLabel = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'Администратор'
            case 'MANAGER': return 'Менеджер'
            case 'EMPLOYEE': return 'Сотрудник'
            default: return role
        }
    }

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'bg-red-100 text-red-800'
            case 'MANAGER': return 'bg-blue-100 text-blue-800'
            case 'EMPLOYEE': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
                            <Users className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-xl font-semibold text-gray-900">Команда</h1>
                        </div>
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← Назад к панели управления
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Сотрудники</h2>
                            <p className="text-gray-600">Управление командой и ролями доступа</p>
                        </div>
                        {session?.user.role === 'ADMIN' && (
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Добавить сотрудника
                            </button>
                        )}
                    </div>
                </div>

                {/* Team Members List */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Сотрудник
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Роль
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Должность
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Контакты
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Статус
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Действия
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {teamMembers.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-blue-600">
                                                            {member.name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {member.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {member.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(member.role)}`}>
                                                {getRoleLabel(member.role)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {member.position || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {member.phone || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${member.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {member.isActive ? 'Активен' : 'Неактивен'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                {session?.user.role === 'ADMIN' && (
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Всего сотрудников</h3>
                        <p className="text-3xl font-bold text-blue-600">{teamMembers.length}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Активных</h3>
                        <p className="text-3xl font-bold text-green-600">
                            {teamMembers.filter(m => m.isActive).length}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Менеджеров</h3>
                        <p className="text-3xl font-bold text-purple-600">
                            {teamMembers.filter(m => m.role === 'MANAGER').length}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
