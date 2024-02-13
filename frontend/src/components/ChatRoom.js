import NavBar from "./NavBar";
import React, { useState } from "react";

const ChatRoom = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    const userMessage = userInput.trim();
    if (!userMessage) return;

    // Add user message to chat history
    setChatHistory([...chatHistory, { sender: "User", message: userMessage }]);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "도봉이", message: responseData.도봉이 },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // Clear input field
    setUserInput("");
  };

  const handleReset = () => {
    // 서버에 'chat_history.txt' 파일 내용을 삭제하도록 요청합니다.
    fetch('http://localhost:8000/reset_chat_history', {
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          // 성공하면 클라이언트의 채팅 내역을 초기화합니다.
          setChatHistory([]);
        } else {
          console.error('Failed to reset chat history');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <section className="flex flex-col">
      <h1 className="text-center text-3xl font-bold mb-4 text-white">블로그 대필봇</h1>
      <div className="w-full mx-auto my-4 max-w-2xl flex flex-row ">
        <div className="w-full mx-auto max-w-3xl h-[80vh] pt-2 flex flex-col ">
          <NavBar />
          <div className="h-[70%] w-full border border-gray-300 mb-4 p-2 overflow-y-scroll bg-white">
            {/* Display chat history */}
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`message ${chat.sender === "User" ? "user" : "도봉이"}`}
              >
                <p>
                  <strong>{chat.sender}:</strong> {chat.message}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-gray-300">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="w-3/5 p-2"
              placeholder="메세지를 입력하세요."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="w-1/5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              보내기
            </button>
            <button
              onClick={handleReset}
              className="w-1/5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              초기화
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatRoom;
