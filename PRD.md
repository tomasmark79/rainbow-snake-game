# Snake Game - Product Requirements Document

A modern, visually stunning implementation of the classic Snake game with rainbow aesthetics and smooth gameplay.

**Experience Qualities**:
1. **Mesmerizing** - Rainbow colors and smooth animations create a hypnotic, engaging experience
2. **Responsive** - Crisp controls and immediate feedback make gameplay feel fluid and precise
3. **Nostalgic** - Classic Snake mechanics with modern visual flair appeal to both new and veteran players

**Complexity Level**: Light Application (multiple features with basic state)
The game includes core gameplay mechanics, score tracking, game states, and visual effects while maintaining simplicity and focus.

## Essential Features

### Rainbow Snake Movement
- **Functionality**: Snake moves continuously with keyboard controls, each segment displays different rainbow colors with shimmer effects
- **Purpose**: Creates visual appeal and distinguishes this implementation from basic Snake games
- **Trigger**: Arrow keys or WASD for directional input
- **Progression**: Game starts → Snake moves automatically → Player changes direction → Rainbow trail follows
- **Success criteria**: Smooth 60fps movement with visible rainbow gradient across snake body

### Fruit Collection System
- **Functionality**: Random fruit spawns on grid, snake grows when consuming fruit, score increases
- **Purpose**: Core progression mechanic that drives engagement and challenge escalation
- **Trigger**: Snake head collides with fruit position
- **Progression**: Fruit spawns → Snake approaches → Collision detected → Snake grows → Score updates → New fruit spawns
- **Success criteria**: Reliable collision detection, immediate visual feedback, proper growth mechanics

### Game State Management
- **Functionality**: Start screen, active gameplay, game over state with restart capability
- **Purpose**: Provides clear game flow and allows repeated play sessions
- **Trigger**: Spacebar to start/restart, collision with walls/self for game over
- **Progression**: Start screen → Game begins → Gameplay continues → Game over → Restart option
- **Success criteria**: Clear state transitions, persistent high score tracking

### Score and High Score System
- **Functionality**: Track current score and maintain persistent high score across sessions
- **Purpose**: Provides progression feedback and replay motivation
- **Trigger**: Automatic scoring on fruit collection
- **Progression**: Score increases → New high score achieved → Celebration effect → Score persists
- **Success criteria**: Accurate scoring, high score persistence, visual score feedback

## Edge Case Handling

- **Self-collision**: Game ends immediately when snake head touches its body
- **Wall collision**: Game ends when snake moves outside playable area boundaries  
- **Rapid direction changes**: Prevent 180-degree turns that would cause immediate self-collision
- **Pause functionality**: Allow players to pause/unpause during active gameplay
- **Fruit spawn conflicts**: Ensure fruit never spawns on snake body segments

## Design Direction

The design should feel modern and mesmerizing with a focus on smooth animations and vibrant colors that create an almost hypnotic gameplay experience, balancing nostalgia with contemporary visual polish.

## Color Selection

Triadic color scheme with dynamic rainbow progression to create visual interest and energy.

- **Primary Color**: Deep Space Blue `oklch(0.2 0.15 240)` for backgrounds and UI elements, communicates depth and focus
- **Secondary Colors**: Electric Purple `oklch(0.4 0.2 280)` and Neon Green `oklch(0.6 0.25 120)` for accents and highlights
- **Accent Color**: Bright Orange `oklch(0.7 0.25 60)` for interactive elements and score highlights
- **Foreground/Background Pairings**: 
  - Background (Deep Space Blue): White text `oklch(0.95 0 0)` - Ratio 8.2:1 ✓
  - Primary (Deep Space Blue): White text `oklch(0.95 0 0)` - Ratio 8.2:1 ✓
  - Accent (Bright Orange): White text `oklch(0.95 0 0)` - Ratio 4.8:1 ✓
  - Card (Dark Gray): Light Gray text `oklch(0.85 0 0)` - Ratio 6.1:1 ✓

## Font Selection

Typography should feel modern and gaming-focused with clear readability for scores and minimal interface text.

- **Typographic Hierarchy**:
  - H1 (Game Title): Inter Bold/32px/tight letter spacing
  - H2 (Score Display): Inter Semibold/24px/normal spacing  
  - H3 (Instructions): Inter Medium/16px/relaxed spacing
  - Body (UI Text): Inter Regular/14px/normal spacing

## Animations

Subtle but engaging animations that enhance gameplay feedback without distracting from core mechanics, with rainbow shimmer effects providing visual delight.

- **Purposeful Meaning**: Rainbow shimmer communicates the game's magical quality while smooth movement transitions maintain gameplay clarity
- **Hierarchy of Movement**: Snake movement is primary focus, fruit collection effects are secondary, UI transitions are tertiary

## Component Selection

- **Components**: Custom Canvas component for game rendering, shadcn Button for controls, Card for score display, Dialog for game over state
- **Customizations**: Custom game loop with requestAnimationFrame, rainbow gradient calculations, collision detection system
- **States**: Playing, paused, game over, and start states with appropriate visual indicators
- **Icon Selection**: Phosphor icons for pause/play, restart, and directional hints
- **Spacing**: Consistent 16px padding for UI elements, 8px gaps between related controls
- **Mobile**: Touch controls overlay for mobile devices, responsive canvas sizing, portrait orientation optimization