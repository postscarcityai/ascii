import { useEffect, useRef, useState, useCallback } from 'react';

interface AudioData {
  volume: number; // 0-1 normalized volume
  frequencyData: number[]; // Frequency bins for visualization
  peakVolume: number; // Peak volume that decays slowly
}

export const useAudio = (enabled: boolean) => {
  const [audioData, setAudioData] = useState<AudioData>({ volume: 0, frequencyData: [], peakVolume: 0 });
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const frequencyArrayRef = useRef<Uint8Array | null>(null);
  const peakVolumeRef = useRef<number>(0); // Track peak volume for speed persistence

  const requestMicrophoneAccess = useCallback(async () => {
    try {
      setError(null);
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      // Create analyser node
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256; // Smaller FFT for performance
      analyser.smoothingTimeConstant = 0.8; // Smooth transitions
      analyserRef.current = analyser;
      
      // Connect microphone to analyser
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      // Create data arrays
      const bufferLength = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(analyser.fftSize);
      frequencyArrayRef.current = new Uint8Array(bufferLength);
      
      setIsAccessGranted(true);
      
    } catch (err: any) {
      setError(err.message || 'Failed to access microphone');
      setIsAccessGranted(false);
      console.error('Microphone access error:', err);
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    analyserRef.current = null;
    setIsAccessGranted(false);
    setAudioData({ volume: 0, frequencyData: [], peakVolume: 0 });
    peakVolumeRef.current = 0;
  }, []);

  // Start/stop audio analysis loop
  useEffect(() => {
    if (!enabled || !isAccessGranted || !analyserRef.current || !dataArrayRef.current || !frequencyArrayRef.current) {
      return;
    }
    
    const analyzeAudio = () => {
      if (!analyserRef.current || !dataArrayRef.current || !frequencyArrayRef.current) {
        return;
      }
      
      // Get time domain data for volume
      analyserRef.current.getByteTimeDomainData(dataArrayRef.current as any);
      
      // Calculate volume (RMS)
      let sum = 0;
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const normalized = (dataArrayRef.current[i] - 128) / 128;
        sum += normalized * normalized;
      }
      const rms = Math.sqrt(sum / dataArrayRef.current.length);
      const volume = Math.min(1, rms * 3); // Amplify and clamp
      
      // Track peak volume - increases immediately, decays very slowly
      // If current volume is higher than peak, update immediately
      if (volume > peakVolumeRef.current) {
        peakVolumeRef.current = volume;
      } else {
        // Decay very slowly when volume drops (slower decay to prevent jerkiness)
        peakVolumeRef.current = peakVolumeRef.current * 0.998; // Slower decay factor
      }
      
      // Get frequency data
      analyserRef.current.getByteFrequencyData(frequencyArrayRef.current as any);
      
      // Normalize frequency data to 0-1
      const frequencyData = Array.from(frequencyArrayRef.current).map(
        val => val / 255
      );
      
      setAudioData({ volume, frequencyData, peakVolume: peakVolumeRef.current });
      
      if (enabled && isAccessGranted) {
        animationFrameRef.current = requestAnimationFrame(analyzeAudio);
      }
    };
    
    analyzeAudio();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [enabled, isAccessGranted]);

  // Request microphone access when enabled
  useEffect(() => {
    if (enabled && !isAccessGranted && !error) {
      requestMicrophoneAccess();
    } else if (!enabled && isAccessGranted) {
      stopAudio();
    }
    
    return () => {
      if (!enabled) {
        stopAudio();
      }
    };
  }, [enabled, isAccessGranted, error, requestMicrophoneAccess, stopAudio]);

  return {
    audioData,
    isAccessGranted,
    error,
    requestMicrophoneAccess,
    stopAudio,
  };
};

