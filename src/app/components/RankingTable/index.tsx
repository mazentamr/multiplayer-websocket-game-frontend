"use client";

import { useGame } from "@/app/context/GameContext";


const RankingTable: React.FC = () => {
    const { players } = useGame();
    return (
        <div className="w-[500px]">
            {/* Header */}
            <div className="mt-3 flex justify-start gap-x-3 items-center">
                <img src="/assets/rank.png" className="w-[20px] h-[20px]" alt="logo" />
                <h4 className="text-white">Ranking</h4>
            </div>

            {/* Table */}
            <div className="pt-1 border border-gray-700 rounded-md mt-2">
                <div className="flex px-4 justify-between text-gray-400 mr-7 text-[10px] font-bold p-1">
                    <div>No.</div>
                    <div>Name</div>
                    <div>Score</div>
                </div>


                {/* Dynamic Row Rendering from Context */}
                <div className="h-[218px] overflow-auto custom-scrollbar overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
                    {players.map((item, index) => (
                        <div className={`text-white ${index % 2 === 0 ? 'bg-[#14181e]' : 'bg-[#1a1f27]'} flex justify-between text-sm px-1 py-2 pr-5`}>
                            <div  >{item.id}</div>
                            <div  >{item.name }</div>
                            <div >{ item.basePoints}</div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default RankingTable