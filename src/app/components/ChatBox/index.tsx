"use client";
import { useGame } from '@/app/context/GameContext';
import useWebSocket from '@/hooks/useWebSocket';
import { useState, ChangeEvent, KeyboardEvent } from 'react';

export interface Message {
    playerId: string;
    playerName: string;
    message: string;
}

export default function ChatBox() {
    const [newMessage, setNewMessage] = useState<string>("");
    const { chatMessages, playerName, players } = useGame();
    const { sendMessage } = useWebSocket('ws://localhost:8080'); // WebSocket connection

    const onSendMessage = () => {
        if (newMessage.trim()) {
            const playerData = players.find(player => player.name === playerName);
            sendMessage({ 
                playerId: playerData?.id, 
                playerName, 
                message: newMessage, 
                type: "chat" 
            });
            setNewMessage("");
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSendMessage();
        }
    };

    return (
        <div className="w-[580px] mt-2">
            <Header />
            <ChatArea chatMessages={chatMessages} playerName={playerName} />
            <MessageInput 
                newMessage={newMessage} 
                handleInputChange={handleInputChange} 
                handleKeyPress={handleKeyPress} 
                onSendMessage={onSendMessage} 
            />
        </div>
    );
}

const Header = () => (
    <div className='flex gap-3 mb-2'>
        <img src="/assets/chat.png" className="w-[20px] h-[20px]" alt="logo" />
        <h4 className='text-white'>Chat</h4>
    </div>
);

const ChatArea = ({ chatMessages, playerName }: { chatMessages: Message[], playerName: string }) => (
    <div className="bg-[#181e26] rounded-b-none shadow-lg rounded-lg p-4 flex flex-col h-[180px]">
        <div className="overflow-auto custom-scrollbar flex-grow p-2 space-y-4">
            {chatMessages.map((message, index) => (
                <MessageBubble 
                    key={index} 
                    message={message} 
                    isOwnMessage={message.playerName === playerName} 
                />
            ))}
        </div>
    </div>
);

const MessageBubble = ({ message, isOwnMessage }: { message: Message, isOwnMessage: boolean }) => (
    <div className={`flex items-center ${isOwnMessage ? "justify-end" : "justify-start"}`}>
        {!isOwnMessage && (
            <div className='text-[#fb5f43] text-md font-bold mr-2'>
                {message.playerName}:
            </div>
        )}
        <div className={`${isOwnMessage ? "bg-[#e3387e] text-white" : "bg-[#3e4555] text-gray-100"} p-1 px-2 rounded-md max-w-xs`}>
            <p className="text-sm">{message.message}</p>
        </div>
    </div>
);

const MessageInput = ({ newMessage, handleInputChange, handleKeyPress, onSendMessage }: { newMessage: string, handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void, handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void, onSendMessage: () => void }) => (
    <div className=" bg-[#303844] p-3 rounded-md rounded-t-none flex items-center gap-3">
        <input
            type="text"
            className="border rounded-lg px-2 w-full  h-[45px] text-white bg-[#181e26] border-none"
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
        />
        <button
            onClick={onSendMessage}
            className="cursor-pointer bg-gradient-to-r h-[45px] to-[#fb5f43] from-[#e3387e] text-white p-2 rounded-lg w-1/4 hover:bg-blue-600"
        >
            Send
        </button>
    </div>
);
