# Tactics JSON Schema

This directory contains all tactic data for Simple Tactics. Each tactic is a JSON file that defines player positions, animations, and coaching guidance for all three formats (5v5, 7v7, 9v9).

## Directory Structure

```
/public/data/tactics/
├── index.json              # Master list of all tactics
├── pressing/
│   ├── high-press.json
│   └── counter-press.json
├── passing/
│   ├── build-up.json
│   └── switch-play.json
├── defending/
│   ├── compact-defense.json
│   └── zonal-marking.json
└── set-pieces/
    ├── corner-kick.json
    └── goal-kick.json
```

## Tactic JSON Schema

### Root Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier (kebab-case, e.g., "high-press") |
| `title` | string | ✅ | Display name (e.g., "High Press Attack") |
| `category` | enum | ✅ | One of: `pressing`, `passing`, `defending`, `set-pieces` |
| `description` | object | ✅ | Text descriptions (see below) |
| `characterRoles` | object | ❌ | Superhero theme role names |
| `whenToUse` | string[] | ❌ | Coaching tips on when to apply this tactic |
| `formats` | object | ✅ | Tactic data for 5v5, 7v7, 9v9 |
| `thumbnail` | string | ❌ | Path to preview image |
| `difficulty` | enum | ❌ | One of: `beginner`, `intermediate`, `advanced` |
| `ageGroup` | enum | ❌ | One of: `5-7`, `8-9`, `10-11` |

### Description Object

```json
{
  "description": {
    "kidSpeak": "Simple explanation for ages 5-7 using fun language",
    "tactical": "Professional coaching language for older players",
    "metaphor": "Relatable comparison (e.g., 'Like bees swarming honey')"
  }
}
```

### Character Roles (Optional, for Superhero Theme)

```json
{
  "characterRoles": {
    "forward": "Rocket Racers",
    "midfielder": "Busy Bees",
    "defender": "Brick Walls",
    "goalkeeper": "Super Shield"
  }
}
```

### Format Object (5v5, 7v7, 9v9)

Each format contains:

```json
{
  "5v5": {
    "players": [ /* Array of Player objects */ ],
    "animation": { /* Animation object */ },
    "notes": "Format-specific coaching notes"
  }
}
```

### Player Object

```json
{
  "id": "player-1",
  "position": {
    "x": 50,  // 0-100 (percentage of field width, left to right)
    "y": 10   // 0-100 (percentage of field height, top to bottom)
  },
  "role": "goalkeeper"  // One of: goalkeeper, defender, midfielder, forward
}
```

**Player Counts by Format:**
- **5v5**: 5 players
- **7v7**: 7 players
- **9v9**: 9 players

**Field Coordinate System:**
- `x: 0` = Left edge, `x: 100` = Right edge
- `y: 0` = Own goal, `y: 100` = Opposition goal
- `x: 50, y: 50` = Center of field

### Animation Object (Optional)

```json
{
  "animation": {
    "keyframes": [
      {
        "playerId": "player-1",
        "startPosition": { "x": 50, "y": 10 },
        "endPosition": { "x": 50, "y": 30 },
        "duration": 1500,  // milliseconds
        "delay": 0         // milliseconds (for sequential animations)
      }
    ],
    "totalDuration": 2000,  // milliseconds
    "loop": true
  }
}
```

**Animation Guidelines:**
- Keep total duration between 1.5-3 seconds
- Use delays to create sequential movements
- Realistic movement speeds (players can't teleport!)
- Start and end positions should make tactical sense

## Adding a New Tactic

### 1. Choose Category & Create File

```bash
# Create file in appropriate category directory
touch public/data/tactics/passing/my-new-tactic.json
```

### 2. Copy Template

```json
{
  "id": "my-new-tactic",
  "title": "My New Tactic",
  "category": "passing",
  "description": {
    "kidSpeak": "...",
    "tactical": "..."
  },
  "formats": {
    "5v5": { "players": [...] },
    "7v7": { "players": [...] },
    "9v9": { "players": [...] }
  }
}
```

### 3. Define Player Positions

Use the coordinate system:
- Goalkeeper: typically `y: 5-10`
- Defenders: typically `y: 20-35`
- Midfielders: typically `y: 40-55`
- Forwards: typically `y: 65-80`

Spread players across `x: 0-100` based on formation.

### 4. Add Animation Keyframes

1. Identify 2-4 key player movements
2. Define start and end positions
3. Set realistic durations (500-2000ms per movement)
4. Use delays to sequence movements

### 5. Validate Your Tactic

```bash
npm run validate-tactics
```

This checks:
- ✅ Valid JSON syntax
- ✅ Required fields present
- ✅ Correct player counts per format
- ✅ Valid coordinate ranges (0-100)
- ✅ Enum values match allowed options

### 6. Add to Index

Update `/public/data/tactics/index.json`:

```json
{
  "id": "my-new-tactic",
  "title": "My New Tactic",
  "category": "passing",
  "thumbnail": "/images/tactics/my-new-tactic-thumb.svg",
  "difficulty": "intermediate"
}
```

### 7. Test in App

```bash
npm run dev
# Navigate to http://localhost:3000
# Your tactic should appear in the grid
```

## Example Tactics

See these files for reference:
- **Simple tactic**: `passing/build-up.json`
- **Complex animation**: `pressing/high-press.json`

## Common Patterns

### Compact Defense
- Defenders: `y: 25-35` (low line)
- Midfielders: `y: 40-50` (close to defenders)

### High Press
- Forwards: `y: 75-90` (high up field)
- Midfielders: `y: 60-70` (supporting press)

### Wing Play
- Wide players: `x: 10-15` and `x: 85-90`
- Central players: `x: 45-55`

## Troubleshooting

**"Player count mismatch"**
- Check you have exactly 5, 7, or 9 players per format

**"Animation doesn't look right"**
- Ensure `totalDuration` matches longest keyframe (duration + delay)
- Check positions are within 0-100 range

**"Tactic doesn't appear in app"**
- Verify entry exists in `index.json`
- Check file is in correct category directory
- Ensure `id` matches filename (without .json)

## Questions?

See full documentation: `/docs/tactics/SCHEMA.md`
