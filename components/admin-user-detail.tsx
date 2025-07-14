"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  User,
  Trophy,
  Clock,
  Upload,
  Calendar,
  MapPin,
  Mail,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
} from "lucide-react"

interface AdminUserDetailProps {
  user: any
  onBack: () => void
}

export default function AdminUserDetail({ user, onBack }: AdminUserDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const userStats = {
    ranking: {
      regional: 3,
      totalRegional: 47,
      national: 12,
      totalNational: 1247,
      region: "Ananindeua",
    },
    progress: {
      overall: 75,
      meetings: 75, // 3/4 encontros
      minicourses: 60, // 1.2/2 minicursos
      challenge: 0,
      resources: 85,
    },
    activity: {
      totalHours: 24,
      meetingsAttended: 3,
      coursesCompleted: 1,
      uploadsCount: 5,
      lastLogin: "2 dias atrás",
      registrationDate: "01/09/2025",
    },
  }

  const detailedUploads = [
    {
      id: 1,
      fileName: "Atividade_Modulo1_MariaS.pdf",
      activity: "Diagnóstico da Prática Docente",
      section: "Encontros",
      relatedTo: "Visão de Inovação Educacional",
      uploadDate: "15/09/2025",
      status: "approved",
      feedback:
        "Excelente trabalho! Demonstrou boa compreensão dos conceitos de inovação educacional. A análise reflexiva está bem estruturada e as propostas são viáveis.",
      points: 300,
      fileSize: "2.3 MB",
    },
    {
      id: 2,
      fileName: "Plano_Aula_Digital.docx",
      activity: "Planejamento de aula com recursos digitais",
      section: "Encontros",
      relatedTo: "Cidadania e Cultura Digital",
      uploadDate: "02/10/2025",
      status: "pending",
      feedback: null,
      points: 0,
      fileSize: "1.8 MB",
    },
    {
      id: 3,
      fileName: "Reflexao_Modulo1.pdf",
      activity: "Reflexão sobre Inovação Educacional",
      section: "Minicursos",
      relatedTo: "Planejamento Inovador com Tecnologia",
      uploadDate: "20/09/2025",
      status: "approved",
      feedback: "Boa reflexão sobre os conceitos apresentados. Sugestão: incluir mais exemplos práticos.",
      points: 150,
      fileSize: "1.2 MB",
    },
    {
      id: 4,
      fileName: "Atividade_Personalizacao.docx",
      activity: "Estratégias de Personalização",
      section: "Minicursos",
      relatedTo: "Planejamento Inovador com Tecnologia",
      uploadDate: "25/09/2025",
      status: "revision",
      feedback:
        "Bom trabalho, mas precisa detalhar melhor as estratégias de implementação. Revisar seção sobre avaliação.",
      points: 0,
      fileSize: "2.1 MB",
    },
    {
      id: 5,
      fileName: "Projeto_Inclusao.pdf",
      activity: "Projeto de Inclusão Digital",
      section: "Minicursos",
      relatedTo: "Planejamento Inovador com Tecnologia",
      uploadDate: "05/10/2025",
      status: "approved",
      feedback: "Excelente projeto! Demonstra compreensão profunda dos conceitos de inclusão e acessibilidade digital.",
      points: 200,
      fileSize: "3.1 MB",
    },
  ]

  const activityHistory = [
    { date: "05/10/2025", action: "Enviou atividade", details: "Projeto de Inclusão Digital" },
    { date: "02/10/2025", action: "Enviou atividade", details: "Plano de Aula Digital" },
    { date: "29/09/2025", action: "Participou do encontro", details: "Cidadania e Cultura Digital" },
    { date: "25/09/2025", action: "Enviou atividade", details: "Estratégias de Personalização" },
    { date: "20/09/2025", action: "Concluiu módulo", details: "Personalização da Aprendizagem" },
    { date: "20/09/2025", action: "Enviou atividade", details: "Reflexão sobre Inovação" },
    { date: "18/09/2025", action: "Concluiu módulo", details: "Planejamento com Tecnologia" },
    { date: "15/09/2025", action: "Enviou atividade", details: "Diagnóstico da Prática Docente" },
    { date: "15/09/2025", action: "Participou do encontro", details: "Visão de Inovação Educacional" },
    { date: "10/09/2025", action: "Concluiu módulo", details: "O que é Inovação Educacional?" },
    { date: "05/09/2025", action: "Iniciou minicurso", details: "Planejamento Inovador com Tecnologia" },
    { date: "01/09/2025", action: "Registrou-se na plataforma", details: "Primeiro acesso" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "revision":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "revision":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Informações Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Nome Completo</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">E-mail</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Região</p>
                  <p className="font-medium">{userStats.ranking.region}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Data de Registro</p>
                  <p className="font-medium">{userStats.activity.registrationDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Último Acesso</p>
                  <p className="font-medium">{userStats.activity.lastLogin}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge variant="default">Ativo</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Posição no Ranking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
              <h3 className="text-lg font-bold" style={{ color: "#DA291C" }}>
                Ranking Regional
              </h3>
              <p className="text-3xl font-bold text-gray-800">#{userStats.ranking.regional}</p>
              <p className="text-sm text-gray-600">
                de {userStats.ranking.totalRegional} educadores em {userStats.ranking.region}
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h3 className="text-lg font-bold text-blue-800">Ranking Nacional</h3>
              <p className="text-3xl font-bold text-gray-800">#{userStats.ranking.national}</p>
              <p className="text-sm text-gray-600">de {userStats.ranking.totalNational} educadores no Brasil</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progresso Detalhado */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso Detalhado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Progresso Geral</span>
                <span className="font-bold" style={{ color: "#DA291C" }}>
                  {userStats.progress.overall}%
                </span>
              </div>
              <Progress value={userStats.progress.overall} className="h-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Encontros Formativos</span>
                    <span className="text-sm font-medium">{userStats.progress.meetings}%</span>
                  </div>
                  <Progress value={userStats.progress.meetings} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">
                    {userStats.activity.meetingsAttended}/4 encontros participados
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Minicursos</span>
                    <span className="text-sm font-medium">{userStats.progress.minicourses}%</span>
                  </div>
                  <Progress value={userStats.progress.minicourses} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">
                    {userStats.activity.coursesCompleted}/2 minicursos concluídos
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Desafio Escolar</span>
                    <span className="text-sm font-medium">{userStats.progress.challenge}%</span>
                  </div>
                  <Progress value={userStats.progress.challenge} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">Não iniciado</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Recursos Digitais</span>
                    <span className="text-sm font-medium">{userStats.progress.resources}%</span>
                  </div>
                  <Progress value={userStats.progress.resources} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">12 recursos acessados</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{userStats.activity.totalHours}h</p>
            <p className="text-sm text-gray-600">Horas Totais</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Upload className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{userStats.activity.uploadsCount}</p>
            <p className="text-sm text-gray-600">Uploads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
            <p className="text-2xl font-bold">850</p>
            <p className="text-sm text-gray-600">XP Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-gray-600">Atividades Aprovadas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderUploads = () => (
    <div className="space-y-4">
      {detailedUploads.map((upload) => (
        <Card key={upload.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                {getStatusIcon(upload.status)}
                <div>
                  <h4 className="font-medium">{upload.activity}</h4>
                  <p className="text-sm text-gray-600">{upload.relatedTo}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {upload.section}
                    </Badge>
                    <span className="text-xs text-gray-500">{upload.uploadDate}</span>
                    <span className="text-xs text-gray-500">{upload.fileSize}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(upload.status)}>
                  {upload.status === "approved" ? "Aprovado" : upload.status === "pending" ? "Pendente" : "Revisão"}
                </Badge>
                {upload.points > 0 && (
                  <Badge variant="outline" style={{ borderColor: "#DA291C", color: "#DA291C" }}>
                    +{upload.points} XP
                  </Badge>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-3">
              <div className="flex items-center gap-3">
                <Upload className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">{upload.fileName}</span>
                <div className="flex gap-2 ml-auto">
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {upload.feedback && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Feedback:</strong> {upload.feedback}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderHistory = () => (
    <div className="space-y-3">
      {activityHistory.map((activity, index) => (
        <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-500 w-20">{activity.date}</div>
          <div className="flex-1">
            <p className="text-sm font-medium">{activity.action}</p>
            <p className="text-xs text-gray-600">{activity.details}</p>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 mb-4 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Voltar à Lista de Usuários
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#DA291C" }}>
                {user.name}
              </h1>
              <p className="text-gray-600">
                {user.email} • {userStats.ranking.region}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Enviar Mensagem</Button>
              <Button variant="outline">Gerar Relatório</Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="uploads">Uploads ({detailedUploads.length})</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="uploads" className="mt-6">
            {renderUploads()}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            {renderHistory()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
