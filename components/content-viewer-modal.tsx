"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Play, FileText, ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize } from "lucide-react"

interface ContentViewerModalProps {
  isOpen: boolean
  onClose: () => void
  content: {
    type: string
    title: string
    duration?: string
    pages?: string
  }
}

export default function ContentViewerModal({ isOpen, onClose, content }: ContentViewerModalProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showTranscription, setShowTranscription] = useState(false)

  if (!isOpen) return null

  const videoContent = {
    title: content.title,
    duration: content.duration || "15 min",
    description:
      "Este vídeo apresenta os conceitos fundamentais de inovação educacional, explorando como a tecnologia pode transformar o processo de ensino-aprendizagem.",
    transcription: `
[00:00] Olá, educadores! Bem-vindos ao nosso módulo sobre Inovação Educacional.

[00:15] Hoje vamos explorar o que realmente significa inovar na educação e como podemos integrar tecnologias de forma significativa em nossas práticas pedagógicas.

[00:30] A inovação educacional não se trata apenas de usar tecnologia, mas sim de repensar nossos métodos de ensino para torná-los mais eficazes e engajadores.

[00:45] Vamos começar definindo o que é inovação educacional...

[01:00] Inovação educacional é a implementação de novas ideias, métodos ou ferramentas que melhoram significativamente o processo de ensino-aprendizagem.

[01:15] Isso pode incluir desde novas metodologias pedagógicas até o uso estratégico de tecnologias digitais.

[01:30] O importante é sempre manter o foco no aprendizado do aluno e na melhoria dos resultados educacionais.
    `,
  }

  const pdfContent = {
    title: content.title,
    pages: content.pages || "12 páginas",
    description: "Material complementar com conceitos teóricos e exemplos práticos de inovação educacional.",
    content: `
# Guia de Inovação na Educação

## Introdução

A inovação educacional representa uma mudança paradigmática na forma como concebemos e praticamos a educação. Este guia apresenta conceitos fundamentais e estratégias práticas para implementar inovações significativas em contextos educacionais.

## Capítulo 1: Fundamentos da Inovação Educacional

### 1.1 Definindo Inovação Educacional

Inovação educacional é mais do que simplesmente adotar novas tecnologias. É um processo sistemático de melhoria que envolve:

- Repensar metodologias de ensino
- Integrar tecnologias de forma pedagógica
- Personalizar experiências de aprendizagem
- Desenvolver competências do século XXI

### 1.2 Características da Inovação Eficaz

Uma inovação educacional eficaz deve ser:

1. **Centrada no aluno**: Foca nas necessidades e características dos estudantes
2. **Baseada em evidências**: Fundamentada em pesquisas e dados
3. **Sustentável**: Pode ser mantida a longo prazo
4. **Escalável**: Pode ser replicada em diferentes contextos

## Capítulo 2: Tecnologia e Pedagogia

### 2.1 Integração Tecnológica Significativa

A tecnologia deve ser integrada de forma a:
- Amplificar o aprendizado
- Facilitar a colaboração
- Personalizar experiências
- Desenvolver competências digitais

### 2.2 Modelos de Integração

- **Modelo SAMR**: Substituição, Ampliação, Modificação, Redefinição
- **Modelo TPACK**: Conhecimento Tecnológico, Pedagógico e de Conteúdo
- **Design Thinking**: Abordagem centrada no usuário para solução de problemas
    `,
  }

  const renderVideoPlayer = () => (
    <div className="space-y-4">
      {/* Video Player Mockup */}
      <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative">
        <div className="text-white text-center">
          <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <p className="text-lg">{videoContent.title}</p>
          <p className="text-sm opacity-70">{videoContent.duration}</p>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Play className="h-4 w-4" />
            </Button>
            <div className="flex-1 bg-white/30 h-1 rounded">
              <div className="bg-red-600 h-1 rounded" style={{ width: "25%" }} />
            </div>
            <span className="text-white text-sm">3:45 / 15:00</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div>
        <h3 className="font-medium text-lg mb-2">{videoContent.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{videoContent.description}</p>

        <div className="flex gap-2 mb-4">
          <Badge variant="outline">Duração: {videoContent.duration}</Badge>
          <Badge variant="outline">Módulo 1</Badge>
        </div>

        <Button variant="outline" size="sm" onClick={() => setShowTranscription(!showTranscription)}>
          {showTranscription ? "Ocultar" : "Mostrar"} Transcrição
        </Button>

        {showTranscription && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Transcrição:</h4>
            <div className="text-sm text-gray-700 whitespace-pre-line max-h-40 overflow-y-auto">
              {videoContent.transcription}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderPDFViewer = () => (
    <div className="space-y-4">
      {/* PDF Viewer Mockup */}
      <div className="border rounded-lg bg-white min-h-[400px] p-6">
        <div className="prose max-w-none">
          <div className="whitespace-pre-line text-sm">{pdfContent.content}</div>
        </div>
      </div>

      {/* PDF Info */}
      <div>
        <h3 className="font-medium text-lg mb-2">{pdfContent.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{pdfContent.description}</p>

        <div className="flex gap-2">
          <Badge variant="outline">{pdfContent.pages}</Badge>
          <Badge variant="outline">Material de Apoio</Badge>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2" style={{ color: "#DA291C" }}>
            {content.type === "video" ? <Play className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
            {content.title}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[75vh]">
          {content.type === "video" ? renderVideoPlayer() : renderPDFViewer()}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t mt-6">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
              <Button className="text-white" style={{ backgroundColor: "#DA291C" }}>
                Marcar como Concluído
              </Button>
            </div>

            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
