'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { FileText, Plus, Calendar, Clock, DollarSign, User, Building2 } from 'lucide-react'
import Link from 'next/link'

interface WorkLog {
    id: string
    description: string
    cost: number
    hours?: number
    date: string
    user: {
        name: string
    }
    project: {
        name: string
    }
    workStage?: {
        name: string
    }
}

export default function WorkLogPage() {
    const { data: session } = useSession()
    const [workLogs, setWorkLogs] = useState<WorkLog[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Заглушка данных - в реальном проекте здесь будет API запрос
        setWorkLogs([
            {
                id: '1',
                description: 'Заливка бетона для фундамента',
                cost: 150000,
                hours: 8,
                date: '2024-02-15T09:00:00Z',
                user: {
                    name: 'Алексей Козлов'
                },
                project: {
                    name: 'Жилой дом на ул. Ленина, 15'
                },
                workStage: {
                    name: 'Заливка фундамента'
                }
            },
            {
                id: '2',
                description: 'Покупка материалов для стен',
                cost: 250000,
                hours: 2,
                date: '2024-02-18T14:30:00Z',
                user: {
                    name: 'Мария Сидорова'
                },
                project: {
                    name: 'Жилой дом на ул. Ленина, 15'
                },
                workStage: {
                    name: 'Возведение стен'
                }
            },
            {
                id: '3',
                description: 'Установка опалубки',
                cost: 75000,
                hours: 6,
                date: '2024-02-20T08:00:00Z',
                user: {
                    name: 'Иван Петров'
                },
                project: {
                    name: 'Жилой дом на ул. Ленина, 15'
                },
                workStage: {
                    name: 'Заливка фундамента'
                }
            },
            {
                id: '4',
                description: 'Кладка кирпича - первый этаж',
                cost: 180000,
                hours: 12,
                date: '2024-02-22T07:00:00Z',
                user: {
                    name: 'Алексей Козлов'
                },
                project: {
                    name: 'Жилой дом на ул. Ленина, 15'
                },
                workStage: {
                    name: 'Возведение стен'
                }
            },
            {
                id: '5',
                description: 'Подготовка участка под строительство',
                cost: 50000,
                hours: 4,
                date: '2024-02-10T10:00:00Z',
                user: {
                    name: 'Мария Сидорова'
                },
                project: {
                    name: 'Офисное здание "Бизнес-центр"'
                },
                workStage: {
                    name: 'Подготовка участка'
                }
            },
            {
                id: '6',
                description: 'Доставка и разгрузка материалов',
                cost: 30000,
                hours: 3,
                date: '2024-02-12T11:30:00Z',
                user: {
                    name: 'Иван Петров'
                },
                project: {
                    name: 'Офисное здание "Бизнес-центр"'
                }
            }
        ])
        setIsLoading(false)
    }, [])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return {
            date: date.toLocaleDateString('ru-RU'),
            time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        }
    }

    const totalCost = workLogs.reduce((sum, log) => sum + log.cost, 0)
    const totalHours = workLogs.reduce((sum, log) => sum + (log.hours || 0), 0)

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
                            <FileText className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-xl font-semibold text-gray-900">Журнал работ</h1>
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Учет затрат и времени</h2>
                            <p className="text-gray-600">Детальный учет работ по этапам и проектам</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                            <Plus className="h-4 w-4 mr-2" />
                            Добавить запись
                        </button>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Общие затраты</h3>
                        <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalCost)}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Общее время</h3>
                        <p className="text-3xl font-bold text-green-600">{totalHours} ч</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Записей</h3>
                        <p className="text-3xl font-bold text-purple-600">{workLogs.length}</p>
                    </div>
                </div>

                {/* Work Logs List */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Описание работ
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Проект
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Этап
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Стоимость
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Время
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Исполнитель
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Дата
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {workLogs.map((log) => {
                                    const { date, time } = formatDate(log.date)
                                    return (
                                        <tr key={log.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {log.description}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                                                    {log.project.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {log.workStage?.name || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm font-medium text-gray-900">
                                                    <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                                                    {formatCurrency(log.cost)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {log.hours ? (
                                                    <div className="flex items-center">
                                                        <Clock className="h-4 w-4 mr-1 text-blue-600" />
                                                        {log.hours} ч
                                                    </div>
                                                ) : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <User className="h-4 w-4 mr-2 text-gray-400" />
                                                    {log.user.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                                    <div>
                                                        <div>{date}</div>
                                                        <div className="text-xs text-gray-400">{time}</div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Project Breakdown */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Затраты по проектам</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from(new Set(workLogs.map(log => log.project.name))).map(projectName => {
                            const projectLogs = workLogs.filter(log => log.project.name === projectName)
                            const projectCost = projectLogs.reduce((sum, log) => sum + log.cost, 0)
                            const projectHours = projectLogs.reduce((sum, log) => sum + (log.hours || 0), 0)

                            return (
                                <div key={projectName} className="bg-white rounded-lg shadow-sm border p-6">
                                    <h4 className="text-md font-semibold text-gray-900 mb-3">{projectName}</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Затраты:</span>
                                            <span className="font-medium">{formatCurrency(projectCost)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Время:</span>
                                            <span className="font-medium">{projectHours} ч</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Записей:</span>
                                            <span className="font-medium">{projectLogs.length}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}
