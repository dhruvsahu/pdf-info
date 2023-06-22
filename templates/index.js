// PDF Chatbot frontend logic
const uploadContainer = document.getElementById("upload-container");
const fileUpload = document.getElementById("file-upload");
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Function to add a message to the chat container
function addMessage(sender, content) {
  const messageDiv = document.createElement("div");
  const senderTag = document.createElement("strong");
  senderTag.innerText = `${sender}: `;
  const contentTag = document.createElement("span");
  contentTag.innerText = content;
  messageDiv.appendChild(senderTag);
  messageDiv.appendChild(contentTag);
  chatContainer.appendChild(messageDiv);

  // Scroll to the bottom of the chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Event listener for file upload
fileUpload.addEventListener("change", function () {
  const file = fileUpload.files[0];
  if (file) {
    uploadContainer.style.display = "none";
    chatContainer.style.display = "block";
    userInput.disabled = false;
    sendButton.disabled = false;

    // Perform processing of the uploaded PDF file
    // Replace this with your own code to handle the PDF processing

    // Sample response for demonstration
    const response = "This is a response from the chatbot.";
    addMessage("Chatbot", response);
  }
});

// Event listener for send button click
sendButton.addEventListener("click", function () {
  const userMessage = userInput.value;
  addMessage("User", userMessage);
  userInput.value = "";

  // Send the user message to the server for processing
  // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend
  fetch("YOUR_BACKEND_URL", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: userMessage,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const botMessage = data.message;
      addMessage("Chatbot", botMessage);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Event listener for pressing Enter key in the user input field
userInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendButton.click();
  }
});
