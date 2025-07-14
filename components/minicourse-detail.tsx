"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, Clock, Play, FileText, Download, Upload, BookOpen, Video } from "lucide-react"
import ContentConsumptionPage from "@/components/content-consumption-page" // Import ContentConsumptionPage

interface MinicourseDetailProps {
  courseId: number
  onBack: () => void
}

export default function MinicourseDetail({ courseId, onBack }: MinicourseDetailProps) {
  const [activeModule, setActiveModule] = useState(0)

  // Adicionar estado para controlar a página de consumo de conteúdo
  const [showContentConsumption, setShowContentConsumption] = useState(false)
  const [selectedContent, setSelectedContent] = useState(null)

  const courseData = {
    1: {
      title: "Planejamento Inovador com Tecnologia",
      description: "Capacitação para uso estratégico da tecnologia no planejamento pedagógico",
      progress: 60,
      modules: [
        {
          title: "O que é Inovação Educacional?",
          completed: true,
          contents: [
            { type: "video", title: "Introdução à Inovação Educacional", duration: "15 min" },
            { type: "pdf", title: "Guia de Inovação na Educação", pages: "12 páginas" },
            { type: "quiz", title: "Quiz: Conceitos Básicos", questions: "5 questões" },
          ],
        },
        {
          title: "Planejamento com Tecnologia",
          completed: true,
          contents: [
            { type: "video", title: "Ferramentas de Planejamento Digital", duration: "20 min" },
            { type: "pdf", title: "Template de Plano de Aula Digital", pages: "8 páginas" },
          ],
        },
        {
          title: "Personalização da Aprendizagem",
          completed: true,
          contents: [
            { type: "video", title: "Estratégias de Personalização", duration: "18 min" },
            { type: "pdf", title: "Casos de Sucesso", pages: "15 páginas" },
          ],
        },
        {
          title: "Tecnologia e Inclusão Escolar",
          completed: false,
          current: true,
          contents: [
            { type: "video", title: "Tecnologia Assistiva na Educação", duration: "22 min" },
            { type: "pdf", title: "Guia de Acessibilidade Digital", pages: "10 páginas" },
            { type: "activity", title: "Atividade Prática: Plano Inclusivo" },
          ],
        },
        {
          title: "Cultura Digital e a BNCC",
          completed: false,
          contents: [
            { type: "video", title: "BNCC e Competências Digitais", duration: "25 min" },
            { type: "pdf", title: "Mapeamento BNCC x Tecnologia", pages: "20 páginas" },
          ],
        },
        {
          title: "Prática Guiada: Redesenho de uma Aula",
          completed: false,
          isActivity: true,
          contents: [
            {
              type: "activity",
              title: "Atividade Final: Redesenho de Aula",
              description:
                "Escolha uma aula do seu planejamento atual e redesenhe-a integrando tecnologias educacionais. Considere os aspectos de personalização, inclusão e alinhamento com a BNCC.",
              instructions: [
                "1. Selecione uma aula de qualquer disciplina que você leciona",
                "2. Identifique as competências da BNCC relacionadas",
                "3. Escolha pelo menos 2 tecnologias educacionais para integrar",
                "4. Desenvolva estratégias de personalização para diferentes perfis de alunos",
                "5. Inclua elementos de acessibilidade e inclusão",
                "6. Documente todo o processo em um relatório de 2-3 páginas",
              ],
              attachments: [
                { name: "Template de Plano de Aula", type: "docx" },
                { name: "Checklist de Avaliação", type: "pdf" },
              ],
            },
          ],
        },
      ],
    },
    2: {
      title: "Competências Digitais e Cidadania Digital",
      description: "Desenvolvimento de competências digitais docentes para uso crítico e ético das tecnologias",
      progress: 0,
      modules: [
        {
          title: "Competência Digital Docente",
          completed: false,
          contents: [
            { type: "video", title: "Fundamentos da Competência Digital", duration: "18 min" },
            { type: "pdf", title: "Framework de Competências", pages: "14 páginas" },
          ],
        },
        {
          title: "Cidadania Digital e BNCC",
          completed: false,
          contents: [
            { type: "video", title: "Cidadania Digital na Educação", duration: "22 min" },
            { type: "pdf", title: "Guia BNCC Cidadania Digital", pages: "16 páginas" },
          ],
        },
        {
          title: "Comunicação e Colaboração",
          completed: false,
          contents: [
            { type: "video", title: "Ferramentas de Comunicação", duration: "20 min" },
            { type: "pdf", title: "Estratégias de Colaboração", pages: "12 páginas" },
          ],
        },
        {
          title: "Tecnologia e Bem-estar",
          completed: false,
          contents: [
            { type: "video", title: "Bem-estar Digital", duration: "25 min" },
            { type: "pdf", title: "Guia de Saúde Mental Digital", pages: "18 páginas" },
          ],
        },
        {
          title: "Tecnologias em diferentes modelos",
          completed: false,
          contents: [
            { type: "video", title: "Modelos de Ensino Híbrido", duration: "30 min" },
            { type: "pdf", title: "Comparativo de Modelos", pages: "20 páginas" },
          ],
        },
        {
          title: "Prática Guiada: Ação de Cidadania Digital",
          completed: false,
          isActivity: true,
          contents: [
            {
              type: "activity",
              title: "Atividade Final: Projeto de Cidadania Digital",
              description:
                "Desenvolva um projeto prático de cidadania digital para implementar com seus alunos, abordando uso ético da tecnologia e pensamento crítico digital.",
              instructions: [
                "1. Defina o público-alvo (faixa etária dos alunos)",
                "2. Escolha um tema específico de cidadania digital",
                "3. Desenvolva atividades práticas e interativas",
                "4. Crie materiais de apoio para os alunos",
                "5. Estabeleça critérios de avaliação",
                "6. Documente o projeto completo",
              ],
              attachments: [
                { name: "Template de Projeto", type: "docx" },
                { name: "Rubrica de Avaliação", type: "pdf" },
              ],
            },
          ],
        },
      ],
    },
  }

  const course = courseData[courseId as keyof typeof courseData]
  const currentModule = course.modules[activeModule]

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "activity":
        return <Upload className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  // Adicionar condicional para renderizar a página de consumo
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
          setShowContentConsumption(false)
          setSelectedContent(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 mb-4 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Voltar aos Minicursos
          </Button>
          <h1 className="text-2xl font-bold" style={{ color: "#DA291C" }}>
            {course.title}
          </h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progresso do Curso</span>
              <span className="text-sm" style={{ color: "#DA291C" }}>
                {course.progress}%
              </span>
            </div>
            <Progress value={course.progress} className="h-3" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar com módulos */}
          <div className="lg:w-80">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg" style={{ color: "#DA291C" }}>
                  Módulos do Curso
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {course.modules.map((module, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveModule(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeModule === index
                          ? "text-white"
                          : module.completed
                            ? "bg-green-50 text-green-800 hover:bg-green-100"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                      style={activeModule === index ? { backgroundColor: "#DA291C" } : {}}
                    >
                      <div className="flex items-center gap-2">
                        {module.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : module.current ? (
                          <Clock className="h-4 w-4 text-orange-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="text-sm font-medium">{module.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {currentModule.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : currentModule.current ? (
                    <Clock className="h-5 w-5 text-orange-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400" />
                  )}
                  <CardTitle className="text-xl">{currentModule.title}</CardTitle>
                  {currentModule.isActivity && (
                    <Badge variant="outline" style={{ borderColor: "#DA291C", color: "#DA291C" }}>
                      Atividade Final
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {currentModule.isActivity ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-lg mb-3">{currentModule.contents[0].title}</h3>
                      <p className="text-gray-700 mb-4">{currentModule.contents[0].description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3" style={{ color: "#DA291C" }}>
                        Instruções Passo a Passo:
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <ul className="space-y-2">
                          {currentModule.contents[0].instructions.map((instruction, index) => (
                            <li key={index} className="text-sm text-gray-700">
                              {instruction}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3" style={{ color: "#DA291C" }}>
                        Materiais de Apoio:
                      </h4>
                      <div className="space-y-2">
                        {currentModule.contents[0].attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <FileText className="h-5 w-5 text-gray-600" />
                            <span className="flex-1 text-sm font-medium">{attachment.name}</span>
                            <Badge variant="outline">{attachment.type.toUpperCase()}</Badge>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Baixar
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-3" style={{ color: "#DA291C" }}>
                        Enviar Atividade:
                      </h4>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Arraste seus arquivos aqui ou clique para selecionar
                          </p>
                          <Button variant="outline">Selecionar Arquivos</Button>
                        </div>
                        <div className="flex gap-3">
                          <Button className="text-white" style={{ backgroundColor: "#DA291C" }}>
                            Enviar Atividade
                          </Button>
                          <Button variant="outline">Salvar Rascunho</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentModule.contents.map((content, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        {getContentIcon(content.type)}
                        <div className="flex-1">
                          <h4 className="font-medium">{content.title}</h4>
                          <p className="text-sm text-gray-600">
                            {content.duration || content.pages || content.questions}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="text-white"
                          style={{ backgroundColor: "#DA291C" }}
                          onClick={() => {
                            setSelectedContent({
                              type: content.type,
                              title: content.title,
                              duration: content.duration,
                              pages: content.pages,
                              moduleTitle: currentModule.title,
                              courseTitle: course.title,
                            })
                            setShowContentConsumption(true)
                          }}
                        >
                          {content.type === "video" ? (
                            <>
                              <Play className="h-3 w-3 mr-1" />
                              Assistir
                            </>
                          ) : content.type === "activity" ? (
                            <>
                              <Upload className="h-3 w-3 mr-1" />
                              Fazer
                            </>
                          ) : (
                            <>
                              <FileText className="h-3 w-3 mr-1" />
                              Abrir
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
