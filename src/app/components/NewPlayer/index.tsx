"use client";
import { useGame } from "@/app/context/GameContext";
import { useState } from "react";

const NewPlayer = () => {
    const { setPlayerName } = useGame();
    const [name, setName] = useState("");

    return (
        <div className="h-[455px] p-9 rounded-md border border-gray-700 bg-[#1f2531] w-[400px] gap-4 text-white text-start">
            <h4 className="text-center mt-10 mb-24 text-gray-400 text-2xl">Welcome</h4>
            <p className="text-gray-400 text-center mb-3 text-xs w-full">Please insert your name</p>
            <input
                type="text"
                placeholder="Player Name"
                className="h-11 w-full px-3 bg-[#14181e] text-white rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button
                className="w-full h-11 mt-6 bg-[#7b8499] text-white rounded-md"
                onClick={() => setPlayerName(name)}
            >
                Accept
            </button>
        </div>
    );
};

export default NewPlayer;
