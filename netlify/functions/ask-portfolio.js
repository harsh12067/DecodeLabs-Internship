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
 * Model:   gemini-3.6-flash
 */

import { GoogleGenAI } from '@google/genai';
import { portfolioData } from '../../src/data/portfolioData.js';

/** Build the grounding prompt using real portfolio data only */
function buildSystemPrompt(data) {
  const projectList = data.projects
    .map(
      (p) =>
        `• Project Name: ${p.title}
  Description: ${p.description}
  Technologies Used: ${p.technologies.join(', ')}
  Key Highlights: ${p.highlights.join('; ')}
  Live Demo: ${p.liveLink || 'None (Private / In Development)'}
  GitHub Code: ${p.githubLink || 'Private project'}`
    )
    .join('\n\n');

  const programmingSkills = data.skills.programming.map((s) => `${s.name} (${s.level}%)`).join(', ');
  const webSkills = data.skills.webDevelopment.map((s) => `${s.name} (${s.level}%)`).join(', ');
  const dbSkills = data.skills.databases.map((s) => `${s.name} (${s.level}%)`).join(', ');
  const toolSkills = data.skills.tools.map((s) => `${s.name} (${s.level}%)`).join(', ');

  const allTechList = [
    ...data.skills.programming.map((s) => s.name),
    ...data.skills.webDevelopment.map((s) => s.name),
    ...data.skills.databases.map((s) => s.name),
    ...data.skills.tools.map((s) => s.name),
  ].join(', ');

  const expList = data.experience
    .map(
      (e) =>
        `• Role: ${e.role}
  Company: ${e.company}
  Program: ${e.programName}
  Duration: ${e.duration} (${e.durationMonths})
  Location: ${e.location}
  Key Contributions:
${e.contributions.map((c) => `  - ${c}`).join('\n')}`
    )
    .join('\n\n');

  const eduList = data.education
    .map(
      (e) =>
        `• Degree/Level: ${e.degree}${e.field ? ` in ${e.field}` : ''}
  Institution: ${e.institution}
  Duration: ${e.duration}
  Score/Status: ${e.percentage || e.status || 'Enrolled'}`
    )
    .join('\n\n');

  const certList = data.certifications
    .map((c) => `• ${c.title} by ${c.issuer} (${c.date}) — Credential ID: ${c.credentialId}`)
    .join('\n');

  const servicesList = data.services
    .map((s) => `• ${s.title}: ${s.description}`)
    .join('\n');

  return `You are the AI portfolio assistant for ${data.personal.name}.
Your job is to accurately answer visitors' questions about Harsh Tiwari's portfolio, skills, technologies, projects, education, work experience, certifications, and background.

COMPLETE PORTFOLIO DATA (SOURCE OF TRUTH):
================================================================
ABOUT HARSH TIWARI:
- Full Name: ${data.personal.name}
- Title / Professional Roles: ${data.personal.title}
- Location: ${data.personal.location}
- Email: ${data.personal.email}
- Phone: ${data.personal.phone}
- Bio / Summary: ${data.personal.bio}
- Tagline: ${data.personal.tagline}
- LinkedIn: ${data.personal.linkedin}
- Instagram: ${data.personal.instagram}
- Live Portfolio URL: ${data.personal.livePortfolio}
- College: Arya College of Engineering and IT (ACEIT), Jaipur
- Degree: Bachelor of Technology (B.Tech) in Electronics and Communication Engineering (ECE)
- Career Objective: To secure a challenging position in a progressive organization where I can leverage my web development and coding skills, contribute to team success, and grow professionally while designing creative digital products.
- Interests: Web Development, DSA (Data Structures & Algorithms), AI & Machine Learning Basics
- Hobbies: Gaming & Tech
- Core Strengths & Competencies:
  • Strong analytical & problem-solving abilities (DSA)
  • Responsive front-end development & modern UI design
  • Familiarity with SQL (MySQL) and NoSQL (MongoDB) databases
  • Version control with Git and GitHub
  • Continuous learner, passionate about emerging web technologies

SKILLS & TECHNOLOGIES:
- All Technologies & Tools: ${allTechList}
- Programming Languages: ${programmingSkills}
- Web Development & Frameworks: ${webSkills}
- Databases: ${dbSkills}
- Developer Tools: ${toolSkills}
- Additional Technologies mentioned in projects: Node.js, Express.js, REST API, Postman, Framer Motion, AOS, Glassmorphism, Google Gemini API

PROJECTS:
${projectList}

WORK EXPERIENCE & INTERNSHIPS:
${expList}

EDUCATION:
${eduList}

CERTIFICATIONS:
${certList}

SERVICES OFFERED:
${servicesList}
================================================================

RULES AND INSTRUCTIONS:
1. Use ONLY the supplied portfolio data above.
2. If the requested information exists in the supplied data (such as skills, technologies, the 3 projects [Personal Portfolio Website, AetherFlow Landing Page, Backend API], experience, education, or about Harsh), answer clearly, thoroughly, and helpfully using that information.
3. If the user asks about something that does NOT exist in the supplied data (e.g. favorite food, personal private life, unlisted/removed projects like E-Commerce Website or Student Management System, or general trivia), politely state that this information is not available in this portfolio.
4. When answering questions about projects or skills, highlight relevant technologies and why they fit.
5. Keep your tone professional, friendly, and helpful to recruiters and visitors.

RESPONSE FORMAT:
Always respond with valid JSON in this exact structure:
{
  "answer": "Your full natural language answer text here",
  "relatedProjects": [
    { "name": "Exact Project Name", "reason": "Why this project is relevant to the question" }
  ]
}

If no specific project is relevant to the question, set relatedProjects to an empty array [].
Only include projects from the portfolio that are genuinely relevant to the question.`;
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
  const rawKey = process.env.GEMINI_API_KEY;
  if (!rawKey || !rawKey.trim()) {
    console.error('GEMINI_API_KEY is not configured');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GEMINI_API_KEY is not configured. Please add it to your Netlify Environment Variables.' }),
    };
  }

  const cleanKey = rawKey.trim().replace(/^["']|["']$/g, '');

  try {
    const ai = new GoogleGenAI({ apiKey: cleanKey });
    const systemPrompt = buildSystemPrompt(portfolioData);

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: question,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 600,
        temperature: 0.2, // Low temperature for factual, grounded answers
      },
    });

    const rawText = response?.text ?? '';
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
        body: JSON.stringify({ error: 'The request timed out. Please try again.' }),
      };
    }

    // Meaningful error messages for common API errors
    const errorMsg = error?.message || (typeof error === 'string' ? error : '');
    let userFriendlyError = errorMsg ? `AI service error: ${errorMsg}` : 'AI service error. Please try again.';

    if (errorMsg.includes('API_KEY_INVALID') || errorMsg.includes('API key not valid')) {
      userFriendlyError = 'Invalid Gemini API key. Please check your GEMINI_API_KEY setting in Netlify.';
    } else if (errorMsg.includes('QUOTA_EXCEEDED') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
      userFriendlyError = 'Gemini API quota exceeded. Please try again in a few moments.';
    } else if (errorMsg.includes('PERMISSION_DENIED')) {
      userFriendlyError = 'Permission denied for this Gemini API key.';
    }

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: userFriendlyError }),
    };
  }
};
