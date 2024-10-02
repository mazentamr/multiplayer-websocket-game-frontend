"use client"

import React, {createContext, useState,useContext,ReactNode} from "react";

interface PlayerInfoContextType {
    playerName: string
    setCurrentPlayer: (name: string) => void
}


const PlayerInfoContext = createContext( {} as PlayerInfoContextType);

export const PlayerInfoProvider = ({children}: {children: ReactNode}) => {
    const [playerName, setPlayerName] = useState<string>('sdsds')

    const setCurrentPlayer = (name: string) => {
        setPlayerName(name)
    }

    return (
        <PlayerInfoContext.Provider value={{playerName, setCurrentPlayer}}>
            {children}
        </PlayerInfoContext.Provider>
    )
}


export const usePlayerInfo = () => {
    const context = useContext(PlayerInfoContext);

    if (!context) {
        throw new Error('usePlayerInfo must be used within a PlayerInfoProvider');
    }

    return context;
}