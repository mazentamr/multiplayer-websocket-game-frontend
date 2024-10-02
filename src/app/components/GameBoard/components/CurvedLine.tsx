"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGame } from '@/app/context/GameContext';
import useWebSocket from '@/hooks/useWebSocket';

gsap.registerPlugin(MotionPathPlugin);

const CurvedLine: React.FC = () => {
    const { multiplierData, speed, time, chart, players, playerName } = useGame();
    const lineRef = useRef<SVGPathElement>(null);
    const circleRef = useRef<SVGCircleElement>(null);
    const { sendMessage } = useWebSocket('ws://localhost:8080');
    
    const [counter, setCounter] = useState(0.00);

    // Function to increment the counter
    const startCounter = () => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => {
                const newCounter = (prevCounter + 0.10).toFixed(2);
                if (Number(newCounter) >= Number(multiplierData[multiplierData.length - 1])) {
                    clearInterval(interval); // Stop at the maximum multiplier
                }
                return parseFloat(newCounter);
            });
        }, 50); // Update every 50 ms

        return () => clearInterval(interval); // Cleanup on unmount
    };

    useEffect(() => {
        if (lineRef.current && circleRef.current && time !== 0) {
            const totalLength = lineRef.current.getTotalLength();
            startCounter(); // Start counting

            // Initially hide the line
            gsap.set(lineRef.current, {
                strokeDasharray: totalLength,
                strokeDashoffset: totalLength,
            });

            // Create a GSAP timeline to synchronize the animations
            const tl = gsap.timeline();
            tl.to(lineRef.current, {
                strokeDashoffset: 0,
                duration: 4 / speed,
                ease: 'power4.inOut',
            });

            tl.to(circleRef.current, {
                duration: 4 / speed,
                ease: 'power4.inOut',
                motionPath: {
                    path: lineRef.current,
                    align: lineRef.current,
                    alignOrigin: [0.5, 0.5],
                },
            }, 0); // Start both animations at the same time

            // Find player data and send a message
            const playerData = players.find((player) => player.name === playerName);
            sendMessage({
                type: "multipliers",
                multiplier: Number(multiplierData[multiplierData.length - 1].toFixed(2)),
                playerId: playerData?.id,
            });

            setCounter(0.00);
        }
    }, [chart]); // Re-run when chart changes

    return (
        <div className='relative ml-12'>
            <h1 className={`text-5xl absolute font-bold ${counter ? 'text-[#fb5f43]' : 'text-white'} text-shadow text-center top-[50px] right-[280px]`}>
                {counter.toFixed(2)} X 
            </h1>
            <svg width="628" height="500" viewBox="10 10 380 270">
                <defs>
                    <filter id="yellow-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="yellow" />
                    </filter>
                </defs>
                {chart && (
                    <path
                        ref={lineRef}
                        d="M -105 170 C 240 250, 350 100, 370 0"
                        stroke="#fb5f43"
                        fill="transparent"
                        strokeWidth="5"
                    />
                )}
                <circle
                    ref={circleRef}
                    r="7"
                    fill="yellow"
                    cx="16"
                    cy="190"
                    filter="url(#yellow-shadow)"
                />
            </svg>
        </div>
    );
};

export default CurvedLine;
