'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Code2, 
  FileText, 
  Upload, 
  Github, 
  Settings, 
  Moon, 
  Sun,
  Zap,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeEditor } from '@/components/code/code-editor'
import { ReviewResults } from '@/components/review/review-results'
import { FileUpload } from '@/components/upload/file-upload'
import { useTheme } from 'next-themes'

export function CodeReviewDashboard() {
  const { theme, setTheme } = useTheme()
  const [code, setCode] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [reviewResults, setReviewResults] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleCodeReview = async () => {
    if (!code.trim()) return

    setIsAnalyzing(true)
    try {
      // 模拟AI分析过程
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // 模拟分析结果
      const mockResults = {
        overall: {
          score: 85,
          issues: 3,
          suggestions: 7,
          complexity: 'Medium'
        },
        issues: [
          {
            type: 'warning',
            line: 15,
            message: '建议使用 TypeScript 类型注解提高代码可读性',
            severity: 'medium',
            category: 'Type Safety'
          },
          {
            type: 'error',
            line: 23,
            message: '潜在的内存泄漏：未清理事件监听器',
            severity: 'high',
            category: 'Performance'
          },
          {
            type: 'info',
            line: 8,
            message: '可以使用 React.useMemo 优化性能',
            severity: 'low',
            category: 'Optimization'
          }
        ],
        suggestions: [
          '考虑使用函数式组件替代类组件',
          '添加 PropTypes 或 TypeScript 类型定义',
          '使用 ESLint 和 Prettier 统一代码风格',
          '添加单元测试提高代码可靠性',
          '考虑使用 React.memo 优化组件渲染',
          '添加错误边界处理异常情况',
          '使用自定义 Hook 抽象复用逻辑'
        ]
      }
      
      setReviewResults(mockResults)
    } catch (error) {
      console.error('代码分析失败:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const stats = [
    {
      title: '代码质量',
      value: reviewResults?.overall.score || 0,
      suffix: '/100',
      icon: CheckCircle,
      color: 'text-green-400'
    },
    {
      title: '发现问题',
      value: reviewResults?.overall.issues || 0,
      suffix: '个',
      icon: AlertTriangle,
      color: 'text-yellow-400'
    },
    {
      title: '优化建议',
      value: reviewResults?.overall.suggestions || 0,
      suffix: '条',
      icon: Zap,
      color: 'text-blue-400'
    },
    {
      title: '复杂度',
      value: reviewResults?.overall.complexity || 'Unknown',
      suffix: '',
      icon: Clock,
      color: 'text-purple-400'
    }
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="container-custom">
        {/* 头部 */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-matrix rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient-matrix">
                PF Code Review Agent
              </h1>
              <p className="text-muted-foreground">
                AI驱动的智能代码审查工具
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="neon-glow"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Github className="w-5 h-5" />
            </Button>
          </div>
        </motion.header>

        {/* 统计卡片 */}
        {reviewResults && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={stat.title} className="glass border-matrix-green/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">
                        {stat.value}{stat.suffix}
                      </p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 代码输入区域 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass border-matrix-green/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Code2 className="w-5 h-5 text-matrix-green" />
                    <CardTitle>代码编辑器</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">React</Badge>
                  </div>
                </div>
                <CardDescription>
                  粘贴或输入您要审查的代码
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUpload
                  onFileSelect={setSelectedFile}
                  onCodeExtract={setCode}
                />
                
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language="typescript"
                  height="400px"
                />
                
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleCodeReview}
                    disabled={!code.trim() || isAnalyzing}
                    className="btn-matrix flex-1"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="loading-dots mr-2" />
                        AI 分析中...
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4 mr-2" />
                        开始 AI 审查
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline" size="icon">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 审查结果区域 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass border-matrix-green/20">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-matrix-green" />
                  <CardTitle>审查结果</CardTitle>
                </div>
                <CardDescription>
                  AI 分析结果和优化建议
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reviewResults ? (
                  <ReviewResults results={reviewResults} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 text-center">
                    <Bot className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium text-muted-foreground mb-2">
                      等待代码审查
                    </p>
                    <p className="text-sm text-muted-foreground">
                      输入代码并点击"开始 AI 审查"来获取智能分析结果
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 技术栈支持说明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="glass border-matrix-green/20">
            <CardHeader>
              <CardTitle className="text-center">支持的技术栈</CardTitle>
              <CardDescription className="text-center">
                基于前端6阶段的全面技术栈支持
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  'React', 'Vue', 'TypeScript', 'Next.js', 'Nest.js', 'Svelte',
                  'Angular', 'Node.js', 'Express', 'Koa', 'MongoDB', 'PostgreSQL'
                ].map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="outline" 
                    className="justify-center p-2 hover:bg-matrix-green/10 transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}