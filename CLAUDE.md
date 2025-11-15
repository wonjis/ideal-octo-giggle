# CLAUDE.md - AI Assistant Guide for FashionFlat AI

**Version:** 1.0
**Last Updated:** November 15, 2025
**Project:** FashionFlat AI - AI-powered fashion technical flat sketch generator

---

## 📖 Purpose of This Document

This document provides guidance for AI coding assistants (like Claude, GitHub Copilot, etc.) working on the FashionFlat AI codebase. It explains:
- Project architecture and structure
- Development workflows and conventions
- Key technical decisions
- Common patterns and anti-patterns
- Security and deployment considerations

**IMPORTANT**: Always read this file before making significant changes to the codebase.

---

## 🎯 Project Overview

### What is FashionFlat AI?

FashionFlat AI is an AI-powered SaaS platform that enables fashion designers to:
1. Convert rough sketches into professional technical flat sketches
2. Generate designs from text prompts
3. Automatically create technical specifications
4. Export production-ready documentation

**Problem Solved**: Reduces manual flat sketch creation time by 50% (from 40+ hours per collection to ~20 hours).

**Target Users**: Independent fashion designers, technical designers, design students, small-to-mid sized fashion brands.

### Core Technology Stack

**Frontend:**
- React 19.1.0 + TypeScript 5.0
- TailwindCSS 3.0 for styling
- Custom design system (see `design-system.md`)
- React Router v6 for navigation
- Supabase client for backend integration

**Backend:**
- Vercel Serverless Functions (Node.js)
- Claude 3.5 Sonnet (Anthropic) - Primary AI for all intelligence tasks
- Hugging Face Inference API - Image generation (Stable Diffusion XL or FLUX)
- Supabase - Database (PostgreSQL) + Storage + Auth

**Infrastructure:**
- Hosting: Vercel (frontend + serverless functions)
- Database: Supabase Cloud (PostgreSQL)
- Storage: Supabase Storage (for images)
- Monitoring: Vercel Analytics + Sentry

### Current Development Phase

**Status**: Early setup - MVP implementation phase

**Completed:**
- ✅ Documentation (README, PRD, Design System, MVP Plan)
- ✅ Repository structure
- ✅ Git configuration
- ✅ Environment variable templates

**In Progress:**
- 🚧 Frontend application setup
- 🚧 API endpoint implementation
- 🚧 UI component development

**Not Started:**
- ❌ Database integration
- ❌ Authentication
- ❌ Production deployment

---

## 📁 Project Structure

### Current Structure (Early Stage)

```
ideal-octo-giggle/
├── README.md                      # Main development guide
├── CLAUDE.md                      # This file - AI assistant guide
├── prd.md                         # Product Requirements Document
├── design-system.md               # Complete design system & components
├── MVP-IMPLEMENTATION-PLAN.md     # Step-by-step MVP guide
├── .env.example                   # Environment variable template
├── .gitignore                     # Git ignore configuration
│
├── .github/                       # GitHub configuration
│   └── pull_request_template.md  # PR template (to be created)
│
├── frontend/                      # React frontend (to be created)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/            # Basic components
│   │   │   ├── molecules/        # Composite components
│   │   │   ├── organisms/        # Complex sections
│   │   │   ├── templates/        # Page layouts
│   │   │   └── pages/            # Full pages
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Third-party integrations
│   │   ├── services/             # API service layer
│   │   ├── styles/               # Design tokens & global styles
│   │   ├── types/                # TypeScript types
│   │   └── utils/                # Utility functions
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── api/                           # Vercel Serverless Functions (to be created)
│   ├── generate-flat.ts          # Image/prompt generation
│   ├── generate-details.ts       # Spec generation
│   └── upload.ts                 # File upload handler
│
├── vercel.json                    # Vercel configuration (to be created)
└── package.json                   # Root package.json (to be created)
```

### Planned Architecture

**Atomic Design Pattern** for components:
- **Atoms**: Button, Input, Icon, Spinner
- **Molecules**: FileUpload, PromptInput, ProgressBar
- **Organisms**: Header, Hero, ImageComparison, TechnicalSpecDisplay
- **Templates**: LandingPageTemplate, WorkspaceTemplate
- **Pages**: LandingPage, GeneratePage, ResultsPage

---

## 🔑 Key Documentation Files

### 1. README.md
**Purpose**: Main development guide
**When to Read**: Setting up project, deploying, troubleshooting
**Key Sections**:
- Tech stack details
- Prerequisites and setup
- API key configuration
- Database schema
- Deployment instructions

### 2. prd.md
**Purpose**: Product Requirements Document
**When to Read**: Understanding features, acceptance criteria, user stories
**Key Sections**:
- Core features & user stories
- Technical requirements
- Success metrics
- Future enhancements

### 3. design-system.md
**Purpose**: Complete design system & component library
**When to Read**: Building UI components, styling
**Key Sections**:
- Design tokens (colors, typography, spacing)
- Component specifications (11+ components)
- Code examples with full implementations
- Layout & grid system
- Accessibility guidelines

### 4. MVP-IMPLEMENTATION-PLAN.md
**Purpose**: Step-by-step MVP implementation guide
**When to Read**: Planning development phases
**Key Sections**:
- Phase-by-phase breakdown
- Success criteria for each phase
- Testing checklist
- Deployment checklist

---

## 🎨 Design System & UI Guidelines

### Design Tokens (From design-system.md)

**Colors:**
```typescript
primary: {
  main: '#A855F7',      // Purple/Magenta
  hover: '#9333EA',
  active: '#7E22CE',
  light: '#C084FC',
}

background: {
  primary: '#0F0F1E',   // Deep navy/dark
  secondary: '#1A1A2E',
  tertiary: '#252541',
  elevated: '#2D2D4A',
}

text: {
  primary: '#FFFFFF',
  secondary: '#B4B4C8',
  tertiary: '#8B8B9E',
}
```

**Typography:**
```typescript
fontFamily: {
  primary: 'Inter',
  heading: 'Sora',
  mono: 'Fira Code',
}

fontSize: {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
}
```

### Component Guidelines

**All components MUST:**
1. Follow atomic design pattern
2. Use TypeScript with strict types (no `any`)
3. Include proper props interfaces
4. Be fully accessible (WCAG AA)
5. Match design system tokens exactly
6. Include error states
7. Be responsive (mobile-first approach after MVP)

**Example Component Structure:**
```typescript
// src/components/atoms/Button/Button.tsx
import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({...}) => {
  // Implementation
};
```

### Styling Approach

**Use Tailwind CSS for:**
- Layout (flex, grid)
- Spacing (padding, margin)
- Simple utilities (text color, background)
- Responsive breakpoints

**Use CSS Modules for:**
- Complex animations
- Component-specific styles
- Hover effects with multiple properties
- Component variants with multiple CSS changes

---

## 🔐 Security & Environment Variables

### Critical Security Rules

**NEVER commit these files:**
- `.env.local` - Contains actual API keys
- `.env` - Local environment variables
- Any file with API keys or secrets

**ALWAYS commit these files:**
- `.env.example` - Template with placeholder values
- `.gitignore` - Must include all env files

### Required Environment Variables

```bash
# Frontend (React app)
REACT_APP_SUPABASE_URL=          # Supabase project URL
REACT_APP_SUPABASE_ANON_KEY=     # Supabase anon public key

# Backend (Vercel Functions)
SUPABASE_SERVICE_KEY=             # Supabase service role key (SECRET!)
ANTHROPIC_API_KEY=                # Claude AI API key (SECRET!)
HUGGINGFACE_API_KEY=              # Hugging Face API key (SECRET!)
```

### Security Best Practices

1. **API Keys:**
   - Never log API keys
   - Use environment variables only
   - Rotate keys if exposed
   - Use different keys for dev/prod

2. **Supabase:**
   - Use anon key in frontend
   - Use service key ONLY in backend
   - Enable Row Level Security (RLS)
   - Validate all inputs

3. **File Uploads:**
   - Validate file types (.png, .jpg, .jpeg only)
   - Limit file size (10MB max)
   - Scan for malware (future enhancement)
   - Use signed URLs for downloads

---

## 🔄 Development Workflows

### Git Workflow

**Branch Naming:**
```bash
feature/add-file-upload          # New features
fix/supabase-connection-error    # Bug fixes
docs/update-readme               # Documentation
refactor/component-structure     # Refactoring
```

**Commit Messages (Conventional Commits):**
```bash
feat: add file upload component
fix: resolve API timeout issue
docs: update installation guide
refactor: restructure component hierarchy
test: add unit tests for Button component
style: format code with prettier
```

### Pull Request Workflow

**CRITICAL RULES:**
1. ❌ **NEVER commit directly to main**
2. ✅ **ALWAYS create a pull request**
3. 📅 **Create PR at end of EVERY work session**
4. ✅ **Run tests before pushing** (`npm test` && `npm run build`)

**PR Creation Steps:**
```bash
# 1. Create branch
git checkout main
git pull origin main
git checkout -b feature/your-feature

# 2. Make changes and commit
git add .
git commit -m "feat: add feature"

# 3. Run tests
npm test
npm run build

# 4. Push
git push origin feature/your-feature

# 5. Create PR on GitHub
# Fill out PR template completely
```

**PR Requirements Checklist:**
- [ ] Code follows design system guidelines
- [ ] All tests pass
- [ ] Build succeeds
- [ ] No console errors/warnings
- [ ] Environment variables documented
- [ ] README updated if needed
- [ ] No sensitive data in code
- [ ] Commit messages follow conventions

### Testing Requirements

**Before Every Push:**
```bash
# Run tests
npm test

# Run build
npm run build

# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint
```

---

## 🤖 AI-Specific Integration Points

### Claude AI (Anthropic) - Primary Intelligence

**Usage in Application:**

1. **Prompt Enhancement:**
   ```typescript
   // Converts user input into optimized prompts for image generation
   const enhancedPrompt = await anthropic.messages.create({
     model: "claude-3-5-sonnet-20241022",
     messages: [{
       role: "user",
       content: `Convert this design idea into a detailed prompt: "${userPrompt}"`
     }]
   });
   ```

2. **Image Analysis (Vision):**
   ```typescript
   // Analyzes uploaded sketches using Claude's vision
   const analysis = await anthropic.messages.create({
     model: "claude-3-5-sonnet-20241022",
     messages: [{
       role: "user",
       content: [
         { type: "image", source: { type: "url", url: imageUrl } },
         { type: "text", text: "Analyze this fashion sketch..." }
       ]
     }]
   });
   ```

3. **Technical Specification Generation:**
   ```typescript
   // Generates tech packs with industry terminology
   const specs = await anthropic.messages.create({
     model: "claude-3-5-sonnet-20241022",
     messages: [{
       role: "user",
       content: "Generate technical specifications for this garment..."
     }]
   });
   ```

### Hugging Face - Image Generation

**Models to Use:**
```typescript
// Option 1: Stable Diffusion XL (best quality)
model: 'stabilityai/stable-diffusion-xl-base-1.0'

// Option 2: FLUX Schnell (faster, 3-5 seconds)
model: 'black-forest-labs/FLUX.1-schnell'

// Option 3: Custom fine-tuned model (future)
model: 'your-username/fashion-flats-model'
```

**Important Notes:**
- First generation may take 20-60 seconds (model loading)
- Subsequent generations are faster (3-10 seconds)
- Free tier available, no credit card required
- Can fine-tune custom models for fashion-specific results

### Supabase Integration

**Database Schema:**
```sql
-- Designs table
CREATE TABLE designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  original_image_url TEXT,
  generated_image_url TEXT NOT NULL,
  prompt TEXT,
  garment_type TEXT,
  processing_time FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Specifications table
CREATE TABLE specifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  design_id UUID REFERENCES designs(id) ON DELETE CASCADE,
  garment_type TEXT,
  design_description JSONB,
  materials JSONB,
  construction_details JSONB,
  pattern_notes JSONB,
  colors JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Storage Buckets:**
- `uploads` - User-uploaded rough sketches
- `generated` - AI-generated technical flats

---

## 📝 Common Tasks & Patterns

### Task 1: Adding a New Component

```bash
# 1. Determine component level (atom/molecule/organism)
# 2. Create component directory
mkdir -p src/components/atoms/NewComponent

# 3. Create files
touch src/components/atoms/NewComponent/NewComponent.tsx
touch src/components/atoms/NewComponent/NewComponent.module.css
touch src/components/atoms/NewComponent/NewComponent.test.tsx
touch src/components/atoms/NewComponent/index.ts

# 4. Implement component following design-system.md
# 5. Export from index.ts
# 6. Add tests
# 7. Document in Storybook (future)
```

### Task 2: Creating a New API Endpoint

```typescript
// api/new-endpoint.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // 1. Validate request method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 2. Extract and validate input
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({ error: 'Input required' });
    }

    // 3. Process with Claude/Hugging Face
    // 4. Store in Supabase if needed
    // 5. Return response

    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
```

### Task 3: Implementing File Upload

```typescript
// src/hooks/useFileUpload.ts
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    // 1. Validate file type and size
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type');
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File too large (max 10MB)');
    }

    // 2. Upload to Supabase Storage
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // 3. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName);

    setUploading(false);
    return publicUrl;
  };

  return { uploadFile, uploading, error };
};
```

---

## ⚠️ Common Pitfalls & Anti-Patterns

### ❌ Don't Do This

**1. Using `any` type:**
```typescript
// BAD
const data: any = await fetchData();

// GOOD
interface FetchResponse {
  id: string;
  imageUrl: string;
}
const data: FetchResponse = await fetchData();
```

**2. Hardcoding values:**
```typescript
// BAD
<div style={{ color: '#A855F7' }}>

// GOOD
import { colors } from '@/styles/tokens';
<div style={{ color: colors.primary.main }}>
```

**3. Committing secrets:**
```typescript
// BAD
const apiKey = "sk-ant-api03-abc123...";

// GOOD
const apiKey = process.env.ANTHROPIC_API_KEY;
```

**4. Skipping error handling:**
```typescript
// BAD
const result = await generateImage(prompt);

// GOOD
try {
  const result = await generateImage(prompt);
} catch (error) {
  console.error('Generation failed:', error);
  setError('Failed to generate image. Please try again.');
}
```

**5. Not validating user input:**
```typescript
// BAD
const prompt = req.body.prompt;
const result = await generateImage(prompt);

// GOOD
const prompt = req.body.prompt;
if (!prompt || prompt.length < 20 || prompt.length > 500) {
  return res.status(400).json({ error: 'Invalid prompt length' });
}
const result = await generateImage(prompt);
```

### ✅ Best Practices

1. **Always use TypeScript strict mode**
2. **Follow atomic design pattern**
3. **Validate all inputs (frontend + backend)**
4. **Handle errors gracefully with user-friendly messages**
5. **Use design tokens from design-system.md**
6. **Write tests for all components**
7. **Keep components small and focused**
8. **Use semantic HTML**
9. **Ensure accessibility (ARIA labels, keyboard navigation)**
10. **Optimize images (lazy loading, WebP format)**

---

## 🚀 Deployment Guidelines

### Local Development

```bash
# Frontend
cd frontend
npm start              # Runs on http://localhost:3000

# Backend (Vercel Functions)
vercel dev            # Runs on http://localhost:3000 with API routes

# Full Stack
vercel dev            # Recommended - runs both frontend + API
```

### Production Deployment (Vercel)

**Setup Steps:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

**Environment Variables (Vercel Dashboard):**
- Add all variables from `.env.example`
- Use production API keys (different from development)
- Never commit these values to Git

**Deployment Checklist:**
- [ ] All tests pass
- [ ] Build succeeds locally
- [ ] Environment variables set in Vercel
- [ ] Database migrations run (if any)
- [ ] Storage buckets created in Supabase
- [ ] API keys are valid
- [ ] CORS configured correctly

### Monitoring

**Vercel Analytics:**
```tsx
// src/App.tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

**Error Tracking (Sentry):**
```typescript
// src/index.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## 🧪 Testing Strategy

### Unit Tests (Components)

```typescript
// src/components/atoms/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<Button loading>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Integration Tests

```typescript
// src/__tests__/image-generation.test.ts
describe('Image Generation Flow', () => {
  it('generates image from prompt', async () => {
    // 1. Enter prompt
    // 2. Click generate
    // 3. Wait for loading
    // 4. Verify image displays
    // 5. Check no errors
  });
});
```

### API Tests

```bash
# Test generation endpoint
curl -X POST http://localhost:3000/api/generate-flat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "oversized t-shirt with pocket"}'
```

---

## 📊 Success Metrics & KPIs

**MVP Success Criteria:**
- Average generation time: < 20 seconds
- User satisfaction: ≥ 70%
- Export rate: ≥ 60% of users
- 30-day retention: ≥ 30%

**Technical Metrics:**
- API response time: < 2 seconds (excluding AI processing)
- Page load time: < 3 seconds
- Lighthouse score: > 90
- Zero critical security vulnerabilities

---

## 🎯 MVP Scope & Priorities

### Phase 1 (Current): MVP Features

**Must Have:**
- ✅ Text prompt input
- ✅ AI image generation
- ✅ Display generated image
- ✅ Basic error handling
- ✅ Loading states

**Should Have (Later):**
- 🔜 File upload for sketches
- 🔜 Technical specification generation
- 🔜 Before/after comparison
- 🔜 Download/export functionality

**Won't Have (MVP):**
- ❌ User authentication
- ❌ Design history/dashboard
- ❌ Team collaboration
- ❌ Advanced editing features
- ❌ Mobile app

### Development Timeline

| Phase | Milestone | Timeline |
|-------|-----------|----------|
| Phase 1 | Project setup | Week 1-2 |
| Phase 2 | UI components | Week 3-4 |
| Phase 3 | API integration | Week 5-6 |
| Phase 4 | Spec generation | Week 7 |
| Phase 5 | Testing & deployment | Week 8 |

---

## 🆘 Troubleshooting Guide

### Issue: Hugging Face model loading timeout

**Symptoms:** First request takes >60 seconds or times out

**Solution:**
1. Use FLUX Schnell model (faster)
2. Increase Vercel function timeout
3. Add loading message: "First generation may take up to 60 seconds"
4. Consider pre-warming model (future enhancement)

### Issue: Supabase connection error

**Symptoms:** "Failed to fetch" or connection refused

**Solution:**
1. Check environment variables are set correctly
2. Verify Supabase project is active
3. Check network connectivity
4. Verify API keys are valid

### Issue: CORS errors

**Symptoms:** "Access-Control-Allow-Origin" error

**Solution:**
```typescript
// Add CORS headers to API endpoints
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
```

### Issue: File upload fails

**Symptoms:** Upload returns error or file not visible

**Solution:**
1. Check Supabase storage bucket is public
2. Verify file size is < 10MB
3. Check file type is valid (.png, .jpg, .jpeg)
4. Verify Supabase storage quota

---

## 📚 Additional Resources

### Documentation Links

- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **TailwindCSS**: https://tailwindcss.com/docs
- **Supabase**: https://supabase.com/docs
- **Vercel**: https://vercel.com/docs
- **Anthropic**: https://docs.anthropic.com/
- **Hugging Face**: https://huggingface.co/docs/inference-endpoints

### Internal Documentation

- `README.md` - Setup & deployment guide
- `prd.md` - Product requirements
- `design-system.md` - UI/UX guidelines
- `MVP-IMPLEMENTATION-PLAN.md` - Development phases

### Design Assets

- **Figma Design**: https://www.figma.com/design/2wPHOYfUClxpNLCITO2nh9/FashionFlat-AI

---

## 🤝 Contributing Guidelines

### For AI Assistants

**When working on this codebase:**

1. **Always read this file first** before making changes
2. **Follow the design system** (design-system.md) exactly
3. **Use TypeScript strictly** - no `any` types
4. **Write tests** for all new code
5. **Validate all user inputs** (frontend + backend)
6. **Handle errors gracefully** with user-friendly messages
7. **Never commit secrets** - use environment variables
8. **Create PRs** for all changes - never commit to main
9. **Document your code** - clear comments and JSDoc
10. **Ask for clarification** if requirements are unclear

### Code Review Checklist

Before submitting code, verify:

- [ ] Follows atomic design pattern
- [ ] Uses design tokens from design-system.md
- [ ] TypeScript strict mode (no `any`)
- [ ] All props have proper interfaces
- [ ] Error handling implemented
- [ ] Loading states implemented
- [ ] Accessibility (ARIA labels, keyboard nav)
- [ ] Tests written and passing
- [ ] No console.log statements
- [ ] No hardcoded values
- [ ] No committed secrets
- [ ] Build succeeds
- [ ] Prettier formatted

---

## 🎓 Learning Path for New AI Assistants

**Recommended Reading Order:**

1. **CLAUDE.md** (this file) - Overview and conventions
2. **README.md** - Technical setup and deployment
3. **prd.md** - Product requirements and features
4. **design-system.md** - UI/UX guidelines and components
5. **MVP-IMPLEMENTATION-PLAN.md** - Implementation phases

**Before Making Changes:**

1. Understand the feature from `prd.md`
2. Check design specs in `design-system.md`
3. Review similar existing components
4. Follow the implementation pattern
5. Write tests
6. Create PR with detailed description

---

## 📞 Support & Questions

**For Technical Questions:**
- Review documentation files
- Check existing code for patterns
- Consult design-system.md for UI guidelines
- Ask the project maintainer (Wonji Seo)

**For Product Questions:**
- Refer to prd.md for requirements
- Check MVP-IMPLEMENTATION-PLAN.md for scope
- Ask the product manager (Wonji Seo)

**For Design Questions:**
- Consult design-system.md
- Check Figma design files
- Ask the design team

---

## 🔄 Document Maintenance

**This document should be updated when:**

- Major architectural changes occur
- New patterns or conventions are established
- New technologies are added to the stack
- Common issues are discovered and solved
- Best practices evolve

**Version History:**

- v1.0 (2025-11-15): Initial document creation

---

## 📋 Quick Reference

### File Locations

```bash
# Documentation
README.md                        # Main guide
CLAUDE.md                        # AI assistant guide (this file)
prd.md                          # Product requirements
design-system.md                # Design system
MVP-IMPLEMENTATION-PLAN.md      # Implementation plan

# Configuration
.env.example                    # Environment template
.gitignore                      # Git ignore rules
vercel.json                     # Vercel config
tailwind.config.js              # Tailwind config

# Frontend
frontend/src/components/        # UI components
frontend/src/hooks/             # Custom hooks
frontend/src/services/          # API services
frontend/src/styles/            # Styles & tokens

# Backend
api/                            # Serverless functions
```

### Commands

```bash
# Development
npm start                       # Start frontend
vercel dev                      # Start with API routes

# Testing
npm test                        # Run tests
npm run build                   # Build production

# Linting
npm run lint                    # Lint code
npm run type-check              # TypeScript check

# Deployment
vercel                          # Deploy to preview
vercel --prod                   # Deploy to production
```

### Environment Variables

```bash
# Copy template
cp .env.example .env.local

# Required variables
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
ANTHROPIC_API_KEY=
HUGGINGFACE_API_KEY=
```

---

**Built with care for AI assistants working on FashionFlat AI.**

**Last Updated:** November 15, 2025
**Maintained by:** Wonji Seo (Product Manager)
**Version:** 1.0
