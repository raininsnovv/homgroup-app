'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Building2, ArrowLeft, Calendar, MapPin, User, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface Project {
    id: string
    name: string
    description?: string
    address: string
    status: string
    startDate?: string
    endDate?: string
    budget?: number
    progress: number
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
    plannedStartDate?: string
    plannedEndDate?: string
    actualStartDate?: string
    actualEndDate?: string
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const { data: session } = useSession()
    const [project, setProject] = useState<Project | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Заглушка данных - в реальном проекте здесь будет API запрос
        const mockProject: Project = {
            id: params.id,
            name: 'КВ | Кадырова 40А',
            description: 'Ремонт квартиры под ключ',
            address: 'ЧР г.Грозный ул.Кадырова б/н 10 этаж кв. 40A',
            status: 'IN_PROGRESS',
            startDate: '2023-12-01',
            endDate: '2024-06-30',
            budget: 2500000,
            progress: 68,
            customer: {
                name: 'Туркоев Али Юсупович',
                email: 'turkoev@example.com',
                phone: '+7 (999) 123-45-67'
            },
            manager: {
                name: 'Мария Сидорова'
            },
            workStages: [
                {
                    id: '1',
                    name: 'Монтаж ГКЛ (стены, потолок, короба, нишы)',
                    stageType: 'FINISHING',
                    status: 'COMPLETED',
                    progress: 100,
                    plannedCost: 150000,
                    actualCost: 145000,
                    plannedStartDate: '2024-02-15',
                    plannedEndDate: '2024-03-11',
                    actualStartDate: '2024-02-16',
                    actualEndDate: '2024-03-11'
                },
                {
                    id: '2',
                    name: 'Монтаж ШУМАНЕТ',
                    stageType: 'FINISHING',
                    status: 'COMPLETED',
                    progress: 100,
                    plannedCost: 25000,
                    actualCost: 23000,
                    plannedStartDate: '2023-12-08',
                    plannedEndDate: '2023-12-09',
                    actualStartDate: '2023-12-08',
                    actualEndDate: '2023-12-09'
                },
                {
                    id: '3',
                    name: 'Отопление, канализация, водоснабжение',
                    stageType: 'PLUMBING',
                    status: 'COMPLETED',
                    progress: 100,
                    plannedCost: 180000,
                    actualCost: 175000,
                    plannedStartDate: '2024-01-10',
                    plannedEndDate: '2024-01-25',
                    actualStartDate: '2024-01-12',
                    actualEndDate: '2024-01-26'
                },
                {
                    id: '4',
                    name: 'Штукатурка стен с выведением геометрии',
                    stageType: 'FINISHING',
                    status: 'IN_PROGRESS',
                    progress: 75,
                    plannedCost: 200000,
                    actualCost: 150000,
                    plannedStartDate: '2024-03-15',
                    plannedEndDate: '2024-04-10',
                    actualStartDate: '2024-03-16',
                    actualEndDate: '2024-04-15'
                },
                {
                    id: '5',
                    name: 'Плиточные работы',
                    stageType: 'FINISHING',
                    status: 'PENDING',
                    progress: 0,
                    plannedCost: 300000,
                    actualCost: 0,
                    plannedStartDate: '2024-04-15',
                    plannedEndDate: '2024-05-15'
                }
            ]
        }

        setProject(mockProject)
        setIsLoading(false)
    }, [params.id])

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'PLANNING': return 'Планирование'
            case 'IN_PROGRESS': return 'В процессе'
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

    const getStageStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED': return <CheckCircle className="h-4 w-4 text-green-600" />
            case 'IN_PROGRESS': return <Clock className="h-4 w-4 text-blue-600" />
            case 'PENDING': return <AlertCircle className="h-4 w-4 text-yellow-600" />
            default: return <Clock className="h-4 w-4 text-gray-400" />
        }
    }

    const formatCurrency = (amount?: number) => {
        if (!amount) return '-'
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(amount)
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-'
        return new Date(dateString).toLocaleDateString('ru-RU')
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Проект не найден</h1>
                    <Link href="/projects" className="text-blue-600 hover:text-blue-700">
                        ← Вернуться к списку проектов
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
                            <h1 className="text-xl font-semibold text-gray-900">{project.name}</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {session && (
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Редактировать
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Project Header */}
                <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center mb-4">
                                <Building2 className="h-12 w-12 text-blue-600 mr-4" />
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h2>
                                    <p className="text-gray-600">{project.description}</p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">Прогресс</span>
                                    <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <div>
                                        <div className="font-medium">Сроки</div>
                                        <div>
                                            {formatDate(project.startDate)} - {formatDate(project.endDate)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <div>
                                        <div className="font-medium">Адрес</div>
                                        <div className="text-xs">{project.address}</div>
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-gray-600">
                                    <User className="h-4 w-4 mr-2" />
                                    <div>
                                        <div className="font-medium">Ответственный</div>
                                        <div>{project.manager?.name || 'Не назначен'}</div>
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-gray-600">
                                    <DollarSign className="h-4 w-4 mr-2" />
                                    <div>
                                        <div className="font-medium">Бюджет</div>
                                        <div>{formatCurrency(project.budget)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ml-8">
                            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(project.status)}`}>
                                {getStatusLabel(project.status)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Work Stages */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Работы по объекту</h3>
                        {session && (
                            <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                                Создать график работ
                            </button>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Срок
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Название
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Планируемая дата
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Фактическая дата
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Стоимость
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {project.workStages.map((stage) => (
                                    <tr key={stage.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getStageStatusIcon(stage.status)}
                                                <span className="ml-2 text-sm text-gray-900">
                                                    {stage.status === 'COMPLETED' ? 'Готово' :
                                                        stage.status === 'IN_PROGRESS' ? 'В работе' : 'Запланировано'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{stage.name}</div>
                                            <div className="text-sm text-gray-500">
                                                Прогресс: {stage.progress}%
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {stage.plannedStartDate && stage.plannedEndDate ? (
                                                <div>
                                                    {formatDate(stage.plannedStartDate)} → {formatDate(stage.plannedEndDate)}
                                                </div>
                                            ) : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {stage.actualStartDate && stage.actualEndDate ? (
                                                <div>
                                                    {formatDate(stage.actualStartDate)} → {formatDate(stage.actualEndDate)}
                                                </div>
                                            ) : stage.actualStartDate ? (
                                                <div>С {formatDate(stage.actualStartDate)}</div>
                                            ) : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>План: {formatCurrency(stage.plannedCost)}</div>
                                            <div>Факт: {formatCurrency(stage.actualCost)}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Информация о заказчике</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="text-sm font-medium text-gray-700">Имя</div>
                            <div className="text-sm text-gray-900">{project.customer.name}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700">Email</div>
                            <div className="text-sm text-gray-900">{project.customer.email || '-'}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700">Телефон</div>
                            <div className="text-sm text-gray-900">{project.customer.phone || '-'}</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
