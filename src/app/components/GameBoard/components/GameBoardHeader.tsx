"use client";
import { useEffect, useState } from "react";
import { useGame } from "@/app/context/GameContext";

const GameBoardHeader = () => {
    const { playerName, players, setTime, time } = useGame();
    const [info, setInfo] = useState({
        name: '----',
        id: 0,
        points: 0,
        basePoints: 0,
    });

    useEffect(() => {
        if (time === 0) return;

        const intervalId = setInterval(() => {
            setTime(prevTime => prevTime - 1); // Use functional state update for correctness
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [time, setTime]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (playerName) {
            const playerData = players.find((player) => player.name === playerName);
            if (playerData) {
                setInfo(playerData); // Update info only if playerData is found
            }
        }
    }, [playerName, players]);

    const renderPlayerInfo = (imgSrc: string, text: string | number) => (
        <div className="bg-gradient-to-r from-[#14181e] to-[#20252e] flex justify-between items-center w-[200px] border p-2 rounded-lg border-gray-800 shadow-sm shadow-gray-800">
            <img src={imgSrc} alt="icon" className="h-12" style={{ width: 35, height: 35 }} />
            <div className="text-sm">{text}</div>
            <div></div>
        </div>
    );

    return (
        <div className="text-3xl text-start text-white flex justify-between gap-3 mb-4">
            {renderPlayerInfo("/assets/badge.png", info.basePoints || 0)}
            {renderPlayerInfo("/assets/music-award.png", playerName || '----')}
            {renderPlayerInfo("/assets/time-is-money.png", formatTime(time))}
        </div>
    );
};

export default GameBoardHeader;
