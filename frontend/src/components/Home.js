// Home.js
import React, { useState } from 'react';
import ChatRoom from './ChatRoom';
import Correction from './Correction';
import Gallery from './Gallery'; // Gallery 컴포넌트를 import 합니다.

function Home() {
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <div className="home-container">
      <div className="flex">
        {/* ChatRoom 컴포넌트: 입력을 받는 박스 */}
        <div className="chatroom-container w-1/2 p-4">
          <ChatRoom chatHistory={chatHistory} setChatHistory={setChatHistory} />
        </div>

        {/* Correction 컴포넌트: 입력된 메시지를 보여주는 박스 */}
        <div className="correction-container w-1/2 p-4">
          <Correction chatHistory={chatHistory} />
        </div>
      </div>
      
      {/* Gallery 컴포넌트: 여기에 추가됩니다. */}
      <div className="gallery-container w-full p-4">
        <Gallery />
      </div>
    </div>
  );
}

export default Home;
