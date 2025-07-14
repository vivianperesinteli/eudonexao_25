"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Clock, BookOpen, Upload, Trophy, Save } from "lucide-react"

interface AdminUserEditProps {
  user: any
  onBack: () => void
}

export default function AdminUserEdit({ user, onBack }: AdminUserEditProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    region: user.region,
    status: user.status,
    progress: user.progress,
    totalHours: user.totalHours,
    meetingsAttended: user.meetingsAttended,
    coursesCompleted: user.coursesCompleted,
    uploadsCount: user.uploadsCount,
    notes: "",
  })

  const handleSave = () => {
    console.log("Salvando dados do usuário:", formData)
    onBack()
  }

  const userUploads = [
    {
      id: 1,
      fileName: "Atividade_Modulo1.pdf",
      activity: "Diagnóstico da Prática Docente",
      date: "15/09/2025",
      status: "approved",
      feedback: "Excelente trabalho! Demonstrou boa compreensão dos conceitos.",
      points: 300,
    },
    {
      id: 2,
      fileName: "Plano_Aula_Digital.docx",
      activity: "Planejamento de aula com recursos digitais",
      date: "02/10/2025",
      status: "pending",
      feedback: null,
      points: 0,
    },
    {
      id: 3,
      fileName: "Projeto_Cidadania_Digital.pdf",
      activity: "Miniprojeto de cidadania digital",
      date: "20/10/2025",
      status: "revision",
      feedback: "Bom projeto, mas precisa detalhar melhor a metodologia aplicada.",
      points: 0,
    },
  ]

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprovado"
      case "pending":
        return "Pendente"
      case "revision":
        return "Revisão"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 mb-4 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Voltar à Lista de Usuários
          </Button>
          <h1 className="text-2xl font-bold" style={{ color: "#DA291C" }}>
            Editar Usuário - {user.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações Básicas */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome Completo</label>
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">E-mail</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Região</label>
                    <Select
                      value={formData.region}
                      onValueChange={(value) => setFormData({ ...formData, region: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ananindeua">Ananindeua</SelectItem>
                        <SelectItem value="Natal">Natal</SelectItem>
                        <SelectItem value="Mogi das Cruzes">Mogi das Cruzes</SelectItem>
                        <SelectItem value="Nacional">Nacional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Inativo">Inativo</SelectItem>
                        <SelectItem value="Concluído">Concluído</SelectItem>
                        <SelectItem value="Suspenso">Suspenso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Observações</label>
                  <Textarea
                    placeholder="Adicione observações sobre o usuário..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Histórico de Uploads */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Histórico de Uploads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userUploads.map((upload) => (
                    <div key={upload.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{upload.fileName}</h4>
                          <p className="text-sm text-gray-600">{upload.activity}</p>
                          <p className="text-xs text-gray-500">{upload.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(upload.status)}>{getStatusLabel(upload.status)}</Badge>
                          {upload.points > 0 && (
                            <Badge variant="outline" style={{ borderColor: "#DA291C", color: "#DA291C" }}>
                              +{upload.points} XP
                            </Badge>
                          )}
                        </div>
                      </div>
                      {upload.feedback && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm">
                            <strong>Feedback:</strong> {upload.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Progresso Geral</span>
                  <span className="font-bold">{formData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: "#DA291C", width: `${formData.progress}%` }}
                  />
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Horas Totais:</span>
                    <span className="font-medium">{formData.totalHours}h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Encontros:</span>
                    <span className="font-medium">{formData.meetingsAttended}/4</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Trophy className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Cursos:</span>
                    <span className="font-medium">{formData.coursesCompleted}/2</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Upload className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Uploads:</span>
                    <span className="font-medium">{formData.uploadsCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full bg-transparent">
                  Enviar Mensagem
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Resetar Senha
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Gerar Relatório
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                  Suspender Usuário
                </Button>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex-1 text-white" style={{ backgroundColor: "#DA291C" }}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
              <Button variant="outline" onClick={onBack}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
