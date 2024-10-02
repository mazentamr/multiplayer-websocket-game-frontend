"use client";
import CurrentRoundTable from "./components/CurrentRoundTable";
import GameBoard from "./components/GameBoard";
import PlayerForm from "./components/PlayerForm";
import SpeedSlider from "./components/SpeedSlider";
import type { AppProps } from 'next/app';
import { useGame } from "./context/GameContext";
import NewPlayer from "./components/NewPlayer";
import ChatBox from "./components/ChatBox";
import RankingTable from "./components/RankingTable";

export default function Game() {
    const { playerName } = useGame()

    return (
        <div className="grid bg-[#14181e] px-40 py-20 h-full font-[family-name:var(--font-geist-sans)]">
            <div className="flex justify-center gap-4">
                <div>
                    {
                        !!playerName ? (
                            <div className="h-[450px]">
                                <PlayerForm></PlayerForm>
                                <CurrentRoundTable></CurrentRoundTable>
                                <SpeedSlider></SpeedSlider>
                            </div>
                        ) :
                            <NewPlayer />
                    }

                </div>
                <div>
                    <GameBoard></GameBoard>
                </div>
            </div>
            <div className="flex justify-center align-center gap-4">
                <div>
                    <RankingTable />
                </div>
                <div>
                    <ChatBox></ChatBox>
                </div>
            </div>

        </div>
    );
}
