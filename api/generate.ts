import type { VercelRequest, VercelResponse } from '@vercel/node';

// API endpoint for generating flat sketches
// This serverless function uses Claude for prompt enhancement and Hugging Face for image generation

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, imageUrl } = req.body;

    // Validate input
    if (!prompt && !imageUrl) {
      return res.status(400).json({ error: 'Either prompt or imageUrl is required' });
    }

    // Step 1: Use Claude to enhance the prompt
    const enhancedPrompt = await enhancePromptWithClaude(prompt, imageUrl);

    // Step 2: Generate flat sketch using Hugging Face
    const generatedImages = await generateFlatSketchWithHuggingFace(enhancedPrompt);

    // Step 3: Generate construction details using Claude
    const constructionDetails = await generateConstructionDetails(enhancedPrompt);

    return res.status(200).json({
      success: true,
      images: generatedImages,
      constructionDetails,
      enhancedPrompt
    });

  } catch (error: any) {
    console.error('Error in generate endpoint:', error);
    return res.status(500).json({
      error: 'Failed to generate flat sketch',
      message: error.message
    });
  }
}

// Enhance user prompt using Claude 3.5 Sonnet
async function enhancePromptWithClaude(userPrompt: string, imageUrl?: string): Promise<string> {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
  });

  const systemPrompt = `You are a fashion design expert specializing in technical flat sketches.
Your job is to convert rough garment descriptions or sketches into detailed, technical prompts for generating professional flat sketches.

A flat sketch is a technical drawing showing:
- Front and/or back view of the garment
- Clean, professional line art (black and white or minimal color)
- All construction details (seams, pockets, closures, etc.)
- Proper proportions and fit
- No model, no background, just the garment

Given a user's description, create a detailed prompt that will generate an accurate flat sketch. Include:
- Garment type and silhouette
- Key construction details (collars, cuffs, closures, pockets, etc.)
- Specific design elements (pleats, gathers, panels, etc.)
- Fit and proportions
- Any unique features

Keep the prompt concise but technical. Output only the enhanced prompt, nothing else.`;

  const content: any[] = [
    {
      type: 'text',
      text: userPrompt || 'Analyze this garment sketch and describe it in detail for technical flat sketch generation.'
    }
  ];

  // If image URL provided, include it in the request
  if (imageUrl) {
    content.push({
      type: 'image',
      source: {
        type: 'url',
        url: imageUrl
      }
    });
  }

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content
      }
    ],
    system: systemPrompt
  });

  const enhancedPrompt = message.content[0].type === 'text'
    ? message.content[0].text
    : userPrompt;

  return enhancedPrompt;
}

// Generate flat sketch images using Hugging Face Inference API
async function generateFlatSketchWithHuggingFace(prompt: string): Promise<string[]> {
  const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

  if (!HUGGINGFACE_API_KEY) {
    throw new Error('HUGGINGFACE_API_KEY not configured');
  }

  const { HfInference } = await import('@huggingface/inference');
  const hf = new HfInference(HUGGINGFACE_API_KEY);

  // Technical flat sketch prompt enhancement
  const technicalPrompt = `professional technical flat sketch, ${prompt}, black and white line art, clean lines, no background, no model, fashion design illustration, CAD drawing style, technical drawing, front view`;

  const negativePrompt = 'blurry, low quality, photograph, realistic, 3d render, model, background, messy lines, sketchy, rough, colorful, painting';

  try {
    // Using Stable Diffusion XL for high-quality fashion sketches
    // Generate 3 variations
    const numImages = 3;
    const images: string[] = [];

    for (let i = 0; i < numImages; i++) {
      const blob = await hf.textToImage({
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        inputs: technicalPrompt,
        parameters: {
          negative_prompt: negativePrompt,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          width: 768,
          height: 1024,
        }
      });

      // Convert blob to base64
      const buffer = Buffer.from(await blob.arrayBuffer());
      const base64Image = `data:image/png;base64,${buffer.toString('base64')}`;
      images.push(base64Image);
    }

    return images;

  } catch (error: any) {
    console.error('Hugging Face generation error:', error);
    throw new Error(`Failed to generate images with Hugging Face: ${error.message}`);
  }
}

// Generate construction details using Claude
async function generateConstructionDetails(prompt: string): Promise<string> {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
  });

  const systemPrompt = `You are a fashion technical designer. Generate detailed construction specifications for the garment described.

Include:
- Fabric recommendations
- Key measurements (if applicable)
- Construction techniques
- Special finishes or details
- Care instructions

Format as a bulleted list. Be concise and technical.`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 800,
    messages: [
      {
        role: 'user',
        content: `Generate construction details for this garment: ${prompt}`
      }
    ],
    system: systemPrompt
  });

  const details = message.content[0].type === 'text'
    ? message.content[0].text
    : 'Construction details unavailable.';

  return details;
}
