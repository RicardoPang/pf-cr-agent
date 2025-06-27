'use client'

import React, { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, File, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatFileSize, getFileExtension } from '@/lib/utils'

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  onCodeExtract: (code: string) => void
  maxSize?: number // bytes
  acceptedTypes?: string[]
}

interface UploadedFile {
  file: File
  content: string
  preview: string
}

export function FileUpload({
  onFileSelect,
  onCodeExtract,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['.ts', '.tsx', '.js', '.jsx', '.vue', '.py', '.java', '.css', '.scss', '.json']
}: FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const processFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const content = e.target?.result as string
        resolve(content)
      }
      
      reader.onerror = () => {
        reject(new Error('文件读取失败'))
      }
      
      reader.readAsText(file)
    })
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
    setError(null)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length === 0) return
    
    const file = files[0]
    
    // 验证文件类型
    const extension = '.' + getFileExtension(file.name)
    if (!acceptedTypes.includes(extension)) {
      setError('不支持的文件类型')
      return
    }
    
    // 验证文件大小
    if (file.size > maxSize) {
      setError(`文件大小超过限制 (${formatFileSize(maxSize)})`)
      return
    }
    
    setIsProcessing(true)
    
    try {
      const content = await processFile(file)
      const preview = content.length > 200 ? content.substring(0, 200) + '...' : content
      
      const uploadedFile = {
        file,
        content,
        preview
      }
      
      setUploadedFile(uploadedFile)
      onFileSelect(file)
      onCodeExtract(content)
    } catch (error) {
      console.error('File processing error:', error)
      setError('文件处理失败')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    const file = files[0]
    setError(null)
    setIsProcessing(true)
    
    try {
      const content = await processFile(file)
      const preview = content.length > 200 ? content.substring(0, 200) + '...' : content
      
      const uploadedFile = {
        file,
        content,
        preview
      }
      
      setUploadedFile(uploadedFile)
      onFileSelect(file)
      onCodeExtract(content)
    } catch (error) {
      console.error('File processing error:', error)
      setError('文件处理失败')
    } finally {
      setIsProcessing(false)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    setError(null)
    onFileSelect(null)
    onCodeExtract('')
  }

  const getFileIcon = (extension: string) => {
    switch (extension.toLowerCase()) {
      case 'ts':
      case 'tsx':
        return '🔷'
      case 'js':
      case 'jsx':
        return '🟨'
      case 'vue':
        return '🟢'
      case 'py':
        return '🐍'
      case 'java':
        return '☕'
      case 'css':
      case 'scss':
        return '🎨'
      case 'json':
        return '📄'
      default:
        return '📝'
    }
  }

  return (
    <div className="space-y-4">
      {/* 上传区域 */}
      <AnimatePresence>
        {!uploadedFile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
              ${isDragActive
                ? 'border-matrix-green bg-matrix-green/5'
                : 'border-border hover:border-matrix-green/50'
              }
              ${isProcessing ? 'pointer-events-none opacity-50' : ''}
            `}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragActive(true)
            }}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept={acceptedTypes.join(',')}
              onChange={handleFileInput}
              className="hidden"
            />
            
            {isProcessing ? (
              <div className="space-y-2">
                <div className="loading-dots mx-auto" />
                <p className="text-sm text-muted-foreground">处理文件中...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="text-lg font-medium">
                    {isDragActive ? '松开以上传文件' : '拖拽文件到此处或点击上传'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    支持 {acceptedTypes.join(', ')} 文件，最大 {formatFileSize(maxSize)}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 错误信息 */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <p className="text-sm text-red-400">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 已上传文件 */}
      <AnimatePresence>
        {uploadedFile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-muted/50 rounded-lg border border-border"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">
                  {getFileIcon(getFileExtension(uploadedFile.file.name))}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium truncate">{uploadedFile.file.name}</p>
                    <Badge variant="secondary">
                      {getFileExtension(uploadedFile.file.name).toUpperCase()}
                    </Badge>
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {formatFileSize(uploadedFile.file.size)} • {new Date(uploadedFile.file.lastModified).toLocaleDateString()}
                  </p>
                  <div className="text-xs text-muted-foreground bg-background/50 p-2 rounded border">
                    <pre className="whitespace-pre-wrap font-mono">{uploadedFile.preview}</pre>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={removeFile}
                className="text-muted-foreground hover:text-red-400"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}