'use client'

import React, { useEffect, useRef } from 'react'

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 字符数组
    const chars = '01アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポヴッン'
    const charArray = chars.split('')

    // 列数
    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = new Array(columns).fill(1)

    // 绘制函数
    const draw = () => {
      // 半透明黑色背景，创建拖尾效果
      ctx.fillStyle = 'rgba(13, 17, 23, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 设置文字样式
      ctx.fillStyle = '#00ff00'
      ctx.font = '14px JetBrains Mono, monospace'

      // 绘制字符
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)]
        ctx.fillText(text, i * 20, drops[i] * 20)

        // 随机重置某些列
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    // 动画循环
    const interval = setInterval(draw, 100)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-30"
      style={{ background: 'transparent' }}
    />
  )
}