import { CodeReviewDashboard } from '@/components/dashboard/code-review-dashboard'
import { MatrixBackground } from '@/components/ui/matrix-background'

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-matrix-black via-matrix-dark-gray to-matrix-black">
      <MatrixBackground />
      <div className="relative z-10">
        <CodeReviewDashboard />
      </div>
    </main>
  )
}