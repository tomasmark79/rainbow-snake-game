import { Card } from '@/components/ui/card'

interface GameCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  width: number
  height: number
  isGameOver: boolean
  isPaused: boolean
  isPlaying: boolean
}

export function GameCanvas({
  canvasRef,
  width,
  height,
  isGameOver,
  isPaused,
  isPlaying
}: GameCanvasProps) {
  return (
    <Card className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 border-2">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="border border-border rounded-lg bg-background"
        />
        
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Rainbow Snake
              </h2>
              <p className="text-muted-foreground">Press Space or click Start to begin</p>
            </div>
          </div>
        )}

        {isPaused && isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">PAUSED</h3>
              <p className="text-muted-foreground">Press Space to continue</p>
            </div>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 rounded-lg">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-destructive">Game Over!</h3>
              <p className="text-muted-foreground">Press Space to play again</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}