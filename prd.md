# FashionFlat AI — Product Requirement Document (PRD)

## 1. Product Overview
**FashionFlat AI** is an AI-powered SaaS tool that enables fashion designers to convert rough sketches or inspiration images into professional technical flats and automatically generate corresponding technical details.  
The product reduces manual Illustrator work, increases design efficiency, and standardizes technical documentation.

---

## 2. Problem Statement
Fashion designers spend hours manually creating flat sketches and adding technical specifications. Small design changes often require repetitive redrawing, slowing the entire production workflow.  
Existing tools (Illustrator, CLO3D) are powerful but not automated — they rely heavily on manual input.  

**FashionFlat AI** automates the early design-to-tech-pack transition, cutting sketching time by over **50%** and improving design consistency.

---

## 3. Goals & Objectives
- Allow designers to upload inspiration images or rough sketches.
- Generate accurate technical flats within seconds.
- Support prompt-based generation for new designs.
- Output editable and production-ready flat sketches (vector format).
- Generate structured technical details (stitches, materials, trims, etc.).
- Ensure intuitive UX for designers with minimal AI/tech experience.

---

## 4. Target Users
- Independent fashion designers  
- Technical designers in small- to mid-sized brands  
- Design students and freelancers  
- Product development teams seeking faster iteration

---

## 5. Core Features & User Stories

### A. Image Upload & Processing
**User Story:**  
As a designer, I can upload a fashion sketch or image file to generate its technical flat.

**Acceptance Criteria:**
- Supports `.jpg`, `.jpeg`, `.png`
- Preview visible immediately after upload
- Clear loading/progress indicator
- Error handling for unsupported formats or large files

---

### B. Prompt-Based Generation
**User Story:**  
As a designer, I can type a text prompt (e.g., “long-sleeve shirt with puff sleeves and ruffles”) to generate a technical flat.

**Acceptance Criteria:**
- Prompt box accepts up to 500 characters  
- Model outputs a high-resolution flat sketch (front/back if possible)  
- User can regenerate or refine output with a new prompt

---

### C. Technical Flat Viewing
**User Story:**  
As a designer, I can view the generated technical flat on the main page.

**Acceptance Criteria:**
- Display generated image in centered canvas  
- Enable zoom in/out  
- Allow download (`.PNG` / `.SVG`) or regeneration  

---

### D. Technical Detail Generation
**User Story:**  
As a designer, I can generate written technical details for the flat sketch (e.g., “Topstitch 2mm on sleeve hem”).

**Acceptance Criteria:**
- “Generate Technical Details” button triggers text output  
- Details appear in side panel with copy/download options  
- (Future) Each detail links to sketch region visually  

---

### E. Main Page / Dashboard
**User Story:**  
As a user, I can view all my generated designs on the main page.

**Acceptance Criteria:**
- Display recent flats in grid layout  
- Click to view/edit previous generations  
- “New Design” button returns to upload/prompt input  

---

## 6. Technical Requirements

### Frontend
- **Framework:** React + TypeScript + TailwindCSS  
- **UI Library:** shadcn/ui (Figma-style components)  
- **Pages:**
  - `/` → Dashboard  
  - `/upload` → Upload & Prompt Input  
  - `/result` → Generated Output View  

### Backend
- **Framework:** FastAPI or Node.js (Express)  
- **Endpoints:**
  - `POST /generate/flat` → accepts image/prompt, returns image URL  
  - `POST /generate/details` → accepts image ID, returns text details  
  - `GET /user/designs` → returns design history  

### AI Model
- **Model Type:** Diffusion-based image-to-vector generator fine-tuned on fashion flat datasets  
- **Capabilities:**  
  - Text-to-image (Stable Diffusion / FLUX fine-tuned)  
  - Image-to-image for line clean-up  
  - LLM (GPT-4o / Claude / Mistral) for technical detail generation  

### Storage
- **Image Storage:** AWS S3 or Firebase  
- **Database:** PostgreSQL (user metadata, image history, text outputs)

---

## 7. UX / Figma Reference
**Figma Link:** [FashionFlat AI Prototype](https://www.figma.com/design/2wPHOYfUClxpNLCITO2nh9/FashionFlat-AI?node-id=1-2&t=W39k5UAwY9IIRbvy-1)

**UI Flow:**
1. Landing → Upload or Prompt Entry  
2. Processing Screen → Progress Indicator  
3. Result View → Flat + “Generate Details”  
4. Output Summary → Export Options  

---

## 8. Metrics for Success
| Metric | Target |
|--------|---------|
| Average generation time | < 20 sec |
| User satisfaction (survey) | ≥ 70% |
| Users exporting designs | ≥ 60% |
| Returning users (30-day) | ≥ 30% |
| Conversion (Free → Paid) | ≥ 20% |

---

## 9. Future Enhancements
- Layer separation for pattern-making  
- Editable vector exports (`.AI`, `.SVG`)  
- Integration with CLO3D / Illustrator plugins  
- Multi-view generation (front/back)  
- Collaborative versioning (Figma-style)

---

## 10. Risks & Mitigation
| Risk | Mitigation |
|------|-------------|
| Poor sketch quality or inaccurate lines | Collect high-quality labeled dataset; integrate feedback loop |
| Long processing time | Use async queue + GPU caching |
| Prompt confusion | Provide sample prompts & visual guide |
| Copyright/IP concerns | Restrict uploads to user-owned content |

---

## 11. Timeline (MVP)
| Milestone | Deliverable | Target |
|------------|--------------|--------|
| Week 1–2 | UI skeleton + upload page |  |
| Week 3–4 | Integrate AI model (image/prompt input) |  |
| Week 5–6 | Technical detail generation module |  |
| Week 7 | Dashboard + export features |  |
| Week 8 | Beta testing & refinement |  |

---

## 12. Pricing (MVP Hypothesis)
| Tier | Price | Features |
|------|--------|-----------|
| **Free** | $0 | 5 generations/month |
| **Pro** | $20/month | Unlimited generations + export |
| **Team** | $99/month | Shared library + API access |

---

## 13. Open Questions
- Which export formats do users prefer (`.PNG`, `.SVG`, `.AI`)?  
- Should MVP support front/back generation?  
- How to best display technical detail alignment visually?

---

**Document Owner:** Wonji Seo — Product Manager, FashionFlat AI  
**Version:** 1.0  
**Date:** November 2025
