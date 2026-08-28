/**
 * Netlify Serverless Function: ask-portfolio
 *
 * Secure proxy between the portfolio UI and the Google Gemini API.
 * The API key NEVER appears in frontend code — only in Netlify env vars.
 *
 * Architecture:
 *   Portfolio UI → POST /api/ask-portfolio → This function → Gemini API
 *                                          ← Structured JSON ←
 *
 * SDK:     @google/genai (official Google GenAI JavaScript SDK)
 * Model:   gemini-2.0-flash (fast, cost-effective, strong instruction-following)
 */

import { GoogleGenAI } from '@google/genai';
import { portfolioData } from '../../src/data/portfolioData.js';

/** Build the grounding prompt using real portfolio data only */
function buildSystemPrompt(data) {
  const projectList = data.projects
    .map(
      (p) =>
        `- ${p.title}: ${p.description} | Technologies: ${p.technologies.join(', ')} | Highlights: ${p.highlights.join('; ')}`
    )
    .join('\n');

  const skillList = [
    ...data.skills.programming.map((s) => s.name),
    ...data.skills.webDevelopment.map((s) => s.name),
    ...data.skills.databases.map((s) => s.name),
    ...data.skills.tools.map((s) => s.name),
  ].join(', ');

  const certList = data.certifications
    .map((c) => `${c.title} by ${c.issuer} (${c.date})`)
    .join(', ');

  const expList = data.experience
    .map(
      (e) =>
        `${e.role} at ${e.company} (${e.duration}, ${e.durationMonths}): ${e.contributions.join('; ')}`
    )
    .join('\n');

  const eduList = data.education
    .map(
      (e) =>
        `${e.degree} at ${e.institution}${e.percentage ? ` — ${e.percentage}` : ''} (${e.duration})`
    )
    .join(', ');

  return `You are the AI portfolio assistant for ${data.personal.name}.
Your ONLY purpose is to help visitors — recruiters, developers, and teachers — understand and discover the work presented in this portfolio.

PORTFOLIO DATA (use ONLY this information):
---
NAME: ${data.personal.name}
TITLE: ${data.personal.title}
LOCATION: ${data.personal.location}
BIO: ${data.personal.bio}

PROJECTS:
${projectList}

SKILLS: ${skillList}

EXPERIENCE:
${expList}

EDUCATION: ${eduList}

CERTIFICATIONS: ${certList}
---

STRICT RULES:
1. Answer ONLY using the portfolio data above. Never invent, assume, or hallucinate information.
2. If asked about something NOT in the portfolio data, respond with: "I don't have enough information about that in this portfolio."
3. Do NOT answer questions unrelated to this portfolio (no coding help, no general knowledge).
4. For project questions, mention the project name, description, technologies, and why it is relevant.
5. Keep answers concise and friendly.

RESPONSE FORMAT:
Always respond with valid JSON in this exact structure:
{
  "answer": "Your full answer text here",
  "relatedProjects": [
    { "name": "Project Name", "reason": "Why this project is relevant to the question" }
  ]
}

If no projects are relevant, set relatedProjects to an empty array [].
Only include projects that are GENUINELY relevant to the question.`;
}

/** Validate and parse the AI response */
function parseAIResponse(rawText) {
  try {
    // Extract JSON — Gemini may wrap it in markdown code fences
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON object found in response');

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate required fields
    if (typeof parsed.answer !== 'string') throw new Error('Missing answer field');
    if (!Array.isArray(parsed.relatedProjects)) throw new Error('Missing relatedProjects array');

    // Validate and clean relatedProjects
    const cleanProjects = parsed.relatedProjects
      .filter((p) => p && typeof p.name === 'string' && typeof p.reason === 'string')
      .slice(0, 3); // Max 3 related projects

    return {
      answer: parsed.answer.trim(),
      relatedProjects: cleanProjects,
    };
  } catch {
    return null; // Signal malformed response
  }
}

export const handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Parse request body
  let question;
  try {
    const body = JSON.parse(event.body || '{}');
    question = (body.question || '').trim();
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  // Validate question
  if (!question || question.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Question is required' }),
    };
  }

  if (question.length > 500) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Question is too long (max 500 characters)' }),
    };
  }

  // Check API key
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not configured');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'AI service is not configured' }),
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const systemPrompt = buildSystemPrompt(portfolioData);

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: question,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 600,
        temperature: 0.2, // Low temperature for factual, grounded answers
      },
    });

    const rawText = response.text ?? '';
    const parsed = parseAIResponse(rawText);

    if (!parsed) {
      // Malformed or unexpected response — safe fallback
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer: "I don't have enough information about that in this portfolio.",
          relatedProjects: [],
          _malformed: true,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    };
  } catch (error) {
    console.error('Gemini API error:', error);

    // Timeout detection
    if (error.message?.includes('timeout') || error.code === 'ETIMEDOUT') {
      return {
        statusCode: 504,
        body: JSON.stringify({ error: 'timeout' }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'AI service error. Please try again.' }),
    };
  }
};
