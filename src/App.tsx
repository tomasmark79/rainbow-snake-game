import { useKV } from '@github/spark/hooks'
import { useSnakeGame } from '@/hooks/use-snake-game'
import GameCanvas from '@/components/GameCanvas'
import GameControls from '@/components/GameControls'
import { useEffect } from 'react'

function App() {
  const [highScore, setHighScore] = useKV('snake-high-score', 0)
  const {
    canvasRef,
    gameState,
    resetGame,
    togglePause,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  } = useSnakeGame()

  useEffect(() => {
    if (gameState.score > highScore) {
      setHighScore(gameState.score)
    }
  }, [gameState.score, highScore, setHighScore])

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent mb-2">
            Rainbow Snake
          </h1>
          <p className="text-muted-foreground">
            Guide the rainbow snake to collect fruit and grow longer!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <GameCanvas
            canvasRef={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            isGameOver={gameState.isGameOver}
            isPaused={gameState.isPaused}
            isPlaying={gameState.isPlaying}
          />

          <GameControls
            score={gameState.score}
            highScore={highScore}
            isPlaying={gameState.isPlaying}
            isPaused={gameState.isPaused}
            isGameOver={gameState.isGameOver}
            onStart={resetGame}
            onPause={togglePause}
            onRestart={resetGame}
          />
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Use arrow keys or WASD to control the snake. Press Space to start, pause, or restart.</p>
        </div>
      </div>
    </div>
  )
}

export default App