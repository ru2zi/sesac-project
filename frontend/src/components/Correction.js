import React, { useState, useEffect } from 'react';

const Correction = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState("");
  const [correctedText, setCorrectedText] = useState("");

  // 서버에서 채팅 내역을 불러오는 함수
  const fetchChatHistory = () => {
    fetch('http://localhost:8000/chat_history')
      .then(response => response.json())
      .then(data => setChatHistory(data))
      .catch(err => console.error(err));
  };

  // 컴포넌트가 마운트될 때 처음으로 채팅 내역을 불러옵니다.
  useEffect(() => {
    fetchChatHistory();
  }, []);

  // 선택된 메시지를 교정하는 함수
  const handleCorrection = () => {
    const index = parseInt(selectedMessageIndex, 10);

    if (index >= 0 && chatHistory[index]) {
      const messageToCorrect = chatHistory[index].도봉이;
      const corrected = messageToCorrect;
      setCorrectedText(corrected);
    }
  };

// 초기화 함수
const handleReset = () => {
    setSelectedMessageIndex("");
    setCorrectedText("");
  
    // 서버에 'chat_history.txt' 파일 내용을 삭제하도록 요청합니다.
    fetch('http://localhost:8000/reset_chat_history', {
      method: 'POST',
    })
      .then(response => {
        if (!response.ok) {
          console.error('Failed to reset chat history');
        } else {
          // 성공하면 채팅 내역을 다시 불러옵니다.
          fetchChatHistory();
        }
      })
      .catch(err => console.error(err));
  };
  
  

  return (
    <div className="correction-section">
      <h2 className="text-center text-3xl font-bold mb-4 text-white">텍스트 교정</h2>
      <div className="mb-5">
        <label htmlFor="message-select" className="text-1xl font-extrabold text-white mb-2">메시지 선택:</label>
        <select
          id="message-select"
          className="border border-gray-300 p-2 rounded"
          value={selectedMessageIndex}
          onChange={(e) => setSelectedMessageIndex(e.target.value)}
        >
          <option value="">메시지를 선택해주세요</option>
          {chatHistory && chatHistory.map((entry, index) => (
            <option key={index} value={index}>
              {entry.User}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={fetchChatHistory}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
      >
        갱신
      </button>
      <button
        onClick={handleCorrection}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
      >
        교정하기
      </button>
      <button
        onClick={handleReset}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        초기화
      </button>
      {correctedText && (
        <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-100">
          <h3 className="font-semibold">교정된 텍스트:</h3>
          <p>{correctedText}</p>
        </div>
      )}
    </div>
  );
};

export default Correction;
