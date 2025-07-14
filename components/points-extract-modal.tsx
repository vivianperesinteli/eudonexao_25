"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Trophy, Calendar, BookOpen, Target } from "lucide-react"

interface PointsExtractModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PointsExtractModal({ isOpen, onClose }: PointsExtractModalProps) {
  if (!isOpen) return null

  const pointsHistory = [
    {
      id: 1,
      activity: "Participação no Encontro",
      session: "Encontro 1 - Visão de Inovação Educacional",
      points: 200,
      date: "15/09/2025",
      type: "encontro",
      status: "completed",
    },
    {
      id: 2,
      activity: "Envio de Atividade Prática",
      session: "Encontro 1 - Diagnóstico da Prática Docente",
      points: 150,
      date: "16/09/2025",
      type: "atividade",
      status: "completed",
    },
    {
      id: 3,
      activity: "Conclusão do Módulo",
      session: "Minicurso 1 - O que é Inovação Educacional?",
      points: 100,
      date: "20/09/2025",
      type: "minicurso",
      status: "completed",
    },
    {
      id: 4,
      activity: "Conclusão do Módulo",
      session: "Minicurso 1 - Planejamento com Tecnologia",
      points: 100,
      date: "25/09/2025",
      type: "minicurso",
      status: "completed",
    },
    {
      id: 5,
      activity: "Participação no Encontro",
      session: "Encontro 2 - Cidadania e Cultura Digital",
      points: 200,
      date: "29/09/2025",
      type: "encontro",
      status: "completed",
    },
    {
      id: 6,
      activity: "Conclusão do Módulo",
      session: "Minicurso 1 - Personalização da Aprendizagem",
      points: 100,
      date: "05/10/2025",
      type: "minicurso",
      status: "completed",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "encontro":
        return <Calendar className="h-4 w-4" />
      case "minicurso":
        return <BookOpen className="h-4 w-4" />
      case "atividade":
        return <Target className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "encontro":
        return "bg-blue-100 text-blue-800"
      case "minicurso":
        return "bg-green-100 text-green-800"
      case "atividade":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalPoints = pointsHistory.reduce((sum, item) => sum + item.points, 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2" style={{ color: "#DA291C" }}>
            <Trophy className="h-5 w-5" />
            Extrato de Pontos
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[60vh]">
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
            <h3 className="text-lg font-bold mb-2" style={{ color: "#DA291C" }}>
              Resumo de Pontuação
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">{totalPoints}</p>
                <p className="text-sm text-gray-600">Total de XP</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">6</p>
                <p className="text-sm text-gray-600">Atividades</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">3</p>
                <p className="text-sm text-gray-600">Módulos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">2</p>
                <p className="text-sm text-gray-600">Encontros</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-lg">Histórico Detalhado</h4>
            {pointsHistory.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getIcon(item.type)}
                    <div>
                      <h5 className="font-medium">{item.activity}</h5>
                      <p className="text-sm text-gray-600">{item.session}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getTypeColor(item.type)}>
                      {item.type === "encontro" ? "Encontro" : item.type === "minicurso" ? "Minicurso" : "Atividade"}
                    </Badge>
                    <Badge variant="outline" style={{ borderColor: "#DA291C", color: "#DA291C" }}>
                      +{item.points} XP
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
