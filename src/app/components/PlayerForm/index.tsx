"use client"
import { useGame } from "@/app/context/GameContext";
import useWebSocket from "@/hooks/useWebSocket";
import { useState } from "react";

const PlayerForm = () => {
    const { playerName, setTime, setChart, chart, players } = useGame()

    const [multiplier, setMultiplier] = useState(1.00);
    const [points, setPoints] = useState(50);
    const { sendMessage } = useWebSocket('ws://localhost:8080');

    const incrementPoints = () => {
        setPoints(points + 25);
    }

    const decrementPoints = () => {
        if (points <= 1) {
            return;
        }

        setPoints(points - 25);
    }

    const incrementMultiplier = () => {
        setMultiplier(multiplier + 0.25);
    }

    const decrementMultiplier = () => {
        if (multiplier <= 1) {
            return;
        }
        setMultiplier(multiplier - 0.25);
    }

    const startHandler = () => {
        const playerData = {
            name: playerName,
            points: parseFloat(points.toString()),
            multiplier: parseFloat(multiplier.toString()),
            type: "new_player",
        };
        const isExist = players.some((player) => player.name === playerName);

        if (points >= 0 && multiplier > 0) {
            if (!isExist) {
                sendMessage(playerData);
            }

            setTime(200)

            setTimeout(() => {
                setChart(chart + 1)
            }, 500);

        } else {
            return;
        }

    }

    return (
        <div>

            <div className="w-[400px] ">
                <div>
                    <div className="text-3xl text-start text-white flex justify-between gap-3 mb-4">
                        <div className=" bg-gradient-to-r from-black  to-[#20252e]  w-[200px] border px-2 pb-2 pt-1 rounded-lg border-gray-800 shadow-sm shadow-gray-800 ">
                            <div className="text-xs text-gray-600 text-center">
                                points
                            </div>
                            <div className="flex justify-between items-center">
                                <div onClick={() => decrementPoints()} className="rounded-md cursor-pointer p-[5px] border border-gray-700 " >
                                    <img src="/assets/down-arrow.svg" className="w-[13px] h-[13px]" alt="logo" />
                                </div>

                                <input type="text" className="w-1/2 h-6 px-3 bg-black text-center text-[19px] font-bold text-white  text-sm rounded-md" value={points} onChange={(e) => setPoints(Number(e.target.value))} />

                                <div onClick={() => incrementPoints()} className="rounded-md cursor-pointer p-[5px] border border-gray-700 " >
                                    <img src="/assets/up-arrow.svg" className="w-[13px] h-[13px]" alt="logo" />
                                </div>
                            </div>
                        </div>

                        <div className=" bg-gradient-to-r from-[#14181e] to-[#20252e] px-2 pb-2 pt-1   w-[200px] border p-2 rounded-lg border-gray-800 shadow-sm shadow-gray-800 ">
                            <div className="text-xs text-gray-600 text-center">
                                multiplier
                            </div>
                            <div className="flex justify-between items-center">
                                <div onClick={() => decrementMultiplier()} className="rounded-md cursor-pointer p-[5px] border border-gray-700 " >
                                    <img src="/assets/down-arrow.svg" className="w-[13px] h-[13px]" alt="logo" />
                                </div>

                                <input type="text" className="w-1/2 h-6 px-3 bg-black text-center font-bold text-white text-[19px] rounded-md" value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))} />
                                <div onClick={() => incrementMultiplier()} className="rounded-md cursor-pointer p-[5px] border border-gray-700 " >
                                    <img src="/assets/up-arrow.svg" className="w-[13px] h-[13px]" alt="logo" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => startHandler()} className="cursor-pointer bg-gradient-to-r to-[#fb5f43] from-[#e3387e] text-white  flex justify-between items-center text-center border p-2 rounded-lg border-gray-800 shadow-sm shadow-gray-800 ">
                        <div className="w-full text-center">
                            Start
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerForm