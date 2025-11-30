import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw } from '@phosphor-icons/react'

interface GameControlsProps {
  score: number
  highScore: number
  isPlaying: boolean
  isPaused: boolean
  isGameOver: boolean
  onStart: () => void
  onPause: () => void
  onRestart: () => void
}

function GameControls({
  score,
  highScore,
  isPlaying,
  isPaused,
  isGameOver,
  onStart,
  onPause,
  onRestart
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <Card className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Score</span>
            <span className="text-xl font-bold text-accent">{score}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">High Score</span>
            <span className="text-lg font-semibold">{highScore}</span>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        {!isPlaying && !isGameOver && (
          <Button onClick={onStart} size="lg" className="w-full">
            <Play size={20} className="mr-2" />
            Start Game
          </Button>
        )}

        {isPlaying && !isGameOver && (
          <Button onClick={onPause} variant="secondary" size="lg" className="w-full">
            {isPaused ? <Play size={20} className="mr-2" /> : <Pause size={20} className="mr-2" />}
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        )}

        {isGameOver && (
          <Button onClick={onRestart} size="lg" className="w-full">
            <RotateCcw size={20} className="mr-2" />
            Play Again
          </Button>
        )}
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Controls</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div>Arrow Keys or WASD - Move</div>
          <div>Space - Start/Pause/Restart</div>
        </div>
      </Card>
    </div>
  )
}

export default GameControls