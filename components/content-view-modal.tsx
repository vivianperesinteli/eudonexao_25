"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Edit, Trash2, Save, Calendar, BookOpen, Trophy, Users, Clock, FileText } from "lucide-react"

interface ContentViewModalProps {
  isOpen: boolean
  onClose: () => void
  content: any
  type: "encontros" | "minicursos" | "desafios"
  onSave?: (data: any) => void
  onDelete?: (id: number) => void
}

export default function ContentViewModal({ isOpen, onClose, content, type, onSave, onDelete }: ContentViewModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [formData, setFormData] = useState(content || {})

  if (!isOpen || !content) return null

  const handleSave = () => {
    onSave?.(formData)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete?.(content.id)
    setShowDeleteConfirm(false)
    onClose()
  }

  const getIcon = () => {
    switch (type) {
      case "encontros":
        return <Calendar className="h-5 w-5" />
      case "minicursos":
        return <BookOpen className="h-5 w-5" />
      case "desafios":
        return <Trophy className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getTitle = () => {
    switch (type) {
      case "encontros":
        return "Encontro Formativo"
      case "minicursos":
        return "Minicurso"
      case "desafios":
        return "Desafio Escolar"
      default:
        return "Conteúdo"
    }
  }

  const renderEncontroContent = () => (
    <div className="space-y-6">
      {/* Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          {isEditing ? (
            <Input value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          ) : (
            <p className="p-2 bg-gray-50 rounded">{content.title}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Data</label>
          {isEditing ? (
            <Input
              type="date"
              value={formData.date || ""}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          ) : (
            <p className="p-2 bg-gray-50 rounded">{content.date}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Modalidade</label>
          {isEditing ? (
            <Select
              value={formData.format || ""}
              onValueChange={(value) => setFormData({ ...formData, format: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Presencial">Presencial</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Híbrido">Híbrido</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <p className="p-2 bg-gray-50 rounded">{content.format}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Duração</label>
          {isEditing ? (
            <Input
              value={formData.duration || ""}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          ) : (
            <p className="p-2 bg-gray-50 rounded">{content.duration}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Participantes</label>
          <p className="p-2 bg-blue-50 rounded font-medium text-blue-800">{content.participants || 0}</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{content.participants || 0}</p>
            <p className="text-sm text-gray-600">Participantes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{content.completion || 0}%</p>
            <p className="text-sm text-gray-600">Taxa de Conclusão</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{content.attachments?.length || 0}</p>
            <p className="text-sm text-gray-600">Materiais</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderMinicursoContent = () => (
    <div className="space-y-6">
      {/* Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          {isEditing ? (
            <Input value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          ) : (
            <p className="p-2 bg-gray-50 rounded">{content.title}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Duração</label>
          {isEditing ? (
            <Input
              value={formData.duration || ""}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          ) : (
            <p className="p-2 bg-gray-50 rounded">{content.duration}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descrição</label>
        {isEditing ? (
          <Textarea
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        ) : (
          <p className="p-2 bg-gray-50 rounded">{content.description || "Sem descrição"}</p>
        )}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{content.participants || 0}</p>
            <p className="text-sm text-gray-600">Participantes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{content.modules || 0}</p>
            <p className="text-sm text-gray-600">Módulos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{content.completion || 0}%</p>
            <p className="text-sm text-gray-600">Taxa de Conclusão</p>
          </CardContent>
        </Card>
      </div>

      {/* Módulos */}
      <div>
        <h4 className="font-medium mb-3" style={{ color: "#DA291C" }}>
          Módulos do Curso:
        </h4>
        <div className="space-y-2">
          {[
            "O que é Inovação Educacional?",
            "Planejamento com Tecnologia",
            "Personalização da Aprendizagem",
            "Tecnologia e Inclusão Escolar",
            "Cultura Digital e a BNCC",
            "Prática Guiada: Redesenho de uma Aula",
          ].map((module, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <span className="text-sm">{index + 1}.</span>
              <span className="text-sm">{module}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderDesafioContent = () => (
    <div className="space-y-6">
      {/* Informações Básicas */}
      <div>
        <label className="block text-sm font-medium mb-2">Título</label>
        {isEditing ? (
          <Input value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        ) : (
          <p className="p-2 bg-gray-50 rounded">{content.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descrição</label>
        {isEditing ? (
          <Textarea
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />
        ) : (
          <p className="p-2 bg-gray-50 rounded">
            {content.description ||
              "Desenvolva um projeto com seus alunos que integre tecnologia e cidadania digital. O projeto deve abordar temas como uso ético da tecnologia, segurança online e pensamento crítico no ambiente digital."}
          </p>
        )}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{content.participants || 0}</p>
            <p className="text-sm text-gray-600">Participantes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{content.submissions || 0}</p>
            <p className="text-sm text-gray-600">Projetos Enviados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{content.completion || 0}%</p>
            <p className="text-sm text-gray-600">Taxa de Envio</p>
          </CardContent>
        </Card>
      </div>

      {/* Critérios de Avaliação */}
      <div>
        <h4 className="font-medium mb-3" style={{ color: "#DA291C" }}>
          Critérios de Avaliação:
        </h4>
        <div className="bg-gray-50 p-4 rounded-lg">
          {isEditing ? (
            <Textarea
              value={formData.criteria || ""}
              onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
              rows={4}
            />
          ) : (
            <ul className="text-sm space-y-1">
              <li>• Integração de tecnologia ao currículo</li>
              <li>• Desenvolvimento da cidadania digital</li>
              <li>• Engajamento dos estudantes</li>
              <li>• Impacto na comunidade escolar</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (type) {
      case "encontros":
        return renderEncontroContent()
      case "minicursos":
        return renderMinicursoContent()
      case "desafios":
        return renderDesafioContent()
      default:
        return <div>Conteúdo não encontrado</div>
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2" style={{ color: "#DA291C" }}>
            {getIcon()}
            {getTitle()} - {content.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1"
              >
                <Edit className="h-3 w-3" />
                Editar
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-3 w-3" />
              Excluir
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[70vh]">
          {renderContent()}

          {isEditing && (
            <div className="flex gap-3 pt-6 border-t mt-6">
              <Button onClick={handleSave} className="text-white" style={{ backgroundColor: "#DA291C" }}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-red-600">Confirmar Exclusão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                Tem certeza que deseja excluir este {type.slice(0, -1)}? Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                  Sim, Excluir
                </Button>
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
