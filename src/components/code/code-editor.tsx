'use client'

import React, { useRef, useEffect } from 'react'
import Editor, { Monaco } from '@monaco-editor/react'
import { useTheme } from 'next-themes'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  height?: string
  readOnly?: boolean
  showMinimap?: boolean
}

export function CodeEditor({
  value,
  onChange,
  language = 'typescript',
  height = '400px',
  readOnly = false,
  showMinimap = false
}: CodeEditorProps) {
  const { theme } = useTheme()
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor
    
    // 自定义主题
    monaco.editor.defineTheme('matrix-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
        { token: 'keyword', foreground: '00ff00', fontStyle: 'bold' },
        { token: 'string', foreground: '00ffff' },
        { token: 'number', foreground: 'ff9500' },
        { token: 'function', foreground: 'af52de' },
        { token: 'variable', foreground: 'ffffff' },
      ],
      colors: {
        'editor.background': '#0d1117',
        'editor.foreground': '#ffffff',
        'editor.lineHighlightBackground': '#161b22',
        'editor.selectionBackground': '#00ff0040',
        'editorCursor.foreground': '#00ff00',
        'editorLineNumber.foreground': '#656d76',
        'editorLineNumber.activeForeground': '#00ff00',
      }
    })

    monaco.editor.defineTheme('matrix-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
        { token: 'keyword', foreground: '0066ff', fontStyle: 'bold' },
        { token: 'string', foreground: '007aff' },
        { token: 'number', foreground: 'ff9500' },
        { token: 'function', foreground: 'af52de' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#1d1d1f',
        'editor.lineHighlightBackground': '#f2f2f7',
        'editor.selectionBackground': '#007aff20',
        'editorCursor.foreground': '#007aff',
      }
    })

    // 设置主题
    monaco.editor.setTheme(theme === 'dark' ? 'matrix-dark' : 'matrix-light')
  }

  const handleChange = (value: string | undefined) => {
    onChange(value || '')
  }

  useEffect(() => {
    if (editorRef.current) {
      const monaco = (window as any).monaco
      if (monaco) {
        monaco.editor.setTheme(theme === 'dark' ? 'matrix-dark' : 'matrix-light')
      }
    }
  }, [theme])

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: showMinimap },
          fontSize: 14,
          fontFamily: 'JetBrains Mono, SF Mono, Monaco, Consolas, monospace',
          lineNumbers: 'on',
          rulers: [80, 120],
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: true,
          smoothScrolling: true,
          contextmenu: true,
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          tabCompletion: 'on',
          wordBasedSuggestions: true,
          formatOnPaste: true,
          formatOnType: true,
          autoIndent: 'full',
          bracketPairColorization: {
            enabled: true
          },
          guides: {
            bracketPairs: true,
            indentation: true
          }
        }}
      />
    </div>
  )
}