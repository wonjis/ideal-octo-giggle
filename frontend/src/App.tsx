import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AIModal from './components/AIModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <LandingPage onScanClick={() => setIsModalOpen(true)} />
      <AIModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default App;
