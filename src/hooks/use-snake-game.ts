import { useEffect, useRef, useState, useCallback } from 'react'

export interface Position {
  x: number
  y: number
}

export interface GameState {
  snake: Position[]
  food: Position
  direction: Position
  score: number
  isGameOver: boolean
  isPaused: boolean
  isPlaying: boolean
}

const GRID_SIZE = 20
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const GAME_SPEED = 150

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
}

export function useSnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const gameLoopRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number>(0)
  
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: DIRECTIONS.RIGHT,
    score: 0,
    isGameOver: false,
    isPaused: false,
    isPlaying: false
  })

  const generateFood = useCallback((snake: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE))
      }
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }]
    setGameState({
      snake: initialSnake,
      food: generateFood(initialSnake),
      direction: DIRECTIONS.RIGHT,
      score: 0,
      isGameOver: false,
      isPaused: false,
      isPlaying: true
    })
  }, [generateFood])

  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }))
  }, [])

  const changeDirection = useCallback((newDirection: Position) => {
    setGameState(prev => {
      // Prevent 180 degree turns
      if (prev.direction.x === -newDirection.x && prev.direction.y === -newDirection.y) {
        return prev
      }
      return {
        ...prev,
        direction: newDirection
      }
    })
  }, [])

  const updateGame = useCallback(() => {
    setGameState(prev => {
      if (prev.isGameOver || prev.isPaused || !prev.isPlaying) {
        return prev
      }

      const head = prev.snake[0]
      const newHead = {
        x: head.x + prev.direction.x,
        y: head.y + prev.direction.y
      }

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= CANVAS_WIDTH / GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= CANVAS_HEIGHT / GRID_SIZE
      ) {
        return { ...prev, isGameOver: true, isPlaying: false }
      }

      // Check self collision
      if (prev.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        return { ...prev, isGameOver: true, isPlaying: false }
      }

      const newSnake = [newHead, ...prev.snake]

      // Check food collision
      if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
        return {
          ...prev,
          snake: newSnake,
          food: generateFood(newSnake),
          score: prev.score + 10
        }
      }

      // Remove tail if no food eaten
      newSnake.pop()

      return {
        ...prev,
        snake: newSnake
      }
    })
  }, [generateFood])

  const getRainbowColor = useCallback((index: number, total: number, time: number): string => {
    const hue = ((index / total) * 360 + time * 0.1) % 360
    const saturation = 80 + Math.sin(time * 0.005 + index * 0.5) * 20
    const lightness = 60 + Math.sin(time * 0.003 + index * 0.3) * 15
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }, [])

  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#0a0f1a'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw snake with rainbow colors
    gameState.snake.forEach((segment, index) => {
      const color = getRainbowColor(index, gameState.snake.length, time)
      ctx.fillStyle = color
      
      // Add glow effect
      ctx.shadowColor = color
      ctx.shadowBlur = 10
      
      ctx.fillRect(
        segment.x * GRID_SIZE + 1,
        segment.y * GRID_SIZE + 1,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      )
    })

    // Reset shadow for food
    ctx.shadowBlur = 0

    // Draw food
    ctx.fillStyle = '#ff6b6b'
    ctx.shadowColor = '#ff6b6b'
    ctx.shadowBlur = 15
    ctx.fillRect(
      gameState.food.x * GRID_SIZE + 2,
      gameState.food.y * GRID_SIZE + 2,
      GRID_SIZE - 4,
      GRID_SIZE - 4
    )

    // Reset shadow
    ctx.shadowBlur = 0
  }, [gameState, getRainbowColor])

  useEffect(() => {
    const gameLoop = (time: number) => {
      if (time - lastTimeRef.current > GAME_SPEED) {
        updateGame()
        lastTimeRef.current = time
      }
      draw(time)
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    if (gameState.isPlaying && !gameState.isGameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.isPlaying, gameState.isGameOver, updateGame, draw])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          e.preventDefault()
          changeDirection(DIRECTIONS.UP)
          break
        case 'arrowdown':
        case 's':
          e.preventDefault()
          changeDirection(DIRECTIONS.DOWN)
          break
        case 'arrowleft':
        case 'a':
          e.preventDefault()
          changeDirection(DIRECTIONS.LEFT)
          break
        case 'arrowright':
        case 'd':
          e.preventDefault()
          changeDirection(DIRECTIONS.RIGHT)
          break
        case ' ':
          e.preventDefault()
          if (gameState.isGameOver) {
            resetGame()
          } else if (gameState.isPlaying) {
            togglePause()
          } else {
            resetGame()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [changeDirection, gameState.isGameOver, gameState.isPlaying, resetGame, togglePause])

  return {
    canvasRef,
    gameState,
    resetGame,
    togglePause,
    changeDirection,
    DIRECTIONS,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  }
}