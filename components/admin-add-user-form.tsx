"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, Save, UserPlus } from "lucide-react"

interface AdminAddUserFormProps {
  onBack: () => void
  onSave: (userData: any) => void
}

export default function AdminAddUserForm({ onBack, onSave }: AdminAddUserFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
    school: "",
    position: "",
    experience: "",
    subjects: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const regions = ["Ananindeua", "Natal", "Mogi das Cruzes", "Nacional"]

  const positions = [
    "Professor(a) - Ensino Fundamental I",
    "Professor(a) - Ensino Fundamental II",
    "Professor(a) - Ensino Médio",
    "Coordenador(a) Pedagógico(a)",
    "Diretor(a)",
    "Orientador(a) Educacional",
    "Supervisor(a) Escolar",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 mb-4 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Gerenciamento
          </Button>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "#DA291C" }}>
            <UserPlus className="h-6 w-6" />
            Adicionar Novo Usuário
          </h1>
          <p className="text-gray-600 mt-2">Cadastre um novo educador no programa Educonexão</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Informações Pessoais */}
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
                    <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                    <Input
                      placeholder="Digite o nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">E-mail *</label>
                    <Input
                      type="email"
                      placeholder="email@exemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone/WhatsApp</label>
                    <Input
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Região *</label>
                    <Select
                      value={formData.region}
                      onValueChange={(value) => setFormData({ ...formData, region: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a região" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações Profissionais */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Profissionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome da Escola/Instituição *</label>
                  <Input
                    placeholder="Digite o nome da escola"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Cargo/Função *</label>
                    <Select
                      value={formData.position}
                      onValueChange={(value) => setFormData({ ...formData, position: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((position) => (
                          <SelectItem key={position} value={position}>
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tempo de Experiência</label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => setFormData({ ...formData, experience: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0 a 2 anos</SelectItem>
                        <SelectItem value="3-5">3 a 5 anos</SelectItem>
                        <SelectItem value="6-10">6 a 10 anos</SelectItem>
                        <SelectItem value="11-15">11 a 15 anos</SelectItem>
                        <SelectItem value="16+">Mais de 16 anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Disciplinas que Leciona</label>
                  <Textarea
                    placeholder="Ex: Matemática, Português, História..."
                    value={formData.subjects}
                    onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Observações */}
            <Card>
              <CardHeader>
                <CardTitle>Observações Adicionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="block text-sm font-medium mb-2">Observações</label>
                  <Textarea
                    placeholder="Adicione observações sobre o educador, necessidades especiais, contexto escolar, etc."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Configurações Iniciais */}
            <Card>
              <CardHeader>
                <CardTitle>Configurações Iniciais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Configurações Automáticas:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Senha temporária será enviada por e-mail</li>
                    <li>• Usuário será automaticamente inscrito no programa</li>
                    <li>• Acesso aos conteúdos será liberado conforme a região selecionada</li>
                    <li>• Notificações por e-mail serão ativadas por padrão</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="text-white" style={{ backgroundColor: "#DA291C" }}>
                <Save className="h-4 w-4 mr-2" />
                Cadastrar Usuário
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Cancelar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
