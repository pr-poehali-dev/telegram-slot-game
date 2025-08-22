import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const SLOT_SYMBOLS = ['🌟', '🪐', '🚀', '💎', '👾', '🌙'];

const Index = () => {
  const [balance, setBalance] = useState(1000);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState(['🌟', '🪐', '🚀']);
  const [bet, setBet] = useState(10);
  const [activeTab, setActiveTab] = useState('slots');

  const spin = () => {
    if (balance < bet || isSpinning) return;
    
    setIsSpinning(true);
    setBalance(prev => prev - bet);
    
    setTimeout(() => {
      const newReels = [
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)]
      ];
      
      setReels(newReels);
      
      if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
        const winAmount = bet * 10;
        setBalance(prev => prev + winAmount);
      } else if (newReels[0] === newReels[1] || newReels[1] === newReels[2] || newReels[0] === newReels[2]) {
        const winAmount = bet * 2;
        setBalance(prev => prev + winAmount);
      }
      
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cosmic-space to-cosmic-dark font-rubik text-white relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-cosmic-gold to-yellow-400 flex items-center justify-center">
          <span className="text-2xl">🎰</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cosmic-gold to-yellow-300 bg-clip-text text-transparent mb-2">
          STARSLOT
        </h1>
        <p className="text-gray-400 text-sm mb-6">⭐ Космические игры на звёзды ⭐</p>
        
        <div className="flex justify-between items-center max-w-sm mx-auto">
          <div className="text-center">
            <div className="text-cosmic-gold font-bold text-2xl">{balance}</div>
            <div className="text-gray-400 text-xs">Звёзды</div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-xl">{bet}</div>
            <div className="text-gray-400 text-xs">Ставка</div>
          </div>
        </div>
      </div>

      {/* Slot Machine */}
      <div className="relative z-10 px-6 mb-8">
        <Card className="bg-gradient-to-br from-cosmic-blue/80 to-cosmic-space/80 border-cosmic-gold/30 backdrop-blur-sm p-6">
          {/* Reels */}
          <div className="flex justify-center gap-4 mb-6">
            {reels.map((symbol, index) => (
              <div
                key={index}
                className={`w-20 h-20 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border-2 border-cosmic-gold/50 flex items-center justify-center text-4xl ${
                  isSpinning ? 'animate-spin-slot' : ''
                }`}
              >
                {isSpinning ? '❓' : symbol}
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-4">
            <Button
              onClick={() => setBet(Math.max(5, bet - 5))}
              variant="outline"
              size="sm"
              className="border-cosmic-gold/50 text-cosmic-gold hover:bg-cosmic-gold/20"
              disabled={isSpinning}
            >
              -5
            </Button>
            <Button
              onClick={() => setBet(bet + 5)}
              variant="outline"
              size="sm"
              className="border-cosmic-gold/50 text-cosmic-gold hover:bg-cosmic-gold/20"
              disabled={isSpinning}
            >
              +5
            </Button>
          </div>

          <Button
            onClick={spin}
            disabled={balance < bet || isSpinning}
            className="w-full bg-gradient-to-r from-cosmic-gold to-yellow-500 hover:from-yellow-400 hover:to-cosmic-gold text-black font-bold py-3 rounded-xl text-lg disabled:opacity-50"
          >
            {isSpinning ? 'КРУТИМ...' : 'КРУТИТЬ'}
          </Button>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-cosmic-space/90 backdrop-blur-sm border-t border-cosmic-gold/30">
        <div className="flex justify-around py-3">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'home' ? 'text-cosmic-gold' : 'text-gray-400'
            }`}
          >
            <Icon name="Home" size={20} />
            <span className="text-xs mt-1">Главная</span>
          </button>
          <button
            onClick={() => setActiveTab('slots')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'slots' ? 'text-cosmic-gold' : 'text-gray-400'
            }`}
          >
            <span className="text-lg">🎰</span>
            <span className="text-xs mt-1">Слоты</span>
          </button>
          <button
            onClick={() => setActiveTab('roulette')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'roulette' ? 'text-cosmic-gold' : 'text-gray-400'
            }`}
          >
            <Icon name="RotateCcw" size={20} />
            <span className="text-xs mt-1">Рулетка</span>
          </button>
          <button
            onClick={() => setActiveTab('kmn')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'kmn' ? 'text-cosmic-gold' : 'text-gray-400'
            }`}
          >
            <Icon name="Gamepad2" size={20} />
            <span className="text-xs mt-1">КМН</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;