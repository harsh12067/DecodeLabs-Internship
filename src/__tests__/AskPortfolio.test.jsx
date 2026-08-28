import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AskPortfolio from '../components/AskPortfolio';

// Note: fetch is mocked below to simulate Gemini API responses via the Netlify Function proxy.

// Helper to render and get the trigger button
function setup() {
  render(<AskPortfolio />);
  return screen.getByRole('button', { name: /open ai portfolio assistant/i });
}

describe('AskPortfolio — Floating Button', () => {
  it('renders the trigger button', () => {
    const btn = setup();
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(/ask my portfolio/i);
  });

  it('has aria-expanded=false when closed', () => {
    const btn = setup();
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('AskPortfolio — Panel Open/Close', () => {
  it('opens the panel when trigger button is clicked', async () => {
    const btn = setup();
    await userEvent.click(btn);
    expect(screen.getByRole('dialog', { name: /ask my portfolio/i })).toBeInTheDocument();
  });

  it('has aria-expanded=true when panel is open', async () => {
    const btn = setup();
    await userEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes panel when close button is clicked', async () => {
    const btn = setup();
    await userEvent.click(btn);
    const closeBtn = screen.getByRole('button', { name: /close ai assistant/i });
    await userEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes panel when Escape key is pressed', async () => {
    const btn = setup();
    await userEvent.click(btn);
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

describe('AskPortfolio — Suggested Questions', () => {
  it('renders suggested question chips in IDLE state', async () => {
    const btn = setup();
    await userEvent.click(btn);
    expect(screen.getByText(/what projects are available/i)).toBeInTheDocument();
    expect(screen.getByText(/which projects use react/i)).toBeInTheDocument();
  });
});

describe('AskPortfolio — Empty Validation', () => {
  it('shows EMPTY state when submitting with no question', async () => {
    const btn = setup();
    await userEvent.click(btn);
    const submitBtn = screen.getByRole('button', { name: /submit question/i });
    await userEvent.click(submitBtn);
    expect(await screen.findByText(/please enter a question first/i)).toBeInTheDocument();
  });
});

describe('AskPortfolio — Loading State', () => {
  beforeEach(() => {
    // Mock fetch to return a pending promise
    global.fetch = vi.fn(() => new Promise(() => {}));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading state while waiting for AI response', async () => {
    const btn = setup();
    await userEvent.click(btn);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'What projects are available?');
    const submitBtn = screen.getByRole('button', { name: /submit question/i });
    await userEvent.click(submitBtn);
    expect(await screen.findByText(/thinking/i)).toBeInTheDocument();
  });
});

describe('AskPortfolio — Success State', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            answer: 'There are 3 projects: Student Management System, Personal Portfolio Website, and E-Commerce Website.',
            relatedProjects: [
              { name: 'Student Management System', reason: 'Academic management application.' },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the AI answer on successful response', async () => {
    const btn = setup();
    await userEvent.click(btn);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'What projects?');
    const submitBtn = screen.getByRole('button', { name: /submit question/i });
    await userEvent.click(submitBtn);
    expect(await screen.findByText(/there are 3 projects/i)).toBeInTheDocument();
  });

  it('renders related project cards on success', async () => {
    const btn = setup();
    await userEvent.click(btn);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'What projects?');
    const submitBtn = screen.getByRole('button', { name: /submit question/i });
    await userEvent.click(submitBtn);
    expect(await screen.findByText('Student Management System')).toBeInTheDocument();
  });
});

describe('AskPortfolio — Error State', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Internal Server Error' }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows error state when API call fails', async () => {
    const btn = setup();
    await userEvent.click(btn);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'What projects?');
    const submitBtn = screen.getByRole('button', { name: /submit question/i });
    await userEvent.click(submitBtn);
    // The error message from the mock is "Internal Server Error"
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('shows a Retry button on error', async () => {
    const btn = setup();
    await userEvent.click(btn);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'What projects?');
    const submitBtn = screen.getByRole('button', { name: /submit question/i });
    await userEvent.click(submitBtn);
    expect(await screen.findByRole('button', { name: /retry/i })).toBeInTheDocument();
  });
});

describe('AskPortfolio — Malformed Response', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            // Missing 'answer' field — malformed
            data: 'unexpected shape',
          }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles malformed AI response without crashing', async () => {
    const btn = setup();
    await userEvent.click(btn);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'What projects?');
    const submitBtn = screen.getByRole('button', { name: /submit question/i });
    await userEvent.click(submitBtn);
    // Should show either error state or a friendly message — not crash
    const errorOrMessage = await screen.findByRole('alert');
    expect(errorOrMessage).toBeInTheDocument();
  });
});

describe('AskPortfolio — Suggested Question Interaction', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            answer: 'React is used in Portfolio and E-Commerce projects.',
            relatedProjects: [],
          }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking a suggested question submits it immediately', async () => {
    const btn = setup();
    await userEvent.click(btn);
    const chip = screen.getByRole('button', { name: /which projects use react/i });
    await userEvent.click(chip);
    expect(await screen.findByText(/react is used in portfolio/i)).toBeInTheDocument();
  });
});
