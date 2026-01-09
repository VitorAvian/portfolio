import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
  playHover: () => void;
  playClick: () => void;
  toggleMute: () => void;
  isMuted: boolean;
  hasInteracted: boolean;
  initializeAudio: () => void;
}

const AudioContext = createContext<AudioContextType>({
  playHover: () => {},
  playClick: () => {},
  toggleMute: () => {},
  isMuted: false,
  hasInteracted: false,
  initializeAudio: () => {},
});

export const useAudio = () => useContext(AudioContext);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  const initializeAudio = () => {
    if (hasInteracted) return;
    setHasInteracted(true);

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Create Drone (Low atmospheric sound)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Low rumble
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A
    
    // Modulation for texture
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // Very slow
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 20;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2); // Fade in very subtle

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    droneOscRef.current = osc;
    droneGainRef.current = gain;
  };

  const playHover = () => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Static click sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  const playClick = () => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    // Deeper impact sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (droneGainRef.current && audioCtxRef.current) {
      const targetGain = !isMuted ? 0 : 0.03;
      droneGainRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.5);
    }
  };

  return (
    <AudioContext.Provider value={{ playHover, playClick, toggleMute, isMuted, hasInteracted, initializeAudio }}>
      {children}
    </AudioContext.Provider>
  );
};