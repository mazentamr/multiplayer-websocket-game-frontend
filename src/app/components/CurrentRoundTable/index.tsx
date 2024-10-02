"use client";
// /src/components/CurrentRoundTable.tsx
import React from 'react';
import {  Player, useGame } from '@/app/context/GameContext';

const CurrentRoundTable: React.FC = () => {
  const { players, playerName } = useGame(); // Access players from context

  return (
    <div>
      <Header />
      <Table players={players} playerName={playerName} />
    </div>
  );
};

const Header = () => (
  <div className="mt-4 flex justify-start gap-2 items-center">
    <img src="/assets/badge.png" className="w-[20px] h-[20px]" alt="logo" />
    <div className="text-white">Current Round</div>
  </div>
);

const Table = ({ players, playerName }: { players: Player[], playerName: string }) => (
  <div className="pt-1 border border-gray-700 rounded-md mt-4 h-[190px] overflow-auto custom-scrollbar">
    <TableHeader />
    {players.map((player, index) => (
      <PlayerRow key={index} player={player} playerName={playerName} index={index} />
    ))}
  </div>
);

const TableHeader = () => (
  <div className="flex justify-between text-gray-400 text-[10px] font-bold px-1">
    <div>Name</div>
    <div>Points</div>
    <div>Multiplier</div>
  </div>
);

const PlayerRow = ({ player, playerName, index }: { player: Player, playerName: string, index: number }) => {
  const isCurrentPlayer = player.name === playerName;
  return (
    <div
      className={`text-green-400 flex justify-between text-sm px-1 py-2 ${
        index % 2 === 0 ? 'bg-[#14181e]' : 'bg-[#1a1f27]'
      } ${isCurrentPlayer ? 'bg-gray-600' : ''}`}
    >
      <div className="w-[30px] text-start">{player.name}</div>
      <div className="w-[50px] text-start">{player.points?.toFixed(2)}</div>
      <div className="mx-3">{player.multiplier.toFixed(2)}</div>
    </div>
  );
};

export default CurrentRoundTable;
