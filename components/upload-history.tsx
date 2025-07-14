"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, AlertCircle, Upload, FileText, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface UploadHistoryProps {
  section: string
}

export default function UploadHistory({ section }: UploadHistoryProps) {
  const uploads = [
    {
      id: 1,
      fileName: "Atividade_Modulo1_MariaS.pdf",
      activity: "Diagnóstico da Prática Docente",
      relatedTo: "Visão de Inovação Educacional",
      uploadDate: "15/09/2025",
      status: "approved",
      feedback: "Excelente trabalho! Demonstrou boa compreensão dos conceitos.",
      points: 300,
      validated: true,
    },
    {
      id: 2,
      fileName: "Plano_Aula_Digital.docx",
      activity: "Planejamento de aula com recursos digitais",
      relatedTo: "Cidadania e Cultura Digital",
      uploadDate: "02/10/2025",
      status: "pending",
      feedback: null,
      points: 0,
      validated: false,
    },
    {
      id: 3,
      fileName: "Projeto_Cidadania_Digital.pdf",
      activity: "Miniprojeto de cidadania digital",
      relatedTo: "Competência Digital Docente",
      uploadDate: "20/10/2025",
      status: "revision",
      feedback: "Bom projeto, mas precisa detalhar melhor a metodologia aplicada.",
      points: 0,
      validated: false,
    },
  ]

  // Adicionar estado para controlar a visualização expandida
  const [expandedUpload, setExpandedUpload] = useState<number | null>(null)

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

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: "#DA291C" }}>
          <Upload className="h-5 w-5" />
          Histórico de Envios - {section}
        </CardTitle>
        <p className="text-gray-600 text-sm">Acompanhe todos os seus envios e feedbacks recebidos</p>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-200">
          {uploads.map((item) => (
            <div key={item.id} className="py-4">
              <div
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() => setExpandedUpload(expandedUpload === item.id ? null : item.id)}
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <h5 className="font-medium">{item.activity}</h5>
                    <p className="text-sm text-gray-600">{item.relatedTo}</p>
                    <p className="text-xs text-gray-500">
                      {item.uploadDate} • {item.fileName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(item.status)}>{getStatusLabel(item.status)}</Badge>
                  {item.validated && <Badge className="bg-green-100 text-green-800">Atividade Validada</Badge>}
                  <Badge variant="outline" style={{ borderColor: "#DA291C", color: "#DA291C" }}>
                    +{item.points} XP
                  </Badge>
                </div>
              </div>

              {/* Área expandida */}
              {expandedUpload === item.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-medium mb-3">Conteúdo Enviado:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded border">
                      <FileText className="h-5 w-5 text-gray-600" />
                      <div className="flex-1">
                        <p className="font-medium">{item.fileName}</p>
                        <p className="text-sm text-gray-600">Enviado em {item.uploadDate}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Baixar
                      </Button>
                    </div>

                    {item.status === "approved" && (
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <p className="text-sm text-green-800">
                          <strong>Descrição enviada:</strong> "Realizei uma análise reflexiva sobre minha prática
                          docente atual, identificando os principais desafios e propondo soluções inovadoras com uso de
                          tecnologia. O documento inclui um plano de ação detalhado para implementação."
                        </p>
                      </div>
                    )}

                    {item.feedback && (
                      <div className="p-3 bg-blue-50 rounded border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <strong>Feedback do instrutor:</strong> {item.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
