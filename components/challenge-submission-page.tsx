"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, FileText, Target, Clock, CheckCircle } from "lucide-react"

interface ChallengeSubmissionPageProps {
  onBack: () => void
}

export default function ChallengeSubmissionPage({ onBack }: ChallengeSubmissionPageProps) {
  const [formData, setFormData] = useState({
    projectTitle: "",
    schoolName: "",
    studentAge: "",
    participantCount: "",
    duration: "",
    description: "",
    objectives: "",
    methodology: "",
    expectedResults: "",
    resources: "",
  })
  const [files, setFiles] = useState<File[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    setFiles((prev) => [...prev, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log("Enviando projeto:", { formData, files })
    // Aqui seria a lógica de envio
    onBack()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 mb-4 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Desafio
          </Button>
          <h1 className="text-2xl font-bold" style={{ color: "#DA291C" }}>
            Submeter Proposta - Cidadania Digital na Prática
          </h1>
          <p className="text-gray-600 mt-2">
            Desenvolva um projeto com seus alunos que integre tecnologia e cidadania digital
          </p>
        </div>

        <div className="space-y-6">
          {/* Instruções */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: "#DA291C" }}>
                <FileText className="h-5 w-5" />
                Instruções do Projeto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2 text-blue-800">Objetivo do Desafio:</h4>
                <p className="text-sm text-blue-700">
                  Criar um projeto prático que desenvolva competências de cidadania digital em seus alunos, abordando
                  temas como uso ético da tecnologia, segurança online e pensamento crítico digital.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium" style={{ color: "#DA291C" }}>
                    Requisitos Obrigatórios:
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Integração de tecnologia ao currículo
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Desenvolvimento da cidadania digital
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Engajamento dos estudantes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Impacto na comunidade escolar
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium" style={{ color: "#DA291C" }}>
                    Entregáveis:
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      Plano detalhado do projeto
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      Materiais didáticos desenvolvidos
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      Evidências de implementação
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      Relatório de resultados
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    Prazo para submissão: 15 de dezembro de 2025
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formulário */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Projeto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Título do Projeto *</label>
                  <Input
                    placeholder="Ex: Navegando com Segurança no Mundo Digital"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nome da Escola *</label>
                  <Input
                    placeholder="Nome da instituição de ensino"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Faixa Etária dos Alunos *</label>
                  <Select
                    value={formData.studentAge}
                    onValueChange={(value) => setFormData({ ...formData, studentAge: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-8">6 a 8 anos</SelectItem>
                      <SelectItem value="9-11">9 a 11 anos</SelectItem>
                      <SelectItem value="12-14">12 a 14 anos</SelectItem>
                      <SelectItem value="15-17">15 a 17 anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Número de Participantes *</label>
                  <Input
                    type="number"
                    placeholder="Ex: 30"
                    value={formData.participantCount}
                    onChange={(e) => setFormData({ ...formData, participantCount: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duração do Projeto *</label>
                  <Input
                    placeholder="Ex: 4 semanas"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
              </div>

              {/* Descrição do Projeto */}
              <div>
                <label className="block text-sm font-medium mb-2">Descrição Geral do Projeto *</label>
                <Textarea
                  placeholder="Descreva o projeto, seu contexto e relevância..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Objetivos */}
              <div>
                <label className="block text-sm font-medium mb-2">Objetivos de Aprendizagem *</label>
                <Textarea
                  placeholder="Liste os objetivos específicos que pretende alcançar com o projeto..."
                  rows={3}
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                />
              </div>

              {/* Metodologia */}
              <div>
                <label className="block text-sm font-medium mb-2">Metodologia e Atividades *</label>
                <Textarea
                  placeholder="Descreva as atividades planejadas, metodologias utilizadas e cronograma..."
                  rows={4}
                  value={formData.methodology}
                  onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                />
              </div>

              {/* Resultados Esperados */}
              <div>
                <label className="block text-sm font-medium mb-2">Resultados Esperados *</label>
                <Textarea
                  placeholder="Descreva os resultados e impactos esperados do projeto..."
                  rows={3}
                  value={formData.expectedResults}
                  onChange={(e) => setFormData({ ...formData, expectedResults: e.target.value })}
                />
              </div>

              {/* Recursos Tecnológicos */}
              <div>
                <label className="block text-sm font-medium mb-2">Recursos Tecnológicos Utilizados *</label>
                <Textarea
                  placeholder="Liste as tecnologias, aplicativos, plataformas que serão utilizados..."
                  rows={3}
                  value={formData.resources}
                  onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Upload de Arquivos */}
          <Card>
            <CardHeader>
              <CardTitle>Anexos do Projeto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Anexe materiais como planos de aula, apresentações, atividades desenvolvidas
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Formatos aceitos: PDF, DOC, DOCX, PPT, PPTX (máx. 10MB cada)
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                  />
                  <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                    Selecionar Arquivos
                  </Button>
                </div>

                {files.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Arquivos Anexados:</h4>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium">{file.name}</span>
                            <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                            Remover
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSubmit} className="text-white" style={{ backgroundColor: "#DA291C" }}>
              <Upload className="h-4 w-4 mr-2" />
              Submeter Projeto
            </Button>
            <Button variant="outline" onClick={onBack}>
              Salvar Rascunho
            </Button>
            <Button variant="outline" onClick={onBack}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
