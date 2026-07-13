import { useEffect, useRef, useState } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

interface GestureControllerProps {
  onReady?: () => void;
  sensitivity?: number;
}

export function GestureController({ onReady, sensitivity = 3 }: GestureControllerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let handLandmarker: HandLandmarker | null = null;
    let animationFrameId: number;
    let lastVideoTime = -1;
    let isPinching = false;
    let isClickPinching = false;
    let pinchStartY = 0;

    const initializeGestureControl = async () => {
      try {
        // Request Webcam
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        // Load MediaPipe
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });

        setIsInitializing(false);
        if (onReady) onReady();
        
        // Start detection loop
        predictWebcam();
        
      } catch (err: any) {
        console.error("Gesture Initialization Error:", err);
        setError("Failed to initialize webcam or gesture model.");
      }
    };

    const predictWebcam = () => {
      const video = videoRef.current;
      if (!video || !handLandmarker) return;

      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        
        const results = handLandmarker.detectForVideo(video, performance.now());
        
        if (results.landmarks && results.landmarks.length > 0) {
          const landmarks = results.landmarks[0];
          
          // Finger tips
          const thumb = landmarks[4];
          const index = landmarks[8];
          const middle = landmarks[12];
          
          // Distance for dragging (Thumb + Index)
          const dxDrag = thumb.x - index.x;
          const dyDrag = thumb.y - index.y;
          const dzDrag = thumb.z - index.z;
          const distDrag = Math.sqrt(dxDrag*dxDrag + dyDrag*dyDrag + dzDrag*dzDrag);

          // Distance for clicking (Thumb + Middle)
          const dxClick = thumb.x - middle.x;
          const dyClick = thumb.y - middle.y;
          const dzClick = thumb.z - middle.z;
          const distClick = Math.sqrt(dxClick*dxClick + dyClick*dyClick + dzClick*dzClick);
          
          // Cursor position follows Index finger tip
          const cursorX = index.x;
          const cursorY = index.y;
          
          const wasPinching = isPinching;
          isPinching = distDrag < 0.05; // Drag threshold

          const wasClickPinching = isClickPinching;
          isClickPinching = distClick < 0.05; // Click threshold
          
          // --- CLICK LOGIC ---
          if (isClickPinching && !wasClickPinching) {
            // Convert normalized coordinates to screen space
            const screenX = (1 - cursorX) * window.innerWidth;
            const screenY = cursorY * window.innerHeight;
            
            // Find the HTML element at these coordinates
            const element = document.elementFromPoint(screenX, screenY);
            if (element && element instanceof HTMLElement) {
              // Flash the indicator
              window.dispatchEvent(new CustomEvent('gesture-click-feedback'));
              element.click();
            }
          }

          // --- DRAG LOGIC ---
          if (isPinching) {
            if (!wasPinching) {
              // Just started dragging
              pinchStartY = cursorY;
            } else {
              // Joystick Auto-Scroll Logic
              const offsetY = cursorY - pinchStartY;
              const deadzone = 0.04; // 4% screen height deadzone
              
              if (Math.abs(offsetY) > deadzone) {
                const sign = Math.sign(offsetY);
                
                // Fixed scroll speed for smoother, predictable motion
                const fixedSpeed = 12; // Base speed in pixels per frame
                // Normalize sensitivity around the default value of 3
                const velocity = sign * fixedSpeed * (sensitivity / 3);
                
                window.dispatchEvent(new CustomEvent('gesture-scroll', {
                  detail: { delta: velocity }
                }));
              }
            }
          }
          
          // Dispatch state for indicator
          window.dispatchEvent(new CustomEvent('gesture-state', {
            detail: {
              active: true,
              pinched: isPinching,
              x: cursorX,
              y: cursorY,
              // Pass the origin offset for visual feedback if we want
              offsetY: isPinching ? cursorY - pinchStartY : 0
            }
          }));
          
        } else {
          // No hand detected
          if (isPinching) {
            isPinching = false;
          }
          if (isClickPinching) {
            isClickPinching = false;
          }
          window.dispatchEvent(new CustomEvent('gesture-state', {
            detail: { active: false, pinched: false, x: 0.5, y: 0.5 }
          }));
        }
      }

      animationFrameId = requestAnimationFrame(predictWebcam);
    };

    initializeGestureControl();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (handLandmarker) {
        handLandmarker.close();
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onReady, sensitivity]);

  if (error) {
    return (
      <div className="fixed top-4 right-4 bg-red-500/80 text-white px-4 py-2 rounded-lg text-sm z-50 backdrop-blur-sm">
        {error}
      </div>
    );
  }

  return (
    <>
      {/* Picture-in-Picture Webcam Feed & Instructions */}
      <div className="fixed bottom-6 right-6 z-[90] w-56 rounded-xl overflow-hidden border border-white/20 shadow-[0_10px_40px_rgba(34,211,238,0.15)] bg-black/80 pointer-events-none flex flex-col">
        <div className="relative h-40">
          <video 
            ref={videoRef} 
            className="w-full h-full object-cover opacity-80"
            style={{ transform: 'scaleX(-1)' }} // Mirror the video so it feels natural
            playsInline 
          />
          {/* Status Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent flex justify-center">
             <span className="text-cyan-400 text-[10px] font-mono tracking-widest uppercase animate-pulse">
               Sensors Active
             </span>
          </div>
        </div>
        
        {/* Instructions Panel */}
        <div className="bg-black/90 p-3 border-t border-white/10 flex flex-col gap-2">
           <div className="text-white text-xs font-mono font-bold border-b border-white/20 pb-1 mb-1">
             GESTURE CONTROLS
           </div>
           <div className="flex items-center gap-2 text-aluminum-dim text-[10px] font-inter">
             <span className="text-xl">🖱️</span> 
             <span><strong>CLICK:</strong> Pinch thumb & <strong>middle finger</strong>.</span>
           </div>
           <div className="flex items-center gap-2 text-aluminum-dim text-[10px] font-inter">
             <span className="text-xl">↕️</span> 
             <span><strong>DRAG:</strong> Pinch thumb & <strong>index finger</strong>, move up/down.</span>
           </div>
        </div>
      </div>

      {isInitializing && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md pointer-events-none">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-cyan-400 font-mono tracking-widest animate-pulse">INITIALIZING NEURAL LINK...</p>
          <p className="text-aluminum-dim text-sm mt-2 font-inter">Requesting camera access & loading gesture model</p>
        </div>
      )}
    </>
  );
}
