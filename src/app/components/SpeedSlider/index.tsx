"use client";

import { useGame } from '@/app/context/GameContext';
import { useState, ChangeEvent } from 'react';

const multipliers = [1,2, 4, 6, 8, 10];

const SpeedSlider: React.FC = () => {
  const [value, setValue] = useState<number>(2); // Default value is 2x
    const {setSpeed} = useGame()
  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = multipliers[Number(e.target.value)];
    setValue(selectedValue);
    setSpeed(Number(selectedValue));
  };

  return (
    <div className="flex flex-col items-center justify-start  w-full pt-2 ">
        <div className='flex w-full justify-start gap-x-2 items-center'>
            <img src="/assets/quick.png" className="w-[25px] h-[25px]" alt="logo" />
            <h4 className='text-white' >Speed</h4>
        </div>
      {/* Slider */}
      <div className="w-full p-3 pt-1 bg-[#1f2531] rounded-md ">
        <input
          type="range"
          min="0"
          max={multipliers.length - 1}
          step="1"
          value={multipliers.indexOf(value)}
          onChange={handleSliderChange}
          className="w-full bg-[#fb5f43] rounded-lg appearance-none h-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#fb5f43]"
        />
        {/* Multiplier Labels */}
        <div className="flex justify-between mt-1 px-1">
          {multipliers.map((multiplier) => (
            <span
              key={multiplier}
              className={`text-xs font-medium  ${
                value === multiplier ? 'text-[#fb5f43]' : 'text-gray-500'
              }`}
            >
              {multiplier}x
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SpeedSlider;
