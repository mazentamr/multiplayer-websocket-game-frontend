# Multiplayer Game Frontend with Real-Time Chat (Next.js)

This project is the **frontend** for a real-time multiplayer game and chat system. The frontend is built with **Next.js** and communicates with a WebSocket server to dynamically display player stats and chat messages.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [Directory Structure](#directory-structure)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Demo Video](#demo-video)
## Features

- **Real-Time Data**: Displays the list of players along with their points and multiplier in real-time.
- **Chat System**: Players can send and receive chat messages instantly.
- **WebSocket Integration**: Fully integrated with the WebSocket server for real-time communication.
- **Modern UI**: Built using Tailwind CSS for a responsive and clean design.

## Technologies Used

- **Next.js**: For server-side rendering and routing.
- **React**: For building reusable UI components.
- **WebSocket**: For real-time communication with the backend server.
- **Tailwind CSS**: For styling and responsive design.

## Project Setup

### Prerequisites

- **Node.js** (v14 or above)
- **npm** or **yarn**

### Steps to Run the Frontend Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-repo/multiplayer-websocket-game-frontend.git
   cd multiplayer-websocket-game-frontend

2. **Clone the Repository**:
    npm install

3. **Run the Development Server:**:
    npm run dev

4. **Open the App:**:
    Visit http://localhost:3000 in your browser to view the game UI.


## Directory Structure
├── public/               # Static assets (images, icons, etc.)
├── src/
│   ├── components/       # React components for UI (ChatBox, PlayerTable, etc.)
│   ├── hooks/            # Custom React hooks (WebSocket hook for communication)
│   ├── pages/            # Next.js pages (home page and other routes)
│   ├── styles/           # Global styles and Tailwind configuration
│   └── context/          # React context for managing state (GameContext)
├── README.md             # Project overview and instructions
├── package.json          # Dependencies and scripts
└── next.config.js        # Next.js configuration


## Future Enhancements
Improved Player Profiles: Add custom avatars and usernames for players.
Player Actions: Allow players to perform actions like adjusting their points or interacting with other players.
Room Functionality: Enable multiple game rooms for separate groups of players.


## Demo Video

Click [here](https://drive.google.com/file/d/14CXQKr5EcP4-VncmKB7O0NAfzgCSa_lR/view?usp=sharing) to watch the demo video.

Alternatively, you can copy and paste the following link into your browser:

    `https://drive.google.com/file/d/14CXQKr5EcP4-VncmKB7O0NAfzgCSa_lR/view?usp=sharing`