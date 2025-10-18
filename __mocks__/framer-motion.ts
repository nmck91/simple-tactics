/**
 * Mock Framer Motion for tests
 *
 * Framer Motion animations can cause issues in Jest tests.
 * This mock simplifies motion components to plain DOM elements.
 */

import React from 'react'

const actualMotion = jest.requireActual('framer-motion')

// Mock motion components as plain HTML elements
const mockMotion = {
  div: ({ children, ...props }: any) => React.createElement('div', props, children),
  span: ({ children, ...props }: any) => React.createElement('span', props, children),
  button: ({ children, ...props }: any) => React.createElement('button', props, children),
  section: ({ children, ...props }: any) => React.createElement('section', props, children),
  article: ({ children, ...props }: any) => React.createElement('article', props, children),
  aside: ({ children, ...props }: any) => React.createElement('aside', props, children),
  nav: ({ children, ...props }: any) => React.createElement('nav', props, children),
  header: ({ children, ...props }: any) => React.createElement('header', props, children),
  footer: ({ children, ...props }: any) => React.createElement('footer', props, children),
  main: ({ children, ...props }: any) => React.createElement('main', props, children),
  ul: ({ children, ...props }: any) => React.createElement('ul', props, children),
  ol: ({ children, ...props }: any) => React.createElement('ol', props, children),
  li: ({ children, ...props }: any) => React.createElement('li', props, children),
  p: ({ children, ...props }: any) => React.createElement('p', props, children),
  h1: ({ children, ...props }: any) => React.createElement('h1', props, children),
  h2: ({ children, ...props }: any) => React.createElement('h2', props, children),
  h3: ({ children, ...props }: any) => React.createElement('h3', props, children),
  a: ({ children, ...props }: any) => React.createElement('a', props, children),
  img: ({ children, ...props }: any) => React.createElement('img', props, children),
}

// Mock LazyMotion components
const LazyMotion = ({ children }: any) => children

const domAnimation = {}

// Mock m (lazy motion) same as motion
const m = mockMotion

// Mock AnimatePresence
const AnimatePresence = ({ children }: any) => children

// Mock useAnimation hook
const useAnimation = () => ({
  start: jest.fn(),
  stop: jest.fn(),
  set: jest.fn(),
})

// Mock useMotionValue hook
const useMotionValue = (initial: any) => ({
  get: () => initial,
  set: jest.fn(),
  onChange: jest.fn(),
})

// Mock useTransform hook
const useTransform = (value: any, input: any, output: any) => value

// Mock useSpring hook
const useSpring = (value: any, config?: any) => value

// Mock useScroll hook
const useScroll = () => ({
  scrollX: { get: () => 0, set: jest.fn() },
  scrollY: { get: () => 0, set: jest.fn() },
  scrollXProgress: { get: () => 0, set: jest.fn() },
  scrollYProgress: { get: () => 0, set: jest.fn() },
})

// Mock useInView hook
const useInView = () => true

module.exports = {
  ...actualMotion,
  motion: mockMotion,
  m,
  LazyMotion,
  domAnimation,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useInView,
}
