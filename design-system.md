# FashionFlat AI - Design System & Component Library

**Version:** 1.0
**Last Updated:** November 15, 2025
**Figma Reference:** [FashionFlat AI Design](https://www.figma.com/design/2wPHOYfUClxpNLCITO2nh9/FashionFlat-AI?node-id=5-4494)

---

## Table of Contents
1. [Design Tokens](#design-tokens)
2. [Component Library](#component-library)
3. [Layout & Grid System](#layout--grid-system)
4. [Component Architecture](#component-architecture)
5. [Code Examples](#code-examples)
6. [Fashion-Specific Patterns](#fashion-specific-patterns)

---

## 1. Design Tokens

### 1.1 Colors

```typescript
export const colors = {
  // Primary Brand Colors
  primary: {
    main: '#A855F7',        // Purple/Magenta - main brand color
    hover: '#9333EA',       // Darker purple for hover states
    active: '#7E22CE',      // Even darker for active states
    light: '#C084FC',       // Lighter tint for backgrounds
    gradient: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)', // Primary gradient
  },

  // Background Colors
  background: {
    primary: '#0F0F1E',     // Deep navy/dark background
    secondary: '#1A1A2E',   // Slightly lighter dark background
    tertiary: '#252541',    // Card/panel backgrounds
    elevated: '#2D2D4A',    // Elevated surfaces (modals, dropdowns)
  },

  // Text Colors
  text: {
    primary: '#FFFFFF',     // Primary text (headings, important content)
    secondary: '#B4B4C8',   // Secondary text (descriptions, labels)
    tertiary: '#8B8B9E',    // Tertiary text (hints, placeholders)
    disabled: '#5A5A6E',    // Disabled state text
    inverse: '#0F0F1E',     // Text on light backgrounds
  },

  // Semantic Colors
  semantic: {
    success: '#10B981',     // Success states, completed actions
    warning: '#F59E0B',     // Warnings, pending states
    error: '#EF4444',       // Errors, validation failures
    info: '#3B82F6',        // Information, tips
  },

  // Border Colors
  border: {
    default: '#3A3A52',     // Default borders
    hover: '#4A4A62',       // Hover state borders
    focus: '#A855F7',       // Focus state (matches primary)
    error: '#EF4444',       // Error state borders
  },

  // Overlay & Shadow Colors
  overlay: {
    modal: 'rgba(15, 15, 30, 0.8)',      // Modal backdrop
    tooltip: 'rgba(0, 0, 0, 0.9)',       // Tooltip background
    loading: 'rgba(15, 15, 30, 0.95)',   // Loading overlay
  },
};
```

### 1.2 Typography

```typescript
export const typography = {
  // Font Families
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    heading: "'Sora', 'Inter', sans-serif",  // If using different font for headings
    mono: "'Fira Code', 'Courier New', monospace",  // For technical specs
  },

  // Font Sizes
  fontSize: {
    xs: '0.75rem',      // 12px - small labels, captions
    sm: '0.875rem',     // 14px - body text, descriptions
    base: '1rem',       // 16px - default body text
    lg: '1.125rem',     // 18px - large body text
    xl: '1.25rem',      // 20px - small headings
    '2xl': '1.5rem',    // 24px - section headings
    '3xl': '1.875rem',  // 30px - page headings
    '4xl': '2.25rem',   // 36px - hero headings
    '5xl': '3rem',      // 48px - large hero text
  },

  // Font Weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,         // Headings
    normal: 1.5,        // Body text
    relaxed: 1.75,      // Long-form content
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.05em',
  },
};
```

### 1.3 Spacing Scale

```typescript
export const spacing = {
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
};
```

### 1.4 Border Radius

```typescript
export const borderRadius = {
  none: '0',
  sm: '0.25rem',     // 4px - small elements
  base: '0.5rem',    // 8px - default buttons, inputs
  md: '0.75rem',     // 12px - cards, panels
  lg: '1rem',        // 16px - large cards
  xl: '1.5rem',      // 24px - hero sections
  full: '9999px',    // Pills, circular buttons
};
```

### 1.5 Shadows

```typescript
export const shadows = {
  // Elevation Shadows
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',

  // Glow Effects (for primary actions)
  glow: {
    primary: '0 0 20px rgba(168, 85, 247, 0.4)',
    success: '0 0 20px rgba(16, 185, 129, 0.4)',
    error: '0 0 20px rgba(239, 68, 68, 0.4)',
  },

  // Inner Shadow
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
};
```

### 1.6 Z-Index Layers

```typescript
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};
```

### 1.7 Transitions & Animations

```typescript
export const transitions = {
  // Duration
  duration: {
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
  },

  // Easing Functions
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};
```

---

## 2. Component Library

### 2.1 Button Component

**Variants:** primary, secondary, tertiary, ghost, danger
**Sizes:** sm, md, lg
**States:** default, hover, active, disabled, loading

#### Visual Specifications

| Variant | Background | Text Color | Border | Hover Effect |
|---------|-----------|------------|--------|--------------|
| Primary | `primary.main` | `text.primary` | None | Background: `primary.hover`, Shadow: `glow.primary` |
| Secondary | Transparent | `primary.main` | `2px solid primary.main` | Background: `primary.main`, Text: `text.primary` |
| Tertiary | `background.tertiary` | `text.primary` | None | Background: `background.elevated` |
| Ghost | Transparent | `text.secondary` | None | Background: `background.tertiary` |
| Danger | `semantic.error` | `text.primary` | None | Background: darker red |

#### Size Specifications

| Size | Height | Padding X | Padding Y | Font Size | Border Radius |
|------|--------|-----------|-----------|-----------|---------------|
| sm | 36px | 16px | 8px | `fontSize.sm` | `borderRadius.base` |
| md | 44px | 24px | 12px | `fontSize.base` | `borderRadius.base` |
| lg | 52px | 32px | 14px | `fontSize.lg` | `borderRadius.md` |

#### Component Props

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}
```

---

### 2.2 Input Field Component

**Types:** text, email, textarea, file
**States:** default, focus, error, disabled
**Sizes:** sm, md, lg

#### Visual Specifications

| State | Border | Background | Text Color |
|-------|--------|------------|------------|
| Default | `border.default` | `background.tertiary` | `text.primary` |
| Focus | `2px border.focus` | `background.tertiary` | `text.primary` |
| Error | `2px border.error` | `background.tertiary` | `text.primary` |
| Disabled | `border.default` | `background.secondary` | `text.disabled` |

#### Component Props

```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}
```

---

### 2.3 File Upload Component

**Purpose:** Primary component for uploading rough sketches
**Features:** Drag & drop, click to upload, file preview, validation

#### Visual Specifications

**Upload Area:**
- Border: `2px dashed border.default`
- Background: `background.tertiary`
- Border Radius: `borderRadius.lg`
- Padding: `spacing.12` vertical, `spacing.8` horizontal
- Min Height: `300px`

**Drag Active State:**
- Border: `2px solid primary.main`
- Background: `rgba(168, 85, 247, 0.05)`
- Shadow: `glow.primary`

**File Preview:**
- Image container with rounded corners
- File name and size display
- Remove/replace button overlay on hover

#### Component Props

```typescript
interface FileUploadProps {
  accept?: string;  // e.g., 'image/png, image/jpeg'
  maxSize?: number; // in bytes (default: 10MB)
  onFileSelect: (file: File) => void;
  onError?: (error: string) => void;
  preview?: string; // URL for preview image
  loading?: boolean;
  disabled?: boolean;
}
```

---

### 2.4 Card Component

**Purpose:** Container for content sections, results, specifications
**Variants:** default, elevated, bordered

#### Visual Specifications

| Variant | Background | Border | Shadow |
|---------|-----------|--------|--------|
| Default | `background.tertiary` | None | `shadows.sm` |
| Elevated | `background.elevated` | None | `shadows.md` |
| Bordered | `background.tertiary` | `1px solid border.default` | None |

**Common Properties:**
- Border Radius: `borderRadius.lg`
- Padding: `spacing.6` to `spacing.8`

#### Component Props

```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: keyof typeof spacing;
  children: ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
}
```

---

### 2.5 Image Comparison Component

**Purpose:** Display before/after sketches side by side
**Features:** Synchronized zoom, labels, download options

#### Layout

```
┌─────────────────────────────────────────┐
│  Original Sketch  │  Generated Flat     │
│                   │                     │
│  [Image Preview]  │  [Image Preview]    │
│                   │                     │
│  [DownloadBtn]    │  [Download Btn]     │
└─────────────────────────────────────────┘
```

**Specifications:**
- Container: 2-column grid (1:1 ratio)
- Gap: `spacing.6`
- Each image card has label above
- Zoom controls below each image
- Background: `background.tertiary`
- Border Radius: `borderRadius.md`

#### Component Props

```typescript
interface ImageComparisonProps {
  originalImage: string;
  generatedImage: string;
  originalLabel?: string;
  generatedLabel?: string;
  onDownloadOriginal?: () => void;
  onDownloadGenerated?: () => void;
  allowZoom?: boolean;
}
```

---

### 2.6 Progress Indicator Component

**Purpose:** Show AI generation progress
**Types:** linear progress bar, circular spinner, status steps

#### Linear Progress Bar

**Visual Specifications:**
- Height: `8px`
- Background: `background.secondary`
- Fill: `linear-gradient primary.gradient`
- Border Radius: `borderRadius.full`
- Animated shimmer effect

```typescript
interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
  variant?: 'default' | 'success' | 'error';
}
```

#### Spinner

**Visual Specifications:**
- Size options: sm (24px), md (40px), lg (60px)
- Color: `primary.main`
- Border width: `3px`
- Animation: smooth rotation

```typescript
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
}
```

---

### 2.7 Technical Specification Display

**Purpose:** Show AI-generated design specifications
**Format:** Structured key-value pairs with sections

#### Visual Structure

```
┌─────────────────────────────────────┐
│  Technical Specifications           │
├─────────────────────────────────────┤
│  Garment Type                       │
│  • Category Name                    │
│                                     │
│  Design Description                 │
│  • Feature 1                        │
│  • Feature 2                        │
│                                     │
│  Materials (BOM)                    │
│  • Material 1                       │
│  • Material 2                       │
│                                     │
│  Construction Details               │
│  • Detail 1                         │
│                                     │
│  [Copy] [Download] [Edit]           │
└─────────────────────────────────────┘
```

**Specifications:**
- Background: `background.tertiary`
- Padding: `spacing.6`
- Border Radius: `borderRadius.md`
- Section headers: `fontSize.lg`, `fontWeight.semibold`
- List items: `fontSize.base`, bullet points
- Monospace font for technical terms

#### Component Props

```typescript
interface TechnicalSpecProps {
  garmentType?: string;
  designDescription?: string[];
  materials?: string[];
  constructionDetails?: string[];
  patternNotes?: string[];
  colors?: string[];
  onCopy?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
  editable?: boolean;
}
```

---

### 2.8 Prompt Input Component

**Purpose:** Text input for AI prompt-based generation
**Features:** Character counter, examples, validation

#### Visual Specifications

**Text Area:**
- Min Height: `120px`
- Max Height: `300px`
- Background: `background.tertiary`
- Border: `1px solid border.default`
- Border Radius: `borderRadius.md`
- Padding: `spacing.4`
- Font: `fontSize.base`

**Character Counter:**
- Position: Bottom right
- Color: `text.tertiary` (changes to `semantic.warning` at 90%, `semantic.error` at 100%)
- Format: "450/500"

**Example Prompts:**
- Displayed as clickable chips below input
- Background: `background.elevated`
- Border Radius: `borderRadius.full`
- Padding: `spacing.2` `spacing.4`

#### Component Props

```typescript
interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number; // default: 500
  minLength?: number; // default: 20
  placeholder?: string;
  examples?: string[];
  onExampleClick?: (example: string) => void;
  error?: string;
  disabled?: boolean;
}
```

---

### 2.9 Modal Component

**Purpose:** Display full-screen overlays for results, settings, etc.
**Features:** Backdrop, close button, responsive sizing

#### Visual Specifications

**Backdrop:**
- Background: `overlay.modal`
- Z-index: `zIndex.modalBackdrop`
- Blur effect: `backdrop-filter: blur(4px)`

**Modal Container:**
- Max Width: `90vw` or `1200px`
- Max Height: `90vh`
- Background: `background.elevated`
- Border Radius: `borderRadius.xl`
- Shadow: `shadows.xl`
- Z-index: `zIndex.modal`
- Padding: `spacing.8`

**Animation:**
- Entry: Scale from 0.95 to 1, fade in
- Exit: Scale to 0.95, fade out
- Duration: `transitions.duration.base`

#### Component Props

```typescript
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
}
```

---

### 2.10 Icon Library

**Common Icons Needed:**
- Upload Cloud
- Image/Photo
- Download
- Check/Success
- Error/Alert
- Info
- Loading Spinner
- Close/X
- Edit/Pencil
- Copy
- Trash
- Search
- Settings
- User
- Menu (hamburger)

**Specifications:**
- Library: Heroicons, Lucide, or custom SVG
- Sizes: 16px, 20px, 24px, 32px
- Stroke Width: 2px
- Color: Inherits from parent or uses `text.secondary`

---

### 2.11 Toast/Notification Component

**Purpose:** Temporary feedback messages
**Types:** success, error, warning, info

#### Visual Specifications

**Container:**
- Position: Fixed, top-right or bottom-right
- Width: `350px`
- Background: `background.elevated`
- Border: `1px solid` (color based on type)
- Border Radius: `borderRadius.md`
- Shadow: `shadows.lg`
- Padding: `spacing.4`

**Type Variants:**
| Type | Border Color | Icon | Icon Color |
|------|-------------|------|------------|
| Success | `semantic.success` | Check | `semantic.success` |
| Error | `semantic.error` | X Circle | `semantic.error` |
| Warning | `semantic.warning` | Alert | `semantic.warning` |
| Info | `semantic.info` | Info | `semantic.info` |

**Auto-dismiss:** 5 seconds default

#### Component Props

```typescript
interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  description?: string;
  duration?: number; // milliseconds
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

---

## 3. Layout & Grid System

### 3.1 Responsive Breakpoints

```typescript
export const breakpoints = {
  mobile: '0px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
  ultrawide: '1536px',
};
```

### 3.2 Container Widths

```typescript
export const containerWidth = {
  mobile: '100%',
  tablet: '720px',
  desktop: '960px',
  wide: '1200px',
  ultrawide: '1400px',
};
```

### 3.3 Grid System

**12-Column Grid:**
- Columns: 12
- Gutter: `spacing.6` (24px)
- Container Padding: `spacing.4` (mobile), `spacing.6` (tablet+)

**Usage:**
```typescript
// Desktop: 2-column layout
<Grid cols={12}>
  <GridItem span={6}>Left Column</GridItem>
  <GridItem span={6}>Right Column</GridItem>
</Grid>

// Responsive
<GridItem span={{ mobile: 12, tablet: 6, desktop: 4 }}>
  Content
</GridItem>
```

### 3.4 Page Layouts

#### Landing Page Layout

```
┌─────────────────────────────────────────┐
│              Navigation                 │
├─────────────────────────────────────────┤
│              Hero Section               │
│    Headline + Tagline + CTA            │
│    Before/After Example                │
├─────────────────────────────────────────┤
│         Value Propositions              │
│    [Icon] [Icon] [Icon] [Icon]         │
├─────────────────────────────────────────┤
│              Footer                     │
└─────────────────────────────────────────┘
```

#### Generation Workspace Layout

```
┌─────────────────────────────────────────┐
│              Header/Nav                 │
├─────────────────────────────────────────┤
│                                         │
│   Input Method Tabs                     │
│   [Upload Image] [Write Prompt]         │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │                                 │   │
│   │     Upload/Prompt Area          │   │
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
│        [Generate Button]                │
│                                         │
└─────────────────────────────────────────┘
```

#### Results View Layout

```
┌─────────────────────────────────────────┐
│              Header/Nav                 │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┬──────────────┐        │
│  │   Original   │  Generated   │        │
│  │   [Image]    │   [Image]    │        │
│  │              │              │        │
│  └──────────────┴──────────────┘        │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  Technical Specifications       │    │
│  │  • Details...                   │    │
│  └─────────────────────────────────┘    │
│                                         │
│     [Download] [New Generation]         │
│                                         │
└─────────────────────────────────────────┘
```

---

## 4. Component Architecture

### 4.1 Folder Structure

```
src/
├── components/
│   ├── atoms/                    # Basic building blocks
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Icon/
│   │   ├── Spinner/
│   │   └── ...
│   │
│   ├── molecules/                # Composite components
│   │   ├── FileUpload/
│   │   ├── PromptInput/
│   │   ├── ImagePreview/
│   │   ├── ProgressBar/
│   │   ├── Toast/
│   │   └── ...
│   │
│   ├── organisms/                # Complex sections
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── GenerationWorkspace/
│   │   ├── ImageComparison/
│   │   ├── TechnicalSpecDisplay/
│   │   └── ...
│   │
│   ├── templates/                # Page layouts
│   │   ├── LandingPageTemplate/
│   │   ├── WorkspaceTemplate/
│   │   └── ...
│   │
│   └── pages/                    # Full pages
│       ├── LandingPage/
│       ├── GeneratePage/
│       └── ResultsPage/
│
├── styles/
│   ├── tokens/                   # Design tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shadows.ts
│   │   └── index.ts
│   │
│   ├── globals.css               # Global styles, resets
│   └── theme.ts                  # Combined theme object
│
├── hooks/                        # Custom React hooks
│   ├── useFileUpload.ts
│   ├── useImageGeneration.ts
│   ├── useToast.ts
│   └── ...
│
├── utils/                        # Utility functions
│   ├── fileValidation.ts
│   ├── imageProcessing.ts
│   └── ...
│
├── services/                     # API services
│   ├── api.ts
│   ├── imageGeneration.ts
│   ├── specGeneration.ts
│   └── ...
│
└── types/                        # TypeScript types
    ├── components.ts
    ├── api.ts
    └── ...
```

### 4.2 Naming Conventions

**Components:**
- PascalCase: `Button`, `FileUpload`, `ImageComparison`
- File name matches component name
- Index file for clean imports

**Styles:**
- CSS Modules: `ComponentName.module.css`
- Or styled-components: `ComponentName.styles.ts`

**Hooks:**
- camelCase with `use` prefix: `useFileUpload`, `useImageGeneration`

**Utils:**
- camelCase: `validateFile`, `processImage`

**Types/Interfaces:**
- PascalCase with descriptive suffix: `ButtonProps`, `UserData`

### 4.3 Recommended Tech Stack

**Styling Approach: Tailwind CSS + CSS Modules (hybrid)**

**Why Tailwind CSS:**
- Fast prototyping with utility classes
- Consistent design tokens via config
- Built-in responsive utilities
- Dark mode support
- PurgeCSS for small bundle size

**When to use CSS Modules:**
- Complex animations
- Component-specific styles
- Hover effects with multiple properties

**Tailwind Config:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#A855F7',
          hover: '#9333EA',
          // ... rest of colors
        },
        background: {
          primary: '#0F0F1E',
          secondary: '#1A1A2E',
          // ...
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Sora', 'Inter', 'sans-serif'],
      },
      spacing: {
        // Custom spacing values
      },
      borderRadius: {
        // Custom radius values
      },
      boxShadow: {
        glow: '0 0 20px rgba(168, 85, 247, 0.4)',
      },
    },
  },
};
```

**Alternative: styled-components** (if you prefer CSS-in-JS)
- Better for dynamic theming
- Scoped styles without naming conflicts
- Full TypeScript support

---

## 5. Code Examples

### 5.1 Button Component (Complete Implementation)

```typescript
// src/components/atoms/Button/Button.tsx
import React from 'react';
import classNames from 'classnames';
import { Spinner } from '../Spinner';
import styles from './Button.module.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  onClick,
  children,
  type = 'button',
  className,
}) => {
  const buttonClasses = classNames(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.disabled]: disabled || loading,
      [styles.loading]: loading,
      [styles.fullWidth]: fullWidth,
      [styles.hasIcon]: !!icon,
    },
    className
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <span className={styles.spinnerWrapper}>
          <Spinner size={size === 'sm' ? 'sm' : 'md'} />
        </span>
      )}

      {!loading && icon && iconPosition === 'left' && (
        <span className={styles.iconLeft}>{icon}</span>
      )}

      <span className={styles.label}>{children}</span>

      {!loading && icon && iconPosition === 'right' && (
        <span className={styles.iconRight}>{icon}</span>
      )}
    </button>
  );
};
```

```css
/* src/components/atoms/Button/Button.module.css */
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  white-space: nowrap;
}

.button:focus-visible {
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.4);
}

/* Variants */
.primary {
  background: linear-gradient(135deg, #A855F7 0%, #EC4899 100%);
  color: #FFFFFF;
}

.primary:hover:not(.disabled) {
  background: #9333EA;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
  transform: translateY(-1px);
}

.primary:active:not(.disabled) {
  background: #7E22CE;
  transform: translateY(0);
}

.secondary {
  background: transparent;
  color: #A855F7;
  border: 2px solid #A855F7;
}

.secondary:hover:not(.disabled) {
  background: #A855F7;
  color: #FFFFFF;
}

.tertiary {
  background: #252541;
  color: #FFFFFF;
}

.tertiary:hover:not(.disabled) {
  background: #2D2D4A;
}

.ghost {
  background: transparent;
  color: #B4B4C8;
}

.ghost:hover:not(.disabled) {
  background: #252541;
  color: #FFFFFF;
}

.danger {
  background: #EF4444;
  color: #FFFFFF;
}

.danger:hover:not(.disabled) {
  background: #DC2626;
}

/* Sizes */
.sm {
  height: 36px;
  padding: 8px 16px;
  font-size: 0.875rem;
  border-radius: 0.5rem;
}

.md {
  height: 44px;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 0.5rem;
}

.lg {
  height: 52px;
  padding: 14px 32px;
  font-size: 1.125rem;
  border-radius: 0.75rem;
}

/* States */
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.loading .label {
  opacity: 0;
}

.spinnerWrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/* Icon positioning */
.iconLeft {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.iconRight {
  margin-left: 8px;
  display: flex;
  align-items: center;
}

/* Full width */
.fullWidth {
  width: 100%;
}
```

**Usage:**
```tsx
import { Button } from '@/components/atoms/Button';
import { UploadIcon } from '@/components/atoms/Icon';

<Button variant="primary" size="lg" onClick={handleGenerate}>
  Generate Flat Sketch
</Button>

<Button
  variant="secondary"
  loading={isUploading}
  icon={<UploadIcon />}
  iconPosition="left"
>
  Upload Image
</Button>
```

---

### 5.2 FileUpload Component

```typescript
// src/components/molecules/FileUpload/FileUpload.tsx
import React, { useState, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { UploadCloudIcon, XIcon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import styles from './FileUpload.module.css';

export interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in bytes
  onFileSelect: (file: File) => void;
  onError?: (error: string) => void;
  preview?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = 'image/png, image/jpeg, image/jpg',
  maxSize = 10 * 1024 * 1024, // 10MB
  onFileSelect,
  onError,
  preview,
  loading = false,
  disabled = false,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file type
      const acceptedTypes = accept.split(',').map((t) => t.trim());
      const fileType = file.type;

      if (!acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return fileType.startsWith(type.replace('/*', ''));
        }
        return fileType === type;
      })) {
        return `File type not supported. Please upload: ${accept}`;
      }

      // Check file size
      if (file.size > maxSize) {
        const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
        return `File size exceeds ${maxSizeMB}MB limit`;
      }

      return null;
    },
    [accept, maxSize]
  );

  const handleFile = useCallback(
    (file: File) => {
      const error = validateFile(file);
      if (error) {
        onError?.(error);
        return;
      }
      onFileSelect(file);
    },
    [validateFile, onFileSelect, onError]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (disabled || loading) return;

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        handleFile(files[0]);
      }
    },
    [disabled, loading, handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleClick = useCallback(() => {
    if (!disabled && !loading) {
      fileInputRef.current?.click();
    }
  }, [disabled, loading]);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null as any); // Clear preview
  }, [onFileSelect]);

  const containerClasses = classNames(styles.container, {
    [styles.dragActive]: isDragActive,
    [styles.disabled]: disabled || loading,
    [styles.hasPreview]: !!preview,
  });

  return (
    <div
      className={containerClasses}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className={styles.hiddenInput}
        disabled={disabled || loading}
      />

      {preview ? (
        <div className={styles.previewContainer}>
          <img src={preview} alt="Upload preview" className={styles.previewImage} />
          <button
            onClick={handleRemove}
            className={styles.removeButton}
            aria-label="Remove image"
          >
            <XIcon />
          </button>
        </div>
      ) : (
        <div className={styles.uploadPrompt}>
          <UploadCloudIcon className={styles.uploadIcon} />
          <h3 className={styles.title}>
            {isDragActive ? 'Drop your image here' : 'Upload rough sketch'}
          </h3>
          <p className={styles.description}>
            Drag and drop or click to browse
          </p>
          <p className={styles.specs}>
            PNG, JPG up to {(maxSize / (1024 * 1024)).toFixed(0)}MB
          </p>
          <Button variant="secondary" size="md" className={styles.browseButton}>
            Browse Files
          </Button>
        </div>
      )}

      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
        </div>
      )}
    </div>
  );
};
```

```css
/* src/components/molecules/FileUpload/FileUpload.module.css */
.container {
  position: relative;
  min-height: 300px;
  border: 2px dashed #3A3A52;
  border-radius: 1rem;
  background: #252541;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
}

.container:hover:not(.disabled) {
  border-color: #A855F7;
  background: rgba(168, 85, 247, 0.03);
}

.dragActive {
  border-color: #A855F7;
  border-style: solid;
  background: rgba(168, 85, 247, 0.05);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hiddenInput {
  display: none;
}

.uploadPrompt {
  text-align: center;
}

.uploadIcon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  color: #A855F7;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
}

.description {
  font-size: 1rem;
  color: #B4B4C8;
  margin-bottom: 0.25rem;
}

.specs {
  font-size: 0.875rem;
  color: #8B8B9E;
  margin-bottom: 1.5rem;
}

.browseButton {
  pointer-events: none; /* Click goes to container */
}

.previewContainer {
  position: relative;
  width: 100%;
  max-width: 500px;
  border-radius: 0.75rem;
  overflow: hidden;
}

.previewImage {
  width: 100%;
  height: auto;
  display: block;
}

.removeButton {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 150ms;
}

.removeButton:hover {
  background: #EF4444;
}

.loadingOverlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 15, 30, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(168, 85, 247, 0.2);
  border-top-color: #A855F7;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

---

### 5.3 Custom Hook: useImageGeneration

```typescript
// src/hooks/useImageGeneration.ts
import { useState, useCallback } from 'react';
import { generateImage } from '@/services/imageGeneration';

export interface GenerationResult {
  imageUrl: string;
  specifications?: {
    garmentType?: string;
    designDescription?: string[];
    materials?: string[];
    constructionDetails?: string[];
  };
  timestamp: number;
  processingTime?: number;
}

export interface UseImageGenerationReturn {
  generate: (input: File | string) => Promise<void>;
  result: GenerationResult | null;
  loading: boolean;
  error: string | null;
  progress: number;
  reset: () => void;
}

export const useImageGeneration = (): UseImageGenerationReturn => {
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const generate = useCallback(async (input: File | string) => {
    setLoading(true);
    setError(null);
    setProgress(0);

    const startTime = Date.now();

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      // Call API
      const response = await generateImage(input);

      clearInterval(progressInterval);
      setProgress(100);

      const processingTime = Date.now() - startTime;

      setResult({
        imageUrl: response.imageUrl,
        specifications: response.specifications,
        timestamp: Date.now(),
        processingTime,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to generate image. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setProgress(0);
  }, []);

  return {
    generate,
    result,
    loading,
    error,
    progress,
    reset,
  };
};
```

---

## 6. Fashion-Specific Patterns

### 6.1 Before/After Showcase Pattern

**Purpose:** Effectively demonstrate AI transformation quality
**Best Practice:** Show real fashion sketches with clear visual contrast

**Implementation:**
- Side-by-side comparison on desktop
- Swipeable cards on mobile
- Labels: "Your Rough Sketch" vs. "Professional Flat Sketch"
- Subtle animation on scroll/hover

### 6.2 Technical Specification Format

**Fashion Industry Standard Terminology:**
- Garment categories: Top, Bottom, Dress, Outerwear, etc.
- Construction terms: French seam, top stitch, bias binding
- Material specifications: Fabric type, weight (GSM), composition
- Measurements: Chest width, sleeve length, hem circumference

**Display Format:**
```
GARMENT: Oversized Crewneck Sweatshirt

DESIGN FEATURES:
• Dropped shoulder with oversized fit
• Ribbed crew neckline
• Ribbed cuffs and hem
• Minimal seam construction

BILL OF MATERIALS:
• Main fabric: 100% Cotton French Terry, 280 GSM
• Rib: 95% Cotton, 5% Spandex, 2x2 rib knit
• Thread: Poly-core cotton blend

CONSTRUCTION:
• Shoulder seam: Overlocked + top stitch
• Side seams: French seam
• Neck binding: Tubular knit rib
• Hem: Double-needle stitch

CARE:
• Machine wash cold
• Tumble dry low
```

### 6.3 Progressive Disclosure for Technical Details

**Why:** Fashion designers need varying levels of detail based on workflow stage

**Pattern:**
1. **Quick View:** Show generated flat sketch only
2. **Detail View:** Expand to show basic specs
3. **Export View:** Full technical pack with measurements, construction notes

**Implementation:**
- Accordion sections for specifications
- "Show More" / "Show Less" toggles
- Downloadable PDF with complete tech pack

### 6.4 Generation Quality Feedback Loop

**Purpose:** Improve AI outputs over time

**Pattern:**
- Thumbs up/down on results
- Optional detailed feedback form
- "Regenerate with adjustments" option
- Save good examples for training

---

## 7. Accessibility Considerations

### 7.1 Keyboard Navigation

- All interactive elements focusable with Tab
- Enter/Space to activate buttons
- Escape to close modals
- Arrow keys for image comparisons

### 7.2 Screen Reader Support

- Semantic HTML (`<button>`, `<nav>`, `<main>`)
- ARIA labels for icon-only buttons
- Alt text for all images
- Status announcements for generation progress

### 7.3 Color Contrast

- Text meets WCAG AA standards (4.5:1 for body, 3:1 for headings)
- Don't rely solely on color for information
- Focus indicators visible on all interactive elements

### 7.4 Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Performance Optimization

### 8.1 Image Optimization

- Lazy load images below the fold
- Responsive images with `srcset`
- WebP format with fallbacks
- Progressive JPEG for previews

### 8.2 Code Splitting

```typescript
// Lazy load heavy components
const ImageComparison = lazy(() => import('@/components/organisms/ImageComparison'));
const TechnicalSpecDisplay = lazy(() => import('@/components/organisms/TechnicalSpecDisplay'));
```

### 8.3 Caching Strategy

- Cache generated images locally (IndexedDB)
- Reuse specifications for same inputs
- Service Worker for offline support (future)

---

## 9. Testing Strategy

### 9.1 Component Tests

```typescript
// Example: Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when loading', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 9.2 Integration Tests

- File upload flow
- Image generation workflow
- Error handling scenarios

### 9.3 Visual Regression Tests

- Use Chromatic or Percy
- Capture component states
- Compare against Figma designs

---

## 10. Next Steps for Implementation

### Phase 1: Setup & Foundation
- [ ] Initialize React project (Create React App or Vite)
- [ ] Set up Tailwind CSS with custom config
- [ ] Create folder structure
- [ ] Implement design tokens
- [ ] Set up TypeScript types

### Phase 2: Atomic Components
- [ ] Button component with all variants
- [ ] Input components
- [ ] Icon library setup
- [ ] Spinner/loading components
- [ ] Card component

### Phase 3: Molecules & Organisms
- [ ] FileUpload component
- [ ] PromptInput component
- [ ] ImageComparison component
- [ ] TechnicalSpecDisplay component
- [ ] Progress indicators

### Phase 4: Pages & Templates
- [ ] Landing page layout
- [ ] Generation workspace
- [ ] Results view
- [ ] Error states

### Phase 5: Functionality
- [ ] API integration
- [ ] File handling logic
- [ ] State management (Context API or Zustand)
- [ ] Error handling
- [ ] Loading states

### Phase 6: Polish
- [ ] Animations and transitions
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile responsiveness

---

## 11. Additional Resources

### Design System Tools
- **Storybook:** Component documentation and visual testing
- **Figma Tokens Plugin:** Sync design tokens from Figma
- **Chromatic:** Visual regression testing

### Recommended Libraries
- **classnames:** Conditional CSS classes
- **framer-motion:** Advanced animations
- **react-dropzone:** File upload handling
- **react-hot-toast:** Toast notifications
- **react-compare-image:** Image comparison slider

### Documentation
- Create a Storybook instance for component library
- Document props, variants, and usage examples
- Include design guidelines for designers

---

## Appendix A: Design Token Export (JSON)

```json
{
  "colors": {
    "primary": {
      "main": "#A855F7",
      "hover": "#9333EA",
      "active": "#7E22CE",
      "light": "#C084FC"
    },
    "background": {
      "primary": "#0F0F1E",
      "secondary": "#1A1A2E",
      "tertiary": "#252541",
      "elevated": "#2D2D4A"
    },
    "text": {
      "primary": "#FFFFFF",
      "secondary": "#B4B4C8",
      "tertiary": "#8B8B9E",
      "disabled": "#5A5A6E"
    }
  },
  "spacing": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px"
  },
  "typography": {
    "fontSize": {
      "xs": "12px",
      "sm": "14px",
      "base": "16px",
      "lg": "18px",
      "xl": "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px"
    }
  }
}
```

---

## Document Control

**Version History:**
- v1.0 (2025-11-15): Initial design system documentation

**Contributors:**
- Product Manager: Wonji Seo
- Design System Architect: [To be filled]

**Review Schedule:**
- Review design tokens after Figma access
- Update component specs after development kickoff
- Iterate based on user testing feedback

---

**Note:** This design system document was created based on the PRD specifications and best practices for AI SaaS tools in the fashion industry. Once you have access to the Figma file, please update the following sections with exact values:
- Color hex codes
- Typography font families and exact sizes
- Spacing values
- Component dimensions
- Shadow specifications
- Any custom animations or interactions from Figma

Would you like me to create a companion file with the actual Tailwind config or CSS variables based on these tokens?
