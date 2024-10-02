"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const CurvedLine: React.FC = () => {
  const lineRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (lineRef.current && circleRef.current) {
      const totalLength = lineRef.current.getTotalLength(); // Get the total length of the path

      // Initially hide the line
      gsap.set(lineRef.current, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });

      // Create a GSAP timeline to synchronize the animations
      const tl = gsap.timeline();

      // Animate the stroke of the curved path
      tl.to(lineRef.current, {
        strokeDashoffset: 0, // Reveal the line by reducing strokeDashoffset to 0
        duration: 2,
        ease: 'power2.out',
      });

      // Animate the circle along the path, synchronized with the line drawing
      tl.to(circleRef.current, {
        duration: 2,
        ease: 'power2.out',
        motionPath: {
          path: lineRef.current,
          align: lineRef.current,
          alignOrigin: [0.5, 0.5], // Center the circle on the path
        },
      }, 0); // Start both animations at the same time
    }
  }, []);

  return (
    <svg width="400" height="200" viewBox="0 0 400 200">
      {/* Curved path */}
      <path
        ref={lineRef}
        d="M -105 170 C 150 250, 350 100, 370 0," // Curved line path (cubic Bézier)
        stroke="black"
        fill="transparent"
        strokeWidth="2"
      />
      
      {/* Circle that moves along the path */}
      <circle
        ref={circleRef}
        r="5" // Radius of the circle
        fill="red" // Circle color
        cx="50" // Initial x position (same as path starting point)
        cy="210" // Initial y position (same as path starting point)
      />
    </svg>
  );
};

export default CurvedLine;

