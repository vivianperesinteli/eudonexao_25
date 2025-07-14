"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, Database, Mail, Plus, Trash2, Edit } from "lucide-react"

export default function AdminSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    userRegistration: true,
  })

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "admin",
  })

  const admins = [
    { id: 1, name: "Marcelo Silva", email: "marcelo@mgnconsultoria.com.br", role: "Super Admin", status: "Ativo" },
    { id: 2, name: "Ana Santos", email: "ana@institutoclaro.org.br", role: "Admin", status: "Ativo" },
    { id: 3, name: "Carlos Lima", email: "carlos@institutoclaro.org.br", role: "Moderador", status: "Inativo" },
  ]

  const handleAddAdmin = () => {
    console.log("Adicionando novo admin:", newAdmin)
    setNewAdmin({ name: "", email: "", role: "admin" })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: "#DA291C" }}>
        Configurações do Sistema
      </h2>

      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações Gerais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome da Plataforma</label>
              <Input defaultValue="Educonexão 2025" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL da Plataforma</label>
              <Input defaultValue="https://educonexao.institutoclaro.org.br" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição do Programa</label>
            <Textarea
              defaultValue="Programa de capacitação para professores em tecnologias educacionais do Instituto Claro"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Data de Início</label>
              <Input type="date" defaultValue="2025-09-01" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Data de Término</label>
              <Input type="date" defaultValue="2025-12-15" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Limite de Participantes</label>
              <Input type="number" defaultValue="1500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pontuação Máxima</label>
              <Input type="number" defaultValue="5000" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Configurações de Notificação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Notificações por E-mail</h4>
              <p className="text-sm text-gray-600">Enviar notificações importantes por e-mail</p>
            </div>
            <Switch
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Notificações Push</h4>
              <p className="text-sm text-gray-600">Notificações em tempo real no navegador</p>
            </div>
            <Switch
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Relatórios Semanais</h4>
              <p className="text-sm text-gray-600">Envio automático de relatórios semanais</p>
            </div>
            <Switch
              checked={notifications.weeklyReports}
              onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Novos Registros</h4>
              <p className="text-sm text-gray-600">Notificar sobre novos usuários registrados</p>
            </div>
            <Switch
              checked={notifications.userRegistration}
              onCheckedChange={(checked) => setNotifications({ ...notifications, userRegistration: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Configurações de E-mail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Configurações de E-mail
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Servidor SMTP</label>
              <Input defaultValue="smtp.gmail.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Porta</label>
              <Input defaultValue="587" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">E-mail Remetente</label>
              <Input defaultValue="noreply@institutoclaro.org.br" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Remetente</label>
              <Input defaultValue="Instituto Claro - Educonexão" />
            </div>
          </div>

          <Button variant="outline">Testar Configuração de E-mail</Button>
        </CardContent>
      </Card>

      {/* Gerenciamento de Administradores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Gerenciamento de Administradores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Adicionar Novo Admin */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium mb-4">Adicionar Novo Administrador</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <Input
                  placeholder="Nome completo"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-mail</label>
                <Input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Função</label>
                <Select value={newAdmin.role} onValueChange={(value) => setNewAdmin({ ...newAdmin, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="moderator">Moderador</SelectItem>
                    <SelectItem value="viewer">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddAdmin} className="mt-4 text-white" style={{ backgroundColor: "#DA291C" }}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Administrador
            </Button>
          </div>

          {/* Lista de Admins */}
          <div>
            <h4 className="font-medium mb-4">Administradores Atuais</h4>
            <div className="space-y-3">
              {admins.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{admin.name}</p>
                    <p className="text-sm text-gray-600">{admin.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={admin.role === "Super Admin" ? "default" : "secondary"}>{admin.role}</Badge>
                    <Badge variant={admin.status === "Ativo" ? "default" : "secondary"}>{admin.status}</Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup e Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Backup e Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Backup Automático</h4>
              <p className="text-sm text-gray-600">Backup diário dos dados da plataforma</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Autenticação de Dois Fatores</h4>
              <p className="text-sm text-gray-600">Exigir 2FA para administradores</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex gap-3">
            <Button variant="outline">Fazer Backup Manual</Button>
            <Button variant="outline">Baixar Logs de Segurança</Button>
          </div>
        </CardContent>
      </Card>

      {/* Botão de Salvar */}
      <div className="flex justify-end">
        <Button className="text-white" style={{ backgroundColor: "#DA291C" }}>
          Salvar Todas as Configurações
        </Button>
      </div>
    </div>
  )
}
