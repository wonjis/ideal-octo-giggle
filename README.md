# FashionFlat AI - MVP Development Guide

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Latest-000000?logo=vercel)](https://vercel.com/)

> AI-powered platform that transforms rough fashion sketches into professional technical flats with automatic specification generation.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development Guide](#development-guide)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Design Resources](#design-resources)
- [Contributing](#contributing)

---

## 🎯 Overview

**FashionFlat AI** is an AI-powered SaaS tool that enables fashion designers to:
- Convert rough sketches into professional technical flat sketches
- Generate designs from text prompts
- Automatically create technical specifications
- Export production-ready documentation

**Problem:** Fashion designers spend 40+ hours per collection manually creating flat sketches in Adobe Illustrator.

**Solution:** AI-powered automation that reduces flat sketch creation time by **50%** while improving consistency.

### Success Metrics (MVP)
- **Generation Time:** < 20 seconds
- **User Satisfaction:** ≥ 70%
- **Export Rate:** ≥ 60% of users
- **30-Day Retention:** ≥ 30%

---

## ✨ Key Features

### MVP Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Image Upload** | Upload rough sketches (.png, .jpg, .jpeg, max 10MB) | 🚧 To Build |
| **Prompt-Based Generation** | Text-to-image generation (20-500 characters) | 🚧 To Build |
| **Technical Flat Display** | High-resolution flat sketch viewing with zoom | 🚧 To Build |
| **Spec Generation** | Auto-generate technical details (materials, construction) | 🚧 To Build |
| **Before/After Comparison** | Side-by-side original vs. generated view | 🚧 To Build |
| **Export** | Download PNG (SVG in future) | 🚧 To Build |

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 19.1.0 + TypeScript
- **Styling:** TailwindCSS 3.0
- **UI Components:** Custom design system (see `design-system.md`)
- **State Management:** React Context API
- **File Upload:** react-dropzone
- **Icons:** Heroicons / Lucide React
- **Routing:** React Router v6

### Backend
- **Framework:** Vercel Serverless Functions (Node.js)
- **AI Models:**
  - **Primary AI:** Claude 3.5 Sonnet (Anthropic) for all intelligence tasks
  - Image Analysis: Claude's vision capabilities
  - Spec Generation: Claude's language understanding
  - Prompt Engineering: Claude's reasoning
  - **Image Generation:** Hugging Face Inference API
    - Models: Stable Diffusion XL, FLUX, or custom fine-tuned models
    - Free tier available, no credit card required
- **Storage:** Supabase Storage
- **Database:** Supabase (PostgreSQL-based)

### Supabase Features Used
- **Database:** PostgreSQL for user metadata, design history
- **Storage:** File storage for uploaded sketches and generated images
- **Auth:** User authentication (future phase)
- **Real-time:** Live updates for generation status (future phase)

### Claude AI's Role (Primary Intelligence)
Claude 3.5 Sonnet powers all AI intelligence in the application:

1. **Prompt Enhancement:**
   - Converts simple user ideas into detailed, optimized prompts for image generation
   - Adds fashion industry context and technical terminology
   - Ensures prompts generate professional flat sketches

2. **Image Analysis (Vision):**
   - Analyzes uploaded rough sketches using Claude's vision capabilities
   - Identifies garment type, design features, and construction details
   - Extracts key elements for refinement

3. **Technical Specification Generation:**
   - Creates comprehensive tech packs with industry-standard terminology
   - Generates Bill of Materials (BOM), construction notes, pattern details
   - Formats specifications for production teams

4. **Quality Assurance:**
   - Validates outputs meet fashion industry standards
   - Ensures consistency across all generated content
   - Provides professional, production-ready documentation

### Deployment
- **Platform:** Vercel
- **Frontend:** Vercel (automatic deployments from Git)
- **Backend:** Vercel Serverless Functions or FastAPI on Vercel
- **Database:** Supabase Cloud
- **Monitoring:** Vercel Analytics + Sentry

---

## 📦 Prerequisites

### Required Software
- **Node.js:** v18+ ([Download](https://nodejs.org/))
- **npm:** v9+ (comes with Node.js)
- **Python:** v3.10+ (if using FastAPI backend) ([Download](https://www.python.org/))
- **Git:** Latest version ([Download](https://git-scm.com/))

### Required Accounts
- **Supabase Account:** [Sign up](https://supabase.com/) (Free tier available)
- **Vercel Account:** [Sign up](https://vercel.com/) (Free tier available)
- **Anthropic API Key:** [Get API key](https://console.anthropic.com/) (for Claude AI)
- **Hugging Face Account:** [Sign up](https://huggingface.co/) (Free tier available - for image generation)

### Optional Tools
- **VS Code:** Recommended IDE with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Python (Pylance)
- **Postman:** For API testing

---

## 🚀 Quick Start

> **⚠️ Security Note:** This project uses API keys. Never commit your `.env.local` file to Git!
> Follow the environment setup instructions carefully.

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ideal-octo-giggle.git
cd ideal-octo-giggle

# Verify .gitignore is in place
cat .gitignore | grep ".env"
# Should show .env files are ignored
```

### 2. Supabase Setup

#### Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click "New Project"
3. Fill in project details:
   - **Name:** fashionflat-ai
   - **Database Password:** (save this securely)
   - **Region:** Choose closest to your users

#### Set Up Database Tables

Run these SQL commands in Supabase SQL Editor:

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

-- Technical specifications table
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

-- Enable Row Level Security (RLS)
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE specifications ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for MVP, restrict later)
CREATE POLICY "Allow all operations on designs" ON designs
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on specifications" ON specifications
  FOR ALL USING (true) WITH CHECK (true);
```

#### Set Up Storage Bucket

1. Go to **Storage** in Supabase Dashboard
2. Create two buckets:
   - **uploads** (for user-uploaded sketches)
   - **generated** (for AI-generated flats)
3. Set both buckets to **Public** for MVP

### 3. Frontend Setup

```bash
# Navigate to frontend directory (or create new React app)
npx create-react-app frontend --template typescript
cd frontend

# Install dependencies
npm install react-router-dom react-dropzone classnames framer-motion react-hot-toast @supabase/supabase-js

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Configure Tailwind CSS

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#A855F7',
          hover: '#9333EA',
          active: '#7E22CE',
          light: '#C084FC',
        },
        background: {
          primary: '#0F0F1E',
          secondary: '#1A1A2E',
          tertiary: '#252541',
          elevated: '#2D2D4A',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B4B4C8',
          tertiary: '#8B8B9E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Sora', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(168, 85, 247, 0.4)',
      },
    },
  },
  plugins: [],
}
```

### 5. Environment Variables Setup

**IMPORTANT: Never commit API keys to Git!**

We use `.env.local` for your actual API keys (ignored by Git) and `.env.example` as a template (committed to repo).

#### Step 5.1: Copy the template

```bash
# Copy the example file to create your local environment file
cp .env.example .env.local
```

#### Step 5.2: Get your API keys

**Supabase:**
1. Go to [Supabase Dashboard](https://app.supabase.com/) → Your Project → Settings → API
2. Copy **Project URL** → `REACT_APP_SUPABASE_URL`
3. Copy **anon public** key → `REACT_APP_SUPABASE_ANON_KEY`
4. Copy **service_role** key → `SUPABASE_SERVICE_KEY` (⚠️ Keep this secret!)

**Anthropic (Claude):**
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Navigate to API Keys
3. Create new key → Copy to `ANTHROPIC_API_KEY`

**Hugging Face (Image Generation):**
1. Sign up at [Hugging Face](https://huggingface.co/)
2. Go to [Settings → Access Tokens](https://huggingface.co/settings/tokens)
3. Click "New token" → Name it "FashionFlat AI" → Select "Read" role
4. Copy token → Paste to `HUGGINGFACE_API_KEY`

**Why Hugging Face?**
- ✅ Free tier available
- ✅ No credit card required to start
- ✅ Access to open-source models (Stable Diffusion, FLUX)
- ✅ Good for prototyping and development

#### Step 5.3: Edit .env.local

Open `.env.local` and replace all placeholder values with your actual API keys:

```bash
# Example of filled-in .env.local (DO NOT COMMIT THIS FILE!)
REACT_APP_SUPABASE_URL=https://abc123xyz.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ANTHROPIC_API_KEY=sk-ant-api03-abc123xyz...
HUGGINGFACE_API_KEY=hf_abc123xyz...
```

#### Step 5.4: Verify .gitignore

Ensure `.env.local` is listed in `.gitignore` (already done):

```bash
# Check that .env.local won't be committed
cat .gitignore | grep .env
```

You should see:
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 6. Initialize Supabase Client

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 7. Backend Setup (Vercel Serverless Functions)

Create `api/` directory in project root:

```bash
mkdir -p api

# Install dependencies for API functions
npm install @anthropic-ai/sdk @supabase/supabase-js @huggingface/inference
npm install -D @vercel/node
```

Create `api/generate-flat.ts`:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';
import { HfInference } from '@huggingface/inference';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, imageUrl } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Step 1: Use Claude to enhance the prompt for fashion technical flats
    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 500,
      messages: [{
        role: "user",
        content: `You are a fashion technical designer. Convert this design idea into a detailed prompt optimized for AI image generation of technical flat sketches: "${prompt}".

Requirements:
- Specify it's a technical flat sketch (line drawing, no shading)
- Include garment type, key design features, construction details
- Mention: white background, CAD style, professional fashion illustration
- Be specific about silhouette, proportions, and details
- Add: "technical fashion flat sketch, line drawing, black lines on white background"

Return only the enhanced prompt, no explanation.`
      }],
    });

    const enhancedPrompt = message.content[0].type === 'text'
      ? message.content[0].text
      : prompt;

    console.log('Enhanced prompt:', enhancedPrompt);

    // Step 2: Generate image using Hugging Face Inference API
    // Using Stable Diffusion XL for high-quality technical drawings
    const imageBlob = await hf.textToImage({
      model: 'stabilityai/stable-diffusion-xl-base-1.0',
      inputs: enhancedPrompt,
      parameters: {
        negative_prompt: 'photo, photograph, realistic, 3d render, shadows, shading, colors, colored, blurry, low quality',
        num_inference_steps: 40,
        guidance_scale: 7.5,
      }
    });

    // Convert blob to buffer
    const arrayBuffer = await imageBlob.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // Step 3: Upload to Supabase Storage
    const fileName = `generated-${Date.now()}.png`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('generated')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        cacheControl: '3600',
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('generated')
      .getPublicUrl(fileName);

    // Step 4: Save to database
    const { data, error } = await supabase
      .from('designs')
      .insert({
        original_image_url: imageUrl || null,
        prompt: prompt,
        generated_image_url: publicUrl,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    return res.status(200).json({
      generated_url: publicUrl,
      design_id: data.id,
      enhanced_prompt: enhancedPrompt,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Generation error:', error);
    return res.status(500).json({
      error: 'Generation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
```

**Alternative Models on Hugging Face:**

You can easily switch to different models by changing the `model` parameter:

```typescript
// Option 1: Stable Diffusion XL (default, best quality)
model: 'stabilityai/stable-diffusion-xl-base-1.0'

// Option 2: FLUX Schnell (faster generation, ~3-5 seconds)
model: 'black-forest-labs/FLUX.1-schnell'

// Option 3: Stable Diffusion 2.1 (lighter, faster)
model: 'stabilityai/stable-diffusion-2-1'

// Option 4: Your own fine-tuned model
model: 'your-username/your-fashion-model'
```

**💡 Pro Tip: Fine-Tuning Your Own Model**

For best results with fashion flat sketches, consider fine-tuning a model:

1. **Collect Dataset**: Gather 100-500 high-quality fashion flat sketches
2. **Upload to Hugging Face**: Create a dataset on [Hugging Face Datasets](https://huggingface.co/datasets)
3. **Fine-tune using AutoTrain**: Use [AutoTrain](https://huggingface.co/autotrain) or train locally
4. **Deploy**: Your model gets a Hugging Face URL you can use in the code
5. **Update Code**: Change `model: 'your-username/fashion-flats-model'`

Benefits:
- ✅ Better quality for fashion-specific designs
- ✅ Consistent style across all generations
- ✅ Faster inference (optimized for your use case)
- ✅ Still uses Hugging Face's free tier

### 8. Run Development Server

```bash
# Install Vercel CLI
npm install -g vercel

# Run development server (includes API routes)
vercel dev

# Or use Create React App dev server
npm start
# Runs on http://localhost:3000
```

---

## 📁 Project Structure

```
ideal-octo-giggle/
├── README.md                    # This file ✅ COMMIT
├── prd.md                       # Product Requirements Document ✅ COMMIT
├── design-system.md             # Design System & Component Library ✅ COMMIT
├── .env.example                 # Environment template ✅ COMMIT
├── .env.local                   # Your actual API keys ❌ NEVER COMMIT
├── .gitignore                   # Git ignore rules ✅ COMMIT
│
├── .github/                     # GitHub configuration ✅ COMMIT
│   └── pull_request_template.md # Auto-populated PR template
│
├── frontend/                    # React Frontend Application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── components/          # Reusable UI Components
│   │   │   ├── atoms/           # Basic components (Button, Input, Icon)
│   │   │   ├── molecules/       # Composite components (FileUpload, PromptInput)
│   │   │   ├── organisms/       # Complex sections (Header, ImageComparison)
│   │   │   └── templates/       # Page layouts
│   │   │
│   │   ├── pages/               # Page components
│   │   │   ├── LandingPage.tsx
│   │   │   ├── GeneratePage.tsx
│   │   │   └── ResultsPage.tsx
│   │   │
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useFileUpload.ts
│   │   │   ├── useImageGeneration.ts
│   │   │   └── useSupabase.ts
│   │   │
│   │   ├── lib/                 # Third-party integrations
│   │   │   └── supabase.ts      # Supabase client
│   │   │
│   │   ├── services/            # API service layer
│   │   │   ├── api.ts
│   │   │   ├── imageGeneration.ts
│   │   │   └── storage.ts
│   │   │
│   │   ├── styles/              # Design tokens & global styles
│   │   │   ├── tokens/
│   │   │   │   ├── colors.ts
│   │   │   │   ├── typography.ts
│   │   │   │   └── spacing.ts
│   │   │   ├── globals.css
│   │   │   └── theme.ts
│   │   │
│   │   ├── types/               # TypeScript types
│   │   │   ├── components.ts
│   │   │   ├── api.ts
│   │   │   └── database.ts
│   │   │
│   │   ├── utils/               # Utility functions
│   │   │   ├── fileValidation.ts
│   │   │   └── imageProcessing.ts
│   │   │
│   │   ├── App.tsx              # Root component
│   │   ├── index.tsx            # Entry point
│   │   └── routes.tsx           # Route configuration
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── api/                         # Vercel Serverless Functions
│   ├── generate-flat.ts         # Image/prompt generation endpoint
│   ├── generate-details.ts      # Spec generation endpoint
│   └── upload.ts                # File upload handler
│
├── vercel.json                  # Vercel configuration
└── package.json                 # Root package.json
```

---

## 💻 Development Guide

### Step 1: Build the Landing Page

**Reference:** [Figma - Landing Page](https://www.figma.com/design/2wPHOYfUClxpNLCITO2nh9/FashionFlat-AI?node-id=1-2)

**Components to Create:**
1. **Hero Section**
   - Headline: "Turn your rough sketch into a flat sketch in seconds"
   - Primary CTA: "Scan Rough Sketch" button
   - Before/After example image

2. **Value Propositions**
   - Time-Saving icon + description
   - Shareable icon + description
   - Revisable icon + description
   - Fashion-Friendly icon + description

3. **Footer**
   - Links, copyright, social media

**Implementation:**
```tsx
// src/pages/LandingPage.tsx
import { Hero } from '@/components/organisms/Hero';
import { ValueProps } from '@/components/organisms/ValueProps';
import { Header } from '@/components/organisms/Header';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background-primary">
      <Header />
      <Hero />
      <ValueProps />
    </div>
  );
};
```

---

### Step 2: Implement File Upload with Supabase

**Features:**
- Upload to Supabase Storage
- File type validation (.png, .jpg, .jpeg)
- File size validation (max 10MB)
- Image preview
- Error handling

**Key Code:**
```tsx
// src/hooks/useFileUpload.ts
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError(null);

    try {
      // Validate file
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        throw new Error('Please upload PNG or JPG files only');
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
      }

      // Upload to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);

      return publicUrl;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading, error };
};
```

---

### Step 3: Implement Generation Workflow

**Flow:**
1. User uploads image OR enters prompt
2. Click "Generate" button
3. Show loading state with progress indicator
4. Call Vercel API endpoint
5. Display generated flat sketch
6. Save to Supabase database

**API Integration:**
```tsx
// src/services/imageGeneration.ts
export const generateFlatFromPrompt = async (prompt: string) => {
  const response = await fetch('/api/generate-flat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Generation failed');
  }

  return response.json();
};

export const generateFlatFromImage = async (imageUrl: string) => {
  const response = await fetch('/api/generate-flat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl }),
  });

  if (!response.ok) {
    throw new Error('Generation failed');
  }

  return response.json();
};
```

---

### Step 4: Create Technical Spec Generation

Create `api/generate-details.ts`:

```typescript
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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { designId, imageUrl } = req.body;

    // Use Claude to analyze the image and generate specs
    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "url",
              url: imageUrl,
            },
          },
          {
            type: "text",
            text: "Analyze this fashion flat sketch and provide technical specifications in JSON format with: garment_type, design_description (array), materials (array), construction_details (array), pattern_notes (array), colors (array)."
          }
        ],
      }],
    });

    const specs = JSON.parse(message.content[0].text);

    // Save to Supabase
    const { data, error } = await supabase
      .from('specifications')
      .insert({
        design_id: designId,
        ...specs,
      })
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json(data);

  } catch (error) {
    console.error('Spec generation error:', error);
    return res.status(500).json({ error: 'Spec generation failed' });
  }
}
```

---

## 📡 API Documentation

### Base URL
- **Development:** `http://localhost:3000/api`
- **Production:** `https://fashionflat-ai.vercel.app/api`

### Endpoints

#### 1. Generate Flat Sketch

**POST** `/api/generate-flat`

**Request (Prompt):**
```json
{
  "prompt": "oversized hoodie with kangaroo pocket and drawstring hood"
}
```

**Request (Image URL - for refinement):**
```json
{
  "imageUrl": "https://your-project.supabase.co/storage/v1/object/public/uploads/sketch.png",
  "prompt": "clean up and convert to technical flat sketch"
}
```

**Response:**
```json
{
  "generated_url": "https://your-project.supabase.co/storage/v1/object/public/generated/generated-123456.png",
  "design_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2025-11-15T10:30:00Z"
}
```

#### 2. Generate Technical Details

**POST** `/api/generate-details`

**Request:**
```json
{
  "designId": "550e8400-e29b-41d4-a716-446655440000",
  "imageUrl": "https://..."
}
```

**Response:**
```json
{
  "garment_type": "Hoodie",
  "design_description": [
    "Oversized fit with dropped shoulders",
    "Kangaroo pocket at front",
    "Drawstring hood with metal eyelets"
  ],
  "materials": [
    "Main: 80% Cotton, 20% Polyester fleece, 320 GSM",
    "Rib: 95% Cotton, 5% Spandex, 2x2 rib knit",
    "Drawstring: Flat woven polyester cord"
  ],
  "construction_details": [
    "Flatlock seams throughout",
    "Double-needle hem",
    "Kangaroo pocket: Single-layer construction"
  ],
  "pattern_notes": [
    "Drop shoulder: 2 inches from natural shoulder point",
    "Body length: Hip length + 2 inches"
  ],
  "colors": ["Heather Grey", "Black", "Navy"]
}
```

---

## 🚢 Deployment

### Deploy to Vercel

#### 1. Prepare for Deployment

Create `vercel.json` in project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    },
    {
      "src": "api/**/*.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

#### 2. Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### 3. Deploy via GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/fashionflat-ai.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - **Framework Preset:** Create React App
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `build`

3. **Add Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`:
     ```
     REACT_APP_SUPABASE_URL
     REACT_APP_SUPABASE_ANON_KEY
     ANTHROPIC_API_KEY
     HUGGINGFACE_API_KEY
     SUPABASE_SERVICE_KEY
     ```

4. **Deploy:**
   - Click "Deploy"
   - Automatic deployments on every push to main branch

#### 4. Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## 🎨 Design Resources

### Figma Design
**Link:** [FashionFlat AI - Figma Prototype](https://www.figma.com/design/2wPHOYfUClxpNLCITO2nh9/FashionFlat-AI?node-id=1-2&p=f&t=W39k5UAwY9IIRbvy-0)

**Key Screens:**
- **Landing Page:** Hero section, value props, CTAs
- **Generation Workspace:** Upload/Prompt input interface
- **Results View:** Before/after comparison, spec display
- **Components:** Buttons, inputs, cards, modals

### Design System
**File:** `design-system.md`

**Contents:**
- Design tokens (colors, typography, spacing)
- Complete component library (11+ components)
- Code examples (Button, FileUpload, hooks)
- Layout & grid system
- Fashion-specific patterns

### Product Requirements
**File:** `prd.md`

**Contents:**
- Product overview & goals
- User stories & acceptance criteria
- Technical requirements
- Success metrics
- Future enhancements

---

## 🧪 Testing

### Frontend Tests

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watchAll
```

**Key Tests:**
- Component rendering
- File upload validation
- Supabase integration
- API integration
- Error handling
- Accessibility (a11y)

### API Tests (Local)

```bash
# Test generation endpoint
curl -X POST http://localhost:3000/api/generate-flat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "oversized t-shirt with pocket"}'

# Test details endpoint
curl -X POST http://localhost:3000/api/generate-details \
  -H "Content-Type: application/json" \
  -d '{"designId": "...", "imageUrl": "..."}'
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics

```bash
npm install @vercel/analytics

# In src/App.tsx
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

### Error Tracking (Sentry)

```bash
npm install @sentry/react

# In src/index.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

### Supabase Monitoring

- Go to Supabase Dashboard → Database → Query Performance
- Monitor API usage in Settings → Usage
- Set up alerts for storage limits

---

## 🤝 Contributing

### 🚨 Golden Rules (READ THIS FIRST)

1. **❌ NEVER commit directly to `main` branch**
2. **✅ ALWAYS create a pull request for every change**
3. **📅 Create a PR at the end of EVERY work day** (even if incomplete - use Draft PR)
4. **🔒 NEVER commit `.env.local` or API keys**
5. **✅ ALWAYS test locally before pushing** (`npm test` && `npm run build`)

---

### Development Workflow & PR Requirements

**⚠️ IMPORTANT: Regular Pull Requests Required**

To maintain code quality and track progress, you **must** create pull requests regularly:

- **Daily PRs:** Create a PR at the end of each work session
- **Feature PRs:** One PR per feature or significant change
- **Small PRs:** Keep PRs focused (< 500 lines of code when possible)
- **Never direct push to main:** All changes must go through PR review

**Why Daily PRs Matter:**
- 📊 Tracks your daily progress
- 🔄 Acts as backup of your work
- 👥 Keeps team informed
- 🐛 Easier to identify when bugs were introduced
- 📝 Documents decision-making process

### Visual Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                     DAILY DEVELOPMENT CYCLE                      │
└─────────────────────────────────────────────────────────────────┘

  Start of Day                                          End of Day
       │                                                     │
       ├─ git checkout main                                 │
       ├─ git pull origin main                              │
       ├─ git checkout -b feature/new-feature               │
       │                                                     │
       ├─ [Work on feature]                                 │
       ├─ [Make commits frequently]                         │
       ├─ git commit -m "feat: ..."                        │
       │                                                     │
       ├─ npm test          ◄──── BEFORE PUSHING            │
       ├─ npm run build     ◄──── VERIFY BUILDS             │
       │                                                     │
       ├─ git push origin feature/new-feature               │
       ├─ Create PR on GitHub                               │
       ├─ Mark as "Draft" if WIP                           │
       │                                                     │
       └─ Update PR with daily notes ──────────────────────►┘

  Next Day: Continue on same branch OR merge & start new feature
```

### PR Workflow (Required)

#### 1. Create Feature Branch
```bash
# Always branch from latest main
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# Branch naming conventions:
# - feature/add-file-upload
# - fix/supabase-connection-error
# - docs/update-readme
# - refactor/component-structure
```

#### 2. Make Changes
- Follow component structure in `design-system.md`
- Write tests for new features
- Update documentation
- Keep commits focused and descriptive

#### 3. Commit Regularly
```bash
# Make frequent, small commits
git add .
git commit -m "feat: add file upload component"

# Use conventional commit messages:
# - feat: new feature
# - fix: bug fix
# - docs: documentation changes
# - refactor: code refactoring
# - test: adding tests
# - style: formatting changes
```

#### 4. Test Locally Before Pushing
```bash
# Test with serverless functions
vercel dev

# Run tests
npm test

# Build to check for errors
npm run build
```

#### 5. Push and Create PR
```bash
# Push your branch
git push origin feature/your-feature-name

# Create PR on GitHub
# Go to: https://github.com/YOUR_USERNAME/ideal-octo-giggle/pulls
# Click "New Pull Request"
```

#### 6. PR Requirements Checklist

Before creating a PR, ensure:

```markdown
## PR Checklist

- [ ] Code follows design system guidelines
- [ ] All tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors or warnings
- [ ] Environment variables documented in `.env.example`
- [ ] README updated if needed
- [ ] No sensitive data (API keys) in code
- [ ] Commit messages follow conventional commits
- [ ] PR description explains what and why
```

#### 7. PR Template

**Automatic PR Template:**

When you create a new PR on GitHub, a template will automatically populate with the required sections. This template is located at `.github/pull_request_template.md`.

**The template includes:**
- Description section
- Type of change checkboxes
- Changes made list
- Testing checklist (local, tests, build, Vercel preview)
- Code quality checklist (design system, TypeScript, no API keys)
- Screenshots/video section
- Related issues links
- Deployment notes

**Simply fill in each section before submitting your PR.**

### PR Review Process

1. **Self-Review First:** Review your own PR before requesting review
2. **Vercel Preview:** Test the Vercel preview deployment link
3. **Wait for CI:** Ensure all checks pass (tests, build)
4. **Request Review:** Tag team members for review
5. **Address Feedback:** Make requested changes
6. **Merge:** Squash and merge when approved

### Daily Development Routine

**End of Each Day:**
```bash
# 1. Commit all work
git add .
git commit -m "feat: implement feature X (WIP)"

# 2. Push to remote
git push origin feature/your-feature

# 3. Create PR (even if not complete)
# Mark as "Draft" if work in progress

# 4. Update PR description with:
#    - What was completed today
#    - What's remaining
#    - Any blockers
```

**Benefits of Daily PRs:**
- ✅ Track progress over time
- ✅ Easy to roll back if needed
- ✅ Team visibility on what's being worked on
- ✅ Continuous integration testing
- ✅ Prevents large, difficult-to-review PRs
- ✅ Acts as daily backup of work

### Code Style

- **TypeScript:** Use strict types, avoid `any`
- **Components:** Functional components with hooks
- **Styling:** Tailwind utility classes + CSS Modules for complex styles
- **Naming:** PascalCase for components, camelCase for functions/variables
- **File Structure:** Follow atomic design pattern (atoms/molecules/organisms)

---

## 📝 MVP Timeline

| Week | Milestone | Deliverable |
|------|-----------|-------------|
| **1-2** | UI Foundation | Landing page, upload interface, routing, Supabase setup |
| **3-4** | AI Integration | Image/prompt generation via Vercel functions |
| **5-6** | Spec Generation | Technical details generation with Claude |
| **7** | Features | Dashboard, export, feedback mechanism |
| **8** | Testing | Beta testing, bug fixes, Vercel production deployment |

---

## 🎯 Success Metrics

Track these KPIs:

| Metric | Target | Tracking Method |
|--------|--------|-----------------|
| Average generation time | < 20 sec | Vercel Function logs |
| User satisfaction | ≥ 70% | Feedback surveys |
| Export rate | ≥ 60% | Vercel Analytics events |
| 30-day retention | ≥ 30% | Supabase user analytics |
| Conversion (Free → Paid) | ≥ 20% | Payment tracking |

---

## 🔒 Security Best Practices

### Environment Variables

**✅ DO:**
- Use `.env.local` for local development (gitignored)
- Use Vercel Environment Variables for production
- Keep `SUPABASE_SERVICE_KEY` secret (only use in backend)
- Rotate API keys periodically
- Use different keys for development and production

**❌ DON'T:**
- Never commit `.env.local` or `.env` files
- Never hardcode API keys in source code
- Never share API keys in screenshots or documentation
- Never use production keys in development

### Before Committing Code

```bash
# Always check what you're committing
git status

# Make sure .env.local is NOT in the list
# If it appears, it means .gitignore is not working

# Double check
git add -n .
# Should NOT show .env.local
```

### If You Accidentally Committed Keys

1. **Immediately rotate all exposed API keys** in their respective dashboards
2. Remove the file from Git history:
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env.local" \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. Force push (⚠️ be careful): `git push origin --force --all`

---

## 🆘 Troubleshooting

### Common Issues

**Issue:** Hugging Face model loading error
```typescript
// Solution: First-time model loading can be slow
// The Hugging Face Inference API may take 20-60 seconds on first request
// Subsequent requests are much faster (~3-10 seconds)
// Consider adding a retry mechanism or loading message
```

**Issue:** Supabase connection error
```typescript
// Solution: Check environment variables
console.log(process.env.REACT_APP_SUPABASE_URL); // Should not be undefined
```

**Issue:** Vercel function timeout
```typescript
// Solution: Increase function timeout for Hugging Face image generation
// First-time model loading can take up to 60 seconds
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 60  // 60 seconds for Hugging Face (Vercel Pro plan required for >10s)
    }
  }
}

// On Vercel free tier, max is 10 seconds
// Consider using FLUX Schnell model for faster generation (~5 seconds)
// Or upgrade to Vercel Pro for longer timeouts
```

**Issue:** CORS errors in Vercel functions
```typescript
// Solution: Add CORS headers
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ... rest of handler
}
```

**Issue:** File upload fails
```typescript
// Solution: Check Supabase Storage bucket is public
// Go to Storage → Bucket → Make Public
```

---

## 📞 Support & Resources

- **Product Manager:** Wonji Seo
- **Documentation:**
  - [PRD](./prd.md)
  - [Design System](./design-system.md)
  - [Figma Prototype](https://www.figma.com/design/2wPHOYfUClxpNLCITO2nh9/FashionFlat-AI)
- **Tech Stack Docs:**
  - [React](https://react.dev/)
  - [TypeScript](https://www.typescriptlang.org/docs/)
  - [TailwindCSS](https://tailwindcss.com/docs)
  - [Supabase](https://supabase.com/docs)
  - [Vercel](https://vercel.com/docs)

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🚀 Next Steps

1. **Set Up Infrastructure:**
   - ✅ Create Supabase project
   - ✅ Set up storage buckets
   - ✅ Create database tables
   - ✅ Get API keys (Anthropic, Hugging Face)
   - ✅ **Copy `.env.example` to `.env.local` and fill in your keys**

2. **Initialize Project:**
   - ✅ Clone repository
   - ✅ Verify `.gitignore` is working
   - ✅ Install dependencies
   - ✅ Configure `.env.local` (NEVER commit this!)
   - ✅ Test local development

3. **Start Building:**
   - Begin with Landing Page (Week 1)
   - Implement File Upload with Supabase (Week 2)
   - Create Vercel API functions (Week 3-4)
   - Integrate AI models (Week 3-4)

4. **Deploy:**
   - Connect GitHub to Vercel
   - **Add environment variables in Vercel Dashboard** (not in code!)
   - Deploy to production
   - Monitor with Vercel Analytics

---

## 📋 Quick Reference

### Daily Checklist

**Every Day Before You Stop Working:**
```bash
# 1. Run tests
npm test

# 2. Build check
npm run build

# 3. Commit work
git add .
git commit -m "feat: your changes"

# 4. Push
git push origin your-branch-name

# 5. Create/Update PR (even if Draft)
# Go to GitHub and create PR

# 6. Update PR description
# - What you completed
# - What's remaining
# - Any blockers
```

### Files You MUST Keep Secret
- `.env.local` - Your actual API keys ❌ NEVER COMMIT
- `.env` - Alternative local env file ❌ NEVER COMMIT
- Any file with API keys or passwords ❌ NEVER COMMIT

### Files Safe to Commit
- `.env.example` - Template with no real keys ✅ COMMIT
- `.gitignore` - Protects sensitive files ✅ COMMIT
- `.github/pull_request_template.md` - PR template ✅ COMMIT
- All source code (*.tsx, *.ts, *.css) ✅ COMMIT
- README, PRD, design docs ✅ COMMIT

### Git Commands Quick Reference
```bash
# Start new feature
git checkout main
git pull origin main
git checkout -b feature/feature-name

# During development
git add .
git commit -m "feat: description"

# Before pushing
npm test
npm run build

# Push and PR
git push origin feature/feature-name
# Then create PR on GitHub

# Update branch with latest main
git checkout main
git pull origin main
git checkout feature/feature-name
git merge main
```

### Environment Variables Checklist
```bash
# Required for local development:
✅ REACT_APP_SUPABASE_URL
✅ REACT_APP_SUPABASE_ANON_KEY
✅ SUPABASE_SERVICE_KEY
✅ ANTHROPIC_API_KEY
✅ HUGGINGFACE_API_KEY

# Required for Vercel deployment:
Same as above, but set in Vercel Dashboard → Settings → Environment Variables
```

---

**Built with ❤️ for fashion designers who deserve better tools.**

**Version:** 1.0 | **Last Updated:** November 15, 2025
