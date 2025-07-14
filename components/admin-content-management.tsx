"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BarChart3,
  Users,
  Clock,
  TrendingUp,
  Calendar,
  BookOpen,
  Trophy,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import ContentViewModal from "./content-view-modal"

interface AdminContentManagementProps {
  type: string
  onBack: () => void
}

export default function AdminContentManagement({ type, onBack }: AdminContentManagementProps) {
  const [activeTab, setActiveTab] = useState("analytics")
  const [showContentModal, setShowContentModal] = useState(false)
  const [selectedContent, setSelectedContent] = useState(null)

  const participationData = [
    { name: "Jan", participacao: 65, conclusao: 45 },
    { name: "Fev", participacao: 78, conclusao: 52 },
    { name: "Mar", participacao: 82, conclusao: 68 },
    { name: "Abr", participacao: 75, conclusao: 71 },
    { name: "Mai", participacao: 88, conclusao: 79 },
    { name: "Jun", participacao: 92, conclusao: 85 },
  ]

  const regionData = [
    { name: "Ananindeua", value: 47, color: "#DA291C" },
    { name: "Natal", value: 89, color: "#FF6B6B" },
    { name: "Mogi das Cruzes", value: 156, color: "#4ECDC4" },
    { name: "Nacional", value: 955, color: "#45B7D1" },
  ]

  const contentData = {
    encontros: [
      {
        id: 1,
        title: "Visão de Inovação Educacional",
        date: "15/09/2025",
        participants: 892,
        completion: 78,
        duration: "3h",
      },
      {
        id: 2,
        title: "Cidadania e Cultura Digital",
        date: "29/09/2025",
        participants: 834,
        completion: 72,
        duration: "2h",
      },
      {
        id: 3,
        title: "Competência Digital Docente",
        date: "13/10/2025",
        participants: 0,
        completion: 0,
        duration: "2h",
      },
      { id: 4, title: "Tecnologia e Bem-Estar", date: "10/11/2025", participants: 0, completion: 0, duration: "3h" },
    ],
    minicursos: [
      {
        id: 1,
        title: "Planejamento Inovador com Tecnologia",
        modules: 6,
        participants: 567,
        completion: 45,
        duration: "6h",
      },
      {
        id: 2,
        title: "Competências Digitais e Cidadania Digital",
        modules: 6,
        participants: 234,
        completion: 12,
        duration: "8h",
      },
    ],
    desafios: [
      {
        id: 1,
        title: "Cidadania Digital na Prática",
        participants: 234,
        submissions: 89,
        completion: 38,
        duration: "30 dias",
      },
    ],
  }

  const getTitle = () => {
    switch (type) {
      case "encontros":
        return "Gestão de Encontros"
      case "minicursos":
        return "Gestão de Minicursos"
      case "desafios":
        return "Gestão de Desafios"
      default:
        return "Gestão de Conteúdo"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "encontros":
        return <Calendar className="h-5 w-5" />
      case "minicursos":
        return <BookOpen className="h-5 w-5" />
      case "desafios":
        return <Trophy className="h-5 w-5" />
      default:
        return <BarChart3 className="h-5 w-5" />
    }
  }

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#DA291C" }}>
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Participantes</p>
                <p className="text-xl font-bold">
                  {type === "encontros" ? "892" : type === "minicursos" ? "567" : "234"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-600">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Taxa de Conclusão</p>
                <p className="text-xl font-bold">
                  {type === "encontros" ? "75%" : type === "minicursos" ? "45%" : "38%"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-600">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tempo Médio</p>
                <p className="text-xl font-bold">
                  {type === "encontros" ? "2.5h" : type === "minicursos" ? "4.2h" : "15 dias"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-600">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Engajamento</p>
                <p className="text-xl font-bold">
                  {type === "encontros" ? "88%" : type === "minicursos" ? "67%" : "52%"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Participação ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="participacao" stroke="#DA291C" strokeWidth={2} />
                <Line type="monotone" dataKey="conclusao" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Região</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Detalhada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium">Região</th>
                  <th className="text-left p-3 font-medium">Participantes</th>
                  <th className="text-left p-3 font-medium">Taxa de Conclusão</th>
                  <th className="text-left p-3 font-medium">Tempo Médio</th>
                  <th className="text-left p-3 font-medium">Satisfação</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Ananindeua</td>
                  <td className="p-3">47</td>
                  <td className="p-3">85%</td>
                  <td className="p-3">2.8h</td>
                  <td className="p-3">4.7/5</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Natal</td>
                  <td className="p-3">89</td>
                  <td className="p-3">78%</td>
                  <td className="p-3">2.5h</td>
                  <td className="p-3">4.5/5</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Mogi das Cruzes</td>
                  <td className="p-3">156</td>
                  <td className="p-3">72%</td>
                  <td className="p-3">2.3h</td>
                  <td className="p-3">4.6/5</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Nacional</td>
                  <td className="p-3">600</td>
                  <td className="p-3">68%</td>
                  <td className="p-3">2.4h</td>
                  <td className="p-3">4.4/5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContentList = () => (
    <div className="space-y-4">
      {contentData[type as keyof typeof contentData]?.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-lg">{item.title}</h3>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  {type === "encontros" && <span>Data: {item.date}</span>}
                  {type === "minicursos" && <span>Módulos: {item.modules}</span>}
                  {type === "desafios" && <span>Envios: {item.submissions}</span>}
                  <span>Participantes: {item.participants}</span>
                  <span>Conclusão: {item.completion}%</span>
                  <span>Duração: {item.duration}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedContent(item)
                    setShowContentModal(true)
                  }}
                >
                  <Eye className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedContent(item)
                    setShowContentModal(true)
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const handleSaveContent = (data: any) => {
    console.log("Salvando conteúdo:", data)
    setShowContentModal(false)
  }

  const handleDeleteContent = (id: number) => {
    console.log("Excluindo conteúdo:", id)
    setShowContentModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 mb-4 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Gerenciamento
          </Button>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "#DA291C" }}>
            {getIcon()}
            {getTitle()}
          </h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Gerenciar Conteúdo</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="mt-6">
            {renderAnalytics()}
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            {renderContentList()}
          </TabsContent>
        </Tabs>
      </div>
      <ContentViewModal
        isOpen={showContentModal}
        onClose={() => setShowContentModal(false)}
        content={selectedContent}
        type={type as "encontros" | "minicursos" | "desafios"}
        onSave={handleSaveContent}
        onDelete={handleDeleteContent}
      />
    </div>
  )
}
