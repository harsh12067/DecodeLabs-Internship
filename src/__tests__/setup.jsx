import React from 'react';
import '@testing-library/jest-dom';

// Mock AOS to avoid issues in test environment
vi.mock('aos', () => ({
  default: { init: vi.fn(), refresh: vi.fn() },
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, exit, transition, whileInView, viewport, layout, ...rest }) => (
      <div {...rest}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock IntersectionObserver (not available in jsdom)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
