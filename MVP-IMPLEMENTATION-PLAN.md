# FashionFlat AI - MVP Implementation Plan

**Goal:** Build a minimal working prototype where users can enter a prompt and see an AI-generated fashion flat sketch.

**Timeline:** 6-8 hours of focused work (includes implementing Figma design)
**Complexity:** Medium - Follow Figma design while building functionality

---

## 🎯 What We're Building (Minimal Viable Product)

### Scope: SINGLE PAGE APPLICATION

```
┌─────────────────────────────────────────────────────────┐
│                    FASHIONFLAT AI                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Turn your rough sketch into a flat sketch in seconds  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Enter design idea:                             │   │
│  │  ┌──────────────────────────────────────────┐   │   │
│  │  │ "oversized hoodie with kangaroo pocket"  │   │   │
│  │  └──────────────────────────────────────────┘   │   │
│  │                                                  │   │
│  │              [Generate Flat Sketch]              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  [Loading animation OR Generated Image]          │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Features (MVP ONLY)
✅ **Text prompt input** (no file upload for now - simpler)
✅ **Generate button**
✅ **Loading state** (shows while generating)
✅ **Display generated image**
✅ **Basic error handling**

### NOT Building (Later Phases)
❌ File upload (add later)
❌ Multiple pages/routing
❌ User authentication
❌ Database storage
❌ Technical specification generation
❌ Before/after comparison
❌ Complex animations
❌ Responsive mobile design (desktop first)

---

## 📋 Implementation Phases

### Phase 1: Project Setup (30 minutes)

**Goal:** Get development environment running

#### Tasks:
1. ✅ Create React app
2. ✅ Install dependencies
3. ✅ Set up Tailwind CSS
4. ✅ Configure environment variables
5. ✅ Verify local server runs

#### Commands:
```bash
# 1. Create React app
cd /Users/seowonji/ideal-octo-giggle
npx create-react-app frontend --template typescript
cd frontend

# 2. Install dependencies
npm install @anthropic-ai/sdk @huggingface/inference
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Set up environment variables
cp ../.env.example .env.local
# Edit .env.local with real API keys

# 4. Test
npm start
```

#### Success Criteria:
- [ ] React app runs on `http://localhost:3000`
- [ ] Tailwind CSS is working
- [ ] Environment variables are loaded
- [ ] No console errors

---

### Phase 2: Build UI Following Figma Design (2-3 hours)

**Goal:** Create single-page UI matching Figma design exactly

**Figma Reference:** https://www.figma.com/design/2wPHOYfUClxpNLCITO2nh9/FashionFlat-AI?node-id=1-2&p=f&t=W39k5UAwY9IIRbvy-0

**IMPORTANT:** We will implement the EXACT design from Figma, not a simplified version.

#### Pre-Phase 2 Requirement:
- [ ] **Export design specs from Figma** (colors, fonts, spacing, components)
- [ ] **Take screenshots** of key screens from Figma
- [ ] **Document design tokens** from Figma (use design-system.md as reference)

#### File Structure:
```
src/
├── App.tsx                  # Main component
├── components/
│   ├── Header.tsx           # Top navigation/logo from Figma
│   ├── Hero.tsx             # Hero section with tagline
│   ├── PromptInput.tsx      # Text input + generate button (Figma styled)
│   ├── LoadingSpinner.tsx   # Loading animation (Figma styled)
│   └── ResultDisplay.tsx    # Shows generated image (Figma layout)
├── styles/
│   ├── globals.css          # Tailwind imports + custom CSS
│   └── tokens.ts            # Design tokens from Figma
└── index.tsx                # Entry point
```

#### Components to Build:

**1. App.tsx** (Main Container)
```typescript
// State management:
- prompt (string)
- loading (boolean)
- generatedImage (string | null)
- error (string | null)

// Functions:
- handleGenerate() - calls API
- handlePromptChange() - updates prompt state
```

**2. PromptInput.tsx**
```typescript
// Props:
- value: string
- onChange: (value: string) => void
- onGenerate: () => void
- disabled: boolean
- loading: boolean

// Features:
- Textarea input (3-4 rows)
- Character counter (0/500)
- Generate button (disabled when loading)
- Placeholder text with example
```

**3. LoadingSpinner.tsx**
```typescript
// Props:
- message?: string

// Features:
- Animated spinner
- "Generating your design..." message
- Estimated time: "This may take 20-60 seconds"
```

**4. ResultDisplay.tsx**
```typescript
// Props:
- imageUrl: string
- error: string | null

// Features:
- Display image (max-width: 800px)
- Error message if failed
- "Download" button (simple <a> tag)
```

#### Styling (From Figma Design):

**Extract from Figma:**
1. **Colors:**
   - Background colors (primary, secondary, tertiary)
   - Brand purple/magenta gradient
   - Text colors (primary, secondary, tertiary)
   - Border colors

2. **Typography:**
   - Font family (likely Inter or Sora)
   - Font sizes for headings (H1, H2, H3)
   - Font sizes for body text
   - Font weights (regular, medium, semibold, bold)
   - Line heights

3. **Spacing:**
   - Padding values
   - Margin values
   - Gap between elements
   - Container max-widths

4. **Components:**
   - Button styles (primary, secondary variants)
   - Input field styles
   - Card/container styles
   - Border radius values
   - Shadow/glow effects

5. **Layout:**
   - Page structure (header, hero, content)
   - Grid/flex layouts
   - Responsive breakpoints

**Implementation Steps:**
1. Create `src/styles/tokens.ts` with exact Figma values
2. Configure `tailwind.config.js` with Figma design tokens
3. Build components matching Figma pixel-perfect
4. Use Figma Dev Mode to get exact CSS values

#### Success Criteria:
- [ ] Page loads with input box
- [ ] Can type in prompt
- [ ] Generate button is clickable
- [ ] Loading state shows/hides correctly
- [ ] Result area displays when image URL is set
- [ ] **Design matches Figma** (colors, fonts, spacing, layout)
- [ ] **Components look pixel-perfect** compared to Figma
- [ ] Dark theme with purple accents implemented correctly
- [ ] Typography matches Figma (font family, sizes, weights)
- [ ] Button styles match Figma (hover states, colors)

---

### Phase 3: Create API Endpoint (1.5 hours)

**Goal:** Working serverless function that generates images

#### File Structure:
```
api/
└── generate.ts              # Main API endpoint
```

#### API Flow:
```
User Input → Claude (enhance prompt) → Hugging Face (generate image) → Return URL
```

#### Implementation Steps:

**Step 1: Create basic endpoint**
```typescript
// api/generate.ts
export default async function handler(req, res) {
  // 1. Extract prompt from request
  // 2. Validate prompt (not empty, < 500 chars)
  // 3. Return success response
}
```

**Step 2: Add Claude integration**
```typescript
// Enhance prompt using Claude
const enhancedPrompt = await enhancePrompt(userPrompt);
```

**Step 3: Add Hugging Face integration**
```typescript
// Generate image using Hugging Face
const imageBlob = await hf.textToImage({...});
```

**Step 4: Return base64 image**
```typescript
// Convert blob to base64
// Return: { success: true, image: base64String, prompt: enhancedPrompt }
```

#### API Response Format:
```json
{
  "success": true,
  "image": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "enhancedPrompt": "Technical fashion flat sketch...",
  "processingTime": 18.5
}
```

#### Error Handling:
```json
{
  "success": false,
  "error": "Generation failed: Model timeout"
}
```

#### Success Criteria:
- [ ] API responds to POST requests
- [ ] Claude API successfully enhances prompts
- [ ] Hugging Face API generates images
- [ ] Returns base64 image data
- [ ] Handles errors gracefully
- [ ] Can test with Postman/curl

---

### Phase 4: Connect UI to API (1 hour)

**Goal:** Make the button actually work

#### Implementation:

**Create API service:**
```typescript
// src/services/api.ts
export async function generateFlatSketch(prompt: string) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) throw new Error('Generation failed');
  return response.json();
}
```

**Update App.tsx:**
```typescript
const handleGenerate = async () => {
  setLoading(true);
  setError(null);

  try {
    const result = await generateFlatSketch(prompt);
    setGeneratedImage(result.image);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

#### Loading States:
1. **Idle:** Show input, button enabled
2. **Loading:** Show spinner, button disabled, input disabled
3. **Success:** Show image, button enabled
4. **Error:** Show error message, button enabled

#### Success Criteria:
- [ ] Button triggers API call
- [ ] Loading spinner shows during generation
- [ ] Generated image displays when complete
- [ ] Error messages display when API fails
- [ ] Can generate multiple images in a row

---

### Phase 5: End-to-End Testing (30 minutes)

**Goal:** Verify everything works together

#### Test Cases:

**1. Happy Path:**
```
✓ Enter prompt: "oversized hoodie with kangaroo pocket"
✓ Click "Generate"
✓ See loading spinner (20-60 seconds)
✓ See generated image
✓ Image looks like a fashion flat sketch
```

**2. Error Cases:**
```
✓ Empty prompt → Shows error
✓ Very long prompt (>500 chars) → Shows error
✓ API timeout → Shows error message
✓ Invalid API key → Shows error message
```

**3. Multiple Generations:**
```
✓ Generate image 1
✓ Change prompt
✓ Generate image 2
✓ Both generations work
```

#### Success Criteria:
- [ ] Can generate at least 3 different designs successfully
- [ ] Loading states work correctly
- [ ] Errors are handled gracefully
- [ ] No console errors
- [ ] Performance is acceptable (< 60 seconds)

---

## 🚀 Deployment Checklist

**Local Development:**
- [ ] `npm start` runs without errors
- [ ] `vercel dev` runs API functions locally
- [ ] Environment variables are set correctly

**Vercel Deployment (after testing locally):**
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add environment variables in Vercel dashboard
- [ ] Deploy and test production

---

## 📊 Success Metrics

After Phase 5, we should have:

- ✅ **Working end-to-end flow** (prompt → image)
- ✅ **Single page application** (no routing complexity)
- ✅ **API integration** (Claude + Hugging Face)
- ✅ **Basic error handling**
- ✅ **Deployable to Vercel**

**NOT required for Phase 1:**
- ❌ Beautiful design
- ❌ Mobile responsive
- ❌ File upload
- ❌ Database storage
- ❌ User accounts

---

## 🔄 After MVP is Working

**Phase 2 (Next Steps):**
1. Add file upload for sketch input
2. Add Supabase for image storage
3. Improve UI/UX with better styling
4. Add technical specification generation
5. Add before/after comparison
6. Add routing (multiple pages)

---

## 🎯 Definition of Done

**This MVP is DONE when:**

1. ✅ User can type a prompt
2. ✅ User can click "Generate"
3. ✅ User sees a loading indicator
4. ✅ User sees a generated fashion flat sketch
5. ✅ The sketch looks reasonably good
6. ✅ Process takes < 60 seconds
7. ✅ Errors are handled gracefully
8. ✅ Code is pushed to GitHub with a PR
9. ✅ App is deployed to Vercel

**Then we can iterate and improve!**

---

## 📝 Questions to Answer Before Starting

1. **API Keys:** Do you have Anthropic + Hugging Face API keys ready?
2. **Model Choice:** Start with `stabilityai/stable-diffusion-xl-base-1.0` or `black-forest-labs/FLUX.1-schnell`?
3. **Vercel Account:** Is Vercel account set up and connected to GitHub?
4. **Development Time:** Can you dedicate 4-6 uninterrupted hours to this?
5. **Figma Access:** How will we access the Figma design? (See options below)

---

## 🎨 Figma Design Access (REQUIRED BEFORE PHASE 2)

**Figma Link:** https://www.figma.com/design/2wPHOYfUClxpNLCITO2nh9/FashionFlat-AI?node-id=1-2&p=f&t=W39k5UAwY9IIRbvy-0

**Problem:** The Figma file is currently private (403 error when accessing).

**Solutions - Choose ONE:**

### Option 1: Share Figma File Publicly (Easiest)
1. Open Figma file
2. Click "Share" button (top right)
3. Change to "Anyone with the link can view"
4. Share the link

### Option 2: Export Design Specs (Recommended)
1. Open Figma file
2. Use **Dev Mode** (bottom right toggle)
3. For each screen/component:
   - Select element
   - Copy CSS values from Dev Mode panel
   - Take screenshots
4. Create a document with:
   - Screenshots of all key screens
   - Color values (hex codes)
   - Font family, sizes, weights
   - Spacing values (padding, margin)
   - Component dimensions

### Option 3: Export Screenshots + Manual Measurement
1. Export PNG screenshots of each screen
2. I'll measure values manually and build to match
3. Less accurate but works if Figma access not possible

### Option 4: Grant Me View Access
1. Share my email/account view access to Figma file
2. I can then inspect directly

**Which option works best for you?**

---

## 🚦 Go/No-Go Decision

**Ready to start if:**
- ✅ All API keys are obtained
- ✅ Development environment is set up
- ✅ You understand the scope (minimal, working prototype)
- ✅ You're ready to create PRs regularly

**Let me know when you're ready to proceed with Phase 1!**
