"use client";
import { useEffect } from "react";
import { useGame } from "@/app/context/GameContext";
import GameBoardHeader from "./components/GameBoardHeader";
import CurvedLine from "./components/CurvedLine";

const GameBoard: React.FC = () => {
    const {
        multiplierData,
        setMultiplierData,
        speed,
        addPlayerPoints,
        time,
        chart,
    } = useGame();

    useEffect(() => {
        if (time === 0) return;

        const updateMultiplier = () => {
            const newMultiplier = Number(
                (Math.random() * (9.99 - 1.00) + 1.00).toFixed(2)
            ); // Generate a random multiplier
            setMultiplierData((prevData) => [...prevData, newMultiplier]);
            addPlayerPoints(1, newMultiplier);
        };

        updateMultiplier();
        
    }, [time, speed, setMultiplierData, addPlayerPoints, chart]);

    return (
        <div>
            <div className="text-3xl text-white">
                <GameBoardHeader />
            </div>
            <div className="bg-[#1f2531] rounded-md border border-gray-700 h-96">
                <CurvedLine />
            </div>
        </div>
    );
};

export default GameBoard;
