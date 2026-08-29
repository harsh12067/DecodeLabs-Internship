import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Projects from '../components/Projects';

// Mock image imports
vi.mock('../assets/project_portfolio.png', () => ({ default: 'portfolio.png' }));
vi.mock('../assets/project_aetherflow.png', () => ({ default: 'aetherflow.png' }));
vi.mock('../assets/project_backend.png', () => ({ default: 'backend.png' }));

describe('Projects', () => {
  it('renders the section heading', () => {
    render(<Projects />);
    expect(screen.getByRole('heading', { name: /my projects/i })).toBeInTheDocument();
  });

  it('renders all 3 project cards', () => {
    render(<Projects />);
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('renders Personal Portfolio Website project', () => {
    render(<Projects />);
    expect(screen.getByText('Personal Portfolio Website')).toBeInTheDocument();
  });

  it('renders AetherFlow Landing Page project', () => {
    render(<Projects />);
    expect(screen.getByText('AetherFlow Landing Page')).toBeInTheDocument();
  });

  it('renders Backend API project', () => {
    render(<Projects />);
    expect(screen.getByText('Backend API')).toBeInTheDocument();
  });

  it('renders technology tags for each project', () => {
    render(<Projects />);
    expect(screen.getAllByText('React.js').length).toBeGreaterThan(0);
    expect(screen.getAllByText('HTML5').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0);
  });

  it('renders project images with descriptive alt text', () => {
    render(<Projects />);
    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });

  it('renders live demo link for portfolio and aetherflow projects', () => {
    render(<Projects />);
    const liveLinks = screen.getAllByRole('link', { name: /view .* live demo/i });
    expect(liveLinks.length).toBeGreaterThan(0);
    expect(liveLinks[0]).toHaveAttribute('href', 'https://portfolioowebb.netlify.app/');
  });

  it('shows private project or code links properly', () => {
    render(<Projects />);
    const codeLinks = screen.getAllByRole('link', { name: /view .* source code on github/i });
    expect(codeLinks.length).toBeGreaterThan(0);
  });

  it('renders the projects section with correct id', () => {
    render(<Projects />);
    expect(document.getElementById('projects')).toBeInTheDocument();
  });
});
