import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { createSocketConnection } from "../utils/soxket";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const theme = useSelector((store) => store.theme);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [socket, setSocket] = useState(null);
  const userId = user?._id;

  // Ref for auto-scroll
  const scrollRef = useRef(null);

  const fetchChat = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true });
      if (response.data.success) {
        setMessages(response.data.chat.messages);
      } else {
        console.error("Failed to fetch chat:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const newSocket = createSocketConnection();
    setSocket(newSocket);

    newSocket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });

    newSocket.on("newMessageReceived", ({ senderId, text, createdAt }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          firstName: senderId?.firstName || "Unknown",
          lastName: senderId?.lastName || "",
          text,
          senderId: senderId?._id || senderId,
          createdAt,
        },
      ]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId, targetUserId]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!messageText.trim() || !socket) return;

    const newMessage = {
      firstName: user.firstName,
      senderId: userId,
      receiverId: targetUserId,
      text: messageText,
    };

    socket.emit("sendMessage", newMessage);
    setMessageText("");
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className={`flex flex-col justify-between h-[80vh] border rounded-lg shadow-md 
        w-full lg:w-[60%] xl:w-[55%] 2xl:w-[50%]
        ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>

        <h1 className={`p-4 text-lg font-semibold sticky top-0 z-10
          ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}>
          Chat
        </h1>

        <div className={`flex-1 overflow-y-auto px-2 sm:px-4 py-4 
          ${theme === "dark" ? "bg-gray-900" : "bg-white"} 
          md:[&::-webkit-scrollbar]:hidden md:[scrollbar-width:none]`}>

          <div className="space-y-4 w-full">
            {messages.map((msg, index) => {
              const isSender = msg.senderId._id === userId || msg.senderId === userId;
              const isLastMessage = index === messages.length - 1;

              return (
                <div
                  key={index}
                  ref={isLastMessage ? scrollRef : null} // Apply ref to the last message
                  className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex flex-col 
                    ${isSender ? "items-end" : "items-start"}
                    max-w-[75%] sm:max-w-[70%] md:max-w-[60%]`}>
                    <div className={`text-xs font-semibold mb-1
                      ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                      {msg.senderId.firstName}
                    </div>
                    <div className={`p-3 rounded-lg break-words w-fit
                      ${isSender
                        ? theme === "dark"
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : theme === "dark"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-900"}`}>
                      {msg.text}
                    </div>
                    <div className={`text-xs mt-1
                      ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`p-4 flex items-center gap-3 
          ${theme === "dark" 
            ? "border-t border-gray-700 bg-gray-800" 
            : "border-t border-gray-200 bg-white"}`}>
          <input
            type="text"
            className={`w-full p-2 rounded-lg 
              ${theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"} 
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 
              ${theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"} 
              md:px-6`}
            onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
