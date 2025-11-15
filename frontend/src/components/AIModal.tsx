import React, { useState, useRef } from 'react';
import { FashionFlatAPI } from '../services/api';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  images?: string[];
  constructionDetails?: string;
}

const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I help you?' }
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const quickPrompts = [
    'Generate construction details based on the design',
    'Design a casual hoodie with kangaroo pocket',
    'Create a midi skirt with pleats',
    'Generate a bomber jacket with ribbed cuffs'
  ];

  const handleQuickPrompt = (promptText: string) => {
    setPrompt(promptText);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !uploadedImage) return;

    // Clear any previous errors
    setError(null);

    // Add user message
    const userMessage: Message = { role: 'user', content: prompt || 'Generate from uploaded image' };
    setMessages(prev => [...prev, userMessage]);
    const currentPrompt = prompt;
    setPrompt('');
    setIsGenerating(true);

    try {
      // Call the API
      const response = await FashionFlatAPI.generateFlatSketch({
        prompt: currentPrompt,
        imageUrl: uploadedImage || undefined
      });

      // Add AI response with generated images
      const aiMessage: Message = {
        role: 'assistant',
        content: 'Sure! Check this out.',
        images: response.images,
        constructionDetails: response.constructionDetails
      };
      setMessages(prev => [...prev, aiMessage]);
      setCurrentImageIndex(0);
      setUploadedImage(null); // Clear uploaded image after generation

    } catch (error: any) {
      console.error('Generation error:', error);
      setError(error.message || 'Failed to generate flat sketch. Please try again.');

      // Add error message to chat
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`
      };
      setMessages(prev => [...prev, errorMessage]);

    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB max)
    const maxSize = parseInt(process.env.REACT_APP_MAX_FILE_SIZE || '10485760');
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    try {
      const imageUrl = await FashionFlatAPI.uploadImage(file);
      setUploadedImage(imageUrl);
      setError(null);
    } catch (error: any) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
    }
  };

  if (!isOpen) return null;

  const lastMessage = messages[messages.length - 1];
  const hasResults = lastMessage?.role === 'assistant' && lastMessage?.images;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900/95 to-purple-950/95 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-purple-500/30">
        {/* Header */}
        <div className="border-b border-purple-500/30 px-8 py-6 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-heading text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              FashionFlat AI
            </h2>
            <p className="text-text-secondary text-sm">AI-Powered Flat Sketch Generator</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Messages */}
          <div className="space-y-4 mb-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-main/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-main" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                      </svg>
                    </div>
                    <div className="bg-background-secondary/50 rounded-2xl px-4 py-3 max-w-md">
                      <p className="text-text-primary">{message.content}</p>
                    </div>
                  </div>
                )}
                {message.role === 'user' && (
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl px-4 py-3 max-w-md">
                    <p className="text-white">{message.content}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Loading State */}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-background-secondary/50 rounded-2xl px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-primary-main rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary-main rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary-main rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Display */}
          {hasResults && lastMessage.images && (
            <div className="mb-6">
              <div className="bg-background-secondary/30 rounded-xl p-6 max-w-md">
                <div className="relative">
                  <img
                    src={lastMessage.images[currentImageIndex]}
                    alt={`Generated design ${currentImageIndex + 1}`}
                    className="w-full rounded-lg"
                  />

                  {/* Navigation Arrows */}
                  {lastMessage.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentImageIndex === 0}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background-primary/80 rounded-full flex items-center justify-center hover:bg-background-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex(prev => Math.min(lastMessage.images!.length - 1, prev + 1))}
                        disabled={currentImageIndex === lastMessage.images.length - 1}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background-primary/80 rounded-full flex items-center justify-center hover:bg-background-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Image Counter & Import Button */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-text-secondary text-sm">
                    {currentImageIndex + 1}/{lastMessage.images.length}
                  </span>
                  <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Import as Layer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Prompts */}
          {messages.length === 1 && (
            <div className="mb-6">
              <p className="text-text-secondary text-sm mb-3">Quick prompts:</p>
              <div className="grid grid-cols-2 gap-3">
                {quickPrompts.map((quickPrompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(quickPrompt)}
                    className="bg-background-secondary/50 hover:bg-background-secondary text-text-primary text-sm px-4 py-3 rounded-lg text-left transition-all border border-transparent hover:border-primary-main/30"
                  >
                    {quickPrompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-purple-500/30 px-8 py-6 bg-background-primary/30">
          {/* Error Message */}
          {error && (
            <div className="mb-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Uploaded Image Preview */}
          {uploadedImage && (
            <div className="mb-3 flex items-center gap-3 bg-background-secondary/50 rounded-lg p-3">
              <img src={uploadedImage} alt="Upload preview" className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="text-text-primary text-sm">Image uploaded</p>
                <p className="text-text-tertiary text-xs">Ready to generate</p>
              </div>
              <button
                onClick={() => setUploadedImage(null)}
                className="text-text-tertiary hover:text-red-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isGenerating && handleGenerate()}
                placeholder="Describe the flat sketch you want to create..."
                disabled={isGenerating}
                className="w-full bg-background-secondary/50 text-text-primary placeholder-text-tertiary px-4 py-3 pr-12 rounded-lg border border-text-disabled/20 focus:border-primary-main/50 focus:outline-none transition-all disabled:opacity-50"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={handleImageUpload}
                disabled={isGenerating}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-primary-main transition-colors disabled:opacity-50"
                title="Upload image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <button
              onClick={handleGenerate}
              disabled={(!prompt.trim() && !uploadedImage) || isGenerating}
              className="bg-gradient-to-r from-primary-main to-purple-600 hover:from-primary-hover hover:to-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-glow"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
          </div>
          <p className="text-text-tertiary text-xs mt-2 text-center">
            Describe your garment design and our AI will generate a flat sketch for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIModal;
