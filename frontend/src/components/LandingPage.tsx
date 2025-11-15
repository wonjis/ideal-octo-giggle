import React from 'react';

interface LandingPageProps {
  onScanClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onScanClick }) => {
  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6">
        <div className="w-12 h-12 bg-primary-main rounded-xl flex items-center justify-center">
          <span className="text-white text-2xl font-bold font-heading">F</span>
        </div>
        <button className="bg-primary-main hover:bg-primary-hover text-white px-6 py-2 rounded-lg transition-all">
          Log in
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          {/* Title */}
          <h1 className="text-7xl font-heading font-light text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            FashionFlat AI
          </h1>

          {/* Tagline */}
          <p className="text-xl text-text-secondary italic mb-12">
            Turn your rough sketch into a flat sketch in seconds.
          </p>

          {/* Before/After Preview */}
          <div className="mb-12 flex justify-center items-center gap-4">
            <div className="relative">
              {/* Before Image Placeholder */}
              <div className="w-48 h-64 bg-background-secondary rounded-lg flex items-center justify-center border border-text-disabled/20">
                <div className="text-center">
                  <div className="text-text-tertiary mb-2">Before</div>
                  <div className="text-6xl text-text-disabled">📝</div>
                  <div className="text-xs text-text-tertiary mt-2">Rough Sketch</div>
                </div>
              </div>
            </div>

            {/* Arrow Icon */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-main/20">
              <svg className="w-8 h-8 text-primary-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div className="relative">
              {/* After Image Placeholder */}
              <div className="w-48 h-64 bg-background-secondary rounded-lg flex items-center justify-center border border-primary-main/30">
                <div className="text-center">
                  <div className="text-text-tertiary mb-2">After</div>
                  <div className="text-6xl">👔</div>
                  <div className="text-xs text-text-tertiary mt-2">Flat Sketch</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onScanClick}
            className="bg-gradient-to-r from-primary-main to-pink-500 hover:from-primary-hover hover:to-pink-600 text-white text-lg px-12 py-4 rounded-xl shadow-glow transition-all transform hover:scale-105"
          >
            Scan Rough Sketch
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
