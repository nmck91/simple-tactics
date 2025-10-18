#!/usr/bin/env node

/**
 * Validate Tactics JSON Schema
 *
 * This script validates all tactics JSON files against the expected schema.
 * Used in CI pipeline to prevent invalid data from reaching production.
 *
 * Usage:
 *   node scripts/validate-tactics.js
 *   npm run validate-tactics
 */

const fs = require('fs')
const path = require('path')

// ============================================================================
// Configuration
// ============================================================================

const TACTICS_DIR = path.join(__dirname, '..', 'public', 'data', 'tactics')
const CATEGORIES = ['pressing', 'passing', 'defending', 'set-pieces']
const FORMATS = ['5v5', '7v7', '9v9']
const PLAYER_ROLES = ['goalkeeper', 'defender', 'midfielder', 'forward']
const DIFFICULTIES = ['beginner', 'intermediate', 'advanced']

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate that a value is a string
 */
function validateString(value, fieldName, required = true) {
  if (value === undefined || value === null) {
    if (required) {
      throw new Error(`${fieldName} is required`)
    }
    return true
  }

  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string, got ${typeof value}`)
  }

  if (required && value.trim().length === 0) {
    throw new Error(`${fieldName} cannot be empty`)
  }

  return true
}

/**
 * Validate that a value is a number within a range
 */
function validateNumber(value, fieldName, min = 0, max = 100, required = true) {
  if (value === undefined || value === null) {
    if (required) {
      throw new Error(`${fieldName} is required`)
    }
    return true
  }

  if (typeof value !== 'number') {
    throw new Error(`${fieldName} must be a number, got ${typeof value}`)
  }

  if (value < min || value > max) {
    throw new Error(`${fieldName} must be between ${min} and ${max}, got ${value}`)
  }

  return true
}

/**
 * Validate position coordinates
 */
function validatePosition(position, playerContext) {
  if (!position || typeof position !== 'object') {
    throw new Error(`${playerContext}: position must be an object`)
  }

  validateNumber(position.x, `${playerContext}: position.x`, 0, 100)
  validateNumber(position.y, `${playerContext}: position.y`, 0, 100)

  return true
}

/**
 * Validate player object
 */
function validatePlayer(player, index, format) {
  const playerContext = `Format ${format}, Player ${index + 1}`

  validateString(player.id, `${playerContext}: id`)
  validatePosition(player.position, playerContext)
  validateString(player.role, `${playerContext}: role`)

  if (!PLAYER_ROLES.includes(player.role)) {
    throw new Error(
      `${playerContext}: invalid role "${player.role}". Must be one of: ${PLAYER_ROLES.join(', ')}`
    )
  }

  // Optional: name
  if (player.name !== undefined) {
    validateString(player.name, `${playerContext}: name`, false)
  }

  return true
}

/**
 * Validate animation keyframe
 */
function validateKeyframe(keyframe, index, format) {
  const context = `Format ${format}, Keyframe ${index + 1}`

  validateString(keyframe.playerId, `${context}: playerId`)
  validatePosition(keyframe.startPosition, `${context}: startPosition`)
  validatePosition(keyframe.endPosition, `${context}: endPosition`)
  validateNumber(keyframe.duration, `${context}: duration`, 0, 10000)

  // Optional: delay
  if (keyframe.delay !== undefined) {
    validateNumber(keyframe.delay, `${context}: delay`, 0, 10000, false)
  }

  return true
}

/**
 * Validate animation object
 */
function validateAnimation(animation, format) {
  if (!animation || typeof animation !== 'object') {
    throw new Error(`Format ${format}: animation must be an object`)
  }

  // Validate keyframes array
  if (!Array.isArray(animation.keyframes)) {
    throw new Error(`Format ${format}: animation.keyframes must be an array`)
  }

  animation.keyframes.forEach((keyframe, index) => {
    validateKeyframe(keyframe, index, format)
  })

  // Validate totalDuration
  validateNumber(animation.totalDuration, `Format ${format}: animation.totalDuration`, 0, 30000)

  // Optional: loop
  if (animation.loop !== undefined && typeof animation.loop !== 'boolean') {
    throw new Error(`Format ${format}: animation.loop must be a boolean`)
  }

  return true
}

/**
 * Validate format tactic
 */
function validateFormatTactic(formatTactic, format) {
  if (!formatTactic || typeof formatTactic !== 'object') {
    throw new Error(`Format ${format} must be an object`)
  }

  // Validate players array
  if (!Array.isArray(formatTactic.players)) {
    throw new Error(`Format ${format}: players must be an array`)
  }

  if (formatTactic.players.length === 0) {
    throw new Error(`Format ${format}: must have at least one player`)
  }

  formatTactic.players.forEach((player, index) => {
    validatePlayer(player, index, format)
  })

  // Optional: animation
  if (formatTactic.animation !== undefined) {
    validateAnimation(formatTactic.animation, format)
  }

  // Optional: notes
  if (formatTactic.notes !== undefined) {
    validateString(formatTactic.notes, `Format ${format}: notes`, false)
  }

  return true
}

/**
 * Validate description object
 */
function validateDescription(description) {
  if (!description || typeof description !== 'object') {
    throw new Error('description must be an object')
  }

  validateString(description.kidSpeak, 'description.kidSpeak')
  validateString(description.tactical, 'description.tactical')

  // Optional: metaphor
  if (description.metaphor !== undefined) {
    validateString(description.metaphor, 'description.metaphor', false)
  }

  return true
}

/**
 * Validate complete tactic object
 */
function validateTactic(tactic, filename) {
  try {
    // Required fields
    validateString(tactic.id, 'id')
    validateString(tactic.title, 'title')
    validateString(tactic.category, 'category')

    // Validate category value
    if (!CATEGORIES.includes(tactic.category)) {
      throw new Error(
        `Invalid category "${tactic.category}". Must be one of: ${CATEGORIES.join(', ')}`
      )
    }

    // Validate description
    validateDescription(tactic.description)

    // Validate formats
    if (!tactic.formats || typeof tactic.formats !== 'object') {
      throw new Error('formats must be an object')
    }

    FORMATS.forEach((format) => {
      if (!tactic.formats[format]) {
        throw new Error(`Missing required format: ${format}`)
      }
      validateFormatTactic(tactic.formats[format], format)
    })

    // Optional: characterRoles
    if (tactic.characterRoles !== undefined) {
      if (typeof tactic.characterRoles !== 'object') {
        throw new Error('characterRoles must be an object')
      }
    }

    // Optional: whenToUse
    if (tactic.whenToUse !== undefined) {
      if (!Array.isArray(tactic.whenToUse)) {
        throw new Error('whenToUse must be an array')
      }
      tactic.whenToUse.forEach((item, index) => {
        validateString(item, `whenToUse[${index}]`)
      })
    }

    // Optional: thumbnail
    if (tactic.thumbnail !== undefined) {
      validateString(tactic.thumbnail, 'thumbnail', false)
    }

    // Optional: difficulty
    if (tactic.difficulty !== undefined) {
      validateString(tactic.difficulty, 'difficulty', false)
      if (!DIFFICULTIES.includes(tactic.difficulty)) {
        throw new Error(
          `Invalid difficulty "${tactic.difficulty}". Must be one of: ${DIFFICULTIES.join(', ')}`
        )
      }
    }

    // Optional: ageGroup
    if (tactic.ageGroup !== undefined) {
      validateString(tactic.ageGroup, 'ageGroup', false)
    }

    return true
  } catch (error) {
    throw new Error(`${filename}: ${error.message}`)
  }
}

/**
 * Validate tactics index
 */
function validateTacticIndex(indexEntry, index) {
  const context = `Index entry ${index + 1}`

  try {
    validateString(indexEntry.id, `${context}: id`)
    validateString(indexEntry.title, `${context}: title`)
    validateString(indexEntry.category, `${context}: category`)

    if (!CATEGORIES.includes(indexEntry.category)) {
      throw new Error(
        `${context}: invalid category "${indexEntry.category}". Must be one of: ${CATEGORIES.join(', ')}`
      )
    }

    // Optional fields
    if (indexEntry.thumbnail !== undefined) {
      validateString(indexEntry.thumbnail, `${context}: thumbnail`, false)
    }

    if (indexEntry.difficulty !== undefined) {
      validateString(indexEntry.difficulty, `${context}: difficulty`, false)
      if (!DIFFICULTIES.includes(indexEntry.difficulty)) {
        throw new Error(
          `${context}: invalid difficulty "${indexEntry.difficulty}". Must be one of: ${DIFFICULTIES.join(', ')}`
        )
      }
    }

    return true
  } catch (error) {
    throw new Error(`index.json: ${error.message}`)
  }
}

// ============================================================================
// Main Validation Logic
// ============================================================================

function validateAllTactics() {
  console.log('🔍 Validating tactics JSON files...\n')

  let totalFiles = 0
  let validFiles = 0
  let errors = []

  // Validate index.json
  const indexPath = path.join(TACTICS_DIR, 'index.json')
  console.log('Validating index.json...')

  try {
    if (!fs.existsSync(indexPath)) {
      throw new Error('index.json not found')
    }

    const indexContent = fs.readFileSync(indexPath, 'utf8')
    const index = JSON.parse(indexContent)

    if (!Array.isArray(index)) {
      throw new Error('index.json must contain an array')
    }

    index.forEach((entry, i) => {
      validateTacticIndex(entry, i)
    })

    console.log(`✅ index.json is valid (${index.length} entries)\n`)
    totalFiles++
    validFiles++
  } catch (error) {
    console.log(`❌ index.json validation failed`)
    console.log(`   ${error.message}\n`)
    errors.push(`index.json: ${error.message}`)
    totalFiles++
  }

  // Validate each category
  CATEGORIES.forEach((category) => {
    const categoryPath = path.join(TACTICS_DIR, category)

    if (!fs.existsSync(categoryPath)) {
      console.log(`⚠️  Category directory not found: ${category}\n`)
      return
    }

    console.log(`Validating ${category} tactics...`)

    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith('.json') && file !== 'index.json')

    if (files.length === 0) {
      console.log(`   No tactics found in ${category}\n`)
      return
    }

    files.forEach((file) => {
      const filePath = path.join(categoryPath, file)
      totalFiles++

      try {
        const content = fs.readFileSync(filePath, 'utf8')
        const tactic = JSON.parse(content)

        validateTactic(tactic, `${category}/${file}`)

        console.log(`   ✅ ${file}`)
        validFiles++
      } catch (error) {
        console.log(`   ❌ ${file}`)
        console.log(`      ${error.message}`)
        errors.push(`${category}/${file}: ${error.message}`)
      }
    })

    console.log('')
  })

  // Summary
  console.log('═══════════════════════════════════════════════')
  console.log('VALIDATION SUMMARY')
  console.log('═══════════════════════════════════════════════')
  console.log(`Total files: ${totalFiles}`)
  console.log(`Valid: ${validFiles}`)
  console.log(`Invalid: ${totalFiles - validFiles}`)
  console.log('═══════════════════════════════════════════════\n')

  if (errors.length > 0) {
    console.log('❌ VALIDATION FAILED\n')
    console.log('Errors:')
    errors.forEach((error) => {
      console.log(`  • ${error}`)
    })
    console.log('')
    process.exit(1)
  } else {
    console.log('✅ ALL TACTICS VALID\n')
    process.exit(0)
  }
}

// ============================================================================
// Run Validation
// ============================================================================

if (require.main === module) {
  try {
    validateAllTactics()
  } catch (error) {
    console.error('❌ Validation script error:', error.message)
    process.exit(1)
  }
}

module.exports = {
  validateTactic,
  validateTacticIndex,
}
