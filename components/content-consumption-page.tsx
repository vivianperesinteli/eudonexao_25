"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react"

interface ContentConsumptionPageProps {
  content: {
    type: string
    title: string
    duration?: string
    pages?: string
    moduleTitle: string
    courseTitle: string
  }
  onBack: () => void
  onComplete: () => void
}

export default function ContentConsumptionPage({ content, onBack, onComplete }: ContentConsumptionPageProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(900) // 15 minutos em segundos
  const [isMuted, setIsMuted] = useState(false)
  const [showTranscription, setShowTranscription] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const progress = (currentTime / duration) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const transcription = `
[00:00] Olá, educadores! Bem-vindos ao nosso módulo sobre Inovação Educacional.

[00:15] Hoje vamos explorar o que realmente significa inovar na educação e como podemos integrar tecnologias de forma significativa em nossas práticas pedagógicas.

[00:30] A inovação educacional não se trata apenas de usar tecnologia, mas sim de repensar nossos métodos de ensino para torná-los mais eficazes e engajadores.

[00:45] Vamos começar definindo o que é inovação educacional...

[01:00] Inovação educacional é a implementação de novas ideias, métodos ou ferramentas que melhoram significativamente o processo de ensino-aprendizagem.

[01:15] Isso pode incluir desde novas metodologias pedagógicas até o uso estratégico de tecnologias digitais.

[01:30] O importante é sempre manter o foco no aprendizado do aluno e na melhoria dos resultados educacionais.

[01:45] Agora, vamos explorar os pilares fundamentais da inovação educacional...

[02:00] O primeiro pilar é a personalização do aprendizado. Cada aluno tem seu próprio ritmo e estilo de aprendizagem.

[02:15] O segundo pilar é a colaboração. A tecnologia nos permite criar ambientes colaborativos ricos e significativos.

[02:30] O terceiro pilar é a criatividade. Devemos estimular o pensamento criativo e a resolução de problemas.
  `

  const pdfContent = `
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

## Capítulo 3: Implementação Prática

### 3.1 Planejamento da Inovação

Para implementar inovações educacionais eficazes:

1. **Diagnóstico**: Avalie o contexto atual
2. **Objetivos**: Defina metas claras e mensuráveis
3. **Estratégias**: Escolha abordagens adequadas
4. **Recursos**: Identifique necessidades tecnológicas e humanas
5. **Avaliação**: Estabeleça métricas de sucesso

### 3.2 Superando Resistências

- Envolva todos os stakeholders no processo
- Ofereça formação adequada
- Demonstre benefícios concretos
- Implemente mudanças gradualmente
- Celebre sucessos e aprenda com desafios
  `

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying && currentTime === 0) {
      // Simular progresso do vídeo
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            clearInterval(interval)
            setIsPlaying(false)
            setIsCompleted(true)
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }
  }

  const handleComplete = () => {
    setIsCompleted(true)
    onComplete()
  }

  const renderVideoPlayer = () => (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
        <div className="text-white text-center">
          <div className="mb-4">
            {isPlaying ? (
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Play className="h-8 w-8 ml-1" />
                </div>
              </div>
            ) : (
              <button
                onClick={handlePlayPause}
                className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center mx-auto transition-colors"
              >
                <Play className="h-8 w-8 ml-1" />
              </button>
            )}
          </div>
          <p className="text-lg font-medium">{content.title}</p>
          <p className="text-sm opacity-70">{content.duration}</p>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="mb-2">
            <div className="w-full bg-white/30 h-1 rounded-full">
              <div
                className="bg-red-600 h-1 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2" onClick={handlePlayPause}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-2"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold mb-2">{content.title}</h2>
              <p className="text-gray-600 mb-4">
                Este vídeo apresenta os conceitos fundamentais de inovação educacional, explorando como a tecnologia
                pode transformar o processo de ensino-aprendizagem.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline">Duração: {content.duration}</Badge>
                <Badge variant="outline">{content.moduleTitle}</Badge>
                {isCompleted && <Badge className="bg-green-100 text-green-800">Concluído</Badge>}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowTranscription(!showTranscription)}>
              {showTranscription ? "Ocultar" : "Mostrar"} Transcrição
            </Button>
            {!isCompleted && progress > 80 && (
              <Button onClick={handleComplete} className="text-white" style={{ backgroundColor: "#DA291C" }}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar como Concluído
              </Button>
            )}
          </div>

          {showTranscription && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Transcrição do Vídeo:</h4>
              <div className="text-sm text-gray-700 whitespace-pre-line max-h-60 overflow-y-auto">{transcription}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderPDFViewer = () => (
    <div className="space-y-6">
      {/* PDF Viewer */}
      <Card>
        <CardContent className="p-6">
          <div className="border rounded-lg bg-white min-h-[600px] p-8">
            <div className="prose max-w-none">
              <div className="whitespace-pre-line text-sm leading-relaxed">{pdfContent}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold mb-2">{content.title}</h2>
              <p className="text-gray-600 mb-4">
                Material complementar com conceitos teóricos e exemplos práticos de inovação educacional.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline">{content.pages}</Badge>
                <Badge variant="outline">{content.moduleTitle}</Badge>
                {isCompleted && <Badge className="bg-green-100 text-green-800">Concluído</Badge>}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {!isCompleted && (
              <Button onClick={handleComplete} className="text-white" style={{ backgroundColor: "#DA291C" }}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar como Concluído
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 mb-4 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Minicurso
          </Button>

          <div className="mb-4">
            <h1 className="text-2xl font-bold" style={{ color: "#DA291C" }}>
              {content.courseTitle}
            </h1>
            <p className="text-gray-600">{content.moduleTitle}</p>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progresso do Conteúdo</span>
              <span className="text-sm" style={{ color: "#DA291C" }}>
                {isCompleted ? "100%" : `${Math.round(progress)}%`}
              </span>
            </div>
            <Progress value={isCompleted ? 100 : progress} className="h-2" />
          </div>
        </div>

        {/* Content */}
        {content.type === "video" ? renderVideoPlayer() : renderPDFViewer()}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t mt-8">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
            Conteúdo Anterior
          </Button>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>
              Voltar ao Módulo
            </Button>
          </div>

          <Button className="flex items-center gap-2 text-white" style={{ backgroundColor: "#DA291C" }}>
            Próximo Conteúdo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
