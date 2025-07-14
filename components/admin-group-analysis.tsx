"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Calendar, Trophy, Download, Clock, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AdminGroupAnalysis() {
  const [selectedGroup, setSelectedGroup] = useState("ananindeua")
  const [expandedParticipant, setExpandedParticipant] = useState<number | null>(null)

  const groupsData = {
    ananindeua: {
      name: "Ananindeua",
      totalUsers: 47,
      activeUsers: 35,
      totalHours: 1128,
      meetings: {
        total: 4,
        attended: [
          { name: "Encontro 1", participants: 42, modality: "Presencial" },
          { name: "Encontro 2", participants: 38, modality: "Online" },
          { name: "Encontro 3", participants: 0, modality: "Online" },
          { name: "Encontro 4", participants: 0, modality: "Presencial" },
        ],
      },
      minicourses: {
        course1: { completed: 18, inProgress: 15, notStarted: 14 },
        course2: { completed: 5, inProgress: 8, notStarted: 34 },
      },
      challenge: {
        participants: 23,
        submissions: 12,
      },
      digitalResources: {
        accessed: 31,
        downloaded: 156,
      },
    },
    natal: {
      name: "Natal",
      totalUsers: 89,
      activeUsers: 67,
      totalHours: 2134,
      meetings: {
        total: 4,
        attended: [
          { name: "Encontro 1", participants: 78, modality: "Presencial" },
          { name: "Encontro 2", participants: 71, modality: "Online" },
          { name: "Encontro 3", participants: 0, modality: "Online" },
          { name: "Encontro 4", participants: 0, modality: "Presencial" },
        ],
      },
      minicourses: {
        course1: { completed: 34, inProgress: 28, notStarted: 27 },
        course2: { completed: 12, inProgress: 19, notStarted: 58 },
      },
      challenge: {
        participants: 45,
        submissions: 23,
      },
      digitalResources: {
        accessed: 62,
        downloaded: 298,
      },
    },
    mogi: {
      name: "Mogi das Cruzes",
      totalUsers: 156,
      activeUsers: 124,
      totalHours: 3744,
      meetings: {
        total: 4,
        attended: [
          { name: "Encontro 1", participants: 134, modality: "Presencial" },
          { name: "Encontro 2", participants: 128, modality: "Online" },
          { name: "Encontro 3", participants: 0, modality: "Online" },
          { name: "Encontro 4", participants: 0, modality: "Presencial" },
        ],
      },
      minicourses: {
        course1: { completed: 67, inProgress: 45, notStarted: 44 },
        course2: { completed: 23, inProgress: 34, notStarted: 99 },
      },
      challenge: {
        participants: 78,
        submissions: 34,
      },
      digitalResources: {
        accessed: 112,
        downloaded: 567,
      },
    },
    nacional: {
      name: "Nacional",
      totalUsers: 955,
      activeUsers: 666,
      totalHours: 22890,
      meetings: {
        total: 4,
        attended: [
          { name: "Encontro 1", participants: 638, modality: "Presencial" },
          { name: "Encontro 2", participants: 597, modality: "Online" },
          { name: "Encontro 3", participants: 0, modality: "Online" },
          { name: "Encontro 4", participants: 0, modality: "Presencial" },
        ],
      },
      minicourses: {
        course1: { completed: 376, inProgress: 234, notStarted: 345 },
        course2: { completed: 89, inProgress: 156, notStarted: 710 },
      },
      challenge: {
        participants: 234,
        submissions: 89,
      },
      digitalResources: {
        accessed: 445,
        downloaded: 1876,
      },
    },
  }

  const currentGroup =
    selectedGroup === "geral"
      ? {
          name: "Geral (Todos os Grupos)",
          totalUsers:
            groupsData.ananindeua.totalUsers +
            groupsData.natal.totalUsers +
            groupsData.mogi.totalUsers +
            groupsData.nacional.totalUsers,
          activeUsers:
            groupsData.ananindeua.activeUsers +
            groupsData.natal.activeUsers +
            groupsData.mogi.activeUsers +
            groupsData.nacional.activeUsers,
          totalHours:
            groupsData.ananindeua.totalHours +
            groupsData.natal.totalHours +
            groupsData.mogi.totalHours +
            groupsData.nacional.totalHours,
          meetings: {
            total: 4,
            attended: [
              { name: "Encontro 1", participants: 892, modality: "Presencial" },
              { name: "Encontro 2", participants: 834, modality: "Online" },
              { name: "Encontro 3", participants: 0, modality: "Online" },
              { name: "Encontro 4", participants: 0, modality: "Presencial" },
            ],
          },
          minicourses: {
            course1: {
              completed:
                groupsData.ananindeua.minicourses.course1.completed +
                groupsData.natal.minicourses.course1.completed +
                groupsData.mogi.minicourses.course1.completed +
                groupsData.nacional.minicourses.course1.completed,
              inProgress:
                groupsData.ananindeua.minicourses.course1.inProgress +
                groupsData.natal.minicourses.course1.inProgress +
                groupsData.mogi.minicourses.course1.inProgress +
                groupsData.nacional.minicourses.course1.inProgress,
              notStarted:
                groupsData.ananindeua.minicourses.course1.notStarted +
                groupsData.natal.minicourses.course1.notStarted +
                groupsData.mogi.minicourses.course1.notStarted +
                groupsData.nacional.minicourses.course1.notStarted,
            },
            course2: {
              completed:
                groupsData.ananindeua.minicourses.course2.completed +
                groupsData.natal.minicourses.course2.completed +
                groupsData.mogi.minicourses.course2.completed +
                groupsData.nacional.minicourses.course2.completed,
              inProgress:
                groupsData.ananindeua.minicourses.course2.inProgress +
                groupsData.natal.minicourses.course2.inProgress +
                groupsData.mogi.minicourses.course2.inProgress +
                groupsData.nacional.minicourses.course2.inProgress,
              notStarted:
                groupsData.ananindeua.minicourses.course2.notStarted +
                groupsData.natal.minicourses.course2.notStarted +
                groupsData.mogi.minicourses.course2.notStarted +
                groupsData.nacional.minicourses.course2.notStarted,
            },
          },
          challenge: {
            participants:
              groupsData.ananindeua.challenge.participants +
              groupsData.natal.challenge.participants +
              groupsData.mogi.challenge.participants +
              groupsData.nacional.challenge.participants,
            submissions:
              groupsData.ananindeua.challenge.submissions +
              groupsData.natal.challenge.submissions +
              groupsData.mogi.challenge.submissions +
              groupsData.nacional.challenge.submissions,
          },
          digitalResources: {
            accessed:
              groupsData.ananindeua.digitalResources.accessed +
              groupsData.natal.digitalResources.accessed +
              groupsData.mogi.digitalResources.accessed +
              groupsData.nacional.digitalResources.accessed,
            downloaded:
              groupsData.ananindeua.digitalResources.downloaded +
              groupsData.natal.digitalResources.downloaded +
              groupsData.mogi.digitalResources.downloaded +
              groupsData.nacional.digitalResources.downloaded,
          },
        }
      : groupsData[selectedGroup as keyof typeof groupsData]

  const minicourseData = [
    {
      name: "Minicurso 1",
      completed: currentGroup.minicourses.course1.completed,
      inProgress: currentGroup.minicourses.course1.inProgress,
      notStarted: currentGroup.minicourses.course1.notStarted,
    },
    {
      name: "Minicurso 2",
      completed: currentGroup.minicourses.course2.completed,
      inProgress: currentGroup.minicourses.course2.inProgress,
      notStarted: currentGroup.minicourses.course2.notStarted,
    },
  ]

  const participantsList = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@escola.com",
      progress: 75,
      totalHours: 24,
      meetingsAttended: 2,
      coursesCompleted: 1,
      uploadsCount: 5,
      challengeParticipation: true,
      resourcesAccessed: 12,
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao@escola.com",
      progress: 45,
      totalHours: 18,
      meetingsAttended: 1,
      coursesCompleted: 0,
      uploadsCount: 3,
      challengeParticipation: false,
      resourcesAccessed: 8,
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana@escola.com",
      progress: 90,
      totalHours: 32,
      meetingsAttended: 2,
      coursesCompleted: 2,
      uploadsCount: 8,
      challengeParticipation: true,
      resourcesAccessed: 18,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: "#DA291C" }}>
          Análise de Grupos
        </h2>
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ananindeua">Ananindeua</SelectItem>
            <SelectItem value="natal">Natal</SelectItem>
            <SelectItem value="mogi">Mogi das Cruzes</SelectItem>
            <SelectItem value="nacional">Nacional</SelectItem>
            <SelectItem value="geral">Geral (Todos)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#DA291C" }}>
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total de Usuários</p>
                <p className="text-xl font-bold">{currentGroup.totalUsers}</p>
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
                <p className="text-sm text-gray-600">Usuários Ativos</p>
                <p className="text-xl font-bold">{currentGroup.activeUsers}</p>
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
                <p className="text-sm text-gray-600">Horas Totais</p>
                <p className="text-xl font-bold">{currentGroup.totalHours}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-600">
                <Trophy className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Progresso Médio</p>
                <p className="text-xl font-bold">
                  {Math.round((currentGroup.activeUsers / currentGroup.totalUsers) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise Detalhada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Encontros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Participação em Encontros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentGroup.meetings.attended.map((meeting, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{meeting.name}</p>
                    <p className="text-sm text-gray-600">{meeting.modality}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{meeting.participants}</p>
                    <p className="text-sm text-gray-600">participantes</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Minicursos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Progresso em Minicursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={minicourseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" stackId="a" fill="#22c55e" />
                <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" />
                <Bar dataKey="notStarted" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Concluído</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Em Progresso</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Não Iniciado</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Desafio Escolar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Desafio Escolar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Participantes:</span>
                <span className="font-bold">{currentGroup.challenge.participants}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Projetos Enviados:</span>
                <span className="font-bold">{currentGroup.challenge.submissions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Taxa de Envio:</span>
                <span className="font-bold">
                  {Math.round((currentGroup.challenge.submissions / currentGroup.challenge.participants) * 100)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recursos Digitais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Recursos Digitais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Usuários que Acessaram:</span>
                <span className="font-bold">{currentGroup.digitalResources.accessed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total de Downloads:</span>
                <span className="font-bold">{currentGroup.digitalResources.downloaded}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Média por Usuário:</span>
                <span className="font-bold">
                  {Math.round(currentGroup.digitalResources.downloaded / currentGroup.digitalResources.accessed)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Participantes */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Participantes do Grupo - {currentGroup.name}</CardTitle>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Lista
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {participantsList.map((participant) => (
              <div key={participant.id} className="border rounded-lg">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedParticipant(expandedParticipant === participant.id ? null : participant.id)}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-sm text-gray-600">{participant.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ backgroundColor: "#DA291C", width: `${participant.progress}%` }}
                        />
                      </div>
                      <span className="text-sm">{participant.progress}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={participant.challengeParticipation ? "default" : "secondary"}>
                      {participant.challengeParticipation ? "Participando" : "Não Participando"}
                    </Badge>
                    <span className="text-sm text-gray-500">{participant.totalHours}h</span>
                  </div>
                </div>

                {expandedParticipant === participant.id && (
                  <div className="border-t bg-gray-50 p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Encontros</p>
                        <p className="font-bold">{participant.meetingsAttended}/4</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Cursos</p>
                        <p className="font-bold">{participant.coursesCompleted}/2</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Uploads</p>
                        <p className="font-bold">{participant.uploadsCount}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Recursos</p>
                        <p className="font-bold">{participant.resourcesAccessed}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
