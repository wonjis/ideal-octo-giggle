// API service for FashionFlat AI

const API_URL = process.env.REACT_APP_API_URL || '/api';

export interface GenerateRequest {
  prompt: string;
  imageUrl?: string;
}

export interface GenerateResponse {
  success: boolean;
  images: string[];
  constructionDetails: string;
  enhancedPrompt: string;
}

export interface APIError {
  error: string;
  message?: string;
}

export class FashionFlatAPI {
  static async generateFlatSketch(data: GenerateRequest): Promise<GenerateResponse> {
    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: APIError = await response.json();
        throw new Error(errorData.message || errorData.error || 'Failed to generate flat sketch');
      }

      const result: GenerateResponse = await response.json();
      return result;

    } catch (error: any) {
      console.error('API Error:', error);
      throw new Error(error.message || 'Network error occurred');
    }
  }

  static async uploadImage(file: File): Promise<string> {
    // TODO: Implement image upload to Supabase Storage or convert to base64
    // For MVP, we'll convert to base64 data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
