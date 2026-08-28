import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    // Reset scroll
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  it('renders the logo', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /harsh tiwari/i })).toBeInTheDocument();
  });

  it('renders all desktop navigation links', () => {
    render(<Navbar />);
    const expectedLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Certifications', 'Services', 'Contact'];
    expectedLinks.forEach((name) => {
      expect(screen.getAllByRole('link', { name })[0]).toBeInTheDocument();
    });
  });

  it('renders mobile menu button', () => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: /open navigation menu/i })).toBeInTheDocument();
  });

  it('opens mobile drawer when menu button is clicked', () => {
    render(<Navbar />);
    const menuBtn = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(menuBtn);
    expect(screen.getByRole('dialog', { name: /navigation menu/i })).toBeInTheDocument();
  });

  it('shows aria-expanded=true when drawer is open', () => {
    render(<Navbar />);
    const menuBtn = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes mobile drawer when close button is clicked', () => {
    render(<Navbar />);
    const menuBtn = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(menuBtn);
    // Get the close button inside the drawer (there may be multiple matching elements)
    const closeBtns = screen.getAllByRole('button', { name: /close navigation menu/i });
    fireEvent.click(closeBtns[0]);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile drawer on Escape key press', () => {
    render(<Navbar />);
    const menuBtn = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(menuBtn);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
  });
});
