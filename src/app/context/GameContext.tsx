"use client";
import useWebSocket from "@/hooks/useWebSocket";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Message } from "../components/ChatBox";

export interface Player {
    id: number
    name: string
    points: number
    multiplier: number
    basePoints: number
}

interface GameContextType {
    multiplierData: number[];
    setMultiplierData: React.Dispatch<React.SetStateAction<number[]>>;
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    speed: number;
    setSpeed: React.Dispatch<React.SetStateAction<number>>;
    addPlayerPoints: (playerId: number, points: number) => void;
    setPlayerName: React.Dispatch<React.SetStateAction<string>>;
    playerName: string;
    chatMessages: Message[];
    setChatMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>
    setPlayerId: React.Dispatch<React.SetStateAction<number>>
    playerId: number;
    setChart: React.Dispatch<React.SetStateAction<number>>;
    chart: number;
    setRanking: React.Dispatch<React.SetStateAction<number>>;
    ranking: Player[]
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [multiplierData, setMultiplierData] = useState<number[]>([1, 1, 1, 1]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [time , setTime] = useState<number>(0)
    const { lastMessage } = useWebSocket('ws://localhost:8080'); // Assuming you have WebSocket logic
    const [playerName, setPlayerName] = useState<string>('')
    const [playerId, setPlayerId] = useState<number>(1)
    const [speed, setSpeed] = useState<number>(1);
    const [chart, setChart] = useState<number>(0)
    const [ranking, setRanking] = useState<Player[]>([])

    useEffect(() => {
        if (lastMessage) {
            const playerData = JSON.parse(lastMessage);

            if (playerData?.players) {
                setPlayers(playerData?.players)
            }
            if(playerData?.ranking){
                setRanking(playerData?.ranking)
            }
            if (playerData?.chatMessages) {
                
                setChatMessages(playerData?.chatMessages)
                console.log("playerData", playerData.chatMessages)
            }
        }
    }, [lastMessage]);




    const addPlayerPoints = (playerId: number, points: number) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === playerId
                    ? { ...player, points: player.points + points }
                    : player
            )
        );
    };

    return (
        <GameContext.Provider
            value={{
                multiplierData,
                setMultiplierData,
                players,
                setPlayers,
                speed,
                setSpeed,
                addPlayerPoints,
                playerName,
                setPlayerName,
                chatMessages,
                time, 
                setTime,
                playerId, 
                setPlayerId,
                chart, 
                setChart
            }}
        >
            {children}
        </GameContext.Provider>
    )
}


export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};