"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, BookOpen, Trophy, Upload, Plus, Trash2 } from "lucide-react"

interface AdminContentFormProps {
  onBack: () => void
}

export default function AdminContentForm({ onBack }: AdminContentFormProps) {
  const [contentType, setContentType] = useState("")
  const [modules, setModules] = useState([{ title: "", contents: [{ title: "", type: "video" }] }])

  const addModule = () => {
    setModules([...modules, { title: "", contents: [{ title: "", type: "video" }] }])
  }

  const addContent = (moduleIndex: number) => {
    const newModules = [...modules]
    newModules[moduleIndex].contents.push({ title: "", type: "video" })
    setModules(newModules)
  }

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index))
  }

  const removeContent = (moduleIndex: number, contentIndex: number) => {
    const newModules = [...modules]
    newModules[moduleIndex].contents = newModules[moduleIndex].contents.filter((_, i) => i !== contentIndex)
    setModules(newModules)
  }

  const renderMeetingForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          <Input placeholder="Ex: Visão de Inovação Educacional" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Data</label>
          <Input type="date" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descrição</label>
        <Textarea placeholder="Descrição do encontro..." rows={3} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Modalidade</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a modalidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="presencial">Presencial</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="hibrido">Híbrido</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Duração</label>
          <Input placeholder="Ex: 3h" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Link do Encontro</label>
        <Input placeholder="https://..." />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Atividade da Aula</label>
        <Textarea placeholder="Instruções da atividade..." rows={4} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Anexos (Materiais do Encontro)</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
          <Button variant="outline">Selecionar Arquivos</Button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Link da Gravação</label>
        <Input placeholder="https://..." />
      </div>
    </div>
  )

  const renderCourseForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          <Input placeholder="Ex: Planejamento Inovador com Tecnologia" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Subtítulo</label>
          <Input placeholder="Capacitação para uso estratégico..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Duração Estimada</label>
          <Input placeholder="Ex: 6 horas" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Prazo</label>
          <Input type="date" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descrição</label>
        <Textarea placeholder="Descrição do minicurso..." rows={3} />
      </div>

      {/* Módulos */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium" style={{ color: "#DA291C" }}>
            Módulos do Curso
          </h3>
          <Button onClick={addModule} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Módulo
          </Button>
        </div>

        {modules.map((module, moduleIndex) => (
          <Card key={moduleIndex} className="mb-4">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Módulo {moduleIndex + 1}</CardTitle>
                {modules.length > 1 && (
                  <Button onClick={() => removeModule(moduleIndex)} variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título do Módulo</label>
                <Input
                  placeholder="Ex: O que é Inovação Educacional?"
                  value={module.title}
                  onChange={(e) => {
                    const newModules = [...modules]
                    newModules[moduleIndex].title = e.target.value
                    setModules(newModules)
                  }}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium">Conteúdos do Módulo</label>
                  <Button onClick={() => addContent(moduleIndex)} variant="outline" size="sm">
                    <Plus className="h-3 w-3 mr-1" />
                    Adicionar Conteúdo
                  </Button>
                </div>

                {module.contents.map((content, contentIndex) => (
                  <div key={contentIndex} className="border rounded-lg p-3 mb-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1">Título</label>
                        <Input
                          placeholder="Título do conteúdo"
                          size="sm"
                          value={content.title}
                          onChange={(e) => {
                            const newModules = [...modules]
                            newModules[moduleIndex].contents[contentIndex].title = e.target.value
                            setModules(newModules)
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Tipo</label>
                        <Select
                          value={content.type}
                          onValueChange={(value) => {
                            const newModules = [...modules]
                            newModules[moduleIndex].contents[contentIndex].type = value
                            setModules(newModules)
                          }}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Vídeo</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                            <SelectItem value="activity">Atividade</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        {module.contents.length > 1 && (
                          <Button
                            onClick={() => removeContent(moduleIndex, contentIndex)}
                            variant="ghost"
                            size="sm"
                            className="h-8"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-xs font-medium mb-1">Upload do Conteúdo</label>
                      <div className="border border-dashed border-gray-300 rounded p-2 text-center">
                        <Upload className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Clique para fazer upload</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-xs font-medium mb-1">Descrição</label>
                      <Textarea placeholder="Descrição do conteúdo..." rows={2} className="text-sm" />
                    </div>

                    <div className="mt-3">
                      <label className="block text-xs font-medium mb-1">Transcrição (Acessibilidade)</label>
                      <Textarea placeholder="Transcrição para fins de acessibilidade..." rows={3} className="text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderChallengeForm = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Título do Desafio</label>
        <Input placeholder="Ex: Cidadania Digital na Prática" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descrição</label>
        <Textarea placeholder="Descrição detalhada do desafio..." rows={4} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Critérios de Avaliação</label>
        <Textarea placeholder="Liste os critérios de avaliação..." rows={6} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Vídeo de Aprofundamento</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Upload do vídeo explicativo</p>
          <Button variant="outline">Selecionar Vídeo</Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 mb-4 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Gerenciamento
          </Button>
          <h1 className="text-2xl font-bold" style={{ color: "#DA291C" }}>
            Adicionar Novo Conteúdo
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tipo de Conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card
                className={`cursor-pointer transition-all ${contentType === "meeting" ? "ring-2 ring-red-500" : "hover:shadow-md"}`}
                onClick={() => setContentType("meeting")}
              >
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2" style={{ color: "#DA291C" }} />
                  <h3 className="font-medium">Encontro</h3>
                  <p className="text-sm text-gray-600">Encontro formativo</p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${contentType === "course" ? "ring-2 ring-red-500" : "hover:shadow-md"}`}
                onClick={() => setContentType("course")}
              >
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2" style={{ color: "#DA291C" }} />
                  <h3 className="font-medium">Minicurso</h3>
                  <p className="text-sm text-gray-600">Curso assíncrono</p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${contentType === "challenge" ? "ring-2 ring-red-500" : "hover:shadow-md"}`}
                onClick={() => setContentType("challenge")}
              >
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2" style={{ color: "#DA291C" }} />
                  <h3 className="font-medium">Desafio</h3>
                  <p className="text-sm text-gray-600">Desafio escolar</p>
                </CardContent>
              </Card>
            </div>

            {contentType && (
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: "#DA291C" }}>
                  {contentType === "meeting"
                    ? "Configurar Encontro"
                    : contentType === "course"
                      ? "Configurar Minicurso"
                      : "Configurar Desafio"}
                </h3>

                {contentType === "meeting" && renderMeetingForm()}
                {contentType === "course" && renderCourseForm()}
                {contentType === "challenge" && renderChallengeForm()}

                <div className="flex gap-3 pt-6 border-t mt-6">
                  <Button className="text-white" style={{ backgroundColor: "#DA291C" }}>
                    Salvar Conteúdo
                  </Button>
                  <Button variant="outline" onClick={onBack}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
