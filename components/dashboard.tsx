"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  User,
  LogOut,
  BookOpen,
  Calendar,
  Trophy,
  HelpCircle,
  MessageCircle,
  CheckCircle,
  Clock,
  Play,
  Upload,
  Lock,
  FileText,
  Download,
  Eye,
} from "lucide-react"
import Image from "next/image"
import MinicourseDetail from "./minicourse-detail"
import UploadHistory from "./upload-history"
import PointsExtractModal from "./points-extract-modal"
import TaskSubmissionModal from "./task-submission-modal"
import ContentViewerModal from "./content-viewer-modal"
import ChallengeSubmissionPage from "./challenge-submission-page"
import ContentConsumptionPage from "./content-consumption-page"

interface DashboardProps {
  userName: string
  onLogout: () => void
}

export default function Dashboard({ userName, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [showMinicourseDetail, setShowMinicourseDetail] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)

  const [showPointsExtract, setShowPointsExtract] = useState(false)
  const [showTaskSubmission, setShowTaskSubmission] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState("")
  const [showContentViewer, setShowContentViewer] = useState(false)
  const [selectedContent, setSelectedContent] = useState(null)

  // Adicionar novos estados para as novas páginas
  const [showContentConsumption, setShowContentConsumption] = useState(false)
  const [showChallengeSubmission, setShowChallengeSubmission] = useState(false)

  const overallProgress = 35
  const rankingPosition = 12
  const totalParticipants = 1247
  const totalScore = 2450

  const meetings = [
    {
      id: 1,
      title: "Visão de Inovação Educacional",
      date: "15/09/2025",
      format: "Presencial",
      duration: "3h",
      attended: true,
      recordingWatched: true,
      taskCompleted: true,
      attachments: [
        { name: "Apresentação - Inovação.pdf", type: "pdf" },
        { name: "Atividade Prática.docx", type: "docx" },
      ],
    },
    {
      id: 2,
      title: "Cidadania e Cultura Digital",
      date: "29/09/2025",
      format: "Online",
      duration: "2h",
      attended: true,
      recordingWatched: false,
      taskCompleted: false,
      attachments: [
        { name: "Guia Cidadania Digital.pdf", type: "pdf" },
        { name: "Template Plano de Aula.docx", type: "docx" },
      ],
    },
    {
      id: 3,
      title: "Competência Digital Docente",
      date: "13/10/2025",
      format: "Online",
      duration: "2h",
      attended: false,
      recordingWatched: false,
      attachments: [{ name: "Ferramentas Digitais.pdf", type: "pdf" }],
    },
    {
      id: 4,
      title: "Tecnologia e Bem-Estar",
      date: "10/11/2025",
      format: "Presencial",
      duration: "3h",
      attended: false,
      recordingWatched: false,
      taskCompleted: false,
      attachments: [
        { name: "Guia Bem-estar Digital.pdf", type: "pdf" },
        { name: "Checklist Segurança.pdf", type: "pdf" },
      ],
    },
  ]

  const minicourses = [
    {
      id: 1,
      title: "Planejamento Inovador com Tecnologia",
      description: "Capacitação para uso estratégico da tecnologia no planejamento pedagógico",
      duration: "6 horas",
      deadline: "28/11/2025",
      progress: 60,
      completed: false,
      steps: [
        { title: "O que é Inovação Educacional?", completed: true },
        { title: "Planejamento com Tecnologia", completed: true },
        { title: "Personalização da Aprendizagem", completed: true },
        { title: "Tecnologia e Inclusão Escolar", completed: false },
        { title: "Cultura Digital e a BNCC", completed: false },
        { title: "Prática Guiada: Redesenho de uma Aula", completed: false },
      ],
    },
    {
      id: 2,
      title: "Competências Digitais e Cidadania Digital",
      description: "Desenvolvimento de competências digitais docentes para uso crítico e ético das tecnologias",
      duration: "6-8 horas",
      deadline: "28/11/2025",
      progress: 0,
      completed: false,
      locked: true,
      steps: [
        { title: "Competência Digital Docente", completed: false },
        { title: "Cidadania Digital e BNCC", completed: false },
        { title: "Comunicação e Colaboração", completed: false },
        { title: "Tecnologia e Bem-estar", completed: false },
        { title: "Tecnologias em diferentes modelos", completed: false },
        { title: "Prática Guiada: Ação de Cidadania Digital", completed: false },
      ],
    },
  ]

  const educationalResources = [
    {
      id: 1,
      title: "Ferramentas de Colaboração",
      description: "Plataformas e apps para trabalho colaborativo em sala de aula",
      icon: "🤝",
      color: "bg-blue-100",
    },
    {
      id: 2,
      title: "Recursos de Gamificação",
      description: "Jogos educativos e estratégias de gamificação",
      icon: "🎮",
      color: "bg-purple-100",
    },
    {
      id: 3,
      title: "Avaliação Digital",
      description: "Ferramentas para avaliação e feedback online",
      icon: "📊",
      color: "bg-green-100",
    },
    {
      id: 4,
      title: "Criação de Conteúdo",
      description: "Apps e plataformas para criação de materiais didáticos",
      icon: "🎨",
      color: "bg-orange-100",
    },
    {
      id: 5,
      title: "Acessibilidade Digital",
      description: "Recursos para inclusão e acessibilidade",
      icon: "♿",
      color: "bg-teal-100",
    },
    {
      id: 6,
      title: "Segurança Online",
      description: "Guias e recursos sobre segurança digital",
      icon: "🔒",
      color: "bg-red-100",
    },
  ]

  const renderHome = () => (
    <div className="space-y-6">
      {/* Boas-vindas */}
      <Card className="border-l-4" style={{ borderLeftColor: "#DA291C" }}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Image
              src="/images/instituto-claro-logo.png"
              alt="Instituto Claro"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>
          <CardTitle className="text-2xl" style={{ color: "#DA291C" }}>
            Bem-vindo, {userName}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-bold mb-3" style={{ color: "#2D2926" }}>
            Programa Educonexão 2025
          </h2>
          <p className="text-gray-700 mb-4">
            O Educonexão é um programa do Instituto Claro que visa qualificar educadores para o uso de novas tecnologias
            em sala de aula. Desde 2011, capacitamos milhares de educadores, conectando escolas e beneficiando
            estudantes em todo o Brasil.
          </p>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progresso da Jornada</span>
              <span className="text-sm font-medium" style={{ color: "#DA291C" }}>
                {overallProgress}%
              </span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Guia da Plataforma */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: "#DA291C" }}>
            <BookOpen className="h-5 w-5" />
            Como usar a plataforma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: "#DA291C" }}
                >
                  1
                </div>
                <div>
                  <h4 className="font-medium">Acompanhe seu progresso</h4>
                  <p className="text-sm text-gray-600">Visualize seu avanço em cada eixo do programa</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: "#DA291C" }}
                >
                  2
                </div>
                <div>
                  <h4 className="font-medium">Participe dos encontros</h4>
                  <p className="text-sm text-gray-600">Encontros presenciais e online com datas programadas</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: "#DA291C" }}
                >
                  3
                </div>
                <div>
                  <h4 className="font-medium">Complete os minicursos</h4>
                  <p className="text-sm text-gray-600">Conteúdos assíncronos para aprofundar seu conhecimento</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: "#DA291C" }}
                >
                  4
                </div>
                <div>
                  <h4 className="font-medium">Participe do desafio</h4>
                  <p className="text-sm text-gray-600">Desenvolva projetos práticos com seus alunos</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progresso e Ranking */}
      <Card>
        <CardHeader>
          <CardTitle style={{ color: "#DA291C" }}>Progresso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold" style={{ color: "#DA291C" }}>
                  Sua Posição no Ranking
                </h3>
                <p className="text-2xl font-bold text-gray-800">#3 de 47 educadores em Ananindeua</p>
                <p className="text-sm text-gray-600 mt-1">
                  #{rankingPosition} de {totalParticipants} educadores no Brasil
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-bold" style={{ color: "#DA291C" }}>
                  Pontuação Total
                </h3>
                <p className="text-2xl font-bold text-gray-800">{totalScore} XP</p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                style={{ borderColor: "#DA291C", color: "#DA291C" }}
                onClick={() => setShowPointsExtract(true)}
              >
                Ver Extrato de Pontos
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Minicursos</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: "#DA291C" }}>
                      30%
                    </span>
                    <Badge variant="outline" style={{ borderColor: "#DA291C", color: "#DA291C" }}>
                      750 XP
                    </Badge>
                  </div>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Formações Presenciais</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: "#DA291C" }}>
                      50%
                    </span>
                    <Badge variant="outline" style={{ borderColor: "#DA291C", color: "#DA291C" }}>
                      900 XP
                    </Badge>
                  </div>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Formações Online</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: "#DA291C" }}>
                      25%
                    </span>
                    <Badge variant="outline" style={{ borderColor: "#DA291C", color: "#DA291C" }}>
                      600 XP
                    </Badge>
                  </div>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Desafio Escolar</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: "#DA291C" }}>
                      0%
                    </span>
                    <Badge variant="outline" style={{ borderColor: "#DA291C", color: "#DA291C" }}>
                      200 XP
                    </Badge>
                  </div>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderMeetings = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: "#DA291C" }}>
            <Calendar className="h-5 w-5" />
            Encontros Formativos
          </CardTitle>
          <p className="text-gray-600">Acompanhe suas participações e acesse as gravações</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="border rounded-lg p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{meeting.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{meeting.date}</Badge>
                        <Badge variant="outline">{meeting.format}</Badge>
                        <Badge variant="outline">{meeting.duration}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {meeting.attended ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="text-sm">{meeting.attended ? "Participou" : "Não participou"}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 bg-transparent"
                          style={{ borderColor: "#DA291C", color: "#DA291C" }}
                        >
                          <Calendar className="h-3 w-3" />
                          Acessar Link
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 bg-transparent"
                          disabled={!meeting.attended}
                        >
                          <Play className="h-3 w-3" />
                          Gravação
                          {meeting.recordingWatched && <CheckCircle className="h-3 w-3 text-green-600" />}
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant={meeting.taskCompleted ? "default" : "outline"}
                        className="flex items-center gap-1"
                        style={meeting.taskCompleted ? { backgroundColor: "#DA291C" } : {}}
                        onClick={() => {
                          if (!meeting.taskCompleted) {
                            setSelectedMeeting(meeting.title)
                            setShowTaskSubmission(true)
                          }
                        }}
                      >
                        {meeting.taskCompleted ? (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            Tarefa Concluída
                          </>
                        ) : (
                          <>
                            <Upload className="h-3 w-3" />
                            Enviar Tarefa
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Área de Anexos */}
                  {meeting.attachments.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Materiais do Encontro:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {meeting.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <FileText className="h-4 w-4 text-gray-600" />
                            <span className="flex-1 text-sm font-medium">{attachment.name}</span>
                            <Badge variant="outline">{attachment.type.toUpperCase()}</Badge>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <UploadHistory section="Encontros" />
    </div>
  )

  const renderMinicourses = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: "#DA291C" }}>
            <BookOpen className="h-5 w-5" />
            Minicursos Assíncronos
          </CardTitle>
          <p className="text-gray-600">Complete os minicursos no seu próprio ritmo</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {minicourses.map((course) => (
              <div key={course.id} className={`border rounded-lg p-4 ${course.locked ? "opacity-60 bg-gray-50" : ""}`}>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-lg">{course.title}</h3>
                    {course.locked && <Lock className="h-4 w-4 text-gray-500" />}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">Duração: {course.duration}</Badge>
                    <Badge variant="outline">Prazo: {course.deadline}</Badge>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Progresso</span>
                      <span className="text-sm" style={{ color: "#DA291C" }}>
                        {course.progress}%
                      </span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm mb-2">Módulos:</h4>
                  {course.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {step.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={step.completed ? "text-green-700" : "text-gray-600"}>{step.title}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  <Button
                    className="text-white"
                    style={{ backgroundColor: course.locked ? "#9CA3AF" : "#DA291C" }}
                    disabled={course.locked}
                    onClick={() => {
                      if (!course.locked) {
                        setSelectedCourseId(course.id)
                        setShowMinicourseDetail(true)
                      }
                    }}
                  >
                    {course.locked ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Bloqueado
                      </>
                    ) : course.progress > 0 ? (
                      "Continuar Minicurso"
                    ) : (
                      "Iniciar Minicurso"
                    )}
                  </Button>
                  {course.completed ? (
                    <Button variant="outline">
                      <Trophy className="h-4 w-4 mr-2" />
                      Certificado
                    </Button>
                  ) : (
                    <Button variant="outline" disabled className="opacity-50 bg-transparent">
                      <Lock className="h-4 w-4 mr-2" />
                      Certificado Bloqueado
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <UploadHistory section="Minicursos" />
    </div>
  )

  // Modificar o renderChallenge para incluir o vídeo de instrução
  const renderChallenge = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: "#DA291C" }}>
            <Trophy className="h-5 w-5" />
            Desafio Escolar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-3">Projeto: Cidadania Digital na Prática</h3>
                <p className="text-gray-700 mb-4">
                  Desenvolva um projeto com seus alunos que integre tecnologia e cidadania digital. O projeto deve
                  abordar temas como uso ético da tecnologia, segurança online e pensamento crítico no ambiente digital.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Critérios de Avaliação:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Integração de tecnologia ao currículo</li>
                    <li>• Desenvolvimento da cidadania digital</li>
                    <li>• Engajamento dos estudantes</li>
                    <li>• Impacto na comunidade escolar</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="text-white"
                    style={{ backgroundColor: "#DA291C" }}
                    onClick={() => setShowChallengeSubmission(true)}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Submeter Proposta
                  </Button>
                  <Button variant="outline">
                    <Trophy className="h-4 w-4 mr-2" />
                    Ver Projetos
                  </Button>
                </div>
              </div>
            </div>

            {/* Vídeo de Instrução */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Vídeo de Instrução</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-3">
                    <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </button>
                  </div>
                  <h4 className="font-medium text-sm mb-2">Como Desenvolver seu Projeto</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Assista ao vídeo com orientações detalhadas sobre como estruturar e implementar seu projeto de
                    cidadania digital.
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Play className="h-3 w-3 mr-1" />
                    Assistir Vídeo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <UploadHistory section="Desafio Escolar" />
    </div>
  )

  const renderHelp = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: "#DA291C" }}>
            <HelpCircle className="h-5 w-5" />
            Precisa de Ajuda?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Entre em contato com nossa equipe</h3>
              <p className="text-gray-600 mb-4">
                Nossa equipe está pronta para ajudar você com qualquer dúvida sobre o programa, plataforma ou conteúdos
                formativos.
              </p>
              <Button className="text-white mb-4" style={{ backgroundColor: "#DA291C" }}>
                <HelpCircle className="h-4 w-4 mr-2" />
                Solicitar Ajuda
              </Button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Canal Oficial de Comunicação</h3>
              <p className="text-gray-600 mb-3">
                Nosso canal oficial de comunicação é o WhatsApp. Participe do grupo para receber atualizações, tirar
                dúvidas e interagir com outros educadores.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-800">Grupo WhatsApp Educonexão</h4>
                    <p className="text-sm text-green-600">Conecte-se com outros educadores</p>
                  </div>
                </div>
                <Button className="mt-3 bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Entrar no Grupo
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Contatos da Equipe</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>WhatsApp de atendimento:</strong> (11) 96623-8641
                </p>
                <p>
                  <strong>E-mail:</strong> marcelo@mgnconsultoria.com.br
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderEducationalResources = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: "#DA291C" }}>
            <BookOpen className="h-5 w-5" />
            Recursos Educacionais Digitais
          </CardTitle>
          <p className="text-gray-600">Curadoria de conteúdos educacionais selecionados pela equipe Claro</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg ${resource.color} flex items-center justify-center text-2xl mb-4`}
                  >
                    {resource.icon}
                  </div>
                  <h3 className="font-medium text-lg mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Explorar Recursos
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const navigation = [
    { id: "home", label: "Início", icon: User },
    { id: "meetings", label: "Encontros", icon: Calendar },
    { id: "minicourses", label: "Minicursos", icon: BookOpen },
    { id: "challenge", label: "Desafio", icon: Trophy },
    { id: "resources", label: "Recursos Digitais", icon: BookOpen },
    { id: "help", label: "Ajuda", icon: HelpCircle },
  ]

  if (showMinicourseDetail) {
    return (
      <MinicourseDetail
        courseId={selectedCourseId!}
        onBack={() => {
          setShowMinicourseDetail(false)
          setSelectedCourseId(null)
        }}
      />
    )
  }

  // Adicionar condicionais para renderizar as novas páginas
  if (showChallengeSubmission) {
    return <ChallengeSubmissionPage onBack={() => setShowChallengeSubmission(false)} />
  }

  if (showContentConsumption && selectedContent) {
    return (
      <ContentConsumptionPage
        content={selectedContent}
        onBack={() => {
          setShowContentConsumption(false)
          setSelectedContent(null)
        }}
        onComplete={() => {
          // Lógica para marcar conteúdo como concluído
          console.log("Conteúdo concluído")
        }}
      />
    )
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
                Educonexão
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Olá, {userName}</span>
              <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center gap-1 bg-transparent">
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
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
            {activeSection === "home" && renderHome()}
            {activeSection === "meetings" && renderMeetings()}
            {activeSection === "minicourses" && renderMinicourses()}
            {activeSection === "challenge" && renderChallenge()}
            {activeSection === "help" && renderHelp()}
            {activeSection === "resources" && renderEducationalResources()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Image
                src="/images/instituto-claro-logo.png"
                alt="Instituto Claro"
                width={150}
                height={50}
                className="h-8 w-auto mb-4"
              />
              <p className="text-sm text-gray-600">
                Programa de capacitação para professores em tecnologias educacionais.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-3" style={{ color: "#DA291C" }}>
                Programa Educonexão
              </h3>
              <p className="text-sm text-gray-600">
                Desde 2011 capacitando educadores e conectando escolas em todo o Brasil.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-3" style={{ color: "#DA291C" }}>
                Contato
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>WhatsApp: (11) 96623-8641</p>
                <p>E-mail: marcelo@mgnconsultoria.com.br</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
            <p>&copy; 2025 Instituto Claro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PointsExtractModal isOpen={showPointsExtract} onClose={() => setShowPointsExtract(false)} />

      <TaskSubmissionModal
        isOpen={showTaskSubmission}
        onClose={() => setShowTaskSubmission(false)}
        meetingTitle={selectedMeeting}
      />

      {selectedContent && (
        <ContentViewerModal
          isOpen={showContentViewer}
          onClose={() => {
            setShowContentViewer(false)
            setSelectedContent(null)
          }}
          content={selectedContent}
        />
      )}
    </div>
  )
}
