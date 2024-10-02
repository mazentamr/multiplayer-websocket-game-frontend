"use client";

import type { AppProps } from 'next/app';
import { GameProvider, useGame } from "./context/GameContext";
import Game from './Game';
export default function Home({ Component, pageProps }: AppProps) {

  return (
    <GameProvider>
      <Game></Game>
    </GameProvider>
  );
}
