'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Calendar, Clock, User, Building2, FileText, DollarSign, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface Event {
    id: string
    title: string
    description?: string
    eventType: string
    createdAt: string
    user: {
        name: string
    }
    project?: {
        name: string
    }
}

export default function EventsPage() {
    const { data: session } = useSession()
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Заглушка данных - в реальном проекте здесь будет API запрос
        setEvents([
            {
                id: '1',
                title: 'Проект создан',
                description: 'Создан новый проект "Жилой дом на ул. Ленина, 15"',
                eventType: 'PROJECT_CREATED',
                createdAt: '2024-01-15T10:30:00Z',
                user: {
                    name: 'Мария Сидорова'
                },
                project: {
                    name: 'Жилой дом на ул. Ленина, 15'
                }
            },
            {
                id: '2',
                title: 'Этап завершен',
                description: 'Завершен этап "Заливка фундамента"',
                eventType: 'STAGE_COMPLETED',
                createdAt: '2024-02-20T14:15:00Z',
                user: {
                    name: 'Алексей Козлов'
                },
                project: {
                    name: 'Жилой дом на ул. Ленина, 15'
                }
            },
            {
                id: '3',
                title: 'Добавлены затраты',
                description: 'Зафиксированы затраты на материалы: 150,000 руб.',
                eventType: 'COST_ADDED',
                createdAt: '2024-02-18T09:45:00Z',
                user: {
                    name: 'Иван Петров'
                },
                project: {
                    name: 'Жилой дом на ул. Ленина, 15'
                }
            },
            {
                id: '4',
                title: 'Назначен ответственный',
                description: 'Алексей Козлов назначен ответственным за проект',
                eventType: 'USER_ASSIGNED',
                createdAt: '2024-01-16T11:20:00Z',
                user: {
                    name: 'Мария Сидорова'
                },
                project: {
                    name: 'Офисное здание "Бизнес-центр"'
                }
            },
            {
                id: '5',
                title: 'Статус изменен',
                description: 'Статус проекта изменен на "В работе"',
                eventType: 'STATUS_CHANGED',
                createdAt: '2024-01-20T16:30:00Z',
                user: {
                    name: 'Мария Сидорова'
                },
                project: {
                    name: 'Жилой дом на ул. Ленина, 15'
                }
            },
            {
                id: '6',
                title: 'Проект обновлен',
                description: 'Обновлена информация о бюджете проекта',
                eventType: 'PROJECT_UPDATED',
                createdAt: '2024-01-25T13:10:00Z',
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

    const getEventTypeLabel = (type: string) => {
        switch (type) {
            case 'PROJECT_CREATED': return 'Проект создан'
            case 'PROJECT_UPDATED': return 'Проект обновлен'
            case 'STAGE_STARTED': return 'Этап начат'
            case 'STAGE_COMPLETED': return 'Этап завершен'
            case 'COST_ADDED': return 'Добавлены затраты'
            case 'USER_ASSIGNED': return 'Назначен ответственный'
            case 'STATUS_CHANGED': return 'Статус изменен'
            case 'OTHER': return 'Прочее'
            default: return type
        }
    }

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'PROJECT_CREATED':
            case 'PROJECT_UPDATED':
                return <Building2 className="h-5 w-5 text-blue-600" />
            case 'STAGE_STARTED':
            case 'STAGE_COMPLETED':
                return <CheckCircle className="h-5 w-5 text-green-600" />
            case 'COST_ADDED':
                return <DollarSign className="h-5 w-5 text-yellow-600" />
            case 'USER_ASSIGNED':
                return <User className="h-5 w-5 text-purple-600" />
            case 'STATUS_CHANGED':
                return <AlertCircle className="h-5 w-5 text-orange-600" />
            default:
                return <FileText className="h-5 w-5 text-gray-600" />
        }
    }

    const getEventColor = (type: string) => {
        switch (type) {
            case 'PROJECT_CREATED':
            case 'PROJECT_UPDATED':
                return 'bg-blue-50 border-blue-200'
            case 'STAGE_STARTED':
            case 'STAGE_COMPLETED':
                return 'bg-green-50 border-green-200'
            case 'COST_ADDED':
                return 'bg-yellow-50 border-yellow-200'
            case 'USER_ASSIGNED':
                return 'bg-purple-50 border-purple-200'
            case 'STATUS_CHANGED':
                return 'bg-orange-50 border-orange-200'
            default:
                return 'bg-gray-50 border-gray-200'
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return {
            date: date.toLocaleDateString('ru-RU'),
            time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
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
                            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-xl font-semibold text-gray-900">Журнал событий</h1>
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Последние события</h2>
                    <p className="text-gray-600">Отслеживание всех действий в системе</p>
                </div>

                {/* Events Timeline */}
                <div className="space-y-4">
                    {events.map((event, index) => {
                        const { date, time } = formatDate(event.createdAt)
                        return (
                            <div key={event.id} className={`border rounded-lg p-4 ${getEventColor(event.eventType)}`}>
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        {getEventIcon(event.eventType)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900">
                                                {event.title}
                                            </h3>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Clock className="h-3 w-3 mr-1" />
                                                <span>{date} в {time}</span>
                                            </div>
                                        </div>

                                        {event.description && (
                                            <p className="mt-1 text-sm text-gray-600">
                                                {event.description}
                                            </p>
                                        )}

                                        <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                                            <div className="flex items-center">
                                                <User className="h-3 w-3 mr-1" />
                                                <span>{event.user.name}</span>
                                            </div>
                                            {event.project && (
                                                <div className="flex items-center">
                                                    <Building2 className="h-3 w-3 mr-1" />
                                                    <span>{event.project.name}</span>
                                                </div>
                                            )}
                                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-white">
                                                {getEventTypeLabel(event.eventType)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Load More Button */}
                <div className="mt-8 text-center">
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        Загрузить еще
                    </button>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Всего событий</h3>
                        <p className="text-3xl font-bold text-blue-600">{events.length}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Сегодня</h3>
                        <p className="text-3xl font-bold text-green-600">
                            {events.filter(e => {
                                const eventDate = new Date(e.createdAt).toDateString()
                                const today = new Date().toDateString()
                                return eventDate === today
                            }).length}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">На этой неделе</h3>
                        <p className="text-3xl font-bold text-purple-600">
                            {events.filter(e => {
                                const eventDate = new Date(e.createdAt)
                                const weekAgo = new Date()
                                weekAgo.setDate(weekAgo.getDate() - 7)
                                return eventDate >= weekAgo
                            }).length}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Активных пользователей</h3>
                        <p className="text-3xl font-bold text-orange-600">
                            {new Set(events.map(e => e.user.name)).size}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
