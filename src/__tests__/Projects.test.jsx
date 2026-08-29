import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Projects from '../components/Projects';

// Mock image imports
vi.mock('../assets/project_sms.png', () => ({ default: 'sms.png' }));
vi.mock('../assets/project_portfolio.png', () => ({ default: 'portfolio.png' }));
vi.mock('../assets/project_ecommerce.png', () => ({ default: 'ecommerce.png' }));

describe('Projects', () => {
  it('renders the section heading', () => {
    render(<Projects />);
    expect(screen.getByRole('heading', { name: /my projects/i })).toBeInTheDocument();
  });

  it('renders all 3 project cards', () => {
    render(<Projects />);
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('renders Student Management System project', () => {
    render(<Projects />);
    expect(screen.getByText('Student Management System')).toBeInTheDocument();
  });

  it('renders Personal Portfolio Website project', () => {
    render(<Projects />);
    expect(screen.getByText('Personal Portfolio Website')).toBeInTheDocument();
  });

  it('renders E-Commerce Website project', () => {
    render(<Projects />);
    expect(screen.getByText('E-Commerce Website')).toBeInTheDocument();
  });

  it('renders technology tags for each project', () => {
    render(<Projects />);
    // React should appear in both Portfolio and E-Commerce projects
    expect(screen.getAllByText('React.js').length).toBeGreaterThan(0);
    // Java appears in both the hover badge and the tech tag list
    expect(screen.getAllByText('Java').length).toBeGreaterThan(0);
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders project images with descriptive alt text', () => {
    render(<Projects />);
    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });

  it('renders live demo link for portfolio project', () => {
    render(<Projects />);
    const liveLinks = screen.getAllByRole('link', { name: /view personal portfolio website live demo/i });
    expect(liveLinks[0]).toHaveAttribute('href', 'https://portfolioowebb.netlify.app/');
  });

  it('shows private project label for projects without GitHub links', () => {
    render(<Projects />);
    // Student Management System and E-Commerce have no githubLink
    expect(screen.getAllByText('Private project').length).toBeGreaterThan(0);
  });

  it('renders the projects section with correct id', () => {
    render(<Projects />);
    expect(document.getElementById('projects')).toBeInTheDocument();
  });
});
