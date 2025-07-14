"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Upload, FileText, Clock } from "lucide-react"

interface TaskSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  meetingTitle: string
}

export default function TaskSubmissionModal({ isOpen, onClose, meetingTitle }: TaskSubmissionModalProps) {
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<File[]>([])

  if (!isOpen) return null

  const taskInstructions = {
    "Visão de Inovação Educacional": {
      title: "Diagnóstico da Prática Docente",
      description:
        "Realize um diagnóstico reflexivo sobre sua prática docente atual, identificando pontos de melhoria e oportunidades de inovação.",
      instructions: [
        "1. Reflita sobre suas práticas pedagógicas atuais",
        "2. Identifique 3 desafios principais em sua sala de aula",
        "3. Proponha 2 soluções inovadoras para cada desafio",
        "4. Descreva como a tecnologia pode auxiliar nessas soluções",
        "5. Elabore um plano de ação para implementar uma das soluções",
      ],
      deadline: "7 dias após o encontro",
      points: 150,
    },
    "Cidadania e Cultura Digital": {
      title: "Plano de Aula - Cidadania Digital",
      description:
        "Desenvolva um plano de aula que integre conceitos de cidadania digital adequados à sua realidade escolar.",
      instructions: [
        "1. Escolha uma faixa etária específica",
        "2. Defina objetivos de aprendizagem claros",
        "3. Selecione um tema de cidadania digital relevante",
        "4. Desenvolva atividades práticas e interativas",
        "5. Inclua critérios de avaliação",
        "6. Anexe recursos digitais que serão utilizados",
      ],
      deadline: "10 dias após o encontro",
      points: 200,
    },
  }

  const currentTask =
    taskInstructions[meetingTitle as keyof typeof taskInstructions] || taskInstructions["Visão de Inovação Educacional"]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    setFiles((prev) => [...prev, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // Aqui seria a lógica de envio
    console.log("Enviando atividade:", { description, files })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2" style={{ color: "#DA291C" }}>
            <Upload className="h-5 w-5" />
            Enviar Atividade - {meetingTitle}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[70vh] space-y-6">
          {/* Informações da Atividade */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">{currentTask.title}</h3>
            <p className="text-gray-700 mb-4">{currentTask.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Prazo: {currentTask.deadline}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Pontuação: {currentTask.points} XP</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2" style={{ color: "#DA291C" }}>
                Instruções:
              </h4>
              <ul className="space-y-1">
                {currentTask.instructions.map((instruction, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Área de Upload */}
          <div>
            <h4 className="font-medium mb-3" style={{ color: "#DA291C" }}>
              Anexar Arquivos:
            </h4>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Arraste seus arquivos aqui ou clique para selecionar</p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
              />
              <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                Selecionar Arquivos
              </Button>
            </div>

            {files.length > 0 && (
              <div className="mt-4">
                <h5 className="font-medium mb-2">Arquivos Selecionados:</h5>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Descrição */}
          <div>
            <h4 className="font-medium mb-3" style={{ color: "#DA291C" }}>
              Descrição da Atividade:
            </h4>
            <Textarea
              placeholder="Descreva sua atividade, metodologia utilizada, resultados obtidos..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="text-white" style={{ backgroundColor: "#DA291C" }} onClick={handleSubmit}>
              Enviar Atividade
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
