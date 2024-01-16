document.getElementById("send-button").addEventListener("click", function () {
  const userInput = document.getElementById("user-input").value;
  sendMessageToChatbot(userInput);
});

function sendMessageToChatbot(message) {
  console.log(message);
  if (message.trim() === "") {
    return;
  }

  updateChatBox("User", message);
  fetch(
    `http://localhost:8000/chat?user_input=${encodeURIComponent(message)}`,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateChatBox("도봉이", data["도봉이"]);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateChatBox(sender, message) {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<strong>${sender}:</strong> ${message}<br>`;
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
