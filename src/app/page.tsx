'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Building2, Users, FileText, Calendar, LogIn, UserPlus, LogOut } from 'lucide-react'

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">HomGroup</h1>
            </div>
            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <span className="text-sm text-gray-600">
                    Добро пожаловать, {session.user.name}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {session.user.role === 'ADMIN' ? 'Администратор' :
                      session.user.role === 'MANAGER' ? 'Менеджер' : 'Сотрудник'}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Выйти
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/auth/signin"
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Войти
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Регистрация
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Панель управления</h2>
          <p className="text-gray-600">Управляйте проектами, командой и отслеживайте прогресс</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/team"
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
          >
            <Users className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Команда</h3>
            <p className="text-gray-600 text-sm">
              {session ? 'Управление сотрудниками и их ролями' : 'Просмотр команды'}
            </p>
          </Link>

          <Link
            href="/projects"
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
          >
            <Building2 className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Проекты</h3>
            <p className="text-gray-600 text-sm">
              {session ? 'Заказчики, объекты и этапы работ' : 'Просмотр проектов'}
            </p>
          </Link>

          <Link
            href="/events"
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
          >
            <Calendar className="h-8 w-8 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Журнал событий</h3>
            <p className="text-gray-600 text-sm">
              {session ? 'Последние действия и обновления' : 'Просмотр событий'}
            </p>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Активные проекты</h3>
            <p className="text-3xl font-bold text-blue-600">2</p>
            <p className="text-sm text-gray-600">В работе</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Завершенные</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600">За все время</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Команда</h3>
            <p className="text-3xl font-bold text-purple-600">3</p>
            <p className="text-sm text-gray-600">Сотрудников</p>
          </div>
        </div>
      </main>
    </div>
  )
}