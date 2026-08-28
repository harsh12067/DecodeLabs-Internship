import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../components/Hero';

// Mock profile image import
vi.mock('../assets/profile.png', () => ({ default: 'profile.png' }));

describe('Hero', () => {
  it('renders the greeting text', () => {
    render(<Hero />);
    expect(screen.getByText(/hi, i'm/i)).toBeInTheDocument();
  });

  it("renders Harsh Tiwari's name", () => {
    render(<Hero />);
    expect(screen.getByText(/Harsh Tiwari/)).toBeInTheDocument();
  });

  it('renders the Hire Me button linking to contact section', () => {
    render(<Hero />);
    const hireBtn = screen.getByRole('link', { name: /hire me/i });
    expect(hireBtn).toBeInTheDocument();
    expect(hireBtn).toHaveAttribute('href', '#contact');
  });

  it('renders the Download Resume button', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /download resume/i })).toBeInTheDocument();
  });

  it('renders the LinkedIn social link with correct aria-label', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
  });

  it('renders profile image with alt text', () => {
    render(<Hero />);
    const img = screen.getByRole('img', { name: /harsh tiwari/i });
    expect(img).toBeInTheDocument();
  });

  it('renders the hero section with correct id', () => {
    render(<Hero />);
    expect(document.getElementById('home')).toBeInTheDocument();
  });
});
