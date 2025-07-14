"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  BookOpen,
  Calendar,
  Trophy,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  BarChart3,
  MapPin,
  Clock,
  Upload,
} from "lucide-react"
import Image from "next/image"
import AdminContentForm from "./admin-content-form"
import AdminContentManagement from "./admin-content-management"
import AdminUserEdit from "./admin-user-edit"
import AdminGroupAnalysis from "./admin-group-analysis"
import AdminSettings from "./admin-settings"
import AdminUserDetail from "./admin-user-detail"
import AdminAddUserForm from "./admin-add-user-form"

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState("overview")
  const [showContentForm, setShowContentForm] = useState(false)
  const [showContentManagement, setShowContentManagement] = useState("")
  const [showUserEdit, setShowUserEdit] = useState(false)
  const [showUserDetail, setShowUserDetail] = useState(false)
  const [showAddUserForm, setShowAddUserForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [expandedStats, setExpandedStats] = useState("")
  const [regionFilter, setRegionFilter] = useState("all")
  const [progressFilter, setProgressFilter] = useState("all")

  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    completedCourses: 456,
    pendingActivities: 123,
  }

  // Atualizar groupStats para incluir dados do "Geral"
  const groupStats = {
    ananindeua: { users: 47, active: 35, completed: 12 },
    natal: { users: 89, active: 67, completed: 23 },
    mogi: { users: 156, active: 124, completed: 45 },
    nacional: { users: 955, active: 666, completed: 376 },
    geral: {
      users: 1247, // soma de todos
      active: 892, // soma de todos ativos
      completed: 456, // soma de todos concluídos
    },
  }

  const users = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@escola.com",
      region: "Ananindeua",
      progress: 75,
      status: "Ativo",
      totalHours: 24,
      meetingsAttended: 3,
      coursesCompleted: 1,
      uploadsCount: 5,
      challengeParticipation: true,
      resourcesAccessed: 12,
      lastActivity: "2 dias atrás",
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao@escola.com",
      region: "Natal",
      progress: 45,
      status: "Ativo",
      totalHours: 18,
      meetingsAttended: 2,
      coursesCompleted: 0,
      uploadsCount: 3,
      challengeParticipation: false,
      resourcesAccessed: 8,
      lastActivity: "1 dia atrás",
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana@escola.com",
      region: "Mogi das Cruzes",
      progress: 90,
      status: "Concluído",
      totalHours: 32,
      meetingsAttended: 4,
      coursesCompleted: 2,
      uploadsCount: 8,
      challengeParticipation: true,
      resourcesAccessed: 18,
      lastActivity: "5 horas atrás",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const regionMatch = regionFilter === "all" || user.region === regionFilter
    const progressMatch =
      progressFilter === "all" ||
      (progressFilter === "low" && user.progress < 30) ||
      (progressFilter === "medium" && user.progress >= 30 && user.progress < 70) ||
      (progressFilter === "high" && user.progress >= 70)
    return regionMatch && progressMatch
  })

  const handleAddUser = (userData: any) => {
    console.log("Adicionando usuário:", userData)
    // Aqui seria a lógica para adicionar o usuário
    setShowAddUserForm(false)
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setExpandedStats(expandedStats === "users" ? "" : "users")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: "#DA291C" }}>
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total de Usuários</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setExpandedStats(expandedStats === "active" ? "" : "active")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-600">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setExpandedStats(expandedStats === "courses" ? "" : "courses")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-600">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cursos Concluídos</p>
                <p className="text-2xl font-bold">{stats.completedCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setExpandedStats(expandedStats === "activities" ? "" : "activities")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-600">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Atividades Pendentes</p>
                <p className="text-2xl font-bold">{stats.pendingActivities}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expanded Stats */}
      {expandedStats && (
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#DA291C" }}>
              Análise por Grupos -{" "}
              {expandedStats === "users"
                ? "Total de Usuários"
                : expandedStats === "active"
                  ? "Usuários Ativos"
                  : expandedStats === "courses"
                    ? "Cursos Concluídos"
                    : "Atividades Pendentes"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800">Ananindeua</h4>
                <p className="text-2xl font-bold text-blue-900">
                  {expandedStats === "users"
                    ? groupStats.ananindeua.users
                    : expandedStats === "active"
                      ? groupStats.ananindeua.active
                      : expandedStats === "courses"
                        ? groupStats.ananindeua.completed
                        : "8"}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800">Natal</h4>
                <p className="text-2xl font-bold text-green-900">
                  {expandedStats === "users"
                    ? groupStats.natal.users
                    : expandedStats === "active"
                      ? groupStats.natal.active
                      : expandedStats === "courses"
                        ? groupStats.natal.completed
                        : "15"}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800">Mogi das Cruzes</h4>
                <p className="text-2xl font-bold text-purple-900">
                  {expandedStats === "users"
                    ? groupStats.mogi.users
                    : expandedStats === "active"
                      ? groupStats.mogi.active
                      : expandedStats === "courses"
                        ? groupStats.mogi.completed
                        : "22"}
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800">Nacional</h4>
                <p className="text-2xl font-bold text-red-900">
                  {expandedStats === "users"
                    ? groupStats.nacional.users
                    : expandedStats === "active"
                      ? groupStats.nacional.active
                      : expandedStats === "courses"
                        ? groupStats.nacional.completed
                        : "78"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800">Geral</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {expandedStats === "users"
                    ? groupStats.geral.users
                    : expandedStats === "active"
                      ? groupStats.geral.active
                      : expandedStats === "courses"
                        ? groupStats.geral.completed
                        : "123"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#DA291C" }}>Usuários Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.region}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={user.status === "Ativo" ? "default" : "secondary"}>{user.status}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{user.lastActivity}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#DA291C" }}>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  activity: "Envio de atividade - Módulo 1",
                  user: "Maria Silva",
                  time: "2h atrás",
                  region: "Ananindeua",
                },
                { activity: "Conclusão de minicurso", user: "João Santos", time: "4h atrás", region: "Natal" },
                {
                  activity: "Participação em encontro",
                  user: "Ana Costa",
                  time: "1 dia atrás",
                  region: "Mogi das Cruzes",
                },
              ].map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm">{item.activity}</p>
                  <p className="text-xs text-gray-600">
                    {item.user} • {item.region} • {item.time}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold" style={{ color: "#DA291C" }}>
          Gerenciar Usuários
        </h2>
        <Button className="text-white" style={{ backgroundColor: "#DA291C" }} onClick={() => setShowAddUserForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Usuário
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input placeholder="Buscar usuários..." className="w-full" />
            </div>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por região" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as regiões</SelectItem>
                <SelectItem value="Ananindeua">Ananindeua</SelectItem>
                <SelectItem value="Natal">Natal</SelectItem>
                <SelectItem value="Mogi das Cruzes">Mogi das Cruzes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={progressFilter} onValueChange={setProgressFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por progresso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os progressos</SelectItem>
                <SelectItem value="low">Baixo (0-30%)</SelectItem>
                <SelectItem value="medium">Médio (30-70%)</SelectItem>
                <SelectItem value="high">Alto (70-100%)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium">Nome</th>
                  <th className="text-left p-4 font-medium">Região</th>
                  <th className="text-left p-4 font-medium">Progresso</th>
                  <th className="text-left p-4 font-medium">Horas Totais</th>
                  <th className="text-left p-4 font-medium">Encontros</th>
                  <th className="text-left p-4 font-medium">Uploads</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span className="text-sm">{user.region}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{ backgroundColor: "#DA291C", width: `${user.progress}%` }}
                          />
                        </div>
                        <span className="text-sm">{user.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span className="text-sm">{user.totalHours}h</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">{user.meetingsAttended}/4</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Upload className="h-3 w-3 text-gray-500" />
                        <span className="text-sm">{user.uploadsCount}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={user.status === "Ativo" ? "default" : "secondary"}>{user.status}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(user)
                            setShowUserDetail(true)
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(user)
                            setShowUserEdit(true)
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: "#DA291C" }}>
          Gerenciar Conteúdo
        </h2>
        <Button className="text-white" style={{ backgroundColor: "#DA291C" }} onClick={() => setShowContentForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Conteúdo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setShowContentManagement("encontros")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Encontros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Gerencie encontros formativos</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-medium">4 encontros</span>
              </div>
              <div className="flex justify-between">
                <span>Realizados:</span>
                <span className="font-medium">2 encontros</span>
              </div>
              <div className="flex justify-between">
                <span>Participação média:</span>
                <span className="font-medium">78%</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Gerenciar Encontros
            </Button>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setShowContentManagement("minicursos")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Minicursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Gerencie minicursos e módulos</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-medium">2 minicursos</span>
              </div>
              <div className="flex justify-between">
                <span>Módulos:</span>
                <span className="font-medium">12 módulos</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de conclusão:</span>
                <span className="font-medium">45%</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Gerenciar Minicursos
            </Button>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setShowContentManagement("desafios")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Desafios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Gerencie desafios escolares</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-medium">1 desafio</span>
              </div>
              <div className="flex justify-between">
                <span>Participantes:</span>
                <span className="font-medium">234 educadores</span>
              </div>
              <div className="flex justify-between">
                <span>Projetos enviados:</span>
                <span className="font-medium">89 projetos</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Gerenciar Desafios
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const navigation = [
    { id: "overview", label: "Visão Geral", icon: BarChart3 },
    { id: "users", label: "Usuários", icon: Users },
    { id: "groups", label: "Análise de Grupos", icon: MapPin },
    { id: "content", label: "Conteúdo", icon: BookOpen },
    { id: "settings", label: "Configurações", icon: Settings },
  ]

  if (showContentForm) {
    return <AdminContentForm onBack={() => setShowContentForm(false)} />
  }

  if (showContentManagement) {
    return <AdminContentManagement type={showContentManagement} onBack={() => setShowContentManagement("")} />
  }

  if (showUserEdit && selectedUser) {
    return (
      <AdminUserEdit
        user={selectedUser}
        onBack={() => {
          setShowUserEdit(false)
          setSelectedUser(null)
        }}
      />
    )
  }

  if (showUserDetail && selectedUser) {
    return (
      <AdminUserDetail
        user={selectedUser}
        onBack={() => {
          setShowUserDetail(false)
          setSelectedUser(null)
        }}
      />
    )
  }

  if (showAddUserForm) {
    return <AdminAddUserForm onBack={() => setShowAddUserForm(false)} onSave={handleAddUser} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Image src="/images/claro-logo.png" alt="Claro" width={40} height={40} className="h-8 w-8" />
              <h1 className="text-xl font-bold" style={{ color: "#DA291C" }}>
                Educonexão - Admin
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeSection === item.id ? "text-white" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        style={activeSection === item.id ? { backgroundColor: "#DA291C" } : {}}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === "overview" && renderOverview()}
            {activeSection === "users" && renderUsers()}
            {activeSection === "groups" && <AdminGroupAnalysis />}
            {activeSection === "content" && renderContent()}
            {activeSection === "settings" && <AdminSettings />}
          </div>
        </div>
      </div>
    </div>
  )
}
