'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Building2, Plus, Eye, Edit, Calendar, DollarSign, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Project {
    id: string
    name: string
    description?: string
    address: string
    status: string
    startDate?: string
    endDate?: string
    budget?: number
    customer: {
        name: string
        email?: string
        phone?: string
    }
    manager?: {
        name: string
    }
    workStages: WorkStage[]
}

interface WorkStage {
    id: string
    name: string
    stageType: string
    status: string
    progress: number
    plannedCost?: number
    actualCost?: number
}

export default function ProjectsPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Заглушка данных - в реальном проекте здесь будет API запрос
        setProjects([
            {
                id: '1',
                name: 'Жилой дом на ул. Ленина, 15',
                description: 'Строительство 3-этажного жилого дома',
                address: 'ул. Ленина, 15, г. Москва',
                status: 'IN_PROGRESS',
                startDate: '2024-01-15',
                endDate: '2024-12-31',
                budget: 15000000,
                customer: {
                    name: 'ООО "СтройИнвест"',
                    email: 'info@stroinvest.ru',
                    phone: '+7 (495) 123-45-67'
                },
                manager: {
                    name: 'Мария Сидорова'
                },
                workStages: [
                    {
                        id: '1',
                        name: 'Заливка фундамента',
                        stageType: 'FOUNDATION',
                        status: 'COMPLETED',
                        progress: 100,
                        plannedCost: 2000000,
                        actualCost: 1950000
                    },
                    {
                        id: '2',
                        name: 'Возведение стен',
                        stageType: 'WALLS',
                        status: 'IN_PROGRESS',
                        progress: 75,
                        plannedCost: 5000000,
                        actualCost: 3750000
                    },
                    {
                        id: '3',
                        name: 'Строительство кровли',
                        stageType: 'ROOF',
                        status: 'PENDING',
                        progress: 0,
                        plannedCost: 3000000,
                        actualCost: 0
                    }
                ]
            },
            {
                id: '2',
                name: 'Офисное здание "Бизнес-центр"',
                description: 'Строительство 5-этажного офисного здания',
                address: 'пр. Мира, 100, г. Москва',
                status: 'PLANNING',
                startDate: '2024-03-01',
                endDate: '2025-06-30',
                budget: 25000000,
                customer: {
                    name: 'ИП Иванов И.И.',
                    email: 'ivanov@example.com',
                    phone: '+7 (999) 888-77-66'
                },
                manager: {
                    name: 'Алексей Козлов'
                },
                workStages: [
                    {
                        id: '4',
                        name: 'Подготовка участка',
                        stageType: 'OTHER',
                        status: 'PENDING',
                        progress: 0,
                        plannedCost: 1000000,
                        actualCost: 0
                    }
                ]
            }
        ])
        setIsLoading(false)
    }, [])

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'PLANNING': return 'Планирование'
            case 'IN_PROGRESS': return 'В работе'
            case 'ON_HOLD': return 'Приостановлен'
            case 'COMPLETED': return 'Завершен'
            case 'CANCELLED': return 'Отменен'
            default: return status
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PLANNING': return 'bg-yellow-100 text-yellow-800'
            case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800'
            case 'ON_HOLD': return 'bg-orange-100 text-orange-800'
            case 'COMPLETED': return 'bg-green-100 text-green-800'
            case 'CANCELLED': return 'bg-red-100 text-red-800'
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
                            <Building2 className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-xl font-semibold text-gray-900">Проекты</h1>
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Объекты и заказчики</h2>
                            <p className="text-gray-600">Управление проектами, этапами работ и затратами</p>
                        </div>
                        {session ? (
                            <Link
                                href="/projects/new"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Добавить проект
                            </Link>
                        ) : (
                            <div className="text-sm text-gray-500">
                                Войдите в систему для управления проектами
                            </div>
                        )}
                    </div>
                </div>

                {/* Projects List */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Проект
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Адрес
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ответственный
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
                                {projects.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() => router.push(`/projects/${project.id}`)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Building2 className="h-8 w-8 text-blue-600 mr-3" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {project.name}
                                                    </div>
                                                    {project.description && (
                                                        <div className="text-sm text-gray-500">
                                                            {project.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{project.address}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {project.manager?.name || 'Не назначен'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                                                {getStatusLabel(project.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div
                                                className="flex justify-end space-x-2"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Link
                                                    href={`/projects/${project.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Подробнее"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                {session && (
                                                    <button className="text-gray-600 hover:text-gray-900">
                                                        <Edit className="h-4 w-4" />
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Всего проектов</h3>
                        <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">В работе</h3>
                        <p className="text-3xl font-bold text-green-600">
                            {projects.filter(p => p.status === 'IN_PROGRESS').length}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Завершенных</h3>
                        <p className="text-3xl font-bold text-purple-600">
                            {projects.filter(p => p.status === 'COMPLETED').length}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
